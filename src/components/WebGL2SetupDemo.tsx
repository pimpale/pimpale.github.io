import React from "react";


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

type WebGL2SetupDemoState = {  }

class WebGL2SetupDemo extends React.Component<WebGL2SetupDemoProps, WebGL2SetupDemoState> {
  private canvas = React.createRef<HTMLCanvasElement>();
  private gl!: WebGL2RenderingContext;

  constructor(props: WebGL2SetupDemoProps) {
    super(props);
  }

  componentDidMount() {
    // get webgl
    this.gl = this.canvas.current!.getContext('webgl2')!;
    
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
