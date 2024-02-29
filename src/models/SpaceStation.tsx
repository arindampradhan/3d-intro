import { useGLTF } from "@react-three/drei";

import type {Mesh } from 'three'

import SpaceStationScene from "../assets/3d/nebula.glb";
import { Ref, useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface SpaceStationProps {
  isRotating: boolean;
}

export default function Sky({ isRotating }: SpaceStationProps) {
  const spaceStation = useGLTF(SpaceStationScene);
  const spaceStationRef: any = useRef();

  useFrame((_,delta) => {
    if(isRotating && spaceStationRef?.current?.rotation) {
       spaceStationRef.current.rotation.y += 0.25 * delta
    }
  })

  return (
    <mesh ref={spaceStationRef}>
      {/* make it a bit back */}
      <group scale={0.9} position={[0,10,0]}>
      <primitive object={(spaceStation as any).scene}></primitive>
      </group>
    </mesh>
  );
}
