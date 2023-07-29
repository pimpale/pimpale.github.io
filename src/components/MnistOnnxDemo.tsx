import React from 'react';
import * as ort from 'onnxruntime-web';
import Async from 'react-async';


import MnistOnnxUrl from '../assets/mnist_onnx/mnist.onnx?url';
import { Arrow90degDown } from 'react-bootstrap-icons';
import { softmax } from '../utils/math';

type MnistOnnxDemoProps = {
  model: ort.InferenceSession
}

type MnistOnnxDemoState = {
  pickerState: "empty" | "loading" | "error" | "drawn";
  modelOutput: { probs: number[], pick: number } | null;
  error: string | null;
}

class MnistOnnxDemoInner extends React.Component<MnistOnnxDemoProps, MnistOnnxDemoState> {

  // this is the ref to the file picker
  private filepicker = React.createRef<HTMLInputElement>();

  private drawCanvas = React.createRef<HTMLCanvasElement>();
  private mnistCanvas = React.createRef<HTMLCanvasElement>();

  // final canvas element
  private canvas = React.createRef<HTMLCanvasElement>();

  constructor(props: MnistOnnxDemoProps) {
    super(props);
    this.state = {
      pickerState: "empty",
      modelOutput: null,
      error: null
    };
  }

  doPickImage = async () => {
    this.setState({ pickerState: "loading" });
    // retrieve image file from file picker
    const file = this.filepicker.current!.files![0];
    // create a new image element
    const img = new Image();
    // set the image element src to the file url
    img.src = URL.createObjectURL(file);
    // get the canvas context
    const ctx = this.canvas.current!.getContext('2d')!;
    // when the image is loaded, draw the image on the canvas
    try {
      await img.decode();
      ctx.drawImage(img, 0, 0, 28, 28);
      this.setState({ pickerState: "drawn", error: null });
    } catch (e: any) {
      console.log(e);
      this.setState({
        pickerState: "error",
        error: e.message
      });
    }
  }

  doInference = async () => {
    const file = this.filepicker.current!.files![0];
    console.log(file)
    if (file === null || file === undefined) {
      this.setState({
        pickerState: "error",
        error: "Please select a file to classify."
      })
      return;
    }

    const ctx = this.canvas.current!.getContext('2d')!;
    // get the image data from the canvas
    const imageData = ctx.getImageData(0, 0, 28, 28);
    // get the grayscale data from the image data
    const data = new Float32Array(28 * 28);
    for (let i = 0; i < 28 * 28; i++) {
      const j = i * 4;
      data[i] = (imageData.data[j] + imageData.data[j + 1] + imageData.data[j + 2]) / 3 / 255;
    }
    // create a tensor from the data
    const inputTensor = new ort.Tensor('float32', data, [1, 1, 28, 28]);
    // run inference with the tensor
    const outputMap = await this.props.model.run({ input: inputTensor });
    // get the output tensor
    const outputTensor = outputMap.output
    // get the data from the tensor
    const logits = outputTensor.data as Float32Array;
    // get the max value from the output logits
    const maxValue = Math.max(...logits);
    // get the index of the max value
    const maxIndex = logits.indexOf(maxValue);

    this.setState({
      modelOutput: {
        pick: maxIndex,
        probs: softmax(Array.from(logits))
      }
    });
  }

  render() {
    const num_format = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
    const output = this.state.modelOutput;
    return <>
        <div className='mb-3'>
          <p className='text-center'>
            Draw Here <Arrow90degDown className='fs-4' style={{ transform: "translateY(0.5rem) scale(-1, 1)" }} />
          </p>
          <canvas ref={this.canvas} className="border border-dark mx-auto d-block" style={{ 'width': '15rem', 'height': '15rem' }} width={28} height={28} />
        </div>
        <h2>OR</h2>
        <div className='mb-3 mx-auto' style={{ maxWidth: "20rem" }}>
          <label htmlFor='input' className='form-label'>Load file</label>
          <input className={['form-control', this.state.error === null ? '' : 'is-invalid'].join(' ')} type='file' ref={this.filepicker} onChange={() => this.doPickImage()} />
          <div className='invalid-feedback'>
            {this.state.error}
          </div>
        </div>
      <canvas ref={this.canvas} className="d-hidden" width={28} height={28} />
      {output !== null
        ? <div className='alert alert-dark' role='alert'>
          <h4 className='alert-heading'>Model's Guess:</h4>
          <hr />
          {
            output.probs.map((p, i) => <div className='d-flex flex-row'>
              <div className={[i === output.pick ? 'bg-success text-light' : '', 'text-center fs-2 me-1 rounded'].join(' ')} style={{ width: "2rem" }}>
                {i}
              </div>
              <div className="flex-grow-1 d-flex flex-column">
                <div>
                  {num_format.format(p)}
                </div>
                <div className='progress'>
                  <div className='progress-bar bg-danger' key={i} style={{ width: `${p * 100}%` }} />
                </div>
              </div>
            </div>)
          }
        </div>
        : null
      }
    </>
  }
}

function MnistOnnxDemo() {
  return (
    <Async promise={ort.InferenceSession.create(MnistOnnxUrl)}>
      <Async.Loading>Loading...</Async.Loading>
      <Async.Resolved<ort.InferenceSession>>{(model) => <MnistOnnxDemoInner model={model} />}</Async.Resolved>
    </Async>
  );
}

export default MnistOnnxDemo;
