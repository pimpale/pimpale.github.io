import React from 'react';

import { makeNoise2D } from 'open-simplex-noise';
import ScalarMap from '../ScalarMap';
import VectorMap from '../VectorMap';

const EPSILON = 0.0001;
function createCurlNoise(xsize: number, ysize: number, seed: number) {
  const noise = makeNoise2D(seed);
  const scale = 2 << 10;

  function sampleCurlNoise(x: number, y: number) {
    //Find rate of change in X direction
    const dxs1 = noise((x + EPSILON) / scale, y / scale);
    const dxs2 = noise((x - EPSILON) / scale, y / scale);
    //Average to find approximate derivative
    const dx = (dxs1 - dxs2) / (2 * EPSILON);
    //Find rate of change in Y direction
    const dys1 = noise(x / scale, (y + EPSILON) / scale);
    const dys2 = noise(x / scale, (y - EPSILON) / scale);
    //Average to find approximate derivative
    const dy = (dys1 - dys2) / (2 * EPSILON);
    //Curl
    return [dy, -dx];
  }

  let ret = new VectorMap(xsize, ysize);

  // find rate of change in X direction by averaging together 2 samples
  for (let x = 0; x < xsize; x++) {
    for (let y = 0; y < ysize; y++) {
      ret.setv(x, y, sampleCurlNoise(x, y));
    }
  }
  return ret;
}

function createMap(xsize: number, ysize: number, seed: number) {
  // mountain noise used for mountain ranges, etc
  const mscale = 2 << 8;
  const mnoise = makeNoise2D(seed + 0);
  // base noise used for the general shape of the continent
  const cscale = 2 << 8;
  const cnoise = makeNoise2D(seed + 1);
  // more random noise
  const rnoise = makeNoise2D(seed + 2);
  const rws = [
    [2 << 7, 17],
    [2 << 6, 15],
    [2 << 5, 13],
    [2 << 4, 10],
    [2 << 3, 7],
    [2 << 2, 5],
    [2 << 1, 3],
  ];

  // where results will be written to, (0.0 -> 1.0)
  let dest = new ScalarMap(xsize, ysize);

  for (let x = 0; x < xsize; x++) {
    for (let y = 0; y < ysize; y++) {
      // makes mountain-ish noise
      const mv = Math.pow(1 - Math.abs(mnoise(x / mscale, y / mscale)), 3);

      // makes the general continent shaped noise
      const cv = cnoise(x / cscale, y / cscale) + 0.5;

      // now we construct the random noise
      const rv = rws.reduce(
        // sum up the weighted scores
        (wsum: number, [scale, weight]: number[]) => wsum + rnoise(x / scale, y / scale) * weight, 0
      ) / rws.reduce(
        // divide by the total weight to produce the average
        (totalweight: number, [, weight]: number[]) => totalweight + weight, 0
      ) + 0.5;

      const result = Math.pow(0.35 * mv + 0.4 * cv + 0.3 * rv, 4);
      dest.setv(x, y, Math.max(Math.min(result, 1), 0));
    }
  }

  return dest;
}

enum TerrainGenState {
  HeightMapGen,
  OceanGen,
  WindMapGen,

}

interface TerrainGenIntroProps {
  width: number,
  height: number,
  sealevel: number,
}

interface TerrainGenIntroState {

  hmap: ScalarMap,
  wmap: VectorMap | null,
  rmap: ScalarMap | null,
}


class TerrainGenIntro extends React.Component<TerrainGenIntroProps, TerrainGenIntroState>{

  constructor(props: TerrainGenIntroProps) {
    super(props);
    const { width, height } = props;
    this.paint = this.paint.bind(this);
    this.tick = this.tick.bind(this);
    this.state = {
      hmap: createMap(width, height, 0),
      wmap: null,
      rmap: null,
      renderFunc: this.paintHeightMap,
    };
  }

  private displayCanvas = React.createRef<HTMLCanvasElement>();

  componentDidUpdate() {
    this.paint();
  }

  paintHeightMap(ctx: CanvasRenderingContext2D) {
    const hmap = this.state.hmap;
    const { width, height } = hmap.dims();
    const imageData = ctx.createImageData(width, height);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = (x + y * width) * 4;
        const value = hmap.getv(x, y) * 255;
        imageData.data[i + 0] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  paintOceanHeightMap(ctx: CanvasRenderingContext2D, hmap: ScalarMap) {
    const { width, height } = hmap.dims();
    const imageData = ctx.createImageData(width, height);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = (x + y * width) * 4;
        const value = hmap.getv(x, y);
        if (value > 0.3) {
          imageData.data[i + 0] = value * 255;
          imageData.data[i + 1] = value * 255;
          imageData.data[i + 2] = value * 255;
          imageData.data[i + 3] = 255;
        } else {
          imageData.data[i + 0] = value * 50;
          imageData.data[i + 1] = value * 50;
          imageData.data[i + 2] = value * 50 + 205;
          imageData.data[i + 3] = 255;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  tick() {
    const tickCount = this.state.tickCount;
    this.setState({ tickCount });
    //requestAnimationFrame(this.tick);
  }

  paint() {
    const maybeCanvas = this.displayCanvas.current;
    if (maybeCanvas != null) {
      const maybeContext = maybeCanvas.getContext("2d");
      if (maybeContext != null) {
        const { smap } = this.state;
        this.paintHeightMap(maybeContext, smap);
      }
    }
  }


  componentDidMount() {
    requestAnimationFrame(this.tick);
  }

  reloadClickHandler = (event: React.MouseEvent) => {
    this.setState({
      smap: createMap(this.props.width, this.props.height, Date.now()),
    });
    event.preventDefault();
  }

  render() {
    return <>
      <canvas className="border border-light"
        ref={this.displayCanvas}
        height={this.props.height}
        width={this.props.width}
      />
      <br />
      <button type="button" className="btn btn-light" onClick={this.reloadClickHandler}>
        Reload Animation
      </button>
    </>
  }
}


export default TerrainGenIntro;
