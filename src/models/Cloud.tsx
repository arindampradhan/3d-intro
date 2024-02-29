import { Html, useGLTF } from "@react-three/drei";

import type {Mesh } from 'three'

import cloudScene from "../assets/3d/cloud_station.glb";
import { Ref, useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface CloudProps {
  isRotating: boolean;
}

export default function Sky({ isRotating }: CloudProps) {
  const cloud = useGLTF(cloudScene);
  const cloudRef: Ref<Mesh> = useRef();

  useFrame((_,delta) => {
    if(isRotating && cloudRef?.current?.rotation) {
       cloudRef.current.rotation.y += 0.25 * delta
    }
  })

  return (
    <mesh ref={cloudRef}>
      <primitive object={cloud.scene}></primitive>
    </mesh>
  );
}
