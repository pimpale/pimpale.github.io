import React from "react";
import { createShader, createProgram, createTexture, updateTextureFromCanvas, createR32FTexture, createRG32FTexture, overwriteR32FTexture, overwriteRG32FTexture } from '../utils/webgl';
import { clamp } from '../utils/math';
import { genPlane } from '../utils/uvplane';
import { TrackballCamera, } from '../utils/camera';
import polmap from '../assets/timezonespace/polmap.geo.json';
import tzmap from '../assets/timezonespace/tzmap.geo.json';
import { colorScheme } from "../utils/colorscheme";
import { FeatureCollection, Position } from "geojson";

type TimezoneDemoProps = {
  style?: React.CSSProperties,
  className?: string
  xsize: number
  ysize: number
  spheresize: number
}

const sphere_vs = `#version 300 es
#define PI 3.1415926538

in vec2 a_position;
out vec2 v_texCoord;

const float u_radius = 0.5;

uniform float u_phiAlpha;
uniform float u_thetaAlpha;
uniform float u_lerpAlpha;

uniform mat4 u_worldViewProjection;


void main() {
   float theta = (a_position.x-1.0) * u_thetaAlpha * 2.0 * PI;
   float phi = a_position.y * u_phiAlpha * PI;

   v_texCoord = a_position;

   vec3 oldpos = vec3(
       (a_position.x - 0.5), 
       -(a_position.y - 0.5), 
       0.0
   );
   vec3 newpos = vec3(
       u_radius * cos(theta) * sin(phi),
       u_radius * sin(theta) * sin(phi),
       u_radius * cos(phi)
    );

   vec3 lerpedPos = mix(oldpos, newpos, u_lerpAlpha);

   gl_Position = u_worldViewProjection * vec4(lerpedPos, 1.0);
}
`;

const sphere_fs = `#version 300 es
precision highp float;
precision highp sampler2D;

// the rendered texture
uniform sampler2D u_render_tex;

in vec2 v_texCoord;

out vec4 v_outColor;

void main() {
  // color: 0xEBDBB2,
  // v_outColor = vec4(0.922,0.859,0.698, 1.0);
  v_outColor = texture(u_render_tex, vec2(v_texCoord.x, v_texCoord.y));
}
`;

const xn = 30;
const yn = 30
const sphereVertexes = genPlane(xn, yn);

type TimezoneDemoState = {}

class TimezoneDemo extends React.Component<TimezoneDemoProps, TimezoneDemoState> {

  // this is the ref to the time zone canvas
  private canvas = React.createRef<HTMLCanvasElement>();

  // this is the ref we use to select what kind of background we display
  // political
  // timezone
  private viewSelect = React.createRef<HTMLSelectElement>();

  private renderMultiplier!: WebGLUniformLocation;
  private renderOffset!: WebGLUniformLocation;

  // The index of the scalar texture we're using as a source
  private scalarIndex = 0;

  // the index of the vel texture we're using as a source
  private velIndex = 0;

  // the index of the pressure texture we're using as a source
  private pressureIndex = 0;

  // whether we need to reset on the next frame
  private needsScalarReset = true;
  private needsVelocityReset = true;

  private requestID!: number;


  // this is the ref we use to monitor circularization
  private spherenessRange = React.createRef<HTMLInputElement>();

  private thetaRange = React.createRef<HTMLInputElement>();
  private phiRange = React.createRef<HTMLInputElement>();
  private lerpRange = React.createRef<HTMLInputElement>();

  // this is the ref to the canvas
  private sphereCanvas = React.createRef<HTMLCanvasElement>();
  private sphereGl!: WebGL2RenderingContext;

  private camera!: TrackballCamera;

  private sphereTexture!: WebGLTexture;

  private sphereWorldViewProjectionLoc!: WebGLUniformLocation;
  private sphereThetaAlpha!: WebGLUniformLocation;
  private spherePhiAlpha!: WebGLUniformLocation;
  private sphereLerpAlpha!: WebGLUniformLocation;

  constructor(props: TimezoneDemoProps) {
    super(props);
  }

  componentDidMount() {

    {
      // init camera
      this.camera = new TrackballCamera(this.sphereCanvas.current!, {});

      // get webgl
      this.sphereGl = this.sphereCanvas.current!.getContext('webgl2', { premultipliedAlpha: false })!;
      this.sphereGl.enable(this.sphereGl.DEPTH_TEST);

      // create texture
      this.sphereTexture = createTexture(this.sphereGl, this.props.spheresize, this.props.spheresize)!;

      const program = createProgram(
        this.sphereGl,
        [
          createShader(this.sphereGl, this.sphereGl.VERTEX_SHADER, sphere_vs),
          createShader(this.sphereGl, this.sphereGl.FRAGMENT_SHADER, sphere_fs),
        ]
      )!;

      const positionLoc = this.sphereGl.getAttribLocation(program, 'a_position');
      const renderTexLoc = this.sphereGl.getUniformLocation(program, "u_render_tex");
      this.sphereThetaAlpha = this.sphereGl.getUniformLocation(program, "u_thetaAlpha")!;
      this.spherePhiAlpha = this.sphereGl.getUniformLocation(program, "u_phiAlpha")!;
      this.sphereLerpAlpha = this.sphereGl.getUniformLocation(program, "u_lerpAlpha")!;

      this.sphereWorldViewProjectionLoc = this.sphereGl.getUniformLocation(program, "u_worldViewProjection")!;

      const buffer = this.sphereGl.createBuffer();
      this.sphereGl.bindBuffer(this.sphereGl.ARRAY_BUFFER, buffer);
      this.sphereGl.bufferData(
        this.sphereGl.ARRAY_BUFFER,
        new Float32Array(sphereVertexes.flatMap(x => ([x[0], x[1]]))),
        this.sphereGl.STATIC_DRAW
      );
      // setup our attributes to tell WebGL how to pull
      // the data from the buffer above to the position attribute
      this.sphereGl.enableVertexAttribArray(positionLoc);
      this.sphereGl.vertexAttribPointer(
        positionLoc,
        2,                   // size (num components)
        this.sphereGl.FLOAT,  // type of data in buffer
        false,          // normalize
        0,              // stride (0 = auto)
        0,              // offset
      );

      this.sphereGl.useProgram(program);

      // set defaults
      this.sphereGl.uniform1f(this.sphereThetaAlpha, 0.0);
      this.sphereGl.uniform1f(this.spherePhiAlpha, 0.0);
      this.sphereGl.uniform1f(this.sphereLerpAlpha, 0.0);

      // Tell the shader to get the render texture from texture unit 0
      this.sphereGl.uniform1i(renderTexLoc, 0);
    }

    this.spherenessRange.current!.addEventListener('input', this.handleSphereChange);
    this.thetaRange.current!.addEventListener('input', this.handleCircularityChange);
    this.phiRange.current!.addEventListener('input', this.handleCircularityChange);
    this.lerpRange.current!.addEventListener('input', this.handleCircularityChange);

    //this.updateCanvas(polmap as GeoJsonObject);
    this.updateCanvas(tzmap as FeatureCollection);
    // start animation loop
    this.animationLoop();
  }


  handleSphereChange = () => {
    const spherenessAlpha = this.spherenessRange.current!.valueAsNumber;

    this.thetaRange.current!.valueAsNumber = spherenessAlpha;
    this.phiRange.current!.valueAsNumber = spherenessAlpha;
    this.lerpRange.current!.valueAsNumber = Math.min(spherenessAlpha * 1.5, 1);
    //now continue
    this.handleCircularityChange();
  }


  handleCircularityChange = () => {
    // how much to lerp towards circle
    const thetaAlpha = this.thetaRange.current!.valueAsNumber;
    const phiAlpha = this.phiRange.current!.valueAsNumber;
    const lerpAlpha = this.lerpRange.current!.valueAsNumber;

    this.sphereGl.uniform1f(this.sphereThetaAlpha, thetaAlpha);
    this.sphereGl.uniform1f(this.spherePhiAlpha, phiAlpha);
    this.sphereGl.uniform1f(this.sphereLerpAlpha, lerpAlpha);
  }

  getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    const rect = canvas.getBoundingClientRect(); // abs. size of element
    const scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for X
    const scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }

  componentWillUnmount() {
    // remove listeners on thing
    this.spherenessRange.current!.removeEventListener('input', this.handleSphereChange);
    this.thetaRange.current!.removeEventListener('input', this.handleCircularityChange);
    this.phiRange.current!.removeEventListener('input', this.handleCircularityChange);
    this.lerpRange.current!.removeEventListener('input', this.handleCircularityChange);

    // stop animation loop
    window.cancelAnimationFrame(this.requestID!);

    this.camera.cleanup();
  }

  updateCanvas = (map: FeatureCollection) => {
    const canvas = this.canvas.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = `#${colorScheme.blue}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const lngToCanv = (lng: number) => (lng / 360 + 0.5) * this.props.xsize;
    const latToCanv = (lat: number) => (-lat / 180 + 0.5) * this.props.ysize;

    const colorVals = Object.values(colorScheme);

    ctx.fillStyle = `#${colorScheme.green}`;
    ctx.strokeStyle = "white";

    const drawPath = (coords: Position[]) => {
      const region = new Path2D();
      region.moveTo(lngToCanv(coords[0][0]), latToCanv(coords[0][1]));
      for (const [lng, lat] of coords) {
        region.lineTo(lngToCanv(lng), latToCanv(lat));
      }
      region.closePath();
      ctx.stroke(region);
      ctx.fill(region, "evenodd");
    }

    for (const country of map.features) {
      if (country.geometry === null) {
        continue;
      }
      if (country.geometry.type === 'Polygon') {
        const coords = country.geometry.coordinates;
        drawPath(coords[0]);
      } else if (country.geometry.type === 'MultiPolygon') {
        for (const coords of country.geometry.coordinates) {
          drawPath(coords[0]);
        }
      }
    }
  }

  animationLoop = () => {
    this.requestID = window.requestAnimationFrame(this.animationLoop);
    this.camera.update();

    {
      // set uniform
      const worldViewProjectionMat = this.camera.getTrackballCameraMatrix(this.props.spheresize, this.props.spheresize);
      this.sphereGl.uniformMatrix4fv(this.sphereWorldViewProjectionLoc, false, worldViewProjectionMat);

      // update the texture
      updateTextureFromCanvas(this.sphereGl, this.sphereTexture, this.canvas.current!);

      // bind the newly updated texture to texture unit 0
      this.sphereGl.activeTexture(this.sphereGl.TEXTURE0);
      this.sphereGl.bindTexture(this.sphereGl.TEXTURE_2D, this.sphereTexture);

      // settings
      this.sphereGl.enable(this.sphereGl.BLEND);
      this.sphereGl.blendFunc(this.sphereGl.SRC_ALPHA, this.sphereGl.ONE_MINUS_SRC_ALPHA);

      // draw triangles
      this.sphereGl.drawArrays(this.sphereGl.TRIANGLES, 0, sphereVertexes.length);
    }


  }

  render() {
    return <div style={this.props.style} className={this.props.className}>
      <div className="row">
        <div className="col-md-8 d-flex">
          <div>
            <canvas
              className="border border-dark mx-3 my-3"
              ref={this.canvas}
              width={this.props.xsize}
              height={this.props.ysize}
            />
            <canvas
              className="border border-dark mx-3 my-3"
              ref={this.sphereCanvas}
              width={this.props.spheresize}
              height={this.props.spheresize}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="border border-dark p-3 m-3">
            <div className="form-group mb-3">
              <label className="form-label">View Data</label>
              <select className="form-select" defaultValue={"SCALAR"} ref={this.viewSelect}>
                <option value="SCALAR">Time Zones</option>
                <option value="PRESSURE">Political Map</option>
                <option value="DIVERGENCE">Continents</option>
              </select>
            </div>
          </div>

          <div className="border border-dark p-3 m-3">
            <div className="form-group mb-3">
              <label className="form-label">Sphereness</label>
              <input type="range" className="form-range" min="0" max="1" step="0.05" defaultValue="0" ref={this.spherenessRange} />
            </div>

            <div className="form-group mb-3">
              <details>
                <summary>Advanced Sphere Controls</summary>
                <div className="mx-auto d-block flex-grow-1 ">
                  <label className="form-label">Join Major</label>
                  <input type="range" className="form-range" min="0" max="1" step="0.05" defaultValue="0" ref={this.thetaRange} />
                </div>
                <div className="mx-auto d-block flex-grow-1 ">
                  <label className="form-label">Join Minor</label>
                  <input type="range" className="form-range" min="0" max="1" step="0.05" defaultValue="0" ref={this.phiRange} />
                </div>
                <div className="mx-auto d-block flex-grow-1 ">
                  <label className="form-label">Alpha</label>
                  <input type="range" className="form-range" min="0" max="1" step="0.05" defaultValue="0" ref={this.lerpRange} />
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default TimezoneDemo;
