import React from "react";
import { createShader, createProgram, createRedTexture } from '../utils/webgl';

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

// the heat texture
uniform usampler2D u_tex;

// resulution of texture
uniform vec2 u_resolution;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out uvec4 value;
 
void main() {
  // 0 1 2
  // 1
  // 2

  float x_off = 1.0/u_resolution.x;
  float y_off = 1.0/u_resolution.y;

  uint v01 = texture(u_tex, v_texCoord + vec2(-x_off,+0.000)).r;
  uint v10 = texture(u_tex, v_texCoord + vec2(+0.000,-y_off)).r;
  uint v12 = texture(u_tex, v_texCoord + vec2(+0.000,+y_off)).r;
  uint v21 = texture(u_tex, v_texCoord + vec2(+x_off,+0.000)).r;

  uint sum =
          v01 +
    v10 +       v12 +
          v21;

  // finally set value to the texture
  if(v_texCoord.x < 0.01 ) {
    value =  uvec4(4000000u, 0u, 0u, 0u);
  } else if (v_texCoord.x > 0.99 || v_texCoord.y < 0.01 || v_texCoord.y > 0.99) {
    value =  uvec4(0u, 0u, 0u, 0u);
  } else {
    value = uvec4(sum/4u, 0u, 0u, 0u);
  }
}
`;

// this fragment shader is used to render to the canvas so we can see what's going on
const render_fs = `#version 300 es
precision highp float;
precision highp usampler2D;

// the heat texture
uniform usampler2D u_tex;

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

    float val = float(texture(u_tex, v_texCoord).r)/4000000.0;
    outColor = vec4(inferno(val), 1.0);
}
`



// TODO: learn how to handle error cases

type WebGL2HeatEqnDemoState = {}

class WebGL2HeatEqnDemo extends React.Component<WebGL2HeatEqnDemoProps, WebGL2HeatEqnDemoState> {
  private canvas = React.createRef<HTMLCanvasElement>();
  private gl!: WebGL2RenderingContext;

  // a list of textures that we will cycle through
  private textures: WebGLTexture[] = [];
  // a list of framebuffers we will cycle through
  private framebuffers: WebGLFramebuffer[] = [];

  private prog_diffuse!: WebGLProgram;
  private prog_render!: WebGLProgram;

  // the frame number we're on
  private frameCount: number = 0;

  private requestID!: number;

  constructor(props: WebGL2HeatEqnDemoProps) {
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
      const texLoc = this.gl.getUniformLocation(this.prog_diffuse, 'u_tex');
      const resolutionLoc = this.gl.getUniformLocation(this.prog_diffuse, "u_resolution");

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
        const tex = createRedTexture(this.gl, this.props.size, this.props.size)!;
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

      // bind uniforms
      this.gl.useProgram(this.prog_diffuse);

      // Tell the shader to get the texture from texture unit 0
      this.gl.uniform1i(texLoc, 0);
      // set resolution
      this.gl.uniform2f(resolutionLoc, this.props.size, this.props.size);
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

    this.gl.useProgram(this.prog_diffuse);
    for(let i = 0; i < 1; i++) {
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
