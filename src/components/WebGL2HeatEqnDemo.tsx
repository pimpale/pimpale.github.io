import React from "react";
import { createShader, createProgram, createR32UITexture, overwriteR32UITexture, createR32FTexture, overwriteR32FTexture } from '../utils/webgl';
import { clamp } from '../utils/math';
import { CanvasMouseTracker } from '../utils/canvas';

type WebGL2HeatEqnDemoProps = {
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
precision highp sampler2D;

// the heat texture
uniform sampler2D u_tex;

// the control texture
uniform usampler2D u_ctrl_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;
 
void main() {
  vec2 res = vec2(textureSize(u_tex, 0));
  float x_off = 1.0/res.x;
  float y_off = 1.0/res.y;

  // 0 1 2
  // 1
  // 2

  float v01 = texture(u_tex, v_texCoord + vec2(-x_off,+0.000)).r;
  float v10 = texture(u_tex, v_texCoord + vec2(+0.000,-y_off)).r;
  float v12 = texture(u_tex, v_texCoord + vec2(+0.000,+y_off)).r;
  float v21 = texture(u_tex, v_texCoord + vec2(+x_off,+0.000)).r;

  float sum =
          v01 +
    v10 +       v12 +
          v21;

  uint ctrl = texture(u_ctrl_tex, v_texCoord).r;

  switch(ctrl) {
    case 0u: {
      value = vec4(sum/4.0, 0.0, 0.0, 0.0);
      break;
    }
    case 1u: {
      value = vec4(0.0, 0.0, 0.0, 0.0);
      break;
    }
    default: {
      value = vec4(1.0, 0.0, 0.0, 0.0);
      break;
    }
  }
}
`;

// this fragment shader is used to render to the canvas so we can see what's going on
const render_fs = `#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the heat texture
uniform sampler2D u_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 outColor;


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
    float val = texture(u_tex, v_texCoord).r;
    outColor = vec4(inferno(val), 1.0);
}
`



type WebGL2HeatEqnDemoState = {}

class WebGL2HeatEqnDemo extends React.Component<WebGL2HeatEqnDemoProps, WebGL2HeatEqnDemoState> {

  private canvas = React.createRef<HTMLCanvasElement>();
  private simSpeedRange = React.createRef<HTMLInputElement>();
  // this is the ref we use to choose color
  private drawSelect = React.createRef<HTMLSelectElement>();

  private gl!: WebGL2RenderingContext;
  private vao!: WebGLVertexArrayObject;

  // the control texture that tells which parts are hot vs cold
  private controlTexture!: WebGLTexture;

  // a list of textures that we will cycle through
  private textures: WebGLTexture[] = [];
  // a list of framebuffers we will cycle through
  private framebuffers: WebGLFramebuffer[] = [];

  // the frame number we're on
  private frameCount = 0;

  private prog_diffuse!: WebGLProgram;
  private prog_render!: WebGLProgram;

  // whether we need to reset on the next frame
  private needsReset = false;

  // mouse status
  private cmt!: CanvasMouseTracker;

  private requestID!: number;

  constructor(props: WebGL2HeatEqnDemoProps) {
    super(props);
  }

  componentDidMount() {
    // get webgl
    this.gl = this.canvas.current!.getContext('webgl2')!;
    // enable extension
    this.gl.getExtension('EXT_color_buffer_float');

    // create a vao and bind it
    // the vao stores all our data about attributes for a program
    this.vao = this.gl.createVertexArray()!;
    this.gl.bindVertexArray(this.vao);

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


    // create pingpongable textures and frambuffers
    for (let i = 0; i < 2; i++) {
      const tex = createR32FTexture(this.gl, this.props.size, this.props.size, new Float32Array(this.props.size * this.props.size))!;
      this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.textures.push(tex);

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
      this.framebuffers.push(fbo);
    }

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
      const texLoc = this.gl.getUniformLocation(this.prog_diffuse, 'u_tex');
      const ctrlTexLoc = this.gl.getUniformLocation(this.prog_diffuse, 'u_ctrl_tex');

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
      this.gl.useProgram(this.prog_diffuse);

      // Tell the shader to get the texture from texture unit 0
      this.gl.uniform1i(texLoc, 0);

      // create control texture
      this.controlTexture = createR32UITexture(this.gl, this.props.size, this.props.size)!;

      // Tell the shader to get the control texture from texture unit 1
      this.gl.uniform1i(ctrlTexLoc, 1);
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
      const texLoc = this.gl.getUniformLocation(this.prog_render, 'u_tex');

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
      this.gl.uniform1i(texLoc, 0);
    }

    // track mouse
    this.cmt = new CanvasMouseTracker(this.canvas.current!);

    // start animation loop
    this.animationLoop();
  }

  componentWillUnmount() {
    // clean up mouse tracker
    this.cmt.cleanup();
    // stop animation loop
    window.cancelAnimationFrame(this.requestID!);
  }

  animationLoop = () => {

    this.requestID = window.requestAnimationFrame(this.animationLoop);

    this.gl.useProgram(this.prog_diffuse);

    // handle drawing on the canvas
    const mousePos = this.cmt.mousePos;
    if (mousePos) {
      // set texture unit 1 to active so we can work on it
      this.gl.activeTexture(this.gl.TEXTURE1);
      // bind control texture
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.controlTexture);

      const brushRadius = this.drawSelect.current!.selectedIndex === 0 ? 10 : 2
      const brushSize = brushRadius * 2;

      // fill with control to get high number
      const data = new Uint32Array(brushSize * brushSize);
      for (let i = 0; i < data.length; i++) {
        data[i] = this.drawSelect.current!.selectedIndex;
      }

      // x and y vars store top left location of draw site

      const x = clamp(mousePos.current.x - brushRadius, 0, this.props.size - brushSize);
      // note that y axis is inverted on the texture!
      const y = clamp(this.props.size - mousePos.current.y - brushRadius, 0, this.props.size - brushSize);

      overwriteR32UITexture(this.gl, Math.floor(x), Math.floor(y), brushSize, brushSize, data);
    }

    if (this.needsReset) {
      // select the  texture being used as a source
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[(this.frameCount + 1) % 2]);
      // overwrite the whole thing with 0
      overwriteR32FTexture(this.gl, 0, 0, this.props.size, this.props.size, new Float32Array(this.props.size * this.props.size));

      // select the control texture
      this.gl.activeTexture(this.gl.TEXTURE1);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.controlTexture);

      // overwrite the whole thing with 0
      const data = new Uint32Array(this.props.size * this.props.size);
      overwriteR32UITexture(this.gl, 0, 0, this.props.size, this.props.size, data);

      this.needsReset = false;
    }

    // set texture unit 0 to active
    this.gl.activeTexture(this.gl.TEXTURE0);
    for (let i = 0; i < this.simSpeedRange.current!.valueAsNumber; i++) {
      const fbo = this.framebuffers[this.frameCount % 2];
      const tex = this.textures[(this.frameCount + 1) % 2];

      // make tex the teture to render to
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
            className="border border-dark w-100 mb-3"
            ref={this.canvas}
            height={this.props.size}
            width={this.props.size}
          />
        </div>
        <div className="col-md-4">
          <div className="border border-dark p-3">
            <h6>Controls</h6>
            <div className="form-group mb-3">
              <label className="form-label">Simulation Speed</label>
              <input type="range" className="form-range" min="0" max="100" step={1} defaultValue={1} ref={this.simSpeedRange} />
            </div>
            <div className="form-group mb-3">
              <select className="form-select" defaultValue={2} ref={this.drawSelect}>
                <option value={0}>Erase</option>
                <option value={1}>Draw Cold</option>
                <option value={2}>Draw Hot</option>
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-sm" onClick={() => this.needsReset = true}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default WebGL2HeatEqnDemo;
