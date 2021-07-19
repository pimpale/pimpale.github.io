import React from 'react';
import assert from 'assert';

import { makeNoise2D, makeNoise4D } from 'open-simplex-noise';
import ScalarMap from '../ScalarMap';
import VectorMap from '../VectorMap';


import ImageDataDisplay from '../components/ImageDataDisplay';
import VectorMapDisplay from '../components/VectorMapDisplay';

function makeTorusNoise2D(scale: number, seed: number) {
  const noise4 = makeNoise4D(seed);
  return (theta: number, phi: number) => noise4(
    Math.cos(theta * Math.PI * 2) / scale, Math.sin(theta * Math.PI * 2) / scale,
    Math.cos(phi * Math.PI * 2) / scale, Math.sin(phi * Math.PI * 2) / scale
  );
}

function createCurlNoise(xsize: number, ysize: number, seed: number) {
  function sampleCurlNoise(noise: (x: number, y: number) => number, x: number, y: number) {
    const EPSILON = 0.0001;
    //Find rate of change in X direction
    const dxs1 = noise(x + EPSILON, y);
    const dxs2 = noise(x - EPSILON, y);
    //Average to find approximate derivative
    const dx = (dxs1 - dxs2) / (2 * EPSILON);
    //Find rate of change in Y direction
    const dys1 = noise(x, y + EPSILON);
    const dys2 = noise(x, y - EPSILON);
    //Average to find approximate derivative
    const dy = (dys1 - dys2) / (2 * EPSILON);
    //Curl
    return [dy, -dx];
  }

  let ret = new VectorMap(xsize, ysize);

  const noise = makeTorusNoise2D(3, seed);

  // find rate of change in X direction by averaging together 2 samples
  for (let x = 0; x < xsize; x++) {
    for (let y = 0; y < ysize; y++) {
      ret.setv(x, y, sampleCurlNoise(noise, x / xsize, y / ysize));
    }
  }
  return ret;
}


function createElevationMap(xsize: number, ysize: number, seed: number) {
  function createFractalNoise(
    x: number,
    y: number,
    noises: {
      noise: (x: number, y: number) => number,
      weight: number
    }[]
  ) {
    let sum = 0;
    for (const { noise, weight } of noises) {
      sum += noise(x, y) * weight;
    }
    return sum;
  }

  const octaves = [
    { scale: 1.20, weight: 70 },
    { scale: 0.64, weight: 19 },
    { scale: 0.32, weight: 15 },
    { scale: 0.16, weight: 13 },
    { scale: 0.08, weight: 8 },
    { scale: 0.04, weight: 5 },
    { scale: 0.03, weight: 3 },
  ];

  const weightsum = octaves.map(o => o.weight).reduce((a, b) => a + b);

  const rnoises = octaves.map(({ scale, weight }, i) => ({
    noise: makeTorusNoise2D(scale, seed + i),
    weight: weight / weightsum
  }));


  function createMountainNoise(
    x: number,
    y: number,
    noise: (x: number, y: number) => number,
  ) {
    return Math.pow(1 - Math.abs(noise(x, y)), 3);
  }

  const mnoise = makeTorusNoise2D(3, seed - 1);

  const clamp = (x: number) => Math.max(Math.min(x, 1), 0)

  // where results will be written to, (0.0 -> 1.0)
  let dest = new ScalarMap(xsize, ysize);

  for (let x = 0; x < xsize; x++) {
    for (let y = 0; y < ysize; y++) {
      const rval = createFractalNoise(x / xsize, y / ysize, rnoises) + 0.5;

      const mval = createMountainNoise(x / xsize, y / ysize, mnoise) + 0.5;

      const val = Math.pow(mval * 0.3 + rval * 0.7, 4);
      dest.setv(x, y, clamp(val));
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



// when it has an ocean
interface OceanHeightMapProps {
  sealevel: number
  heightmap: ScalarMap
}

function OceanHeightMap(props: OceanHeightMapProps) {
  return <ImageDataDisplay
    className="border border-dark"
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
  return <ImageDataDisplay

    className="border border-dark"

    data={thresholdHeightMap(props.heightmap, 0, {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    })}
  />
}

interface WindOceanMapProps {
  heightmap: ScalarMap,
  windmap: VectorMap
}

function WindOceanMap(props: WindOceanMapProps) {
  return <VectorMapDisplay
    className="border border-dark"
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
        return <div className="border border-dark"
          style={{
            width: width,
            height: height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <button type="button" className="btn btn-dark" onClick={this.nextPhaseClick}>
            Generate Terrain
          </button>
        </div>
      }
      case TerrainGenIntroPhase.HeightMapGen: {
        assert(this.state.initialElevation != null);
        return <>
          <HeightMap heightmap={this.state.initialElevation} />
          <div>
            <button type="button" className="btn btn-dark" onClick={this.nextPhaseClick}>
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
            <button type="button" className="btn btn-dark" onClick={this.nextPhaseClick}>
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
            <button type="button" className="btn btn-dark" onClick={this.nextPhaseClick}>
              Reset
            </button>
          </div>
        </>
      }
    }
  }
}


export default TerrainGenIntro;
