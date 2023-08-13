import {
  Environment,
  Box,
  ContactShadows,
  OrbitControls,
  useTexture,
  Sky,
} from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { AvatarController } from "./Controllers/AvatarController";
import { DollarController } from "./Controllers/DollarController";
import { YoshiEggController } from "./Controllers/Yoshi_egg_Controller";
import { useEffect, useState } from "react";
import { useStoreApp } from "../store";
import { useThree } from "@react-three/fiber";
import { ChestController } from "./Controllers/ChestController";
import { ChickenController } from "./Controllers/ChickenController";
import { PirateController } from "./Controllers/PirateController";

import { BallController } from "./Controllers/ballController";

export const Experience = () => {
  const {
    gameStage,
    skinCoinActual,
    skinAvatarActual,
    experienceIsMounted,
    setExperienceIsMounted,
  } = useStoreApp();

  const { camera } = useThree();

  useEffect(() => {
    if (gameStage === "MENU") {
      camera.fov = 8;
    }
    if (gameStage === "GAME") {
      camera.fov = 50;
    }
  }, [gameStage]);

  useEffect(() => {
    setExperienceIsMounted(true);
  }, [experienceIsMounted]);

  return (
    <>
      <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      <Sky />
      <ambientLight intensity={1} />
      <ContactShadows
        opacity={1}
        scale={10}
        blur={1}
        far={10}
        resolution={256}
      />
      <Environment preset="apartment" />

      {skinAvatarActual === 0 && (
        <RigidBody position={[0, 0.57, 0]} colliders={false}>
          <AvatarController />
        </RigidBody>
      )}
      {skinAvatarActual === 1 && (
        <RigidBody position={[0, 0.57, 0]} colliders={false}>
          <PirateController />
        </RigidBody>
      )}
      <directionalLight intensity={0.3} />

      {skinCoinActual === 0 && (
        <group position-y={0.2}>
          <DollarController />
        </group>
      )}

      {skinCoinActual === 1 && (
        <group position-y={0.8}>
          <YoshiEggController />
        </group>
      )}
      {skinCoinActual === 2 && (
        <group position-y={0.1}>
          <ChestController />
        </group>
      )}

      {skinCoinActual === 3 && (
        <group position-y={4.9}>
          <ChickenController />
        </group>
      )}

      {gameStage === "GAME" ? <BallController /> : null}

      <RigidBody type="fixed" name="Floor">
        <Box position={[0, -0.53, 0]} args={[10, 1, 10]}>
          <meshNormalMaterial />
        </Box>
      </RigidBody>

      <RigidBody type="fixed">
        <Box position={[0, -1.7, 0]} args={[9, 1, 9]}>
          <meshStandardMaterial color={"#8b29e6"} />
        </Box>
      </RigidBody>

      <RigidBody type="fixed">
        <Box position={[0, -2.9, 0]} args={[8, 1, 8]}>
          <meshStandardMaterial color={"#e629bd"} />
        </Box>
      </RigidBody>

      {/* <RigidBody type="fixed" colliders={false}>
        <Sphere position={[0, 0, 0]} args={[5, 64, 64]} scale={3}>
          <meshStandardMaterial map={texture} side={THREE.BackSide} />
        </Sphere>
      </RigidBody> */}

      <RigidBody type="fixed" name="void" colliders={false}>
        <CuboidCollider position={[0, -3.5, 0]} args={[500, 0.1, 500]} sensor />
      </RigidBody>
    </>
  );
};
