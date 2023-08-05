import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Avatar from "./Avatar";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../App";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useFBX } from "@react-three/drei";
import { useStoreApp } from "../store";

export const AvatarController = (props) => {
  const { increasedollarCount, setRandomPosition } = useStoreApp();

  const rigidbody = useRef();
  const avatarRef = useRef();
  const isOnFloor = useRef(true);
  const { animation } = props;

  const { animations: danceAnimation } = useFBX("animations/Dance.fbx");
  const { animations: greetingAnimation } = useFBX("animations/Greet.fbx");
  const { animations: standingAnimation } = useFBX("animations/Idle.fbx");
  const { animations: capoeiraAnimation } = useFBX("animations/Capoeira.fbx");
  const { animations: ginga1Animation } = useFBX("animations/Ginga-1.fbx");
  const { animations: walkAnimation } = useFBX("animations/Walking.fbx");
  const { animations: jumpAnimation } = useFBX("animations/Jumping.fbx");

  danceAnimation[0].name = "Dance";
  greetingAnimation[0].name = "Greet";
  standingAnimation[0].name = "Idle";
  capoeiraAnimation[0].name = "Capoeira";
  ginga1Animation[0].name = "Ginga-1";
  walkAnimation[0].name = "Walk";
  jumpAnimation[0].name = "Jump";

  const { actions } = useAnimations(
    [
      danceAnimation[0],
      greetingAnimation[0],
      standingAnimation[0],
      capoeiraAnimation[0],
      ginga1Animation[0],
      walkAnimation[0],
      jumpAnimation[0],
    ],
    rigidbody
  );

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const JUMP_FORCE = 0.5;
  const MOVEMENT_SPEED = 0.05;
  const MAX_VEL = 2;
  const [actualAnimation, setActualAnimation] = useState("Idle");

  useFrame(() => {
    const impulse = { x: 0, y: 0, z: 0 };
    const linearVel = rigidbody.current.linvel();
    let changeRotation = false;
    if (jumpPressed && isOnFloor.current) {
      impulse.y = JUMP_FORCE;
      setActualAnimation("Jump");
      isOnFloor.current = false;
    }
    if (rightPressed && linearVel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      setActualAnimation("Walk");
      changeRotation = true;
    }
    if (leftPressed && linearVel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      setActualAnimation("Walk");
      changeRotation = true;
    }
    if (backPressed && linearVel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      setActualAnimation("Walk");
      changeRotation = true;
    }
    if (forwardPressed && linearVel.z > -MAX_VEL) {
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
    rigidbody.current.applyImpulse(impulse, true);
  });

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
          if (other.rigidBodyObject.name === "Dollar") {
            console.log("colidiu com " + other.rigidBodyObject.name);
            setRandomPosition();
            increasedollarCount();
          }
        }}
        position-y={5}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={avatarRef}>
          <Avatar animation={actualAnimation} />
        </group>
      </RigidBody>
    </group>
  );
};
