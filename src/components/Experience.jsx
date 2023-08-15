import { ContactShadows, OrbitControls } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { AvatarController } from "./Controllers/AvatarController";
import { DollarController } from "./Controllers/DollarController";
import { YoshiEggController } from "./Controllers/Yoshi_egg_Controller";
import { useEffect, useRef, useState } from "react";
import { useStoreApp } from "../store";
import { ChestController } from "./Controllers/ChestController";
import { ChickenController } from "./Controllers/ChickenController";
import { PirateController } from "./Controllers/PirateController";
import { BallController } from "./Controllers/ballController";
import { useFrame, useThree } from "@react-three/fiber";
import { Ground } from "./3D/Ground";
import { NinjaController } from "./Controllers/NinjaController";
import { MageController } from "./Controllers/MageController";
import { SpellController } from "./Controllers/SpellController";
import { Skybox } from "./3D/Skybox";
export const Experience = () => {
  const skyRef = useRef();

  const {
    gameStage,
    skinCoinActual,
    skinAvatarActual,
    experienceIsMounted,
    setExperienceIsMounted,
    floorIsMounted,
    setFloorIsMounted,
  } = useStoreApp();

  useEffect(() => {
    console.log(floorIsMounted);
  }, [floorIsMounted]);

  let trilha = new Audio("audio/trilha.mp3");

  const [isPlaying, setIsPlaying] = useState(false);

  const speed = 0.001;
  useFrame(() => {
    skyRef.current.rotation.y += speed;
  });

  useEffect(() => {
    if (gameStage === "GAME" && isPlaying === false) {
      trilha.play();
      setIsPlaying(true);
      trilha.volume = 0.2;
      setInterval(() => {
        setIsPlaying(false);
      }, 210000);
    }
  }, [gameStage]);

  useEffect(() => {
    setExperienceIsMounted(true);
  }, []);
  return (
    <>
      <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      <ambientLight intensity={1} />
      <ContactShadows
        opacity={1}
        scale={9.5}
        blur={1}
        far={1}
        resolution={256}
      />

      <directionalLight intensity={0.3} />

      {floorIsMounted === true && (
        <group>
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

          {gameStage === "GAME" ? <MageController /> : null}

          {gameStage === "GAME" ? <SpellController /> : null}

          {gameStage === "GAME" ? <BallController /> : null}
        </group>
      )}
      <RigidBody type="fixed" name="Floor" colliders="hull">
        <group rotation-y={-Math.PI / 1}>
          <Ground position={[5, -0.4, 5]} />
        </group>
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <group ref={skyRef}>
          <Skybox />
        </group>
      </RigidBody>

      <RigidBody type="fixed" name="void" colliders={false}>
        <CuboidCollider position={[0, -3.5, 0]} args={[500, 0.1, 500]} sensor />
      </RigidBody>
    </>
  );
};
