"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { CAMERA_CONFIG } from "@/config/camera";
import { Lighting } from "@/components/world/Lighting";
import { Environment } from "@/components/world/Environment";
import { Particles } from "@/components/world/Particles";
import { Planet } from "@/components/world/Planet";
import { Station } from "@/components/scene/Station";
import { Drones } from "@/components/world/Drones";
import { TelemetryHolo } from "@/components/world/TelemetryHolo";
import { Observatory } from "@/components/about/Observatory";
import { Archive } from "@/components/projects/Archive";
import { OrbitalHistory } from "@/components/experience/OrbitalHistory";
import { CameraController } from "@/components/camera/CameraController";
import { SceneManager } from "@/components/scene/SceneManager";
import { SectorVisibility } from "@/components/scene/SectorVisibility";
import { PostProcessing } from "@/components/scene/PostProcessing";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { useResponsiveViewport } from "@/hooks/useResponsiveViewport";
import { getSafeDprCap } from "@/config/performance";

export function World() {
  const { dpr, qualityTier, shadowsEnabled } = useAdaptiveQuality();
  const { width, height } = useResponsiveViewport();
  const dprCap = useMemo(
    () => getSafeDprCap(qualityTier, dpr, width, height),
    [dpr, height, qualityTier, width]
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        dpr={[1, dprCap]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMappingExposure: 1.0,
        }}
        shadows={shadowsEnabled ? "percentage" : false}
      >
        {/* Single Persistent Perspective Camera with Optimal Depth Buffer Precision */}
        <PerspectiveCamera
          makeDefault
          fov={CAMERA_CONFIG.fov}
          near={CAMERA_CONFIG.near}
          far={CAMERA_CONFIG.far}
          position={[0, 1.5, 18]}
        />

        <CameraController />
        <SceneManager />
        <Lighting />
        <Environment />
        <Particles />

        <Suspense fallback={null}>
          <Planet />

          {/* Mission Control Overview Assembly (Station, Reactor Core, Rings) */}
          <SectorVisibility sector="MISSION_CONTROL">
            <Station />
            <TelemetryHolo />
          </SectorVisibility>

          <Drones />

          {/* Sector-isolated 3D chambers */}
          <SectorVisibility sector="ABOUT">
            <Observatory />
          </SectorVisibility>

          <SectorVisibility sector="PROJECTS">
            <Archive />
          </SectorVisibility>

          <SectorVisibility sector="EXPERIENCE">
            <OrbitalHistory />
          </SectorVisibility>
        </Suspense>

        <PostProcessing />
      </Canvas>
    </div>
  );
}

export default World;
