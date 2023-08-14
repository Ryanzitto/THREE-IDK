import {
  Environment,
  Box,
  ContactShadows,
  OrbitControls,
  Sky,
  Float,
} from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { AvatarController } from "./Controllers/AvatarController";
import { DollarController } from "./Controllers/DollarController";
import { YoshiEggController } from "./Controllers/Yoshi_egg_Controller";
import { useEffect, useState } from "react";
import { useStoreApp } from "../store";
import { ChestController } from "./Controllers/ChestController";
import { ChickenController } from "./Controllers/ChickenController";
import { PirateController } from "./Controllers/PirateController";
import { BallController } from "./Controllers/ballController";
import { useThree } from "@react-three/fiber";
import { Ground } from "./3D/Ground";
import { OutDoor } from "./3D/Outdoor";
import { NinjaController } from "./Controllers/NinjaController";
import { MageController } from "./Controllers/MageController";
export const Experience = () => {
  const {
    gameStage,
    skinCoinActual,
    skinAvatarActual,
    experienceIsMounted,
    setExperienceIsMounted,
  } = useStoreApp();

  let trilha = new Audio("audio/trilha.mp3");

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (gameStage === "GAME" && isPlaying === false) {
      // trilha.play();
      // setIsPlaying(true);
      // trilha.volume = 0.2;
      // setInterval(() => {
      //   setIsPlaying(false);
      // }, 210000);
    }
  }, [gameStage]);

  useEffect(() => {
    setExperienceIsMounted(true);
  }, []);

  return (
    <>
      <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      <Sky />
      <ambientLight intensity={1} />
      <ContactShadows
        opacity={1}
        scale={9.5}
        blur={1}
        far={1}
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
      {skinAvatarActual === 2 && (
        <RigidBody position={[0, 0.57, 0]} colliders={false}>
          <NinjaController />
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
      <group position={[0, 0, 0]}>
        <MageController />
      </group>

      {/* {gameStage === "GAME" ? <BallController /> : null} */}

      <RigidBody type="fixed" colliders="hull">
        <group>
          <Float speed={2} floatIntensity={0.3}>
            <OutDoor position={[0, 0.5, -5]} />
          </Float>
        </group>
      </RigidBody>

      <RigidBody type="fixed" name="Floor" colliders="hull">
        <group rotation-y={-Math.PI / 1}>
          <Ground position={[5, -0.4, 5]} />
        </group>
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
