import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Spell } from "../3D/Spell";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";

export const SpellController = (props) => {
  const { setRandomPositionMage, randomPositionMage } = useStoreApp();
  const spellRef = useRef();
  const rigidbody = useRef();
  const speed = 10;
  const maxVel = 10.1;

  useFrame(() => {
    const impulse = { x: 0, y: 0, z: 0 };
    const linearVel = rigidbody?.current?.linvel();

    if (linearVel.z < maxVel) {
      impulse.z += speed;
    }
    rigidbody.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      ref={rigidbody}
      name={"Spell"}
      position={randomPositionMage}
      colliders={false}
      enabledRotations={[false, false, false]}
      type="hull"
    >
      <group ref={spellRef}>
        <CuboidCollider args={[0.5, 0.5, 2]} />
        <group position={[0, -0.5, -1]}>
          <Spell />
        </group>
      </group>
    </RigidBody>
  );
};
