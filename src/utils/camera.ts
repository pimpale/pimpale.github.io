import { glMatrix, quat, vec3, mat4 } from 'gl-matrix';

// https://www.xarg.org/2021/07/trackball-rotation-using-quaternions/
function projectTrackball(v: { x: number, y: number }) {
  const x = v.x;
  const y = v.y;

  const r = 1;

  let z;
  if (x * x + y * y <= r * r / 2) {
    z = Math.sqrt(r * r - (x * x) - (y * y));
  } else {
    z = (r * r / 2) / Math.sqrt(x * x + y * y);
  }

  return new Float32Array([x, -y, z]);
}

export type TrackballCameraOptions = {
  ortho?: Ortho,
  rotation?: quat,
  /**
   * If set, dragging only rotates about this view-space axis (e.g. [0, 1, 0]
   * for a turntable that can't be tipped up or down). Horizontal drag
   * distance maps to angle; vertical drag is ignored.
   */
  lockRotationAxis?: vec3,
  dampingFactor?: number,
  enableZoom?: boolean,
  zoomSpeed?: number,
  minZoom?: number,
  maxZoom?: number,
}

export type Ortho = {
  left: number,
  right: number,
  bottom: number,
  top: number,
  near: number,
  far: number,
}

type Point = {
  x: number,
  y: number
}


export class TrackballCamera {

  // options

  // the orthographic camera settings
  private ortho: Ortho;
  // this is the rotation that would applied to the object every frame not being dragged
  private rotationQ;
  // how much to damp the rotation at each step
  private dampingFactor: number;
  // if set, drags rotate only about this view-space axis
  private lockRotationAxis: vec3 | null;

  // zoom options
  private enableZoom: boolean;
  private zoomSpeed: number;
  private minZoom: number;
  private maxZoom: number;
  private zoomLevel: number = 1;

  private canvas: HTMLElement;

  // if mouse is pressed, start location of drag
  private mouseLoc: null | { start: Point, current: Point, previous: Point } = null;

  // the following two quaternions are multiplied together to produce the
  // real rotation

  // the base orientation of the object
  private baseQ = quat.create();
  // the rotation added by the mouse (generated each frame)
  private currQ = quat.create();
  // the rotation used for momentum
  private momentumQ = quat.create();

  // when not being dragged, how much to show the momentum
  private currentMomentumLevel = 0;

  // normalizes the mouse coords such that the edge of the trackball is +-1
  getNormalizedMouseCoords = (e: { clientX: number, clientY: number }) => {
    const rect = this.canvas.getBoundingClientRect();
    // get client canvas x and y
    const client_cx = (rect.left + rect.right) / 2;
    const client_cy = (rect.top + rect.bottom) / 2;

    // get canvas width and height
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;

    // the radius of our trackball will be the smaller of these 2
    const trackballRadius = Math.min(width, height);

    // get normalized mouse x and y
    const q = {
      x: 2 * (e.clientX - client_cx) / trackballRadius,
      y: 2 * (e.clientY - client_cy) / trackballRadius
    }
    return q;
  }

  handleMouseDown = (e: MouseEvent) => {
    // set data
    const loc = this.getNormalizedMouseCoords(e);
    this.mouseLoc = { start: loc, current: loc, previous: loc };
  }

  handleMouseMove = (e: MouseEvent) => {
    if (this.mouseLoc === null) {
      return;
    }

    // set mouse locations
    this.mouseLoc.previous = this.mouseLoc.current
    this.mouseLoc.current = this.getNormalizedMouseCoords(e);

    this.currQ = this.dragRotation(this.mouseLoc.start, this.mouseLoc.current);
  }

  // rotation produced by dragging from one normalized mouse position to another
  private dragRotation = (from: Point, to: Point): quat => {
    if (this.lockRotationAxis !== null) {
      // dragging across the trackball radius turns a quarter revolution
      const angle = (to.x - from.x) * Math.PI / 2;
      return quat.setAxisAngle(quat.create(), this.lockRotationAxis, angle);
    }

    const a = projectTrackball(from);
    const b = projectTrackball(to);

    vec3.normalize(a, a);
    vec3.normalize(b, b);

    // quaternion rotation between these vectors
    return quat.rotationTo(quat.create(), a, b);
  }

  handleMouseUp = (e: MouseEvent) => {
    if (this.mouseLoc === null) {
      return;
    }

    // save the rotational diff between the last pos and the current one
    this.momentumQ = this.dragRotation(this.mouseLoc.previous, this.mouseLoc.current);

    // commit the quaternion change
    quat.mul(this.baseQ, this.currQ, this.baseQ);
    this.currQ = quat.create();

    // mouse up
    this.mouseLoc = null;

    // set momentum level to 1
    this.currentMomentumLevel = 1;
  }

  discardTouchEvent = (e: TouchEvent) => e.preventDefault();

  handleWheel = (e: WheelEvent) => {
    if (!this.enableZoom) return;
    e.preventDefault();
    
    // deltaY is positive when scrolling down (zoom out), negative when scrolling up (zoom in)
    const delta = e.deltaY > 0 ? -1 : 1;
    this.zoomLevel *= 1 + delta * this.zoomSpeed;
    
    // Clamp zoom level
    this.zoomLevel = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoomLevel));
  }

  constructor(ctx: HTMLElement, options: TrackballCameraOptions) {
    if (options.ortho) {
      this.ortho = options.ortho;
    } else {
      this.ortho = {
        left: -1,
        right: 1,
        bottom: -1,
        top: 1,
        near: -1,
        far: 1,
      };
    }

    if (options.rotation) {
      this.rotationQ = options.rotation;
    } else {
      this.rotationQ = quat.create();
    }

    this.lockRotationAxis = options.lockRotationAxis
      ? vec3.normalize(vec3.create(), options.lockRotationAxis)
      : null;

    if(options.dampingFactor !== undefined) {
        this.dampingFactor = options.dampingFactor;
    } else {
        this.dampingFactor = 0.9;
    }

    // Zoom options (off by default)
    this.enableZoom = options.enableZoom ?? false;
    this.zoomSpeed = options.zoomSpeed ?? 0.1;
    this.minZoom = options.minZoom ?? 0.1;
    this.maxZoom = options.maxZoom ?? 10;

    this.canvas = ctx;

    this.canvas.addEventListener('pointerdown', this.handleMouseDown);
    window.addEventListener('pointermove', this.handleMouseMove);
    window.addEventListener('pointerup', this.handleMouseUp);

    // zoom via wheel
    this.canvas.addEventListener('wheel', this.handleWheel, { passive: false });

    // disable touch movements
    this.canvas.addEventListener("touchstart",  this.discardTouchEvent)
    this.canvas.addEventListener("touchmove",   this.discardTouchEvent)
    this.canvas.addEventListener("touchend",    this.discardTouchEvent)
    this.canvas.addEventListener("touchcancel", this.discardTouchEvent)
  }


  cleanup = () => {
    this.canvas.removeEventListener('pointerdown', this.handleMouseDown);
    window.removeEventListener('pointermove', this.handleMouseMove);
    window.removeEventListener('pointerup', this.handleMouseUp);

    // remove wheel listener
    this.canvas.removeEventListener('wheel', this.handleWheel);

    // reenable touch movements
    this.canvas.removeEventListener("touchstart",  this.discardTouchEvent)
    this.canvas.removeEventListener("touchmove",   this.discardTouchEvent)
    this.canvas.removeEventListener("touchend",    this.discardTouchEvent)
    this.canvas.removeEventListener("touchcancel", this.discardTouchEvent)
  }


  /** True while the pointer is held down on the canvas. */
  isDragging = () => this.mouseLoc !== null;

  /** Replace the orthographic bounds, e.g. after the canvas aspect ratio changes. */
  setOrtho = (ortho: Ortho) => {
    this.ortho = ortho;
  }

  update = () => {
    if (this.mouseLoc === null) {
      const combinedQ = quat.slerp(quat.create(), this.rotationQ, this.momentumQ, this.currentMomentumLevel);
      this.currentMomentumLevel *= this.dampingFactor;
      quat.mul(this.baseQ, combinedQ , this.baseQ);
    }  
  }

  getTrackballCameraMatrix = (width: number, height: number) => {
    const tmp = quat.mul(quat.create(), this.currQ, this.baseQ);

    const view = mat4.create();
    mat4.fromQuat(view, tmp);

    const proj = mat4.create();
    const b = this.ortho;
    // Apply zoom by scaling the ortho bounds (larger zoom = smaller bounds = objects appear larger)
    const z = this.zoomLevel;
    mat4.ortho(proj, b.left / z, b.right / z, b.bottom / z, b.top / z, b.near, b.far);

    const out = mat4.create();
    mat4.mul(out, proj, view);
    return out;
  }
}


