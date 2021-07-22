import React from "react";
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";


type SingularityDemoProps = {
  style?: React.CSSProperties,
  className?: string
}

type SingularityDemoState = {}

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)

const cubeMaterials = [
  new THREE.MeshBasicMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
    color: 0x458588,
  }),
  new THREE.MeshBasicMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
    color: 0xdc3545,
  }),
  new THREE.MeshBasicMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
    color: 0x98971a,
  }),
  new THREE.MeshBasicMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
    color: 0xb16286,
  }),
  new THREE.MeshBasicMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
    color: 0xd79921,
  }),
  new THREE.MeshBasicMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
    color: 0xEBDBB2,
  }),
];


class SingularityDemo extends React.Component<SingularityDemoProps, SingularityDemoState> {

  // this is the ref that three js uses
  private mount = React.createRef<HTMLDivElement>();

  // this is the ref we use to monitor circularization
  private range = React.createRef<HTMLInputElement>();

  // we assume these variables are properly initialized
  private requestID!: number;
  private controls!: TrackballControls;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.Mesh;


  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.handleCircularityChange();
    this.startAnimationLoop();
    window.addEventListener('resize', this.handleWindowResize);
    this.range.current!.addEventListener('change', this.handleCircularityChange);
  }


  componentWillUnmount() {
    this.range.current!.removeEventListener('change', this.handleCircularityChange);
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
    this.camera = new THREE.OrthographicCamera(
      -1.5,
      1.5,
      1.5,
      -1.5,
    );

    this.camera.position.z = 10; // is used here to set some distance from a cube that is located at z = 0
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
    const alpha = this.range.current!.valueAsNumber;

    // we're going to calculate a new position that's an interpolation
    const newPosition = new Float32Array(cubeGeometry.attributes.position.count * 3);

    for (let i = 0; i < cubeGeometry.attributes.position.count; i++) {
      // original x positions
      const x = cubeGeometry.attributes.position.getX(i);
      const y = cubeGeometry.attributes.position.getY(i);
      const z = cubeGeometry.attributes.position.getZ(i);

      const dist = Math.hypot(x, y, z);

      // circular x positions
      const nx = x / dist;
      const ny = y / dist;
      const nz = z / dist;

      // lerp the new values between the circle calculated
      newPosition[i * 3 + 0] = x + (nx - x) * alpha;
      newPosition[i * 3 + 1] = y + (ny - y) * alpha;
      newPosition[i * 3 + 2] = z + (nz - z) * alpha;
    }

    // set our new geometry
    let newGeometry = cubeGeometry.clone();
    newGeometry.setAttribute('position', new THREE.BufferAttribute(newPosition, 3));

    // remove old mesh
    this.scene.remove(this.mesh);

    // add mesh
    const mesh = new THREE.Mesh(newGeometry, cubeMaterials);
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
        <label className="form-label">Circularness</label>
        <input type="range" className="form-range" min="0" max="1" step="0.05" defaultValue="0" ref={this.range} />
      </div>
    </div>;
  }
}

export default SingularityDemo;
