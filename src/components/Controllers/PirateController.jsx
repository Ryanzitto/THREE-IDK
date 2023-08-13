import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import Pirate from "../3D/Pirate";
import { FaceLandmarkerDefaults, useKeyboardControls } from "@react-three/drei";
import { Controls } from "../../App";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreApp } from "../../store";

export const PirateController = (props) => {
  const { gameStage, setGameStage, increasedollarCount, setRandomPosition } =
    useStoreApp();

  const rigidbody = useRef();
  const ref = useRef();
  const avatarRef = useRef();
  const isOnFloor = useRef(true);

  const JUMP_FORCE = 0.5;
  const MOVEMENT_SPEED = 0.05;
  const MAX_VEL = 2;

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );

  const [actualAnimation, setActualAnimation] = useState("Idle");
  let dropSound = new Audio("audio/drop.mp3");
  let hurtSound = new Audio("audio/hurt.mp3");

  useFrame(() => {
    const impulse = { x: 0, y: 0, z: 0 };
    const linearVel = rigidbody?.current?.linvel();
    let changeRotation = false;
    if (jumpPressed && isOnFloor.current) {
      impulse.y = JUMP_FORCE;
      isOnFloor.current = false;
    }
    if (rightPressed && linearVel.x < MAX_VEL && gameStage === "GAME") {
      impulse.x += MOVEMENT_SPEED;
      setActualAnimation("Walk");
      changeRotation = true;
    }
    if (leftPressed && linearVel.x > -MAX_VEL && gameStage === "GAME") {
      impulse.x -= MOVEMENT_SPEED;
      setActualAnimation("Walk");
      changeRotation = true;
    }
    if (backPressed && linearVel.z < MAX_VEL && gameStage === "GAME") {
      impulse.z += MOVEMENT_SPEED;
      setActualAnimation("Walk");
      changeRotation = true;
    }
    if (forwardPressed && linearVel.z > -MAX_VEL && gameStage === "GAME") {
      impulse.z -= MOVEMENT_SPEED;
      setActualAnimation("Walk");
      changeRotation = true;
    }
    if (
      forwardPressed === false &&
      backPressed === false &&
      leftPressed === false &&
      rightPressed === false
    ) {
      setActualAnimation("Idle");
    }
    if (changeRotation) {
      const angle = Math.atan2(linearVel.x, linearVel.z);
      avatarRef.current.rotation.y = angle;
    }
    if (gameStage === "MENU") {
      setActualAnimation("Dance");
    }
    rigidbody?.current?.applyImpulse(impulse, true);
  });

  const resetPosition = () => {
    rigidbody.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }));
    avatarRef.current.rotation.y = 0;
    setGameStage("GAME OVER");
  };

  return (
    <group>
      <RigidBody
        name={"Avatar"}
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={({ other }) => {
          isOnFloor.current = true;
          if (other.rigidBodyObject.name === "Coin") {
            dropSound.play();
            setRandomPosition();
            increasedollarCount();
          }
          if (other.rigidBodyObject.name === "Ball") {
            hurtSound.play();
            isOnFloor.current = false;
            rigidbody.current.applyImpulse({
              x: -Math.random() * 2,
              y: Math.random() * 2,
              z: -Math.random() * 2,
            });
          }
        }}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "void") {
            resetPosition();
          }
        }}
        position-y={5}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.35, 0]} ref={ref} />
        <group ref={avatarRef}>
          <Pirate animation={actualAnimation} />
        </group>
      </RigidBody>
    </group>
  );
};
