import {
  Environment,
  Lightformer,
  Sphere,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import  { useEffect} from "react";


export const Scene = ({ sceneId, scenes}) => {
  const { scene } = useGLTF(scenes[sceneId].path);
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
        <group dispose={null}>
        <primitive object={scene} scale={1}/>
        <ambientLight intensity={0.1} color="pink" />

        <Environment blur={0.8} background>
          <Sphere scale={15}>
            <meshBasicMaterial color={scenes[sceneId].mainColor} side={THREE.BackSide} />
          </Sphere>
          <Lightformer
            position={[5, 0, -5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="red" // (optional = white)
            scale={[3, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[-5, 0, 1]}
            form="circle" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="green" // (optional = white)
            scale={[2, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[0, 5, -2]}
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={0.5} // power level (optional = 1)
            color="orange" // (optional = white)
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
          <Lightformer
            position={[0, 0, 5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="purple" // (optional = white)
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
        </Environment>
      </group>
      </>)}


useGLTF.preload("/models/elk_free.glb");
useGLTF.preload("/models/free_realistic_bear.glb");
useGLTF.preload("/models/deer_scene-v1.glb");
useGLTF.preload("/models/duck_walk_free.glb");
useGLTF.preload("/models/Wolf-Blender-2.82a.glb");