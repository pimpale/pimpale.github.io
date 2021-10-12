import React from "react";
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

type TorusDemoProps = {
  style?: React.CSSProperties,
  className?: string
}

type TorusDemoState = {}

const xn = 10;
const yn = 10;

const planeGeometry = new THREE.PlaneGeometry(1, 1, xn, yn)

const planeMaterial =
  new THREE.MeshBasicMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
    color: 0x8ec07c,
    side: THREE.DoubleSide
  });

const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x1d2021 });

const xEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xdc3545 });
const yEdgeMaterial = new THREE.LineBasicMaterial({ color: 0x6610f2});

const leftEdgeGeometry = new THREE.BufferGeometry().setFromPoints(
  new Array(xn).fill(null).flatMap((_, i) => [
      new THREE.Vector3(-0.5, i / xn - 0.5, 0),
      new THREE.Vector3(-0.5, (i+1) / xn - 0.5, 0),
  ])
);

const rightEdgeGeometry = new THREE.BufferGeometry().setFromPoints(
  new Array(xn).fill(null).flatMap((_, i) => [
      new THREE.Vector3(0.5, i / xn - 0.5, 0),
      new THREE.Vector3(0.5, (i+1) / xn - 0.5, 0),
  ])
);

const topEdgeGeometry = new THREE.BufferGeometry().setFromPoints(
  new Array(yn).fill(null).flatMap((_, i) => [
      new THREE.Vector3(i / yn - 0.5, 0.5, 0),
      new THREE.Vector3((i+1) / yn - 0.5, 0.5, 0),
  ])
);

const bottomEdgeGeometry = new THREE.BufferGeometry().setFromPoints(
  new Array(yn).fill(null).flatMap((_, i) => [
      new THREE.Vector3(i / yn - 0.5, -0.5, 0),
      new THREE.Vector3((i+1) / yn - 0.5, -0.5, 0),
  ])
);


class TorusDemo extends React.Component<TorusDemoProps, TorusDemoState> {

  // this is the ref that three js uses
  private mount = React.createRef<HTMLDivElement>();

  // this is the ref we use to monitor circularization
  private torusnessRange = React.createRef<HTMLInputElement>();

  private majorRange = React.createRef<HTMLInputElement>();
  private minorRange = React.createRef<HTMLInputElement>();
  private lerpRange = React.createRef<HTMLInputElement>();

  // we assume these variables are properly initialized
  private requestID!: number;
  private controls!: TrackballControls;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.Mesh;


  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.handleCircularityChange();
    this.startAnimationLoop();
    window.addEventListener('resize', this.handleWindowResize);
    this.torusnessRange.current!.addEventListener('input', this.handleTorusChange);
    this.majorRange.current!.addEventListener('input', this.handleCircularityChange);
    this.minorRange.current!.addEventListener('input', this.handleCircularityChange);
    this.lerpRange.current!.addEventListener('input', this.handleCircularityChange);
  }


  componentWillUnmount() {
    this.torusnessRange.current!.removeEventListener('input', this.handleTorusChange);
    this.majorRange.current!.removeEventListener('input', this.handleCircularityChange);
    this.minorRange.current!.removeEventListener('input', this.handleCircularityChange);
    this.lerpRange.current!.removeEventListener('input', this.handleCircularityChange);
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID!);
    this.controls!.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.mount.current!.clientWidth;
    const height = this.mount.current!.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      1,
      0.1,
      100,
    );

    this.camera.position.z = 2; // is used here to set some distance from a plane that is located at z = 0
    // TrackballControls allow a camera to trackball around the object
    // https://threejs.org/docs/#examples/controls/TrackballControls
    this.controls = new TrackballControls(this.camera, this.mount.current!);

    this.controls.noPan = true;
    this.controls.noZoom = true;

    this.renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha true enables transparency
    this.renderer.setSize(width, height);
    this.mount.current!.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    // add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);
  };

  interpolate = (geoBuf: ArrayLike<number>, majorAlpha: number, minorAlpha: number, lerpAlpha: number) => {
    // we're going to calculate a new position that's an interpolation
    const newPosition = new Float32Array(geoBuf.length);

    const majorRadius = 0.5;
    const minorRadius = 0.3;

    for (let i = 0; i < geoBuf.length / 3; i++) {
      // original x positions
      const x = geoBuf[i * 3 + 0];
      const y = geoBuf[i * 3 + 1];
      const z = geoBuf[i * 3 + 2];

      const theta = (x * minorAlpha + 0.75) * 2 * Math.PI;
      const phi = y * majorAlpha * 2 * Math.PI;

      // circular x positions
      const nx = (majorRadius + minorRadius * Math.cos(theta)) * Math.cos(phi);
      const ny = (majorRadius + minorRadius * Math.cos(theta)) * Math.sin(phi);
      const nz = minorRadius * Math.sin(theta);

      // lerp the new values between the circle calculated
      newPosition[i * 3 + 0] = x + (nx - x) * lerpAlpha;
      newPosition[i * 3 + 1] = y + (ny - y) * lerpAlpha;
      newPosition[i * 3 + 2] = z + (nz - z) * lerpAlpha;
    }

    return newPosition;
  }

  handleTorusChange = () => {
      const torusnessAlpha = this.torusnessRange.current!.valueAsNumber;

      this.majorRange.current!.valueAsNumber = torusnessAlpha;
      this.minorRange.current!.valueAsNumber = torusnessAlpha;
      this.lerpRange.current!.valueAsNumber = Math.min(torusnessAlpha*1.5, 1);
      //now continue
      this.handleCircularityChange();
  }


  handleCircularityChange = () => {
    // how much to lerp towards circle
    const majorAlpha = this.majorRange.current!.valueAsNumber;
    const minorAlpha = this.minorRange.current!.valueAsNumber;
    const lerpAlpha = this.lerpRange.current!.valueAsNumber;

    // remove old mesh
    this.scene.remove(this.mesh);

    const newPosition = this.interpolate(
      planeGeometry.attributes.position.array,
      majorAlpha, minorAlpha, lerpAlpha
    );

    // set our new geometry
    let newGeometry = planeGeometry.clone();
    newGeometry.setAttribute('position', new THREE.BufferAttribute(newPosition, 3));


    // create mesh
    const mesh = new THREE.Mesh(newGeometry, planeMaterial);

    // wireframe
    mesh.add(
      new THREE.LineSegments(
        new THREE.WireframeGeometry(mesh.geometry),
        wireframeMaterial
      )
    );

    // left edge
    let newLeftEdgeGeometry = leftEdgeGeometry.clone();
    newLeftEdgeGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        this.interpolate(
          leftEdgeGeometry.attributes.position.array,
          majorAlpha, minorAlpha, lerpAlpha
        ),
        3
      )
    );
    mesh.add(
      new THREE.LineSegments(
        newLeftEdgeGeometry,
        xEdgeMaterial
      )
    );

    // right edge
    let newRightEdgeGeometry = rightEdgeGeometry.clone();
    newRightEdgeGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        this.interpolate(
          rightEdgeGeometry.attributes.position.array,
          majorAlpha, minorAlpha, lerpAlpha
        ),
        3
      )
    );
    mesh.add(
      new THREE.LineSegments(
        newRightEdgeGeometry,
        xEdgeMaterial
      )
    );

    // top edge
    let newTopEdgeGeometry = topEdgeGeometry.clone();
    newTopEdgeGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        this.interpolate(
          topEdgeGeometry.attributes.position.array,
          majorAlpha, minorAlpha, lerpAlpha
        ),
        3
      )
    );
    mesh.add(
      new THREE.LineSegments(
        newTopEdgeGeometry,
        yEdgeMaterial
      )
    );

    // bottom edge
    let newBottomEdgeGeometry = bottomEdgeGeometry.clone();
    newBottomEdgeGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        this.interpolate(
          bottomEdgeGeometry.attributes.position.array,
          majorAlpha, minorAlpha, lerpAlpha
        ),
        3
      )
    );
    mesh.add(
      new THREE.LineSegments(
        newBottomEdgeGeometry,
        yEdgeMaterial
      )
    );



    // add mesh
    this.scene.add(mesh);
    this.mesh = mesh;
  }

  startAnimationLoop = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.mount.current!.clientWidth;
    const height = this.mount.current!.clientHeight;

    this.controls.handleResize();
    this.renderer.setSize(width, height);
  };

  render() {
    return <div style={this.props.style} className={this.props.className}>
      <div ref={this.mount} className="ratio ratio-1x1 border border-dark mb-3" />

      <div className="mx-auto d-block flex-grow-1 mb-2">
        <label className="form-label">Torusness</label>
        <input type="range" className="form-range" min="0" max="1" step="0.05" defaultValue="0" ref={this.torusnessRange} />
      </div>

      <details>
        <summary>Advanced Torus Controls</summary>
        <div className="mx-auto d-block flex-grow-1 ">
          <label className="form-label">Join Major</label>
          <input type="range" className="form-range" min="0" max="1" step="0.05" defaultValue="0" ref={this.majorRange} />
        </div>
        <div className="mx-auto d-block flex-grow-1 ">
          <label className="form-label">Join Minor</label>
          <input type="range" className="form-range" min="0" max="1" step="0.05" defaultValue="0" ref={this.minorRange} />
        </div>
        <div className="mx-auto d-block flex-grow-1 ">
          <label className="form-label">Alpha</label>
          <input type="range" className="form-range" min="0" max="1" step="0.05" defaultValue="0" ref={this.lerpRange} />
        </div>
      </details>
    </div>;
  }
}

export default TorusDemo;
