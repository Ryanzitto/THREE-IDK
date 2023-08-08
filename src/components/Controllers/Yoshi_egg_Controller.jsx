import { RigidBody } from "@react-three/rapier";
import { Chest } from "../3D/Minecraft_chest";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";
import { YoshiEgg } from "../3D/Yoshi_egg";

export const YoshiEggController = (props) => {
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
        scale={[0.2, 0.2, 0.2]}
        enabledRotations={[false, false, false]}
        position={randomPosition}
      >
        <group ref={chestRef}>
          <YoshiEgg />
        </group>
      </RigidBody>
    </group>
  );
};
