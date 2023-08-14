import { CuboidCollider, RigidBody, vec3 } from "@react-three/rapier";
import { Mage } from "../3D/Mage";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../../App";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";

export const MageController = (props) => {
  const { setRandomPositionMage, randomPositionMage } = useStoreApp();
  const rigidbody = useRef();
  const avatarRef = useRef();

  const [actualAnimation, setActualAnimation] = useState("Spellcasting");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setRandomPositionMage();
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [randomPositionMage]);

  return (
    <group>
      <RigidBody
        name={"Mage"}
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        type="fixed"
        position={randomPositionMage}
      >
        <CuboidCollider args={[5, 5]} />
        <group scale={1} ref={avatarRef}>
          <Mage animation={actualAnimation} />
        </group>
      </RigidBody>
    </group>
  );
};
