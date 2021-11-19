import React from "react";
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";


type WireframeRendererProps = {
  style: React.CSSProperties,
  geometries: {
    geometry: THREE.BufferGeometry
    color: number
  }[]
}

type WireframeRendererState = {}

class WireframeRenderer extends React.Component<WireframeRendererProps, WireframeRendererState> {

  // this is the ref that three js uses
  private mount = React.createRef<HTMLDivElement>();

  // we assume these variables are properly initialized
  private requestID!: number;
  private controls!: TrackballControls;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private wireframeMesh: THREE.Mesh[] = [];


  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener('resize', this.handleWindowResize);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID!);
    this.controls!.dispose();
    this.renderer.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.mount.current!.clientWidth;
    const height = this.mount.current!.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      -10,
      10,
      10,
      -10,
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

    // create wireframe from provided geometry
    for (const { geometry, color } of this.props.geometries) {
      const material = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: color,
      });

      // add wireframe
      const wireframe = new THREE.Mesh(geometry, material);
      this.scene.add(wireframe);
      this.wireframeMesh.push(wireframe);
    }

    // add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);
  };

  startAnimationLoop = () => {
    this.wireframeMesh.forEach(w => w.rotateY(0.005));
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

    // only for perspective cameras
    /*
     * this.camera.aspect = width / height;
     * // Note that after making changes to most of camera properties you have to call
     * // .updateProjectionMatrix for the changes to take effect.
     * this.camera.updateProjectionMatrix();
     */
  };

  render() {
    return <div style={this.props.style} ref={this.mount} />;
  }
}

export default WireframeRenderer;
