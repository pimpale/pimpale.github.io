import React from 'react';
import assert from 'assert';

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

      const result = Math.pow(0.35 * mv + 0.35 * cv + 0.3 * rv, 4);
      dest.setv(x, y, Math.max(Math.min(result, 1), 0));
    }
  }

  return dest;
}


// Object displaying Scalar HeightMap

interface ScalarMapThresholdProps {
  heightmap: ScalarMap,
  thresh: number,
  threshcol: {
    r: number,
    g: number,
    b: number,
    a: number,
  }
}

class ScalarMapThreshold extends React.Component<ScalarMapThresholdProps> {

  private displayCanvas = React.createRef<HTMLCanvasElement>();

  constructor(props: ScalarMapThresholdProps) {
    super(props);
    this.paint = this.paint.bind(this);
  }

  componentDidMount() {
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  paintHeightMap(ctx: CanvasRenderingContext2D) {
    const hmap = this.props.heightmap;
    const { width, height } = hmap.dims();
    const imageData = ctx.createImageData(width, height);


    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = (x + y * width) * 4;
        const value = hmap.getv(x, y);
        if (value > this.props.thresh) {
          imageData.data[i + 0] = value * 255;
          imageData.data[i + 1] = value * 255;
          imageData.data[i + 2] = value * 255;
          imageData.data[i + 3] = 255;
        } else {
          imageData.data[i + 0] = this.props.threshcol.r;
          imageData.data[i + 1] = this.props.threshcol.g;
          imageData.data[i + 2] = this.props.threshcol.b;
          imageData.data[i + 3] = this.props.threshcol.a;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  paint() {
    console.log('FOOOO');
    const maybeCanvas = this.displayCanvas.current;
    if (maybeCanvas != null) {
      const maybeContext = maybeCanvas.getContext("2d");
      if (maybeContext != null) {
        this.paintHeightMap(maybeContext);
      }
    }
  }

  render() {
    const { width, height } = this.props.heightmap.dims();
    return (
      <canvas className="border border-light"
        ref={this.displayCanvas}
        width={width}
        height={height}
      />
    );
  }
}


// when it has an ocean
interface OceanHeightMapProps {
  sealevel: number
  heightmap: ScalarMap
}

function OceanHeightMap(props: OceanHeightMapProps) {
  return <ScalarMapThreshold
    heightmap={props.heightmap}
    thresh={props.sealevel}
    threshcol={{
      // gruvbox dark blue
      r: 0x07,
      g: 0x66,
      b: 0x78,
      a: 0xFF,
    }}
  />
}


// When it is free of an ocean
interface HeightMapProps {
  heightmap: ScalarMap
}

function HeightMap(props: HeightMapProps) {
  return <OceanHeightMap
    heightmap={props.heightmap}
    sealevel={0.0}
  />
}


enum TerrainGenIntroPhase {
  Initial,
  HeightMapGen,
  OceanGen,
  WindMapGen,
}

interface TerrainGenIntroProps {
  width: number,
  height: number,
}

interface TerrainGenIntroState {
  state: TerrainGenIntroPhase,
  hmap: ScalarMap | null,
  wmap: VectorMap | null,
  rmap: ScalarMap | null,
}


class TerrainGenIntro extends React.Component<TerrainGenIntroProps, TerrainGenIntroState>{

  constructor(props: TerrainGenIntroProps) {
    super(props);
    this.state = {
      state: TerrainGenIntroPhase.Initial,
      hmap: null,
      wmap: null,
      rmap: null,
    };
  }


  nextPhaseClick = (event: React.MouseEvent) => {

    event.preventDefault();
    let nextphase;
    switch (this.state.state) {
      case TerrainGenIntroPhase.Initial: {
        this.setState({
          hmap: createMap(this.props.width, this.props.height, Date.now())
        });
        nextphase = TerrainGenIntroPhase.HeightMapGen;
        break;
      }
      case TerrainGenIntroPhase.HeightMapGen: {
        nextphase = TerrainGenIntroPhase.OceanGen;
        break;
      }
      case TerrainGenIntroPhase.OceanGen: {
        nextphase = TerrainGenIntroPhase.WindMapGen;
        break;
      }
      case TerrainGenIntroPhase.WindMapGen: {
        nextphase = TerrainGenIntroPhase.WindMapGen;
        break;
      }
    }
    this.setState({
      state: nextphase,
    });
  }

  render() {
    let { width, height } = this.props;
    let display;
    switch (this.state.state) {
      case TerrainGenIntroPhase.Initial: {
        display = <div className="border border-light"
          style={{
            width: width,
            height: height
          }} />;
        break;
      }
      case TerrainGenIntroPhase.HeightMapGen: {
        if (this.state.hmap != null) {
          display = <HeightMap heightmap={this.state.hmap} />;
        } else {
          assert(this.state.hmap != null);
        }
        break;
      }
      case TerrainGenIntroPhase.OceanGen: {
        if (this.state.hmap != null) {
          display = <OceanHeightMap heightmap={this.state.hmap} sealevel={0.3} />;
        } else {
          assert(this.state.hmap != null);
        }
        break;
      }
      case TerrainGenIntroPhase.WindMapGen: { display = <div />; break; }
    }


    return <>
      {display}
      <br />
      <button type="button" className="btn btn-light" onClick={this.nextPhaseClick}>
        Next Phase
      </button>
    </>
  }
}


export default TerrainGenIntro;
