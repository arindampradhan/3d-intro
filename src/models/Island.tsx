/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: nimzu (https://sketchfab.com/nimzuk)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907
Title: Fox's islands
*/

import {  useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";
import type { Group, Object3DEventMap } from "three";

import islandScene from "../assets/3d/island.glb";

interface IslandProps {
  position: number[];
  scale: number[];
  rotation: number[];
  isRotating: boolean;
  setIsRotating: (isRotating: boolean) => void;
  setCurrentStage: (index: number | null) => void;
}

function Island(props: IslandProps) {
  const { setIsRotating, isRotating, setCurrentStage } = props;
  const islandRef = useRef<Group<Object3DEventMap>>(null);

  const lastXRef = useRef(0);
  const rotationSpeedRef = useRef(0);
  const dampingFactor = 0.95;
  const { gl, viewport } = useThree();
  const { nodes, materials }: any = useGLTF(islandScene);

  const handlePointerDown = (event: TouchEvent | PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = (event as TouchEvent).touches ? (event as TouchEvent).touches[0].clientX : (event as PointerEvent).clientX;

    // Store the current clientX position for reference
    lastXRef.current = clientX;
  };

  const handlePointerUp = (e: TouchEvent | PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event: TouchEvent | PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating && islandRef.current) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = (event as TouchEvent).touches
        ? (event as TouchEvent).touches[0].clientX
        : (event as any).clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastXRef.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastXRef.current = clientX;

      // Update the rotation speed
      rotationSpeedRef.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (islandRef.current) {
      if (e.key === "ArrowRight") {
        islandRef.current.rotation.y += 0.01 * Math.PI;
      } else if (e.key === "ArrowLeft") {
        islandRef.current.rotation.y -= 0.01 * Math.PI;
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!isRotating && islandRef.current) {
      rotationSpeedRef.current *= dampingFactor;

      if (Math.abs(rotationSpeedRef.current) < 0.001) {
        rotationSpeedRef.current = 0;
      }
      islandRef.current.rotation.y += rotationSpeedRef.current;
    } else {
      const rotation = islandRef?.current?.rotation.y as number;
      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
}

export default Island;
