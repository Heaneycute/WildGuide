import {
  Environment,
  OrbitControls,
  useGLTF,
  Lightformer,
  Sphere,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Scene } from "./Scene";
import * as THREE from "three";

export const scenes = [
  {
    path: "models/elk_free.glb",
    mainColor: "#E6ECF5",
    name: "Лось европейский",
    description:
      "Масса: 200-700кг. Длина: 2,4 – 3,1 м ",
    price: 72000,
    range: 660,
  },
  {
    path: "models/free_realistic_bear.glb",
    mainColor: "#E6ECF5",
    name: "Model 3",
    description: "The car of the future",
    price: 29740,
    range: 576,
  },
  {
    path: "models/deer_scene-v1.glb",
    mainColor: "#E6ECF5",
    name: "Semi",
    description: "The Future of Trucking",
    price: 150000,
    range: 800,
  },
  {
    path: "models/duck_walk_free.glb",
    mainColor: "#E6ECF5",
    name: "Cybertruck",
    description:
      "Better utility than a truck with more performance than a sports car",
    price: 72000,
    range: 660,
  },
  {
    path: "models/Wolf-Blender-2.82a.glb",
    mainColor: "#E6ECF5",
    name: "Model 3",
    description: "The car of the future",
    price: 29740,
    range: 576,
  }
];


export default function Experience({sceneId}) {

  const { nodes } = useGLTF("/models/elk_free.glb");
  console.log(nodes);

  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" background args={["#E6ECF5"]} blur={4} /> 
      <group>
      <Environment preset="sunset" blur={0.8} background>
          <Sphere scale={15}>
          {/*   */}
            <meshBasicMaterial color={"#E6ECF5"} side={THREE.BackSide} />
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
      <Scene sceneId={sceneId} scenes={scenes}/>
    </>
  );
};