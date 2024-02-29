import { useGLTF } from "@react-three/drei";

import type {Mesh } from 'three'

import skyScene from "../assets/3d/sky.glb";
import { Ref, useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface SkyProps {
  isRotating: boolean;
  variant: string;
}

export default function Sky({ isRotating }: SkyProps) {
  const sky = useGLTF(skyScene);
  const skyRef: Ref<Mesh> = useRef();

  useFrame((_,delta) => {
    if(isRotating && skyRef?.current?.rotation) {
       skyRef.current.rotation.y += 0.25 * delta
    }
  })

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene}></primitive>
    </mesh>
  );
}
