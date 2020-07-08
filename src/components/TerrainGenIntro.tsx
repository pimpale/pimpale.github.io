import React from 'react';

import { makeNoise2D } from 'open-simplex-noise';
import ShortMap from '../ShortMap';



function createMap(xsize: number, ysize: number, seed: number) {
  // mountain noise used for mountain ranges, etc
  const mscale = 2 << 7;
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
  let dest = new ShortMap(xsize, ysize);

  for (let x = 0; x < xsize; x++) {
    for (let y = 0; y < ysize; y++) {
      // makes mountain-ish noise
      const mv = Math.abs(1 - mnoise(x / mscale, y / mscale));

      // makes the general continent shaped noise
      const cv = cnoise(x / cscale, y / cscale);

      // now we construct the random noise
      const rv = rws.reduce(
          // sum up the weighted scores
          (wsum: number, [scale, weight]: number[]) => wsum + rnoise(x / scale, y / scale) * weight, 0
        ) / rws.reduce(
          // divide by the total weight to produce the average
          (totalweight: number, [, weight]: number[]) => totalweight + weight, 0
        );

      const result = Math.pow(0.2*mv + 0.4*rv + 0.4*cv, 4);
      dest.setv(x, y, Math.max(Math.min(result, 1), 0));
    }
  }

  return dest;
}


interface TerrainGenIntroProps {
  width: number,
  height: number,
}

interface TerrainGenIntroState {
  smap: ShortMap;
  tickCount: number
}

class TerrainGenIntro extends React.Component<TerrainGenIntroProps, TerrainGenIntroState>{

  constructor(props: TerrainGenIntroProps) {
    super(props);
    const {width, height} = props;
    this.paint = this.paint.bind(this);
    this.tick = this.tick.bind(this);
    this.state = {
      smap: createMap(width, height, 1),
      tickCount: 0,
    };
  }

  private displayCanvas = React.createRef<HTMLCanvasElement>();

  componentDidUpdate() {
    this.paint();
  }

  paintContext(ctx: CanvasRenderingContext2D, hmap:ShortMap, othresh:number) {
    const { width, height } = hmap.dims();
    const imageData = ctx.createImageData(width, height);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = (x + y * width) * 4;
        const value = hmap.getv(x,y) * 255;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  tick() {
    const tickCount = this.state.tickCount;
    this.setState({ tickCount });
    requestAnimationFrame(this.tick);
  }

  paint() {
    const maybeCanvas = this.displayCanvas.current;
    if (maybeCanvas != null) {
      const maybeContext = maybeCanvas.getContext("2d");
      if (maybeContext != null) {
        const { smap } = this.state;
        this.paintContext(maybeContext, smap);
      }
    }
  }


  componentDidMount() {
    requestAnimationFrame(this.tick);
  }

  reloadClickHandler = (event: React.MouseEvent) => {
    this.setState({
      smap: createMap(500, 500, Date.now()),
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
