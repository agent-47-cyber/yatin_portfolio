"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { CAMERA_CONFIG } from "@/config/camera";
import { Lighting } from "@/components/world/Lighting";
import { Environment } from "@/components/world/Environment";
import { Particles } from "@/components/world/Particles";
import { Planet } from "@/components/world/Planet";
import { Station } from "@/components/scene/Station";
import { Observatory } from "@/components/about/Observatory";
import { CameraController } from "@/components/camera/CameraController";
import { SceneManager } from "@/components/scene/SceneManager";
import { PostProcessing } from "@/components/scene/PostProcessing";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

export function World() {
  const { dpr, shadowsEnabled } = useAdaptiveQuality();

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        shadows={shadowsEnabled}
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
        <SceneManager />
        <Lighting />
        <Environment />
        <Particles />

        <Suspense fallback={null}>
          <Planet />
          <Station />
          <Observatory />
        </Suspense>

        <PostProcessing />
      </Canvas>
    </div>
  );
}

export default World;
