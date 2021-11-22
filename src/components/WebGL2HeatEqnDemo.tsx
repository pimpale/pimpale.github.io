import React from "react";
import { createShader, createProgram, createTexture } from '../utils/webgl';

type WebGL2HeatEqnDemoProps = {
  style?: React.CSSProperties,
  className?: string
  size: number
}


const vs = `#version 300 es
in vec2 c_position;
out vec2 v_texCoord;
uniform vec2 u_resolution;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`;

const fs = `#version 300 es
precision highp float;

// the heat texture
uniform sampler2D u_heatTex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

out vec4 outColor;
 
void main() {
  // 0 1 2
  // 1
  // 2

  float v01 = texture(u_heatTex, v_texCoord + (-0.005,+0.000)).r;
  float v10 = texture(u_heatTex, v_texCoord + (+0.000,-0.005)).r;
  float v12 = texture(u_heatTex, v_texCoord + (+0.000,+0.005)).r;
  float v21 = texture(u_heatTex, v_texCoord + (+0.005,+0.000)).r;

  float sum =
          v01 +
    v10 +       v12 +
          v21;

  // finally set value to the texture
  if(v_texCoord.x < 0.01 || v_texCoord.x > 0.99 || v_texCoord.y < 0.01 || v_texCoord.y > 0.99) {
    outColor = vec4(1.0, 0.0, 0.0, 1.0);
  } else {
    outColor = vec4(sum/4.0, 0.0, 0.0, 1.0);
  }
}
`;




// TODO: learn how to handle error cases

type WebGL2HeatEqnDemoState = {}

class WebGL2HeatEqnDemo extends React.Component<WebGL2HeatEqnDemoProps, WebGL2HeatEqnDemoState> {
  private canvas = React.createRef<HTMLCanvasElement>();
  private gl!: WebGL2RenderingContext;

  // a list of textures that we will cycle through
  private textures:WebGLTexture[] = [];
  // a list of framebuffers we will cycle through
  private framebuffers:WebGLFramebuffer[] = [];

  // the frame number we're on
  private frameCount : number = 0;

  private requestID!: number;

  constructor(props: WebGL2HeatEqnDemoProps) {
    super(props);
  }

  componentDidMount() {
    // get webgl
    this.gl = this.canvas.current!.getContext('webgl2')!;

    const program = createProgram(
      this.gl,
      [
        createShader(this.gl, this.gl.VERTEX_SHADER, vs),
        createShader(this.gl, this.gl.FRAGMENT_SHADER, fs),
      ]
    )!;

    const positionLoc = this.gl.getAttribLocation(program, 'c_position');
    const heatTexLoc = this.gl.getUniformLocation(program, 'u_heatTex');
    const resolutionLoc  = this.gl.getUniformLocation(program, "u_resolution");

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


    // Create a vertex array object (attribute state)
    const vao = this.gl.createVertexArray()!;
    this.gl.bindVertexArray(vao);


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



    for (let i = 0; i < 2; i++) {
      const tex = createTexture(this.gl, new ImageData(this.props.size, this.props.size))!;
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

    this.gl.useProgram(program);

    // Tell the shader to get the texture from texture unit 0
    this.gl.uniform1i(heatTexLoc, 0);
    // set resolution
    this.gl.uniform2f(resolutionLoc, this.props.size, this.props.size);

    // start animation loop
    this.animationLoop();
  }



  componentWillUnmount() {
    // stop animation loop
    window.cancelAnimationFrame(this.requestID!);
    // destroy webgl
    this.gl.getExtension('WEBGL_lose_context')!.loseContext();
  }

  animationLoop = () => {
    this.requestID = window.requestAnimationFrame(this.animationLoop);

    const fbo = this.framebuffers[this.frameCount % 2];
    const tex = this.textures[(this.frameCount + 1) % 2];

    // make tex the teture to render to
    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

    // make fbo the current framebuffer
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);

    // execute draw to texture
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

    // const results = new Uint8Array(this.props.width*this.props.height*4);
    // this.gl.readPixels(0, 0, this.props.width, this.props.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, results);
    // console.log(results);

    // set the canvas as the current framebuffer
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    // execute draw to canvas
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

    this.frameCount++;
  }

  render() {
    return <canvas
      style={this.props.style}
      className={this.props.className}
      ref={this.canvas}
      height={this.props.size}
      width={this.props.size}
    />
  }

}

export default WebGL2HeatEqnDemo;
