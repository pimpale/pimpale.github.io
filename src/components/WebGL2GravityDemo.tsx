import React from "react";
import {
    createShader,
    createProgram,
    createR32FTexture,
    overwriteR32FTexture,
    createRG32FTexture,
    overwriteRG32FTexture,
    createR32UITexture
} from '../utils/webgl';
import { clamp } from '../utils/math';
import { createCurlNoise } from '../utils/noise';

type WebGL2FluidAdvectionDemoProps = {
  style?: React.CSSProperties,
  className?: string
  size: number
}

// the vertex shader is used in 2 different programs, it basically is just for translating clip space
const vs = `#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`;

// this fragment shader applies the gravitational force to all particles
const apply_gravity_fs = `#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the momentum texture
uniform sampler2D u_particle_momentum_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

const float G = 0.0001;

void main() {
  // get the resolution
  ivec2 resolution = textureSize(u_particle_mass_tex, 0);

  float x_off = 1.0/float(resolution.x);
  float y_off = 1.0/float(resolution.y);

  // our current position
  vec2 pos1 = texture(u_particle_position_tex, v_texCoord).xy;

  vec2 p = texture(u_particle_momentum_tex, v_texCoord).xy;

  for(int y = 0; y < resolution.y; y++) {
    for(int x = 0; x < resolution.x; x++) {
      vec2 loc = vec2(float(x)*x_off, float(y)*y_off);
      float m2 = texture(u_particle_mass_tex, loc).x;
      vec2 pos2 = texture(u_particle_position_tex, loc).xy;
      vec2 r_vec = pos2-pos1;
      float r_mag = length(r_vec);
      vec2 r_hat = r_vec/r_mag;
      vec2 accel = G*m2*r_hat/(r_mag*r_mag);
      if(!isnan(accel.x) && !isnan(accel.y)) {
        p += accel;
      }
    }
  }

  // run potential
  value = vec4(p, 0, 0);
}
`;


// this fragment shader moves the particles
const move_particle_fs = `#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the momentum texture
uniform sampler2D u_particle_momentum_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  float mass = texture(u_particle_mass_tex, v_texCoord).x;
  vec2 position = texture(u_particle_position_tex, v_texCoord).xy;
  vec2 momentum = texture(u_particle_momentum_tex, v_texCoord).xy;

  // do position
  position = position + momentum/mass;

  value = vec4(position , 0, 1);
}
`;


// a no-op for now
const handle_mass_fs = `#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  float mass = texture(u_particle_mass_tex, v_texCoord).x;
  value = vec4(mass, 0, 0, 1);
}
`;

// a no-op for now
const _fs = `#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  float mass = texture(u_particle_mass_tex, v_texCoord).x;
  value = vec4(mass, 0, 0, 1);
}
`;


type Point = {
  x: number,
  y: number
}

// TODO: learn how to handle error cases

type WebGL2FluidAdvectionDemoState = {}

class WebGL2FluidAdvectionDemo extends React.Component<WebGL2FluidAdvectionDemoProps, WebGL2FluidAdvectionDemoState> {

  private particle_tex_xsize: number;
  private particle_tex_ysize: number;

  // this is the ref to the canvas we use to work with particles
  private particle_canvas = React.createRef<HTMLCanvasElement>();

  // this is the ref to the canvas we use to render
  private render_canvas = React.createRef<HTMLCanvasElement>();

  // this is the ref we use to monitor sim speed
  private range = React.createRef<HTMLInputElement>();

  // this is the ref we use to choose color background
  private scalarSelect = React.createRef<HTMLSelectElement>();
  private velocitySelect = React.createRef<HTMLSelectElement>();

  private gl!: WebGL2RenderingContext;

  // the texture that shows the state of each particle (dead, alive, or
  private particleStateTextures: WebGLTexture[] = [];
  private particleStateFramebuffers: WebGLFramebuffer[] = [];

  // the texture that shows scalar density (this is going to be advected)
  private particleMassTextures: WebGLTexture[] = [];
  private particleMassFramebuffers: WebGLFramebuffer[] = [];

  // position texture
  private particlePositionTextures: WebGLTexture[] = [];
  private particlePositionFramebuffers: WebGLFramebuffer[] = [];

  // momentum texture
  private particleMomentumTextures: WebGLTexture[] = [];
  private particleMomentumFramebuffers: WebGLFramebuffer[] = [];

  private newMouseLoc!: WebGLUniformLocation;
  private oldMouseLoc!: WebGLUniformLocation;

  private prog_apply_gravity!: WebGLProgram;
  private prog_move_particle!: WebGLProgram;
  private prog_handle_mass!: WebGLProgram;

  // The index of the mass texture we're using as a source
  private particleStateIndex = 0;
  private particleMassIndex = 0;
  private particlePositionIndex = 0;
  private particleMomentumIndex = 0;

  // whether we need to reset on the next frame
  private needsReset = true;

  // mouse status
  private mousePos: { current: Point, previous: Point } | null = null;

  private requestID!: number;

  constructor(props: WebGL2FluidAdvectionDemoProps) {
    super(props);
    this.particle_tex_xsize = 16;
    this.particle_tex_ysize = 16;
  }

  componentDidMount() {
    // get webgl
    this.gl = this.particle_canvas.current!.getContext('webgl2')!;
    this.gl.getExtension('EXT_color_buffer_float');

    // create pingpongable textures and frambuffers for the particle textures
    for (let i = 0; i < 2; i++) {
      const tex = createR32UITexture(
        this.gl,
        this.particle_tex_xsize,
        this.particle_tex_ysize,
      )!;
      this.particleStateTextures.push(tex);
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
      this.particleStateFramebuffers.push(fbo);
    }

    // create pingpongable textures and frambuffers for the particle textures
    for (let i = 0; i < 2; i++) {
      const tex = createR32FTexture(
        this.gl,
        this.particle_tex_xsize,
        this.particle_tex_ysize,
        new Float32Array(this.particle_tex_xsize * this.particle_tex_ysize)
      )!;
      this.particleMassTextures.push(tex);
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
      this.particleMassFramebuffers.push(fbo);
    }

    // create pingpongable textures and frambuffers for the particle textures
    for (let i = 0; i < 2; i++) {
      const tex = createRG32FTexture(
        this.gl,
        this.particle_tex_xsize,
        this.particle_tex_ysize,
        new Float32Array(this.particle_tex_xsize * this.particle_tex_ysize * 2)
      )!;
      this.particlePositionTextures.push(tex);

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
      this.particlePositionFramebuffers.push(fbo);
    }


    // create pingpongable textures and framebuffers for the vector field textures
    for (let i = 0; i < 2; i++) {
      // create momentum texture
      const tex = createRG32FTexture(
        this.gl,
        this.particle_tex_xsize,
        this.particle_tex_ysize,
        new Float32Array(this.particle_tex_xsize * this.particle_tex_ysize * 2)
      )!;
      this.particleMomentumTextures.push(tex);

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
      this.particleMomentumFramebuffers.push(fbo);
    }

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

    // build apply_gravity
    {
      // create program
      this.prog_apply_gravity = createProgram(
        this.gl,
        [
          createShader(this.gl, this.gl.VERTEX_SHADER, vs),
          createShader(this.gl, this.gl.FRAGMENT_SHADER, apply_gravity_fs),
        ]
      )!;

      const positionLoc = this.gl.getAttribLocation(this.prog_apply_gravity, 'a_position');
      const particleStateTexLoc = this.gl.getUniformLocation(this.prog_apply_gravity, 'u_particle_state_tex');
      const particleMassTexLoc = this.gl.getUniformLocation(this.prog_apply_gravity, 'u_particle_mass_tex');
      const particlePositionTexLoc = this.gl.getUniformLocation(this.prog_apply_gravity, 'u_particle_position_tex');
      const particleMomentumTexLoc = this.gl.getUniformLocation(this.prog_apply_gravity, 'u_particle_momentum_tex');

      // setup our attributes to tell WebGL how to pull
      // the data from the buffer above to the position attribute
      this.gl.enableVertexAttribArray(positionLoc);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      this.gl.vertexAttribPointer(
        positionLoc,
        2,         // size (num components)
        this.gl.FLOAT,  // type of data in buffer
        false,     // normalize
        0,         // stride (0 = auto)
        0,         // offset
      );

      // bind uniforms
      this.gl.useProgram(this.prog_apply_gravity);
      // Tell the shader to get the state texture from texture unit 0
      this.gl.uniform1i(particleStateTexLoc, 0);
      // Tell the shader to get the mass texture from texture unit 1
      this.gl.uniform1i(particleMassTexLoc, 1);
      // Tell the shader to get the position texture from texture unit 2
      this.gl.uniform1i(particlePositionTexLoc, 2);
      // Tell the shader to get the momentum texture from texture unit 3
      this.gl.uniform1i(particleMomentumTexLoc, 3);
    }

    // build the move_particle
    {
      // create program
      this.prog_move_particle = createProgram(
        this.gl,
        [
          createShader(this.gl, this.gl.VERTEX_SHADER, vs),
          createShader(this.gl, this.gl.FRAGMENT_SHADER, move_particle_fs),
        ]
      )!;

      const positionLoc = this.gl.getAttribLocation(this.prog_move_particle, 'a_position');
      const particleStateTexLoc = this.gl.getUniformLocation(this.prog_move_particle, 'u_particle_state_tex');
      const particleMassTexLoc = this.gl.getUniformLocation(this.prog_move_particle, 'u_particle_mass_tex');
      const particlePositionTexLoc = this.gl.getUniformLocation(this.prog_move_particle, 'u_particle_position_tex');
      const particleMomentumTexLoc = this.gl.getUniformLocation(this.prog_move_particle, 'u_particle_momentum_tex');

      // setup our attributes to tell WebGL how to pull
      // the data from the buffer above to the position attribute
      this.gl.enableVertexAttribArray(positionLoc);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      this.gl.vertexAttribPointer(
        positionLoc,
        2,              // size (num components)
        this.gl.FLOAT,  // type of data in buffer
        false,          // normalize
        0,              // stride (0 = auto)
        0,              // offset
      );

      // bind uniforms
      this.gl.useProgram(this.prog_move_particle);
      // Tell the shader to get the state texture from texture unit 0
      this.gl.uniform1i(particleStateTexLoc, 0);
      // Tell the shader to get the mass texture from texture unit 1
      this.gl.uniform1i(particleMassTexLoc, 1);
      // Tell the shader to get the position texture from texture unit 2
      this.gl.uniform1i(particlePositionTexLoc, 2);
      // Tell the shader to get the momentum texture from texture unit 3
      this.gl.uniform1i(particleMomentumTexLoc, 3);

    }

    // build the mass particle
    {
      // create program
      this.prog_handle_mass = createProgram(
        this.gl,
        [
          createShader(this.gl, this.gl.VERTEX_SHADER, vs),
          createShader(this.gl, this.gl.FRAGMENT_SHADER, handle_mass_fs),
        ]
      )!;

      const positionLoc = this.gl.getAttribLocation(this.prog_handle_mass, 'a_position');
      const particleStateTexLoc = this.gl.getUniformLocation(this.prog_handle_mass, 'u_particle_state_tex');
      const particleMassTexLoc = this.gl.getUniformLocation(this.prog_handle_mass, 'u_particle_mass_tex');

      // setup our attributes to tell WebGL how to pull
      // the data from the buffer above to the position attribute
      this.gl.enableVertexAttribArray(positionLoc);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      this.gl.vertexAttribPointer(
        positionLoc,
        2,              // size (num components)
        this.gl.FLOAT,  // type of data in buffer
        false,          // normalize
        0,              // stride (0 = auto)
        0,              // offset
      );

      // bind uniforms
      this.gl.useProgram(this.prog_handle_mass);
      // Tell the shader to get the state texture from texture unit 0
      this.gl.uniform1i(particleStateTexLoc, 0);
      // Tell the shader to get the mass texture from texture unit 1
      this.gl.uniform1i(particleMassTexLoc, 1);
    }


    // add canvas handler
    this.render_canvas.current!.addEventListener('pointerdown', this.handleMouseDown);
    this.render_canvas.current!.addEventListener('pointermove', this.handleMouseMove);
    window.addEventListener('pointerup', this.handleMouseUp);
    // disable touch movements
    this.render_canvas.current!.addEventListener("touchstart", this.discardTouchEvent)
    this.render_canvas.current!.addEventListener("touchmove", this.discardTouchEvent)
    this.render_canvas.current!.addEventListener("touchend", this.discardTouchEvent)
    this.render_canvas.current!.addEventListener("touchcancel", this.discardTouchEvent)

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
    const v = this.getMousePos(this.render_canvas.current!, e);
    this.mousePos = {
      current: v,
      previous: v
    };
  }
  handleMouseUp = (e: MouseEvent) => {
    this.mousePos = null;
  }

  handleMouseMove = (e: MouseEvent) => {
    if (!this.mousePos) {
      return;
    }
    this.mousePos = {
      current: this.getMousePos(this.render_canvas.current!, e),
      previous: this.mousePos.current
    };
  }

  discardTouchEvent = (e: TouchEvent) => e.preventDefault();

  componentWillUnmount() {

    // remove listeners on render_canvas
    this.render_canvas.current!.removeEventListener('pointerdown', this.handleMouseDown);
    this.render_canvas.current!.removeEventListener('pointermove', this.handleMouseMove);
    window.removeEventListener('pointerup', this.handleMouseUp);
    // reenable touch movements
    this.render_canvas.current!.removeEventListener("touchstart", this.discardTouchEvent)
    this.render_canvas.current!.removeEventListener("touchmove", this.discardTouchEvent)
    this.render_canvas.current!.removeEventListener("touchend", this.discardTouchEvent)
    this.render_canvas.current!.removeEventListener("touchcancel", this.discardTouchEvent)

    // stop animation loop
    window.cancelAnimationFrame(this.requestID!);
    // destroy webgl
    this.gl.getExtension('WEBGL_lose_context')!.loseContext();
  }

  animationLoop = () => {
    this.requestID = window.requestAnimationFrame(this.animationLoop);

    if (this.needsReset) {
      // give everything mass of 1
      const mass_data = new Float32Array(this.particle_tex_xsize * this.particle_tex_ysize);
      for (let i = 0; i < mass_data.length; i++) {
        mass_data[i] = Math.random()*5;
      }
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.particleMassTextures[this.particleMassIndex]);
      overwriteR32FTexture(this.gl, 0, 0, this.particle_tex_xsize, this.particle_tex_ysize, mass_data);

      // give everything equally spaced positon 
      const position_data = new Float32Array(this.particle_tex_xsize * this.particle_tex_ysize * 2);
      for (let y = 0; y < this.particle_tex_ysize; y++) {
        for (let x = 0; x < this.particle_tex_xsize; x++) {
          const i = y * this.particle_tex_xsize + x;
          position_data[i * 2 + 0] = x * 3 + 32;
          position_data[i * 2 + 1] = y * 3 + 32;
        }
      }
      this.gl.activeTexture(this.gl.TEXTURE1);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.particlePositionTextures[this.particlePositionIndex]);
      overwriteRG32FTexture(this.gl, 0, 0, this.particle_tex_xsize, this.particle_tex_ysize, position_data);



      // give everything momentum of 0
      const momentum_data = new Float32Array(this.particle_tex_xsize * this.particle_tex_ysize * 2);
      for (let y = 0; y < this.particle_tex_ysize; y++) {
        for (let x = 0; x < this.particle_tex_xsize; x++) {
          const i = y * this.particle_tex_xsize + x;
          momentum_data[i * 2 + 0] = (Math.random() - 0.5) * 1.0;
          momentum_data[i * 2 + 1] = (Math.random() - 0.5) * 1.0;
        }
      }
      this.gl.activeTexture(this.gl.TEXTURE2);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.particleMomentumTextures[this.particleMomentumIndex]);
      overwriteRG32FTexture(this.gl, 0, 0, this.particle_tex_xsize, this.particle_tex_ysize, momentum_data);

      this.needsReset = false;
    }


    // run the physics code
    for (let i = 0; i < this.range.current!.valueAsNumber; i++) {

      // we will handle_mass now
      {
        // we will handle_mass now
        this.gl.useProgram(this.prog_handle_mass);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.particleMassTextures[this.particleMassIndex]);


        // bind the mass to texture 1
        const tex = this.particleMassTextures[this.particleMassIndex];
        const fbo = this.particleMassFramebuffers[(this.particleMassIndex + 1) % 2];

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

        // make fbo corresponding to the next texture the current framebuffer
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);

        // execute draw to the next framebuffer
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

        this.particleMassIndex = (this.particleMassIndex + 1) % 2;
      }

      // we will apply_gravity now
      {
        // we will apply_gravity now
        this.gl.useProgram(this.prog_apply_gravity);

        // bind the mass to texture 0
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.particleMassTextures[this.particleMassIndex]);

        // bind the position to texture 1
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.particlePositionTextures[this.particlePositionIndex]);

        // bind the momentum to texture 2
        const tex = this.particleMomentumTextures[this.particleMomentumIndex];
        const fbo = this.particleMomentumFramebuffers[(this.particleMomentumIndex + 1) % 2];

        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

        // make fbo corresponding to the next texture the current framebuffer
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);

        // execute draw to the next framebuffer
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

        this.particleMomentumIndex = (this.particleMomentumIndex + 1) % 2;
      }

      {
        // we will move_particle now
        this.gl.useProgram(this.prog_move_particle);

        // bind the mass to texture 0
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.particleMassTextures[this.particleMassIndex]);

        // bind the momentum to texture 2
        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.particleMomentumTextures[this.particleMomentumIndex]);

        // bind the momentum to texture 1
        const tex = this.particlePositionTextures[this.particlePositionIndex];
        const fbo = this.particlePositionFramebuffers[(this.particlePositionIndex + 1) % 2];

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

        // make fbo corresponding to the next texture the current framebuffer
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);

        // execute draw to the next framebuffer
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

        this.particlePositionIndex = (this.particlePositionIndex + 1) % 2;
      }
    }

    const state = new Uint32Array(this.particle_tex_xsize * this.particle_tex_ysize);
    const mass = new Float32Array(this.particle_tex_xsize * this.particle_tex_ysize * 4);
    const position = new Float32Array(this.particle_tex_xsize * this.particle_tex_ysize * 4);
    const momentum = new Float32Array(this.particle_tex_xsize * this.particle_tex_ysize * 4);

    // read the positions
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.particleStateFramebuffers[this.particleStateIndex]);
    this.gl.readPixels(
      0,  // x
      0,  // y
      this.particle_tex_xsize, // width
      this.particle_tex_ysize, // height
      this.gl.RED_INTEGER,     // format
      this.gl.UNSIGNED_INT,    // type
      state                    // pixels
    );
    // read the positions
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.particleMassFramebuffers[this.particleMassIndex]);
    this.gl.readPixels(
      0,  // x
      0,  // y
      this.particle_tex_xsize, // width
      this.particle_tex_ysize, // height
      this.gl.RGBA, // format
      this.gl.FLOAT, // type
      mass // pixels
    );
    // read the positions
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.particlePositionFramebuffers[this.particlePositionIndex]);
    this.gl.readPixels(
      0,  // x
      0,  // y
      this.particle_tex_xsize, // width
      this.particle_tex_ysize, // height
      this.gl.RGBA, // format
      this.gl.FLOAT, // type
      position // pixels
    );
    // read the positions
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.particleMomentumFramebuffers[this.particleMomentumIndex]);
    this.gl.readPixels(
      0,  // x
      0,  // y
      this.particle_tex_xsize, // width
      this.particle_tex_ysize, // height
      this.gl.RGBA, // format
      this.gl.FLOAT, // type
      momentum // pixels
    );
    this.draw(state, mass, position, momentum);
  }

  private tick = 0;

  draw = (state: Uint32Array, mass: Float32Array, position: Float32Array, momentum: Float32Array) => {
    if (this.tick == 100) {
      console.log(position);
      this.tick = 0;
    } else {
      this.tick++;
    }
    const render_canvas = this.render_canvas.current!
    const ctx = this.render_canvas.current!.getContext("2d")!;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, render_canvas.width, render_canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle= "#FF0000";
    for (let i = 0; i < position.length / 4; i++) {
      let x = position[i * 4 + 0];
      let y = position[i * 4 + 1];
      let m = mass[i * 4]
      let r = Math.sqrt(m);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
      // now draw momentum
      ctx.beginPath()
      ctx.moveTo(x, y);
      let vx = momentum[i * 4 + 0] / m;
      let vy = momentum[i * 4 + 1] / m;
      ctx.lineTo(x + vx, y + vy);
      ctx.stroke();
    }
  }

  render() {
    return <div style={this.props.style} className={this.props.className}>
      <div>
        <canvas
          className="border border-dark"
          ref={this.particle_canvas}
          height={this.particle_tex_xsize}
          width={this.particle_tex_ysize}
          hidden
        />
      </div>
      <div className="row">
        <div className="col-md-8 d-flex">
          <canvas
            className="border border-dark"
            ref={this.render_canvas}
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
                <option value={32}>2^6: 64</option>
                <option value={32}>2^6: 64</option>
                <option value={16}>2^8 64</option>
                <option value={32}>Grid 64</option>
              </select>
              <button className="btn btn-primary btn-sm" onClick={() => this.needsReset = true}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default WebGL2FluidAdvectionDemo;
