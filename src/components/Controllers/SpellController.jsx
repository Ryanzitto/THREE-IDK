import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Spell } from "../3D/Spell";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";

export const SpellController = (props) => {
  const { randomPositionMage } = useStoreApp();
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

  let spellSound = new Audio("audio/Spell.wav");

  useEffect(() => {
    spellSound.play();
  }, [randomPositionMage]);

  return (
    <RigidBody
      ref={rigidbody}
      name={"Spell"}
      position={randomPositionMage}
      position-z={-5}
      colliders={false}
      enabledRotations={[false, false, false]}
      type="hull"
    >
      <group ref={spellRef}>
        <CuboidCollider args={[0.3, 0.3, 1]} />
        <group position={[0, -0.5, -1]}>
          <Spell />
        </group>
      </group>
    </RigidBody>
  );
};
