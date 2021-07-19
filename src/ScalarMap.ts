import assert from 'assert';

class ScalarMap {
  private arr: Float32Array;
  private readonly xsize: number;
  private readonly ysize: number;

  constructor(xsize: number, ysize: number, fn?: (x: number, y: number) => number) {
    this.arr = new Float32Array(xsize * ysize);
    this.xsize = xsize;
    this.ysize = ysize;
    if (!!fn) {
      for (let y = 0; y < ysize; y++) {
        for (let x = 0; x < xsize; x++) {
          this.arr[x + y * ysize] = fn(x, y);
        }
      }
    }
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
