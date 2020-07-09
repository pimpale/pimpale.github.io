import React from 'react';
import assert from 'assert';

import { makeNoise2D } from 'open-simplex-noise';
import ScalarMap from '../ScalarMap';
import VectorMap from '../VectorMap';

const EPSILON = 0.0001;
function createCurlNoise(xsize: number, ysize: number, seed: number) {
  const noise = makeNoise2D(seed);
  const scale = 2 << 8;

  function sampleCurlNoise(x: number, y: number) {
    //Find rate of change in X direction
    const dxs1 = noise(x / scale + EPSILON, y / scale);
    const dxs2 = noise(x / scale - EPSILON, y / scale);
    //Average to find approximate derivative
    const dx = (dxs1 - dxs2) / (2 * EPSILON);
    //Find rate of change in Y direction
    const dys1 = noise(x / scale, y / scale + EPSILON);
    const dys2 = noise(x / scale, y / scale - EPSILON);
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

type Color = {
  r: number,
  g: number,
  b: number,
  a: number
}


function thresholdHeightMap(hmap: ScalarMap, thresh: number, threshcol: Color) {
  const { width, height } = hmap.dims();
  const imageData = new ImageData(width, height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const i = (x + y * width) * 4;
      const value = hmap.getv(x, y);
      if (value > thresh) {
        imageData.data[i + 0] = value * 255;
        imageData.data[i + 1] = value * 255;
        imageData.data[i + 2] = value * 255;
        imageData.data[i + 3] = 255;
      } else {
        imageData.data[i + 0] = threshcol.r;
        imageData.data[i + 1] = threshcol.g;
        imageData.data[i + 2] = threshcol.b;
        imageData.data[i + 3] = threshcol.a;
      }
    }
  }
  return imageData;
}


// Object displaying some image data

interface ImageDataRendererProps {
  data: ImageData,
}

class ImageDataRenderer extends React.Component<ImageDataRendererProps> {

  private displayCanvas = React.createRef<HTMLCanvasElement>();

  constructor(props: ImageDataRendererProps) {
    super(props);
    this.paint = this.paint.bind(this);
  }

  componentDidMount() {
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  paint() {
    const canvas = this.displayCanvas.current;
    if (canvas != null) {
      const context = canvas.getContext("2d");
      if (context != null) {
        context.putImageData(this.props.data, 0, 0);
      }
    }
  }

  render() {
    const { width, height } = this.props.data;
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
  return <ImageDataRenderer
    data={thresholdHeightMap(props.heightmap, props.sealevel, {
      // gruvbox dark blue
      r: 0x07,
      g: 0x66,
      b: 0x78,
      a: 0xFF,
    })}
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

interface VectorMapDisplayProps {
  vmap: VectorMap;
}

type VectorMapDisplayParticle = {
  x: number;
  y: number;
  age: number;
}

interface VectorMapDisplayState {
  alphaData: ScalarMap;
  particles: VectorMapDisplayParticle[];
}

interface VectorMapDisplayProps {
  vmap: VectorMap;
  base: ImageData;
}

class VectorMapDisplay extends React.Component<VectorMapDisplayProps, VectorMapDisplayState> {
  private displayCanvas = React.createRef<HTMLCanvasElement>();

  constructor(props: VectorMapDisplayProps) {
    super(props);
    this.paint = this.paint.bind(this);
    this.tick = this.tick.bind(this);
    const { width, height } = props.base;
    this.state = {
      alphaData: new ScalarMap(width, height),
      particles: new Array<VectorMapDisplayParticle>(),
    }
  }

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate() {
    this.paint();
  }

  tick() {
    const { width, height } = this.state.alphaData.dims();
    // update particles
    const nparticles = this.state.particles.map(
      (p) => {
        // move particles
        const dir = this.props.vmap.getv(Math.floor(p.x), Math.floor(p.y));
        return {
          x: p.x + dir[0] * 2,
          y: p.y + dir[1] * 2,
          age: p.age + 1
        }
      })
      // decay particles that are outside boundaries or too old
      .filter((p) => p.x > 0 && p.x < width && p.y > 0 && p.y < height && p.age < 300)
      .concat(
        // Add more particles
        [...Array<VectorMapDisplayParticle>(3)]
          .map(function():VectorMapDisplayParticle {
            return {
              x: Math.random() * width,
              y: Math.random() * height,
              age: 0,
            }
          }
          )
      );

    // regen imagedata
    let ndata = new ScalarMap(width, height);
    for (let x = 0; x < width ; x++) {
      for (let y = 0; y < height; y++) {
        ndata.setv(x, y, this.state.alphaData.getv(x,y) / 1.1);
      }
    }

    console.log(nparticles);

    for (const p of nparticles) {
      ndata.setv(Math.floor(p.x), Math.floor(p.y), 1);
    }


    this.setState({
      alphaData: ndata,
      particles: nparticles
    });
    setTimeout(this.tick, 200);
  }

  paintHeightMap(ctx: CanvasRenderingContext2D) {
    const {width, height} = this.props.base;
    ctx.putImageData(this.props.base, 0, 0);
    let final = new ImageData(width, height);
    for (let x = 0; x < width ; x++) {
      for (let y = 0; y < height; y++) {
          const bindex=(width*y + x) * 4 ;
          final.data[bindex + 0] = this.props.base.data[bindex + 0];
          final.data[bindex + 1] = this.props.base.data[bindex + 1] + this.state.alphaData.getv(x,y)*255;
          final.data[bindex + 2] = this.props.base.data[bindex + 2];
          final.data[bindex + 3] = this.props.base.data[bindex + 3];
      }
    }
    ctx.putImageData(final, 0, 0);
  }

  paint() {
    const maybeCanvas = this.displayCanvas.current;
    if (maybeCanvas != null) {
      const maybeContext = maybeCanvas.getContext("2d");
      if (maybeContext != null) {
        this.paintHeightMap(maybeContext);
      }
    }
  }

  render() {
    const { width, height } = this.props.base;
    return (
      <canvas className="border border-light"
        ref={this.displayCanvas}
        width={width}
        height={height}
      />
    );
  }
}

interface WindOceanMapProps {
  heightmap: ScalarMap,
  windmap: VectorMap
}

function WindOceanMap(props: WindOceanMapProps) {
  return <VectorMapDisplay
    vmap={props.windmap}
    base={thresholdHeightMap(props.heightmap, 0.2, {
      // gruvbox dark blue
      r: 0x07,
      g: 0x66,
      b: 0x78,
      a: 0xFF,
    })}
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
        this.setState({
          wmap: createCurlNoise(this.props.width, this.props.height, Date.now())
        });
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
        display = <canvas className="border border-light"
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
          display = <OceanHeightMap heightmap={this.state.hmap} sealevel={0.2} />;
        } else {
          assert(this.state.hmap != null);
        }
        break;
      }
      case TerrainGenIntroPhase.WindMapGen: {
        if (this.state.wmap != null && this.state.hmap != null) {
          display = <WindOceanMap
            windmap={this.state.wmap}
            heightmap={this.state.hmap}
          />
          break;
        } else {
          assert(this.state.hmap != null);
          assert(this.state.wmap != null);
        }
      }
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
