import { useGLTF } from "@react-three/drei";

import skyScene from "../assets/3d/sky.glb";
import {  useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface SkyProps {
  isRotating: boolean;
  variant: string;
}

export default function Sky({ isRotating }: SkyProps) {
  const sky: any = useGLTF(skyScene);
  const skyRef: any = useRef();

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
