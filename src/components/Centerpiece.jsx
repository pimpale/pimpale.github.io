import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

function Thing(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.005))

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
    <ambientLight />
    <Thing position={[0, 0, 0]} />
  </Canvas>
  );
}

export default Centerpiece;
