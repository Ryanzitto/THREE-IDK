import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { Ball } from "../3D/Ball";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";

export const BallController = (props) => {
  const ballRef = useRef();
  const rigidbody = useRef();

  const { randomPositionBall, setRandomPositionBall, gameStage } =
    useStoreApp();

  useEffect(() => {
    rigidbody.current.applyImpulse({ x: -Math.random() * 1.5, y: 0, z: 0 });
    const timerId = setTimeout(() => {
      setRandomPositionBall();
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [randomPositionBall]);

  return (
    <group>
      <RigidBody
        colliders="hull"
        name={"Ball"}
        ref={rigidbody}
        position={gameStage === "GAME" ? randomPositionBall : [1, 0, 3]}
        restitution={0.5}
      >
        <group ref={ballRef}>
          <Ball />
        </group>
      </RigidBody>
    </group>
  );
};
