import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";
import { YoshiEgg } from "../3D/Yoshi_egg";
import { useEffect } from "react";
export const YoshiEggController = (props) => {
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
        scale={[0.2, 0.2, 0.2]}
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
          <YoshiEgg />
        </group>
      </RigidBody>
    </group>
  );
};
