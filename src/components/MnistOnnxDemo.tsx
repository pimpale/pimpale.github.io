import React from 'react';
import * as ort from 'onnxruntime-web';
import Async from 'react-async';

import MnistOnnxUrl from '../assets/mnist_onnx/mnist.onnx?url';
import { Arrow90degDown } from 'react-bootstrap-icons';
import { softmax } from '../utils/math';

// import digits 0-9
import MnistDigit0 from '../assets/mnist_onnx/mnist_digits/0.png';
import MnistDigit1 from '../assets/mnist_onnx/mnist_digits/1.png';
import MnistDigit2 from '../assets/mnist_onnx/mnist_digits/2.png';
import MnistDigit3 from '../assets/mnist_onnx/mnist_digits/3.png';
import MnistDigit4 from '../assets/mnist_onnx/mnist_digits/4.png';
import MnistDigit5 from '../assets/mnist_onnx/mnist_digits/5.png';
import MnistDigit6 from '../assets/mnist_onnx/mnist_digits/6.png';
import MnistDigit7 from '../assets/mnist_onnx/mnist_digits/7.png';
import MnistDigit8 from '../assets/mnist_onnx/mnist_digits/8.png';
import MnistDigit9 from '../assets/mnist_onnx/mnist_digits/9.png';

const MnistDigits = [MnistDigit0, MnistDigit1, MnistDigit2, MnistDigit3, MnistDigit4, MnistDigit5, MnistDigit6, MnistDigit7, MnistDigit8, MnistDigit9];


type MnistOnnxDemoProps = {
  model: ort.InferenceSession
}

type MnistOnnxDemoState = {
  selectedImage: number | "custom" | null;
  pickerState: "empty" | "loading" | "error" | "loaded";
  modelOutput: { probs: number[], pick: number } | null;
  error: string | null;
}

class MnistOnnxDemoInner extends React.Component<MnistOnnxDemoProps, MnistOnnxDemoState> {

  // this is the ref to the file picker
  private filepicker = React.createRef<HTMLInputElement>();

  // these are the mnist digit images
  private mnistDigitImages = [...Array(10).keys()].map(_ => React.createRef<HTMLImageElement>());

  // this is the image that will be loaded from the picker
  private customImage = React.createRef<HTMLImageElement>();

  // this is the canvas which will be drawn on
  private canvas = React.createRef<HTMLCanvasElement>();


  constructor(props: MnistOnnxDemoProps) {
    super(props);
    this.state = {
      selectedImage: null,
      pickerState: "empty",
      modelOutput: null,
      error: null
    };
  }

  componentDidMount() {
    const ctx = this.canvas.current!.getContext('2d')!;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 28, 28);
  }

  doInference = async () => {
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

  doSelectMnistImage = (i: number | "custom") => {
    // get the image element
    const img = i === "custom"
      ? this.customImage.current!
      : this.mnistDigitImages[i].current!;

    // paint image on drawing canvas
    const ctx = this.canvas.current!.getContext('2d')!;
    ctx.clearRect(0, 0, 28, 28);
    ctx.drawImage(img, 0, 0, 28, 28);

    // set state
    this.setState({ selectedImage: i });

    this.doInference();
  }

  doUploadImage = () => {
    this.setState({ pickerState: "loading" });
    // retrieve image file from file picker
    const file = this.filepicker.current!.files![0];
    // get the custom image element
    const img = this.customImage.current!;
    // set the image element src to the file url
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      this.setState({
        pickerState: "loaded",
        error: null,
      });
      this.doSelectMnistImage("custom");
    }

    img.onerror = () => {
      this.setState({
        pickerState: "error",
        // erase selection if there is an error
        selectedImage: this.state.selectedImage === "custom"
          ? null
          : this.state.selectedImage,
        error: "Error loading image"
      });
    }
  }

  render() {
    const num_format = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
    const output = this.state.modelOutput;
    return <>
      <div className='d-flex justify-content-evenly mb-3'>
        <div style={{ maxWidth: "17rem" }}>
          <h3>Load an image</h3>
          {/*map each integer from 0 to 9*/}
          {[...Array(10).keys()].map((i) =>
            <div key={i} className="form-check form-check-inline">
              <input className="form-check-input" type="radio" checked={this.state.selectedImage === i} onChange={() => this.doSelectMnistImage(i)} />
              <label className="form-check-label">
                <div style={{ display: 'inline-block', width: "1rem" }}>{i}</div>
                <img ref={this.mnistDigitImages[i]} src={MnistDigits[i]} className="ms-1" style={{ width: "2rem", height: "2rem" }} />
              </label>
            </div>
          )}
          <div className="form-check form-check">
            <input
              className="form-check-input"
              type="radio"
              disabled={this.state.pickerState !== "loaded"}
              checked={this.state.selectedImage === "custom"}
              onChange={() => this.doSelectMnistImage("custom")}
            />
            <label className="form-check-label">
              <div style={{ display: 'inline-block' }}>Custom:</div>
              <img ref={this.customImage} className="ms-1" style={{ width: "2rem", height: "2rem" }} />
            </label>
          </div>
          <div className="mt-1">
            <input
              className={['form-control', this.state.error === null ? '' : 'is-invalid'].join(' ')}
              type='file' ref={this.filepicker}
              onChange={this.doUploadImage}
            />
            <div className='invalid-feedback'>
              {this.state.error}
            </div>
          </div>
        </div>
        <div>
          <h3>Draw your own</h3>
          <p className='text-center'>
            Draw Here <Arrow90degDown className='fs-4' style={{ transform: "translateY(0.5rem) scale(-1, 1)" }} />
          </p>
          <canvas ref={this.canvas} className="border border-dark mx-auto d-block" style={{ 'width': '15rem', 'height': '15rem' }} width={28} height={28} />
        </div>
      </div>
      {output !== null
        ? <div className='alert alert-dark' role='alert'>
          <h4 className='alert-heading'>Model's Guess:</h4>
          <hr />
          {
            output.probs.map((p, i) => <div className='d-flex flex-row'>
              <div className={[i === output.pick ? 'bg-success text-light' : '', 'text-center fs-3 me-1 rounded'].join(' ')} style={{ width: "2rem" }}>
                {i}
              </div>
              <div className="flex-grow-1 d-flex flex-column">
                <div style={{fontSize: "0.8rem"}}>
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
