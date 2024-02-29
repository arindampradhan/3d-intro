import Loader from "../components/Loader";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import Cafe from "../models/Cafe";
import Sky from "../models/SpaceStation";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";
import useSound from 'use-sound';
import cowboySfx from '../assets/cowboy.mp3'

export default function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage , setCurrentStage] = useState<number | null>();
  const [play, {pause}] = useSound(cowboySfx, {volume: 0.35});
  
  const adjustCafeForScreenSize = () => {
    let screenScale = null;
    const screenPosition = [0, -6.5, -43];
    const rotation = [0, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };
  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [CafeScale, CafePosition, CafeRotation] =
    adjustCafeForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  useEffect(() => {
    if(isRotating) {
      play()
    } else {

      pause()
    }
  }, [isRotating, play,pause])

  return (
    <main className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {!!currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 10, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            groundColor={"#000000"}
            intensity={1}
          />
          <Sky 
            isRotating={isRotating}
          />
          <Cafe
            position={CafePosition}
            scale={CafeScale}
            rotation={CafeRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Bird />
          <Plane
            position={planePosition}
            scale={planeScale}
            isRotating={isRotating}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </main>
  );
}
