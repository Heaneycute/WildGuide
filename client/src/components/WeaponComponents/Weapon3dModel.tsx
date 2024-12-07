import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF,  Environment,Html } from "@react-three/drei";

interface Weapon3dModelProps {
  modelLink: string;
}

const Weapon3dModel: React.FC<Weapon3dModelProps> = ({ modelLink }) => {
  const { scene } = useGLTF(modelLink);  // Загрузка 3D модели
  const modelRef = useRef<any>();

  // Вращение модели
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Suspense fallback={<Html center>Загрузка 3D модели...</Html>}>
      <primitive ref={modelRef} object={scene} scale={[2, 2, 2]} /> {/* Увеличиваем масштаб модели */}
    </Suspense>
  );
};

const Weapon3dCanvas: React.FC<{ modelLink: string }> = ({ modelLink }) => (
  <Canvas style={{ height: "100%" }} camera={{ position: [5, 2, 10], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <spotLight position={[-10, -10, -10]} angle={0.15} intensity={1} castShadow />
    <OrbitControls enableDamping dampingFactor={0.1} enableZoom />
    
          <Environment preset="forest" background={false} />
    <Weapon3dModel modelLink={modelLink} />
  </Canvas>
);

export default Weapon3dCanvas;