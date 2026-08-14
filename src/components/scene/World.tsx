"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { CAMERA_CONFIG } from "@/config/camera";
import { Lighting } from "@/components/world/Lighting";
import { Environment } from "@/components/world/Environment";
import { Station } from "@/components/scene/Station";
import { CameraController } from "@/components/camera/CameraController";

export function World() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        shadows
      >
        {/* Single Persistent Camera */}
        <PerspectiveCamera
          makeDefault
          fov={CAMERA_CONFIG.fov}
          near={CAMERA_CONFIG.near}
          far={CAMERA_CONFIG.far}
          position={[0, 1.8, 14]}
        />

        <CameraController />
        <Lighting />
        <Environment />

        <Suspense fallback={null}>
          <Station />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default World;
