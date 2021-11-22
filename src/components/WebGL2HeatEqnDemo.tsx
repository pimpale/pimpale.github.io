import React from "react";
import { createShader, createProgram } from '../utils/webgl';

type WebGL2SetupDemoProps = {
  style?: React.CSSProperties,
  className?: string
  width: number,
  height: number
}


const vs = `#version 300 es
in vec4 position;
void main() {
  gl_Position = position;
}
`;


const fs = `#version 300 es
precision highp float;

uniform sampler2D heatTex;
 
out vec4 outColor;
 
void main() {

  vec4 value = texture(heatTex, gl_FragCoord.xy);

  // finally set value to the texture
  outColor = vec4(value.x, value.y, 0, 0);
}
`;




// TODO: learn how to handle error cases

type WebGL2SetupDemoState = {}

class WebGL2SetupDemo extends React.Component<WebGL2SetupDemoProps, WebGL2SetupDemoState> {
  private canvas = React.createRef<HTMLCanvasElement>();
  private gl!: WebGL2RenderingContext;

  private requestID!: number;

  constructor(props: WebGL2SetupDemoProps) {
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

    const positionLoc = this.gl.getAttribLocation(program, 'position');
    const heatTexLoc = this.gl.getUniformLocation(program, 'heatTex');
     
    // setup a full canvas clip space quad
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
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

    const tex = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1); // see https://webglfundamentals.org/webgl/lessons/webgl-data-textures.html
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,                // mip level
      this.gl.R8,            // internal format
      this.props.width,
      this.props.height,
      0,                // border
      this.gl.RED,           // format
      this.gl.UNSIGNED_BYTE, // type
      new Uint8Array(this.props.width * this.props.height)
    );

    this.gl.useProgram(program);
    this.gl.uniform1i(heatTexLoc, 0); 


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
    // draw triangles
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  render() {
    return <canvas
      style={this.props.style}
      className={this.props.className}
      ref={this.canvas}
      height={this.props.height}
      width={this.props.width}
    />
  }

}

export default WebGL2SetupDemo;
