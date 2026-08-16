"use client";

import { useRef } from "react";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import type { DirectionalLight } from "three";

export function Lighting() {
  const { shadowsEnabled } = useAdaptiveQuality();
  const keyLightRef = useRef<DirectionalLight>(null);

  return (
    <>
      {/* 1. Deep Space Ambient Base Light (Static) */}
      <ambientLight color="#080c16" intensity={0.36} />

      {/* 2. Primary White Top Key Light (Sun / Studio Specular) */}
      <directionalLight
        ref={keyLightRef}
        position={[14, 24, 16]}
        intensity={1.35}
        color="#ffffff"
        castShadow={shadowsEnabled}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* 3. Hero Core Internal Reactor Light (Fixed Cyan Plasma Emitter) */}
      <pointLight
        position={[0, 0, 1.2]}
        intensity={2.2}
        color="#00e5ff"
        distance={28}
        decay={2}
      />

      {/* 4. Cold Cyan Rim Backlight (Fixed Edge Silhouette) */}
      <pointLight
        position={[-6, 3, -8]}
        intensity={2.0}
        color="#00e5ff"
        distance={35}
        decay={2}
      />

      {/* 5. Warm Amber Reactor Bounce Under-light (Fixed) */}
      <pointLight
        position={[0, -6, 6]}
        intensity={1.2}
        color="#ffaa00"
        distance={30}
        decay={2}
      />
    </>
  );
}

export default Lighting;
