import { useAnimations, useGLTF } from "@react-three/drei";

import { useEffect, useRef } from "react";
import type { Group, Object3DEventMap } from "three";

import birdScene from "../assets/3d/flying_synthwave_bird.glb";
import { useFrame } from "@react-three/fiber";

export default function Bird() {
  const { scene, animations } = useGLTF(birdScene) as any;
  const birdRef: any = useRef<Group<Object3DEventMap>>(null);
  const { actions } = useAnimations(
    animations,
    birdRef
  );

  useEffect(() => {
    (actions)?.["Armature|Scene|Scene"]?.play();
    // debugger
  }, []);

  useFrame(({ clock, camera }) => {
    if (birdRef.current?.position) {
      // update the bird's position to move in sin wave
      birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.25 + 2;

      if(birdRef.current.position.x > camera.position.x + 10){
        birdRef.current.rotation.y = Math.PI
      } else if(birdRef.current.position.x < camera.position.x - 10){
        birdRef.current.rotation.y = 0
      }

    // Update the X and Z positions based on the direction
    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      // Moving backward
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }

    }
  });

  return (
    <mesh ref={birdRef} position={[-1, 2, -1]} scale={2}>
      <primitive object={scene} />
    </mesh>
  );
}
