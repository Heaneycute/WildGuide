import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three"; 

interface Weapon3dModelProps {
  modelLink: string;
}

const Weapon3dModel: React.FC<Weapon3dModelProps> = ({ modelLink }) => {
  const { scene } = useGLTF(modelLink);
  const modelRef = useRef<any>();
  const [scale, setScale] = useState([1, 1, 1]);

  useEffect(() => {
    if (modelRef.current) {
      const bbox = new THREE.Box3().setFromObject(modelRef.current);
      const size = bbox.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z);
      const scaleFactor = 1 / maxSize;  
      setScale([scaleFactor, scaleFactor, scaleFactor]);
    }
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Suspense fallback={<Html center>Загрузка 3D модели...</Html>}>
      <primitive ref={modelRef} object={scene} scale={scale} />
    </Suspense>
  );
};

const Weapon3dCanvas: React.FC<{ modelLink: string }> = ({ modelLink }) => (
  <Canvas style={{ height: "100%" }} camera={{ position: [0.5, 0.5, 1], fov: 50 }}> {/* Камера ближе */}
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <spotLight position={[-10, -10, -10]} angle={0.15} intensity={1} castShadow />
    <OrbitControls enableDamping dampingFactor={0.1} enableZoom />
    <Environment preset="city" background={false} />
    <Weapon3dModel modelLink={modelLink} />
  </Canvas>
);

export default Weapon3dCanvas;