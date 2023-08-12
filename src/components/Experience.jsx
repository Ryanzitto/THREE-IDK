import {
  Environment,
  Box,
  ContactShadows,
  OrbitControls,
  Sphere,
  useTexture,
  Sky,
} from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { AvatarController } from "./Controllers/AvatarController";
import { DollarController } from "./Controllers/DollarController";
import { YoshiEggController } from "./Controllers/Yoshi_egg_Controller";
import { useRef, useEffect, useState } from "react";
import { useStoreApp } from "../store";
import { useFrame, useThree } from "@react-three/fiber";
import { ChestController } from "./Controllers/ChestController";
import { ChickenController } from "./Controllers/ChickenController";
import { PirateController } from "./Controllers/PirateController";
import { LayerMaterial, Depth } from "lamina";
import { Trash } from "./3D/Trash";
import * as THREE from "three";
import { BallController } from "./Controllers/ballController";

export const Experience = () => {
  const { gameStage, skinCoinActual, dollarCount } = useStoreApp();

  let BG_SPEED = 1;
  const stage = useRef();
  const { camera } = useThree();
  const audio1 = new Audio("audio/tutorial.mp3");
  const audio2 = new Audio("audio/magia1.mp3");

  useEffect(() => {
    if (gameStage === "MENU") {
      camera.fov = 8;
    }
    if (gameStage === "GAME") {
      camera.fov = 50;
      // audio1.play();
      // setTimeout(() => {
      //   audio2.play();
      // }, 30000);
    }
    camera.updateProjectionMatrix();
  }, [gameStage]);

  const texture = useTexture("texture/digital_painting_lofi_city.jpg");
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

      <RigidBody position={[0, 0.57, 0]} colliders={false}>
        <PirateController />
      </RigidBody>

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
      <BallController />

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
        <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
      </RigidBody>
    </>
  );
};
