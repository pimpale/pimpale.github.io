import React from "react";
import { createShader, createProgram} from '../utils/webgl';
import { TrackballCamera, } from '../utils/camera';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

type HomepageDemoProps = {
  style?: React.CSSProperties,
  className?: string
  width: number,
  height: number
}


const vs = `#version 300 es
in vec4 a_position;

uniform mat4 u_worldViewProjection;

void main() {
   gl_Position = u_worldViewProjection * a_position;
}
`;


const fs = `#version 300 es
precision highp float;

out vec4 outColor;
 
void main() {
  // color: 0xEBDBB2,
  outColor = vec4(0.922,0.859,0.698, 1.0);
}
`;


const cubeVertices = [0.0, 1.0, -0, -1.0, -1.0, -0, 1.0, -1.0, -0];



// TODO: learn how to handle error cases

type HomepageDemoState = {}

class HomepageDemo extends React.Component<HomepageDemoProps, HomepageDemoState> {
  private canvas = React.createRef<HTMLCanvasElement>();
  private gl!: WebGL2RenderingContext;

  private camera!: TrackballCamera ;

  private worldViewProjectionLoc!: WebGLUniformLocation;

  private requestID!: number;

  constructor(props: HomepageDemoProps) {
    super(props);
  }

  componentDidMount() {

    // init camera
    this.camera = new TrackballCamera(5, this.canvas.current!);

    // get webgl
    this.gl = this.canvas.current!.getContext('webgl2')!;

    this.gl.enable(this.gl.DEPTH_TEST);

    const program = createProgram(
      this.gl,
      [
        createShader(this.gl, this.gl.VERTEX_SHADER, vs),
        createShader(this.gl, this.gl.FRAGMENT_SHADER, fs),
      ]
    )!;

    const positionLoc = this.gl.getAttribLocation(program, 'a_position');
    this.worldViewProjectionLoc =
      this.gl.getUniformLocation(program, "u_worldViewProjection")!;

    // we create two triangles that form a rectangle.
    // this rectangle covers the entire clip space, from -1 to 1 in both x and y
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(cubeVertices), this.gl.STATIC_DRAW);
    // setup our attributes to tell WebGL how to pull
    // the data from the buffer above to the position attribute
    this.gl.enableVertexAttribArray(positionLoc);
    this.gl.vertexAttribPointer(
      positionLoc,
      3,              // size (num components)
      this.gl.FLOAT,  // type of data in buffer
      false,          // normalize
      0,              // stride (0 = auto)
      0,              // offset
    );

    this.gl.useProgram(program);

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

    this.camera.theta += 0.001;

    // set uniform
    const worldViewProjectionMat = this.camera.getTrackballCameraMatrix( this.props.width, this.props.height);
    this.gl.uniformMatrix4fv(this.worldViewProjectionLoc, false, worldViewProjectionMat);

    // draw triangles
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
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

export default HomepageDemo;
