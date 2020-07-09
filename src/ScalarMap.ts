import assert from 'assert';

class ScalarMap {
  private arr: Uint16Array;
  private xsize: number;
  private ysize: number;

  constructor(xsize: number, ysize: number) {
    this.arr = new Uint16Array(xsize * ysize);
    this.xsize = xsize;
    this.ysize = ysize;
  }

  getv(x: number, y: number) {
    assert(x < this.xsize);
    assert(y < this.ysize);
    return this.arr[this.xsize * y + x] / 0xFFFF;
  }

  setv(x: number, y: number, v: number) {
    assert(x < this.xsize);
    assert(y < this.ysize);
    assert(v >= 0 && v <= 1.0);
    this.arr[this.xsize * y + x] = v * 0xFFFF;
  }

  dims() {
    return { width: this.xsize, height: this.ysize };
  }

  derive(callback: (v: number, x: number, y: number) => number) {
    let n = new ScalarMap(this.xsize, this.ysize);
    for (let x = 0; x < this.xsize; x++) {
      for (let y = 0; y < this.ysize; y++) {
        n.setv(x, y, callback(this.getv(x, y), x, y));
      }
    }
    return n;
  }
}

export default ScalarMap;
