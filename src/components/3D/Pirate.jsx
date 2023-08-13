/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 public/models/Pirate.glb 
*/

import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";

export default function Pirate(props) {
  const group = useRef();

  const { animation } = props;

  const { nodes, materials } = useGLTF("models/Pirate.glb");

  const { animations: standingAnimation } = useFBX(
    "animations/Avatar-2/Happy Idle.fbx"
  );
  const { animations: walkAnimation } = useFBX(
    "animations/Avatar-2/Walking.fbx"
  );
  const { animations: danceAnimation } = useFBX(
    "animations/Avatar-2/Dance.fbx"
  );

  standingAnimation[0].name = "Idle";
  walkAnimation[0].name = "Walk";
  danceAnimation[0].name = "Dance";

  const { actions } = useAnimations(
    [standingAnimation[0], walkAnimation[0], danceAnimation[0]],
    group
  );

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => actions[animation]?.fadeOut(0.5);
  }, [animation]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation-x={[-Math.PI * 2]} scale={0.01} position-y={0.2}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.OccupyGuy_Body_Mesh.geometry}
          material={materials.Character_Rasta_boy_body}
          skeleton={nodes.OccupyGuy_Body_Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.OccupyGuy_BrowsAnimGeo.geometry}
          material={materials.Rasta_Brows_MAT1}
          skeleton={nodes.OccupyGuy_BrowsAnimGeo.skeleton}
        />
        <skinnedMesh
          geometry={nodes.OccupyGuy_EyesAnimGeo.geometry}
          material={materials.Rasta_Eyes_MAT1}
          skeleton={nodes.OccupyGuy_EyesAnimGeo.skeleton}
        />
        <skinnedMesh
          geometry={nodes.OccupyGuy_MouthAnimGeo.geometry}
          material={materials.Rasta_Mouth_MAT1}
          skeleton={nodes.OccupyGuy_MouthAnimGeo.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/Pirate.glb");