import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";
import { Chicken } from "../3D/Chicken";

export const ChickenController = (props) => {
  const chestRef = useRef();
  const rigidbody = useRef();

  const { randomPosition } = useStoreApp();

  useFrame(() => {
    chestRef.current.rotation.y += 0.05;
  });
  return (
    <group>
      <RigidBody
        name={"Coin"}
        ref={rigidbody}
        colliders={false}
        scale={[0.3, 0.3, 0.3]}
        enabledRotations={[false, false, false]}
        position={randomPosition}
      >
        <CuboidCollider args={[1, 1, 1]} />
        <group ref={chestRef}>
          <Chicken />
        </group>
      </RigidBody>
    </group>
  );
};
