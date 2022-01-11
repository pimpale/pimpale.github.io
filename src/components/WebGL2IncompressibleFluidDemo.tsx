import React from "react";
import { createShader, createProgram, createR32UITexture, createRG32ITexture, overwriteR32UITexture, overwriteRG32ITexture } from '../utils/webgl';
import { clamp } from '../utils/math';
import { makeNoise4D } from 'open-simplex-noise';

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

// this fragment shader does the actual work of advect_scalarion
const advect_scalar_fs = `#version 300 es
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

float textureGood(usampler2D sam, vec2 uv)
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
  // get the floatwise velocity
  ivec2 ivel = texture(u_vel_tex, v_texCoord).xy;
  vec2 vel = vec2(float(ivel.x)/float(0xFFFFFF), float(ivel.y)/float(0xFFFFFF));

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  float val = textureGood(u_scalar_tex, v_texCoord-vel);

  value = uvec4(val, 0u, 0u, 0u);
}
`;

const advec_vel_fs = `#version 300 es
precision highp float;
precision highp isampler2D;

// the velocity texture
uniform isampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out ivec4 value;

vec2 textureGood(isampler2D sam, vec2 uv)
{
    vec2 res = vec2(textureSize(sam, 0));
    vec2 st = uv*res - 0.5;

    vec2 iuv = floor( st );
    vec2 fuv = fract( st );

    vec2 a = vec2(texture( sam, (iuv+vec2(0.5,0.5))/res).xy);
    vec2 b = vec2(texture( sam, (iuv+vec2(1.5,0.5))/res).xy);
    vec2 c = vec2(texture( sam, (iuv+vec2(0.5,1.5))/res).xy);
    vec2 d = vec2(texture( sam, (iuv+vec2(1.5,1.5))/res).xy);

    return mix( mix( a, b, fuv.x),
                mix( c, d, fuv.x), fuv.y );
}

void main() {
  // get the floatwise velocity
  ivec2 ivel = texture(u_vel_tex, v_texCoord).xy;
  vec2 vel = vec2(float(ivel.x)/float(0xFFFFFF), float(ivel.y)/float(0xFFFFFF));

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  vec2 val = textureGood(u_vel_tex, v_texCoord-vel);

  value = ivec4(val, 0, 0);
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

const float ARROW_TILE_SIZE = 16.0;

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

  float arrow_dist = arrow(pxCoord, vel_vec * ARROW_TILE_SIZE);
  vec4 arrow_col = vec4(0, 1.0, 0, clamp(arrow_dist, 0.0, 1.0));

  float scalar_val = float(texture(u_scalar_tex, v_texCoord).r)/float(0xFFFFFF);
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`

const paint_vel_fs = `#version 300 es
precision highp float;
precision highp isampler2D;

// the velocity texture
uniform isampler2D u_vel_tex;

// old normalized mouse position
uniform vec2 u_old_mouse;
// new normalized mouse position
uniform vec2 u_new_mouse;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out ivec4 value;

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

void main() {
  // the direction to paint in
  vec2 paintDir = (u_new_mouse - u_old_mouse)*float(0xFFFF);

  float dist = sdSegment(v_texCoord, u_old_mouse, u_new_mouse);

  if(dist < 0.03) {
    ivec4 val = ivec4(int(paintDir.x), int(paintDir.y), 0, 0);
    value = texture(u_vel_tex, v_texCoord) + val;
  } else {
    value = texture(u_vel_tex, v_texCoord);
  }
}
`

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

  const data = new Int32Array(xsize * ysize * 2);

  const noise = makeTorusNoise2D(3, seed);

  for (let y = 0; y < ysize; y++) {
    for (let x = 0; x < xsize; x++) {
      const [dx, dy] = sampleCurlNoise(noise, x / xsize, y / ysize);
      const baseIdx = xsize * y + x;
      data[baseIdx * 2 + 0] = dx * 0xFFF;
      data[baseIdx * 2 + 1] = dy * 0xFFF;
    }
  }
  return data;
}



// TODO: learn how to handle error cases

type WebGL2FluidAdvectionDemoState = {}

class WebGL2FluidAdvectionDemo extends React.Component<WebGL2FluidAdvectionDemoProps, WebGL2FluidAdvectionDemoState> {

  // this is the ref to the canvas
  private canvas = React.createRef<HTMLCanvasElement>();

  // this is the ref we use to monitor sim speed
  private range = React.createRef<HTMLInputElement>();

  // this is the ref we use to choose color background
  private scalarSelect = React.createRef<HTMLSelectElement>();
  private velocitySelect = React.createRef<HTMLSelectElement>();

  private gl!: WebGL2RenderingContext;

  // the texture that shows scalar density (this is going to be advect_scalared)
  private scalarTextures: WebGLTexture[] = [];
  private scalarFramebuffers: WebGLFramebuffer[] = [];

  // the velocity textures represent the velocity field of the fluid
  // it loops around at the edges
  private velTextures: WebGLTexture[] = [];
  private velFramebuffers: WebGLFramebuffer[] = [];

  private newMouseLoc!: WebGLUniformLocation;
  private oldMouseLoc!: WebGLUniformLocation;

  private prog_advect_scalar!: WebGLProgram;
  private prog_advec_vel!: WebGLProgram;
  private prog_render!: WebGLProgram;
  private prog_paint_vel!: WebGLProgram;

  // The index of the scalar texture we're using as a source
  private scalarIndex = 0;

  // the index of the vel texture we're using as a source
  private velIndex = 0;


  // whether we need to reset on the next frame
  private needsScalarReset = true;
  private needsVelocityReset = true;

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


    // create pingpongable textures and frambuffers for the scalar field textures
    for (let i = 0; i < 2; i++) {
      // create velocity texture
      const data = new Int32Array(this.props.size * this.props.size * 2);
      const tex = createRG32ITexture(this.gl, this.props.size, this.props.size, data)!;

      this.velTextures.push(tex);

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
      this.velFramebuffers.push(fbo);
    }

    // build the compute program
    {
      // create program
      this.prog_advect_scalar = createProgram(
        this.gl,
        [
          createShader(this.gl, this.gl.VERTEX_SHADER, vs),
          createShader(this.gl, this.gl.FRAGMENT_SHADER, advect_scalar_fs),
        ]
      )!;

      const positionLoc = this.gl.getAttribLocation(this.prog_advect_scalar, 'c_position');
      const scalarTexLoc = this.gl.getUniformLocation(this.prog_advect_scalar, 'u_scalar_tex');
      const velTexLoc = this.gl.getUniformLocation(this.prog_advect_scalar, 'u_vel_tex');

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
      this.gl.useProgram(this.prog_advect_scalar);
      // Tell the shader to get the scalar texture from texture unit 0
      this.gl.uniform1i(scalarTexLoc, 0);
      // Tell the shader to get the velocity texture from texture unit 1
      this.gl.uniform1i(velTexLoc, 1);
    }

    {
      // create program
      this.prog_advec_vel = createProgram(
        this.gl,
        [
          createShader(this.gl, this.gl.VERTEX_SHADER, vs),
          createShader(this.gl, this.gl.FRAGMENT_SHADER, advec_vel_fs),
        ]
      )!;

      const positionLoc = this.gl.getAttribLocation(this.prog_advec_vel, 'c_position');
      const velTexLoc = this.gl.getUniformLocation(this.prog_advec_vel, 'u_vel_tex');

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
      this.gl.useProgram(this.prog_advec_vel);
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

      // Tell the shader to get the scalar texture from texture unit 0
      this.gl.uniform1i(scalarTexLoc, 0);

      // Tell the shader to get the velocity texture from texture unit 1
      this.gl.uniform1i(velTexLoc, 1);
    }

    // build the paint on vel texture program
    {
      // create program
      this.prog_paint_vel = createProgram(
        this.gl,
        [
          createShader(this.gl, this.gl.VERTEX_SHADER, vs),
          createShader(this.gl, this.gl.FRAGMENT_SHADER, paint_vel_fs),
        ]
      )!;

      const positionLoc = this.gl.getAttribLocation(this.prog_paint_vel, 'c_position');
      const velTexLoc = this.gl.getUniformLocation(this.prog_paint_vel, 'u_vel_tex');
      this.newMouseLoc = this.gl.getUniformLocation(this.prog_paint_vel, 'u_new_mouse')!;
      this.oldMouseLoc = this.gl.getUniformLocation(this.prog_paint_vel, 'u_old_mouse')!;

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
      this.gl.useProgram(this.prog_paint_vel);

      // Tell the shader to get the velocity texture from texture unit 1
      this.gl.uniform1i(velTexLoc, 1);
    }



    // add canvas handler
    this.canvas.current!.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.current!.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.current!.addEventListener('mousemove', this.handleMouseMove);

    // start animation loop
    this.animationLoop();
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

    // stop animation loop
    window.cancelAnimationFrame(this.requestID!);
    // destroy webgl
    this.gl.getExtension('WEBGL_lose_context')!.loseContext();
  }

  animationLoop = () => {
    this.requestID = window.requestAnimationFrame(this.animationLoop);


    // handle draw when there's no loops
    if (this.mouseDown) {
      // in order to draw the velocity texture we will execute a program
      this.gl.useProgram(this.prog_paint_vel);

      // bind the source velocity texture to texture unit 1
      this.gl.activeTexture(this.gl.TEXTURE1);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.velTextures[this.velIndex]);
      // set the framebuffer to draw at the other velocity texture
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.velFramebuffers[(this.velIndex + 1) % 2]);

      // set old and new mouse positions
      this.gl.uniform2f(this.oldMouseLoc,
        clamp(this.prevMousePos.x, 0, this.props.size) / this.props.size,
        clamp(this.props.size - this.prevMousePos.y, 0, this.props.size) / this.props.size,
      );
      this.gl.uniform2f(this.newMouseLoc,
        clamp(this.mousePos.x, 0, this.props.size) / this.props.size,
        clamp(this.props.size - this.mousePos.y, 0, this.props.size) / this.props.size,
      );

      // execute program, doing paint
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

      this.velIndex = (this.velIndex + 1) % 2;
    }

    if (this.needsScalarReset) {
      // select the scalar texture being used as a source
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.scalarTextures[this.scalarIndex]);
      // overwrite the whole thing with a checkerboard
      const checkerboardCount = parseInt(this.scalarSelect.current?.value!);
      const resetScalarFieldTex = new Uint32Array(this.props.size * this.props.size)
      for (let y = 0; y < this.props.size; y++) {
        const b = Math.floor(y / (this.props.size / checkerboardCount)) % 2;
        for (let x = 0; x < this.props.size; x++) {
          const a = Math.floor(x / (this.props.size / checkerboardCount)) % 2;
          if (a + b == 1) {
            resetScalarFieldTex[y * this.props.size + x] = 0xFFFFFF;
          } else {
            resetScalarFieldTex[y * this.props.size + x] = 0;
          }
        }
      }
      overwriteR32UITexture(this.gl, 0, 0, this.props.size, this.props.size, resetScalarFieldTex);
      this.needsScalarReset = false;
    }

    if (this.needsVelocityReset) {
      // select the vel texture being used as a source
      this.gl.activeTexture(this.gl.TEXTURE1);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.velTextures[this.velIndex]);

      // overwrite the velocity field with what se select
      let data;
      switch (this.velocitySelect.current?.value) {
        case 'curlnoise':
          data = createCurlNoise(this.props.size, this.props.size, Math.random() * 500);
          break;
        default:
          data = new Int32Array(this.props.size * this.props.size * 2);
          break;
      }
      overwriteRG32ITexture(this.gl, 0, 0, this.props.size, this.props.size, data);

      this.needsVelocityReset = false;
    }

    // we will advect_scalar now
    this.gl.useProgram(this.prog_advect_scalar);

    for (let i = 0; i < this.range.current!.valueAsNumber; i++) {
      const tex = this.scalarTextures[this.scalarIndex];
      const fbo = this.scalarFramebuffers[(this.scalarIndex + 1) % 2];

      // make tex the texture to read from at texture0
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

      // make fbo corresponding to the next texture the current framebuffer
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);

      // execute draw to the next framebuffer
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

      this.scalarIndex = (this.scalarIndex + 1) % 2;
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
              <label className="form-label">Scalar Field</label>
              <select className="form-select mb-3" defaultValue={8} ref={this.scalarSelect}>
                <option value={1}>Empty</option>
                <option value={2}>Grid 2</option>
                <option value={8}>Grid 8</option>
                <option value={64}>Grid 64</option>
              </select>
              <button className="btn btn-primary btn-sm" onClick={() => this.needsScalarReset = true}>Reset Scalar</button>
            </div>
            <div className="form-group">
              <label className="form-label">Velocity Field</label>
              <select className="form-select mb-3" defaultValue={8} ref={this.velocitySelect}>
                <option value="empty">Empty</option>
                <option value="curlnoise">Curl Noise</option>
              </select>
              <button className="btn btn-primary btn-sm" onClick={() => this.needsVelocityReset = true}>Reset Velocity</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default WebGL2FluidAdvectionDemo;
