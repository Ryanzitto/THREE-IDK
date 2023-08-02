import {
  Environment,
  OrbitControls,
  CameraControls,
  Sky,
  ContactShadows,
  useTexture,
} from "@react-three/drei";
import Avatar from "./Avatar";
import { useControls } from "leva";

export const Experience = () => {
  const { animation } = useControls({
    animation: {
      value: "Idle",
      // options: ["Idle", "Greet", "Dance", "Ginga-1", "Capoeira", "Walk"],
    },
  });

  const texture = useTexture("texture/textura.jpg");
  return (
    <>
      <CameraControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        enableZoom={false}
      />
      <Sky />
      <Environment preset="apartment" />
      <group position-y={-1}>
        <ContactShadows
          opacity={1}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        <Avatar animation={animation} />
      </group>
      <mesh
        receiveShadow
        scale={3}
        rotation-x={-Math.PI * 0.5}
        position-y={-1.003}
      >
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color="white" map={texture} />
      </mesh>
    </>
  );
};
