import React from 'react';
import assert from 'assert';

import { makeNoise2D, Noise2D } from 'open-simplex-noise';
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

function elevationFunction(x: number, y: number, noise: Noise2D) {
  // mountain noise used for mountain ranges, etc
  const mscale = 2 << 7;
  // base noise used for the general shape of the continent
  const cscale = 2 << 7;
  // more random noise
  const rws = [
    [2 << 6, 17],
    [2 << 4, 15],
    [2 << 3, 13],
    [2 << 2, 10],
    [2 << 1, 7],
    [2 << 0, 5],
  ];

  const coff = 0xAAAA;
  const roff = 0xBBBB;
  const moff = 0xFFFF;

  const mv = Math.pow(1 - Math.abs(noise(x / mscale + moff, y / mscale + moff)), 3);

  // makes the general continent shaped noise
  const cv = noise(x / cscale + coff, y / cscale + coff) + 0.5;

  // now we construct the random noise
  const rv = rws.reduce(
    // sum up the weighted scores
    (wsum: number, [scale, weight]: number[]) => wsum + noise(x / scale + roff, y / scale + roff) * weight, 0
  ) / rws.reduce(
    // divide by the total weight to produce the average
    (totalweight: number, [, weight]: number[]) => totalweight + weight, 0
  ) + 0.5;

  return Math.pow(0.35 * mv + 0.35 * cv + 0.3 * rv, 4);
}

function createElevationMap(xsize: number, ysize: number, seed: number) {

  const noise = makeNoise2D(seed);

  // where results will be written to, (0.0 -> 1.0)
  let dest = new ScalarMap(xsize, ysize);

  for (let x = 0; x < xsize; x++) {
    for (let y = 0; y < ysize; y++) {
      dest.setv(x, y, Math.max(Math.min(elevationFunction(x, y, noise), 1)));
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
  return <ImageDataRenderer
    data={thresholdHeightMap(props.heightmap, 0, {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    })}
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
      .filter((p) => p.x > 0 && p.x < width && p.y > 0 && p.y < height && p.age < 100)
      .concat(
        // Add more particles
        [...Array<VectorMapDisplayParticle>(5)]
          .map(function(): VectorMapDisplayParticle {
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
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        ndata.setv(x, y, this.state.alphaData.getv(x, y) / 1.1);
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
    const { width, height } = this.props.base;
    ctx.putImageData(this.props.base, 0, 0);
    let final = new ImageData(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const bindex = (width * y + x) * 4;
        final.data[bindex + 0] = this.props.base.data[bindex + 0];
        final.data[bindex + 1] = this.props.base.data[bindex + 1] + this.state.alphaData.getv(x, y) * 255;
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

// temperature calculated in celsius
// Affected by elevation and latitude
function createTemperatureMap(elevation: ScalarMap, seed: number) {
  const random = makeNoise2D(seed);
  const { width, height } = elevation.dims();
  const tmap = new ScalarMap(width, height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

    }
  }

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
  // the initial heightmap that will be modified
  initialElevation: ScalarMap | null,
  airCurrents: VectorMap | null,
  rmap: ScalarMap | null,
  histtemp: ScalarMap | null,
  currtemp: ScalarMap | null,
}

class TerrainGenIntro extends React.Component<TerrainGenIntroProps, TerrainGenIntroState>{

  constructor(props: TerrainGenIntroProps) {
    super(props);
    this.state = {
      state: TerrainGenIntroPhase.Initial,
      initialElevation: null,
      airCurrents: null,
      rmap: null,
      histtemp: null,
      currtemp: null,
    };
  }


  nextPhaseClick = (event: React.MouseEvent) => {

    event.preventDefault();
    let nextphase;
    switch (this.state.state) {
      case TerrainGenIntroPhase.Initial: {
        this.setState({
          initialElevation: createElevationMap(this.props.width, this.props.height, Date.now())
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
          airCurrents: createCurlNoise(this.props.width, this.props.height, Date.now())
        });
        nextphase = TerrainGenIntroPhase.WindMapGen;
        break;
      }
      case TerrainGenIntroPhase.WindMapGen: {
        nextphase = TerrainGenIntroPhase.Initial;
        break;
      }
    }
    this.setState({
      state: nextphase,
    });
  }

  render() {
    let { width, height } = this.props;
    switch (this.state.state) {
      case TerrainGenIntroPhase.Initial: {
        return <div className="border border-light"
          style={{
            width: width,
            height: height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <button type="button" className="btn btn-light" onClick={this.nextPhaseClick}>
            Generate Terrain
           </button>
        </div>
      }
      case TerrainGenIntroPhase.HeightMapGen: {
        assert(this.state.initialElevation != null);
        return <>
          <HeightMap heightmap={this.state.initialElevation} />
          <div>
            <button type="button" className="btn btn-light" onClick={this.nextPhaseClick}>
              Next Phase
            </button>
          </div>
        </>
      }
      case TerrainGenIntroPhase.OceanGen: {
        assert(this.state.initialElevation != null);
        return <>
          <OceanHeightMap heightmap={this.state.initialElevation} sealevel={0.2} />
          <div>
            <button type="button" className="btn btn-light" onClick={this.nextPhaseClick}>
              Next Phase
            </button>
          </div>
        </>
      }
      case TerrainGenIntroPhase.WindMapGen: {
        assert(this.state.initialElevation != null);
        assert(this.state.airCurrents != null);
        return <>
          <WindOceanMap
            windmap={this.state.airCurrents}
            heightmap={this.state.initialElevation}
          />
          <div>
            <button type="button" className="btn btn-light" onClick={this.nextPhaseClick}>
              Reset
            </button>
          </div>
        </>
      }
    }


  }
}


export default TerrainGenIntro;
