import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { TextureLoader } from "three";

const ThreeDModel = () => {
  const { scene } = useGLTF('/m9_bayonet.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={[2, 2, 2]} position={[0, -1, 0]} />;
};

const Background = () => {
  const texture = useLoader(TextureLoader, '/images/1.jpg');
  return (
    <mesh scale={[100, 100, 1]} position={[0, 0, -10]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default function App() {
  return (
    <div className="about_page">
      <div>
        <Canvas style={{ height: "100vh" }} camera={{ position: [5, 2, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="forest" background={true} />
          <OrbitControls enableDamping dampingFactor={0.05} enableZoom={true} />
          <Suspense fallback={<Html center>Loading...</Html>}>
            <Background />
            <ThreeDModel />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}