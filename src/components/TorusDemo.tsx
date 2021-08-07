import React from "react";
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

type TorusDemoProps = {
  style?: React.CSSProperties,
  className?: string
}

type TorusDemoState = {}

const planeGeometry = new THREE.PlaneGeometry(1, 1, 10, 10)

const planeMaterial =
  new THREE.MeshBasicMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
    color: 0x458588,
    side: THREE.DoubleSide
  })
;


class TorusDemo extends React.Component<TorusDemoProps, TorusDemoState> {

  // this is the ref that three js uses
  private mount = React.createRef<HTMLDivElement>();

  // this is the ref we use to monitor circularization
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
    this.majorRange.current!.addEventListener('input', this.handleCircularityChange);
    this.minorRange.current!.addEventListener('input', this.handleCircularityChange);
    this.lerpRange.current!.addEventListener('input', this.handleCircularityChange);
  }


  componentWillUnmount() {
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

  handleCircularityChange = () => {
    // how much to lerp towards circle
    const majorAlpha = this.majorRange.current!.valueAsNumber;
    const minorAlpha = this.minorRange.current!.valueAsNumber;
    const lerpAlpha = this.lerpRange.current!.valueAsNumber;

    // we're going to calculate a new position that's an interpolation
    const newPosition = new Float32Array(planeGeometry.attributes.position.count * 3);

    const majorRadius = 0.5;
    const minorRadius = 0.3;

    for (let i = 0; i < planeGeometry.attributes.position.count; i++) {
      // original x positions
      const x = planeGeometry.attributes.position.getX(i);
      const y = planeGeometry.attributes.position.getY(i);
      const z = planeGeometry.attributes.position.getZ(i);

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

    // set our new geometry
    let newGeometry = planeGeometry.clone();
    newGeometry.setAttribute('position', new THREE.BufferAttribute(newPosition, 3));

    // remove old mesh
    this.scene.remove(this.mesh);

    // add mesh
    const mesh = new THREE.Mesh(newGeometry, planeMaterial);
    this.scene.add(mesh);
    this.mesh = mesh;

    // wireframe
    let geo = new THREE.WireframeGeometry(this.mesh.geometry);
    let mat = new THREE.LineBasicMaterial({ color: 0x1d2021 });
    let wireframe = new THREE.LineSegments(geo, mat);
    mesh.add(wireframe);
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
      <div ref={this.mount} className="ratio ratio-1x1 border border-dark" />
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
    </div>;
  }
}

export default TorusDemo;
