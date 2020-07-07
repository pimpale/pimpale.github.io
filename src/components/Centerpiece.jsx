import React, { useRef } from 'react'
import { Canvas, useFrame, extend, useThree } from 'react-three-fiber'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });


const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();  useFrame((state) => controls.current.update());
    return <orbitControls
          ref={controls}
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.1}
          autoRotate={true}
          args={[camera, domElement]} />;
};

function Thing(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1,1,1]}>
      <icosahedronGeometry attach="geometry" />
      <meshStandardMaterial attach="material" wireframe={true} color='#fbf1c7' />
    </mesh>
  )
}

function Centerpiece(props) {
  return(
  <Canvas {...props}>
    <CameraControls />
    <ambientLight />
    <Thing position={[0, 0, 0]} />
  </Canvas>
  );
}

export default Centerpiece;
