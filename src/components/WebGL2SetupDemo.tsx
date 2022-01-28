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

// height and width
uniform float height;
uniform float width;
 
out vec4 outColor;
 
void main() {
  outColor = vec4(gl_FragCoord.x/400.0, gl_FragCoord.y/400.0, 0, 1.0);
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
    const widthLoc = this.gl.getUniformLocation(program, 'width');
    const heightLoc = this.gl.getUniformLocation(program, 'height');
     
    // we create two triangles that form a rectangle.
    // this rectangle covers the entire clip space, from -1 to 1 in both x and y
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

    this.gl.useProgram(program);

    // setup height and width
    this.gl.uniform1f(widthLoc, this.props.width);
    this.gl.uniform1f(heightLoc, this.props.height);


    // start animation loop
    this.animationLoop();
  }


  componentWillUnmount() {
    // stop animation loop
    window.cancelAnimationFrame(this.requestID!);
    // TODO: destroy vao, buffer, programs, shaders, etc
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

// color: 0xEBDBB2,
