/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 public/models/Ninja.glb 
*/

import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";

export default function Ninja(props) {
  const group = useRef();

  const { animation } = props;

  const { nodes, materials } = useGLTF("models/Ninja.glb");

  const { animations: idleAnimation } = useFBX(
    "animations/Avatar-3/Ninja Idle.fbx"
  );
  const { animations: walkAnimation } = useFBX("animations/Avatar-3/Run.fbx");
  const { animations: danceAnimation } = useFBX(
    "animations/Avatar-3/Swing Dancing.fbx"
  );

  idleAnimation[0].name = "Idle";
  walkAnimation[0].name = "Walk";
  danceAnimation[0].name = "Dance";

  const { actions } = useAnimations(
    [idleAnimation[0], walkAnimation[0], danceAnimation[0]],
    group
  );

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => actions[animation]?.fadeOut(0.5);
  }, [animation]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group
        position-y={0.3}
        rotation-x={-Math.PI * 2}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.Ch24.geometry}
          material={materials.Ch24_Body}
          skeleton={nodes.Ch24.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/Ninja.glb");
