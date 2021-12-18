import React from "react";
import { createShader, createProgram, createR32UITexture,  createRG32ITexture,  overwriteR32UITexture , overwriteRG32ITexture } from '../utils/webgl';
import { clamp } from '../utils/math';

type WebGL2FluidAdvectionDemoProps = {
  style?: React.CSSProperties,
  className?: string
  size: number
}

// the vertex shader is used in 2 different programs, it basically is just for translating clip space
const vs = `#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`;

// this fragment shader does the actual work of computation
const diffuse_fs = `#version 300 es
precision highp float;
precision highp usampler2D;
precision highp isampler2D;

// the scalar texture
uniform usampler2D u_scalar_tex;

// the velocity texture
uniform isampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out uvec4 value;

float  textureGood(usampler2D sam, vec2 uv)
{
    vec2 res = vec2(textureSize(sam, 0));
    vec2 st = uv*res - 0.5;

    vec2 iuv = floor( st );
    vec2 fuv = fract( st );

    float a = float(texture( sam, (iuv+vec2(0.5,0.5))/res).r);
    float b = float(texture( sam, (iuv+vec2(1.5,0.5))/res).r);
    float c = float(texture( sam, (iuv+vec2(0.5,1.5))/res).r);
    float d = float(texture( sam, (iuv+vec2(1.5,1.5))/res).r);

    return mix( mix( a, b, fuv.x),
                mix( c, d, fuv.x), fuv.y );
}

void main() {
  ivec2 ivel = texture(u_vel_tex, v_texCoord).rg;
  vec2 vel = vec2(float(ivel.r)/float(0xFFFFFF), float(ivel.g)/float(0xFFFFFF));

  // bilinear interpolate between these three points

  float val = textureGood(u_scalar_tex, v_texCoord+vel);

  value = uvec4(val, 0u, 0u, 0u);
}
`;

// this fragment shader is used to render to the canvas so we can see what's going on
const render_fs = `#version 300 es
precision highp float;
precision highp usampler2D;
precision highp isampler2D;

// the scalar texture
uniform usampler2D u_scalar_tex;

// the velocity texture
uniform isampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 outColor;

const float ARROW_TILE_SIZE = 32.0;

// Computes the center pixel of the tile containing pixel pos
vec2 arrowTileCenterCoord(vec2 pos) {
	return (floor(pos / ARROW_TILE_SIZE) + 0.5) * ARROW_TILE_SIZE;
}

// Computes the signed distance from a line segment
float line(vec2 p, vec2 p1, vec2 p2) {
  vec2 center = (p1 + p2) * 0.5;
  float len = length(p2 - p1);
  vec2 dir = (p2 - p1) / len;
  vec2 rel_p = p - center;
  float dist1 = abs(dot(rel_p, vec2(dir.y, -dir.x)));
  float dist2 = abs(dot(rel_p, dir)) - 0.5*len;
  return max(dist1, dist2);
}

// v = field sampled at arrowTileCenterCoord(p), scaled by the length
// desired in pixels for arrows
// Returns a signed distance from the arrow
float arrow(vec2 p, vec2 v) {
  // Make everything relative to the center, which may be fractional
  p -= arrowTileCenterCoord(p);
    
  float mag_v = length(v), mag_p = length(p);
  
  if (mag_v > 0.0) {
    // Non-zero velocity case
    vec2 dir_v = v / mag_v;
    
    // We can't draw arrows larger than the tile radius, so clamp magnitude.
    // Enforce a minimum length to help see direction
    mag_v = clamp(mag_v, 5.0, ARROW_TILE_SIZE * 0.5);

    // Arrow tip location
    v = dir_v * mag_v;

    // Signed distance from shaft
    float shaft = line(p, v, -v);
    // Signed distance from head
    float head = min(line(p, v, 0.4*v + 0.2*vec2(-v.y, v.x)),
                     line(p, v, 0.4*v + 0.2*vec2(v.y, -v.x)));

    return min(shaft, head);
  } else {
    // Signed distance from the center point
    return mag_p;
  }
}

vec3 inferno(float t) {
    const vec3 c0 = vec3(0.0002189403691192265, 0.001651004631001012, -0.01948089843709184);
    const vec3 c1 = vec3(0.1065134194856116, 0.5639564367884091, 3.932712388889277);
    const vec3 c2 = vec3(11.60249308247187, -3.972853965665698, -15.9423941062914);
    const vec3 c3 = vec3(-41.70399613139459, 17.43639888205313, 44.35414519872813);
    const vec3 c4 = vec3(77.162935699427, -33.40235894210092, -81.80730925738993);
    const vec3 c5 = vec3(-71.31942824499214, 32.62606426397723, 73.20951985803202);
    const vec3 c6 = vec3(25.13112622477341, -12.24266895238567, -23.07032500287172);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}
void main() {

  // both textures are the same size
  vec2 resolution = vec2(textureSize(u_scalar_tex, 0));

  // coordinate in pixels
  vec2 pxCoord = v_texCoord*resolution;

  vec2 tileCenterCoord = arrowTileCenterCoord(pxCoord);

  vec2 vel_vec = vec2(texture(u_vel_tex, tileCenterCoord/resolution))/float(0xFFFFFF);

  float arrow_dist = arrow(pxCoord, vel_vec * ARROW_TILE_SIZE * -5.0);
  vec4 arrow_col = vec4(0, 1.0, 0, clamp(arrow_dist, 0.0, 1.0));

  float scalar_val = float(texture(u_scalar_tex, v_texCoord).r)/float(0xFFFFFF);
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`



// TODO: learn how to handle error cases

type WebGL2FluidAdvectionDemoState = {}

class WebGL2FluidAdvectionDemo extends React.Component<WebGL2FluidAdvectionDemoProps, WebGL2FluidAdvectionDemoState> {

  // this is the ref to the canvas
  private canvas = React.createRef<HTMLCanvasElement>();

  // this is the ref we use to monitor sim speed
  private range = React.createRef<HTMLInputElement>();

  // this is the ref we use to check if we need to reset
  private reset = React.createRef<HTMLButtonElement>();

  // this is the ref we use to choose color
  private drawSelect = React.createRef<HTMLSelectElement>();


  private gl!: WebGL2RenderingContext;

  // the texture that shows scalar density (this is going to be advected)
  private scalarTextures: WebGLTexture[] = [];
  private scalarFramebuffers: WebGLFramebuffer[] = [];

  // the velocity textures represent the velocity field of the fluid
  // it loops around at the edges
  private velTexture!: WebGLTexture;

  private prog_diffuse!: WebGLProgram;
  private prog_render!: WebGLProgram;

  // the frame number we're on
  private frameCount = 0;

  // whether we need to reset on the next frame
  private needsReset = false;

  // if mouse is pressed
  private mouseDown = false;
  private prevMousePos = { x: 0, y: 0 };
  private mousePos = { x: 0, y: 0 };

  private requestID!: number;

  constructor(props: WebGL2FluidAdvectionDemoProps) {
    super(props);
  }

  componentDidMount() {
    // get webgl
    this.gl = this.canvas.current!.getContext('webgl2')!;

    // setup a full canvas clip space quad
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1,
    ]), this.gl.STATIC_DRAW);

    // build the compute program
    {
      // create program
      this.prog_diffuse = createProgram(
        this.gl,
        [
          createShader(this.gl, this.gl.VERTEX_SHADER, vs),
          createShader(this.gl, this.gl.FRAGMENT_SHADER, diffuse_fs),
        ]
      )!;

      const positionLoc = this.gl.getAttribLocation(this.prog_diffuse, 'c_position');
      const scalarTexLoc = this.gl.getUniformLocation(this.prog_diffuse, 'u_scalar_tex');
      const velTexLoc = this.gl.getUniformLocation(this.prog_diffuse, 'u_vel_tex');

      // setup our attributes to tell WebGL how to pull
      // the data from the buffer above to the position attribute
      this.gl.enableVertexAttribArray(positionLoc);
      this.gl.vertexAttribPointer(
        positionLoc,
        2,         // size (num components)
        this.gl.FLOAT,  // type of data in buffer
        false,     // normalize
        0,         // stride (0 = auto)
        0,         // offset
      );

      // create pingpongable textures and frambuffers for the scalar field textures
      for (let i = 0; i < 2; i++) {
        const tex = createR32UITexture(this.gl, this.props.size, this.props.size)!;
        this.scalarTextures.push(tex);

        const fbo = this.gl.createFramebuffer()!;
        // this makes fbo the current active framebuffer
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
        // configure the currently active framebuffer to use te
        this.gl.framebufferTexture2D(
          this.gl.FRAMEBUFFER, // will bind as a framebuffer
          this.gl.COLOR_ATTACHMENT0, // Attaches the texture to the framebuffer's color buffer. 
          this.gl.TEXTURE_2D, // we have a 2d texture
          tex, // the texture to attach
          0 // the mipmap level (we don't want mipmapping, so we set to 0)
        );
        // push framebuffer
        this.scalarFramebuffers.push(fbo);
      }

      // bind uniforms
      this.gl.useProgram(this.prog_diffuse);

      // Tell the shader to get the scalar texture from texture unit 0
      this.gl.uniform1i(scalarTexLoc, 0);

      // create velocity texture
      const data = new Int32Array(this.props.size * this.props.size * 2);
      this.velTexture = createRG32ITexture(this.gl, this.props.size, this.props.size, data)!;

      // Tell the shader to get the velocity texture from texture unit 1
      this.gl.uniform1i(velTexLoc, 1);
    }


    // build the render program
    {
      // create program
      this.prog_render = createProgram(
        this.gl,
        [
          createShader(this.gl, this.gl.VERTEX_SHADER, vs),
          createShader(this.gl, this.gl.FRAGMENT_SHADER, render_fs),
        ]
      )!;

      const positionLoc = this.gl.getAttribLocation(this.prog_render, 'c_position');
      const scalarTexLoc = this.gl.getUniformLocation(this.prog_render, 'u_scalar_tex');
      const velTexLoc = this.gl.getUniformLocation(this.prog_render, 'u_vel_tex');

      // setup our attributes to tell WebGL how to pull
      // the data from the buffer above to the position attribute
      this.gl.enableVertexAttribArray(positionLoc);
      this.gl.vertexAttribPointer(
        positionLoc,
        2,         // size (num components)
        this.gl.FLOAT,  // type of data in buffer
        false,     // normalize
        0,         // stride (0 = auto)
        0,         // offset
      );

      // bind uniforms
      this.gl.useProgram(this.prog_render);

      // Tell the shader to get the texture from texture unit 0
      this.gl.uniform1i(scalarTexLoc, 0);

      // Tell the shader to get the velocity texture from texture unit 1
      this.gl.uniform1i(velTexLoc, 1);
    }

    // add reset handler
    this.reset.current!.addEventListener('click', this.handleReset);

    // add canvas handler
    this.canvas.current!.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.current!.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.current!.addEventListener('mousemove', this.handleMouseMove);

    // start animation loop
    this.animationLoop();
  }

  handleReset = () => {
    this.needsReset = true;
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

  handleMouseDown = (e: MouseEvent) => {
    this.mouseDown = true;
  }
  handleMouseUp = (e: MouseEvent) => {
    this.mouseDown = false;
  }

  handleMouseMove = (e: MouseEvent) => {
    this.prevMousePos = this.mousePos;
    this.mousePos = this.getMousePos(this.canvas.current!, e);
  }

  componentWillUnmount() {
    // remove listeners on canvas
    this.canvas.current!.removeEventListener('mousedown', this.handleMouseDown);
    this.canvas.current!.removeEventListener('mouseup', this.handleMouseUp);
    this.canvas.current!.removeEventListener('mousemove', this.handleMouseMove);
    // remove listener on reset
    this.reset.current!.removeEventListener("click", this.handleReset);
    // stop animation loop
    window.cancelAnimationFrame(this.requestID!);
    // destroy webgl
    this.gl.getExtension('WEBGL_lose_context')!.loseContext();
  }

  animationLoop = () => {
    this.requestID = window.requestAnimationFrame(this.animationLoop);

    this.gl.useProgram(this.prog_diffuse);

    // handle draw when there's no loops
    if (this.mouseDown) {
      // set texture unit 1 to active so we can work on it
      this.gl.activeTexture(this.gl.TEXTURE1);
      // bind velocity texture
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.velTexture);

      const brushRadius = 10;
      const brushSize= brushRadius * 2;

      // fill with data to move to to get high number
      const data = new Int32Array(brushSize * brushSize * 2);
      for (let i = 0; i < data.length/2; i++) {
        data[i*2] = 0xFFFF;
        data[i*2+1] = 0xFFFF;
      }

      // where to begin drawing
      const x = clamp(this.mousePos.x - brushRadius, 0, this.props.size - brushSize);
      const y = clamp(this.props.size - this.mousePos.y - brushRadius, 0, this.props.size - brushSize);

      overwriteRG32ITexture(this.gl, Math.floor(x), Math.floor(y), brushSize, brushSize, data);
    }

    if (this.needsReset) {
      // select the  texture being used as a source
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.scalarTextures[(this.frameCount + 1) % 2]);
      // overwrite the whole thing with a checkerboard
      const checkerboardCount = 5;
      const resetScalarFieldTex =  new Uint32Array(this.props.size * this.props.size)
      for(let y = 0; y < this.props.size; y++) {
          const b = Math.floor(y/(this.props.size/checkerboardCount)) % 2;
          for(let x = 0; x < this.props.size; x++) {
              const a = Math.floor(x/(this.props.size/checkerboardCount)) % 2;
              if(a + b == 1) {
                resetScalarFieldTex[y*this.props.size + x] = 0xFFFFFF;
              } else {
                resetScalarFieldTex[y*this.props.size + x] = 0;
              }
          }
      }
      overwriteR32UITexture(this.gl, 0, 0, this.props.size, this.props.size, resetScalarFieldTex);

      // select the particle texture
      this.gl.activeTexture(this.gl.TEXTURE1);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.velTexture);

      // overwrite the velocity field with 0
      const data = new Int32Array(this.props.size * this.props.size * 2);
      overwriteRG32ITexture(this.gl, 0, 0, this.props.size, this.props.size, data);

      this.needsReset = false;
    }

    // set texture unit 0 to active
    this.gl.activeTexture(this.gl.TEXTURE0);
    for (let i = 0; i < this.range.current!.valueAsNumber; i++) {
      const fbo = this.scalarFramebuffers[this.frameCount % 2];
      const tex = this.scalarTextures[(this.frameCount + 1) % 2];

      // make tex the texture to render to
      this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
      // make fbo the current framebuffer
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);

      // execute draw to texture
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

      this.frameCount++;
    }

    // now draw to canvas
    this.gl.useProgram(this.prog_render);

    // set the canvas as the current framebuffer
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    // execute draw to canvas
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  render() {
    return <div style={this.props.style} className={this.props.className}>
      <div className="row">
        <div className="col-md-8 d-flex">
          <canvas
            className="border border-dark"
            ref={this.canvas}
            height={this.props.size}
            width={this.props.size}
          />
        </div>
        <div className="col-md-4">
          <div className="border border-dark p-3 m-3">
            <h6>Controls</h6>
            <div className="form-group mb-3">
              <label className="form-label">Simulation Speed</label>
              <input type="range" className="form-range" min="0" max="5" step={1} defaultValue={1} ref={this.range} />
            </div>
            <div className="form-group mb-3">
              <select className="form-select" defaultValue={2} ref={this.drawSelect}>
                <option value={0}>Erase</option>
                <option value={1}>Draw Cold</option>
                <option value={2}>Draw Hot</option>
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-sm" ref={this.reset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default WebGL2FluidAdvectionDemo;
