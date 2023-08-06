import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Dollar } from "./Dollar";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../store";
export const DollarController = (props) => {
  const dollarRef = useRef();
  const rigidbody = useRef();

  useFrame(() => {
    dollarRef.current.rotation.y += 0.05;
  });

  const { randomPosition } = useStoreApp();

  return (
    <group>
      <RigidBody
        name={"Dollar"}
        ref={rigidbody}
        colliders={false}
        scale={[0.08, 0.08, 0.08]}
        enabledRotations={[false, false, false]}
        position={randomPosition}
      >
        <CuboidCollider args={[3, 3, 3]} />
        <group ref={dollarRef}>
          <Dollar />
        </group>
      </RigidBody>
    </group>
  );
};
