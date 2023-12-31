import { RigidBody } from "@react-three/rapier";
import { Chest } from "../3D/Minecraft_chest";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";

export const ChestController = (props) => {
  const chestRef = useRef();
  const rigidbody = useRef();

  const { randomPosition, setRandomPosition } = useStoreApp();

  useFrame(() => {
    chestRef.current.rotation.y += 0.05;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomPosition();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <group>
      <RigidBody
        name={"Coin"}
        ref={rigidbody}
        scale={[0.002, 0.002, 0.002]}
        enabledRotations={[false, false, false]}
        position={randomPosition}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "void") {
            setRandomPosition();
          }
          if (other.rigidBodyObject.name === "Ball") {
            setRandomPosition();
          }
        }}
      >
        <group ref={chestRef}>
          <Chest />
        </group>
      </RigidBody>
    </group>
  );
};
