import assert from 'assert';

class ScalarMap {
  private arr: Float32Array;
  private xsize: number;
  private ysize: number;

  constructor(xsize: number, ysize: number) {
    this.arr = new Float32Array(xsize * ysize);
    this.xsize = xsize;
    this.ysize = ysize;
  }

  getv(x: number, y: number) {
    assert(x < this.xsize);
    assert(y < this.ysize);
    return this.arr[this.xsize * y + x];
  }

  setv(x: number, y: number, v: number) {
    assert(x < this.xsize);
    assert(y < this.ysize);
    assert(v >= 0 && v <= 1.0);
    this.arr[this.xsize * y + x] = v;
  }

  dims() {
    return { width: this.xsize, height: this.ysize };
  }
}

export default ScalarMap;
