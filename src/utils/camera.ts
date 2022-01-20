import { glMatrix, quat, vec3, mat4 } from 'gl-matrix';
import { TouchEvent } from 'react';
import assert from '../utils/assert';

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
  ortho?: { top: number, bottom: number, near: number, far: number, left: number, right: number },
  rotation?: quat,
}

export class TrackballCamera {

  private options: TrackballCameraOptions;

  private canvas: HTMLCanvasElement;

  // if mouse is pressed
  private start: null | { x: number, y: number } = null;

  // current quaternion
  private baseQ = quat.create();
  private currQ = quat.create();


  // normalizes the mouse coords such that the edge of the trackball is +-1
  getNormalizedMouseCoords = (e: {clientX:number, clientY:number}) => {
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

  handleMouseDown = (e: {clientX:number, clientY:number}) => {
    this.start = this.getNormalizedMouseCoords(e);
  }

  handleMouseMove = (e: {clientX:number, clientY:number}) => {
    if (this.start === null) {
      return;
    }

    const a = projectTrackball(this.start);
    const b = projectTrackball(this.getNormalizedMouseCoords(e));

    vec3.normalize(a, a);
    vec3.normalize(b, b);

    // quaternion rotation between these vectors
    quat.rotationTo(this.currQ, a, b);
  }


  handleMouseUp = (e: {clientX:number, clientY:number}) => {
    if (this.start === null) {
      return;
    }

    // commit the quaternion change
    quat.mul(this.baseQ, this.currQ, this.baseQ);
    this.currQ = quat.create();

    // mouse up
    this.start = null;
  }

  constructor(ctx: HTMLCanvasElement, options: TrackballCameraOptions) {
    this.options = options;

    this.canvas = ctx;

    this.canvas.addEventListener('pointerdown', this.handleMouseDown);
    window.addEventListener('pointermove', this.handleMouseMove);
    window.addEventListener('pointerup', this.handleMouseUp);

  }


  cleanup = () => {
    this.canvas.removeEventListener('pointerdown', this.handleMouseDown);
    window.removeEventListener('pointermove', this.handleMouseMove);
    window.removeEventListener('pointerup', this.handleMouseUp);
  }

  update = () => {
    if (this.start === null && this.options.rotation !== undefined) {
      quat.mul(this.baseQ, this.baseQ, this.options.rotation);
    }
  }

  getTrackballCameraMatrix = (width: number, height: number) => {
    const tmp = quat.mul(quat.create(), this.currQ, this.baseQ);

    const view = mat4.create();
    mat4.fromQuat(view, tmp);

    const proj = mat4.create();
    if (this.options.ortho) {
      const b = this.options.ortho;
      mat4.ortho(proj, b.left, b.right, b.bottom, b.top, b.near, b.far);
    } else {
      let r = 1;
      mat4.ortho(proj, -r, r, -r, r, -r, r);
    }

    const out = mat4.create();
    mat4.mul(out, proj, view);
    return out;
  }
}


