import { glMatrix, vec3, mat4 } from 'gl-matrix';

export class TrackballCamera {
  private canvas: HTMLCanvasElement;

  // if mouse is pressed
  private mouseDown = false;
  private prevMousePos = { x: 0, y: 0 };
  private mousePos = { x: 0, y: 0 };

  // distance from origin
  public R: number;
  // horizontal yaw
  public theta: number;
  // vertical pitch
  public phi: number;

  handleMouseDown = (e: MouseEvent) => {
    this.mouseDown = true;
  }
  handleMouseUp = (e: MouseEvent) => {
    this.mouseDown = false;
  }

  handleMouseMove = (e: MouseEvent) => {
    this.prevMousePos = this.mousePos;
    this.mousePos = { x: e.pageX, y: e.pageY };

    // recalculate theta and phi
    if (this.mouseDown) {
      this.theta -= (this.mousePos.x - this.prevMousePos.x) * 0.01;
      this.phi -= (this.mousePos.y - this.prevMousePos.y) * 0.01;
    }
  }

  constructor(r: number, ctx: HTMLCanvasElement) {
    this.canvas = ctx;

    this.R = r;
    this.phi = Math.PI / 2;
    this.theta = 0;

    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }


  cleanup() {
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  getTrackballCameraMatrix = (width: number, height: number) => {
    //  always assume the camera is oriented up
    const worldup = new Float32Array([0, 1, 0]);
    // alwys assume the target is in the center
    const target = new Float32Array([0, 0, 0]);

    const eye = new Float32Array([
      this.R * Math.sin(this.phi) * Math.cos(this.theta),
      this.R * Math.cos(this.phi),
      this.R * Math.sin(this.phi) * Math.sin(this.theta),
    ]);

    const view = mat4.create();
    mat4.lookAt(view, eye, target, worldup);

    const proj = mat4.create();
    mat4.ortho(proj, -1, 1, -1, 1, 0, 100);

    const out = mat4.create();
    mat4.mul(out, proj, view);
    return out;
  }
}


