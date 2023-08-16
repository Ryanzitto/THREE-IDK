import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Dollar } from "../3D/Dollar";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";

export const DollarController = (props) => {
  const dollarRef = useRef();
  const rigidbody = useRef();

  const { randomPosition, setRandomPosition } = useStoreApp();

  useFrame(() => {
    dollarRef.current.rotation.y += 0.05;
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
        colliders={false}
        scale={[0.08, 0.08, 0.08]}
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
        <CuboidCollider args={[3, 3, 3]} />
        <group ref={dollarRef}>
          <Dollar />
        </group>
      </RigidBody>
    </group>
  );
};
