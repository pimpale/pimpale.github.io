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
 
uniform sampler2D srcTex;
 
out vec4 outColor;
 
void main() {
  ivec2 texelCoord = ivec2(gl_FragCoord.xy);
  vec4 value = texelFetch(srcTex, texelCoord, 0);  // 0 = mip level 0
  outColor = value * 2.0;
}
`;




// TODO: learn how to handle error cases

type WebGL2SetupDemoState = {}

class WebGL2SetupDemo extends React.Component<WebGL2SetupDemoProps, WebGL2SetupDemoState> {
  private canvas = React.createRef<HTMLCanvasElement>();
  private gl!: WebGL2RenderingContext;

  constructor(props: WebGL2SetupDemoProps) {
    super(props);
  }

  componentDidMount() {
    // get webgl
    this.gl = this.canvas.current!.getContext('webgl2')!;

    // Create a vertex array object (attribute state)
    const vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(vao);

 
    const program = createProgram(
        this.gl,
        [
            createShader(this.gl, this.gl.VERTEX_SHADER, vs),
            createShader(this.gl, this.gl.FRAGMENT_SHADER, fs),
        ]
    );
    const positionLoc = this.gl.getAttribLocation(program, 'position');
    const srcTexLoc = this.gl.getUniformLocation(program, 'srcTex');
     
    // setup a full canvas clip space quad
    const buffer = this.gl.createBuffer();
    gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), this.gl.STATIC_DRAW);
    

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

    // create our source texture
    const srcWidth = 3;
    const srcHeight = 2;
    const tex = gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1); // see https://webglfundamentals.org/webgl/lessons/webgl-data-textures.html
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,                // mip level
      this.gl.R8,            // internal format
      srcWidth,
      srcHeight,
      0,                // border
      this.gl.RED,           // format
      this.gl.UNSIGNED_BYTE, // type
      new Uint8Array([
        1, 2, 3,
        4, 5, 6,
      ]));
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

    this.gl.useProgram(program);
    this.gl.uniform1i(srcTexLoc, 0);  // tell the shader the src texture is on texture unit 0




  }



  componentWillUnmount() {
    // destroy webgl
    this.gl.getExtension('WEBGL_lose_context')!.loseContext();
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
