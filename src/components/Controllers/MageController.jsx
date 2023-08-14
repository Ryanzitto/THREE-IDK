import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { Mage } from "../3D/Mage";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../../App";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";

export const MageController = (props) => {
  const rigidbody = useRef();
  const avatarRef = useRef();

  const [actualAnimation, setActualAnimation] = useState("Idle");

  return (
    <group>
      <RigidBody
        name={"Mage"}
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.15, 0]} />
        <group scale={1} ref={avatarRef}>
          <Mage animation={actualAnimation} />
        </group>
      </RigidBody>
    </group>
  );
};
