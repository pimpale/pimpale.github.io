import React from 'react';

type SingularityDemoProps = {
  style: React.CSSProperties,
}

type SingularityDemoState = {}

type Side = "A" | "B" | "C";

class SingularityDemo extends React.Component<SingularityDemoProps, SingularityDemoState> {

  private displayCanvas = React.createRef<HTMLCanvasElement>();

  private x:number = 5;
  private y:number = 5;
  private side:Side = "A";


  componentDidUpdate() {
    this.paint();
  }

  render() {
    const { width, height } = this.props.base;
    return (
      <canvas className="border border-dark"
        ref={this.displayCanvas}
        width={width}
        height={height}
      />
    );
  }


}
