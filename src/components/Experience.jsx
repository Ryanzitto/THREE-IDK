import {
  Environment,
  Sky,
  Box,
  ContactShadows,
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { AvatarController } from "./AvatarController";
import { DollarController } from "./DollarController";
import { useRef, useEffect } from "react";
import { useStoreApp } from "../store";
import { useFrame, useThree } from "@react-three/fiber";

export const Experience = () => {
  const stage = useRef();

  const { camera } = useThree();
  const { dollarCount, gameStage } = useStoreApp();
  let audio1 = new Audio("audio/tutorial.mp3");
  let audio2 = new Audio("audio/magia1.mp3");

  useEffect(() => {
    if (gameStage === "MENU") {
      camera.fov = 8;
    }
    if (gameStage === "GAME") {
      camera.fov = 50;
      audio1.play();
      setTimeout(() => {
        audio2.play();
      }, 30000);
    }
    camera.updateProjectionMatrix();
  }, [gameStage]);

  return (
    <>
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        enableZoom={false}
      />
      <Sky />
      <ambientLight intensity={1} />
      <ContactShadows
        opacity={1}
        scale={11}
        blur={1}
        far={10}
        resolution={256}
      />
      <Environment preset="apartment" />
      <RigidBody position={[-2.5, 2, -6]} colliders={false} type="fixed">
        <Text3D size={0.8} font={"fonts/Fjalla One_Regular.json"}>
          DOLLARS: {dollarCount}K
          <meshNormalMaterial />
        </Text3D>
      </RigidBody>

      <RigidBody position={[0, 0.5, 0]} colliders={false}>
        <AvatarController />
      </RigidBody>

      <RigidBody type="fixed" name="ground" friction={2}>
        <group position-y={0.2}>
          <DollarController />
        </group>

        <Box position={[0, -0.6, 0]} args={[11, 1, 10]} ref={stage}>
          <meshNormalMaterial />
        </Box>
      </RigidBody>

      <RigidBody type="fixed" name="void" colliders={false}>
        <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
      </RigidBody>
    </>
  );
};
