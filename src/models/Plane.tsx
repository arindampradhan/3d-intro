import { Html, useAnimations, useGLTF } from "@react-three/drei";

import planeScene from '../assets/3d/plane.glb'
import { useEffect, useRef } from "react";
import type { Group, AnimationAction, Object3DEventMap } from "three";

interface PlaneProps {
  position: number[];
  scale: number[];
  rotation: number[];
  isRotating: boolean;
}

export default function Plane({isRotating, ...props}: PlaneProps) {
  const meshRef = useRef<Group<Object3DEventMap>>(null);
  const {scene, animations} = useGLTF(planeScene)
  const {actions} : {actions: AnimationAction}  = useAnimations(animations, meshRef);

  useEffect(() => {
    if(isRotating){
      actions?.['Take 001']?.play()
    } else{
      actions?.['Take 001']?.stop()
    }
  },[actions, isRotating])
  
  return (
    <mesh {...props} ref={meshRef}>
      <primitive object={scene} isRotating={isRotating} ></primitive>
    </mesh>
  );
}
