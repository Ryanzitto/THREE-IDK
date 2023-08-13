/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 public/models/outdoor.glb 
Author: UltraFNaFFan (https://sketchfab.com/UltraFNaFFan)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/freddy-fazbears-pizza-place-sign-fa1d152e37224e5f83d696bd54932bc1
Title: Freddy Fazbear's Pizza Place Sign
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function OutDoor(props) {
  const { nodes, materials } = useGLTF("models/outdoor.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[-0.038, 0.891, -0.14]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.015, 0.003, 0.015]}
      >
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.NegroBlack}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials.LucesLights}
        />
      </group>
      <group
        position={[0, 0.827, -0.213]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.466, 0.071, 0.466]}
      >
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.NegroBlack}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials.DoradoGolden}
        />
      </group>
      <group
        position={[0, 1.317, -0.211]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.113, 0.049, 0.113]}
      >
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.NegroBlack}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials.CubosCubes}
        />
      </group>
      <group
        position={[0, 0.819, -0.145]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.329, 0.048, 0.329]}
      >
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials.NegroBlack}
        />
        <mesh
          geometry={nodes.Object_20.geometry}
          material={materials.RojoRed}
        />
      </group>
      <group
        position={[-0.001, 1.715, -0.213]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.104, 0.03, 0.104]}
      >
        <mesh
          geometry={nodes.Object_24.geometry}
          material={materials.NegroBlack}
        />
        <mesh geometry={nodes.Object_25.geometry} material={materials.Freddy} />
      </group>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.Brillo_VerdeGreen_Glitter}
        position={[0, 0.354, -0.1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.131, 0.05, 0.131]}
      />
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials.Brillo_VerdeGreen_Glitter}
        position={[0, 0.534, -0.1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.264, 0.101, 0.264]}
      />
      <mesh
        geometry={nodes.Object_14.geometry}
        material={materials.Freddy_Fazbears}
        position={[0, 0.865, -0.117]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.521}
      />
      <mesh
        geometry={nodes.Object_22.geometry}
        material={materials.Brillo_VerdeGreen_Glitter}
        position={[-0.01, 0.663, -0.097]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.009, 3.481, 0.009]}
      />
    </group>
  );
}

useGLTF.preload("models/outdoor.glb");
