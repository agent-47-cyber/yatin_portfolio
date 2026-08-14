"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import type { DirectionalLight, PointLight, AmbientLight } from "three";

export function Lighting() {
  const { shadowsEnabled } = useAdaptiveQuality();
  const currentState = useAppStore((state) => state.currentState);

  const ambientRef = useRef<AmbientLight>(null);
  const keyLightRef = useRef<DirectionalLight>(null);
  const pointLightRef = useRef<PointLight>(null);

  // Smooth per-frame mood lighting transitions (Zero allocations)
  useFrame((_, delta) => {
    const lerpSpeed = delta * 2.5;

    // Mood targets based on active section
    let targetAmbient = 0.35;
    let targetKey = 1.1;
    let targetPoint = 0.8;

    if (currentState === "ABOUT") {
      // Warm, crystalline, soft reflections for glass observatory
      targetAmbient = 0.45;
      targetKey = 1.3;
      targetPoint = 1.2;
    } else if (currentState === "PROJECTS" || currentState === "PROJECT_DETAIL") {
      // High contrast, deep obsidian shadows for collectible artifacts
      targetAmbient = 0.25;
      targetKey = 1.4;
      targetPoint = 1.0;
    } else if (currentState === "EXPERIENCE") {
      // Luminous orbital glow and rim lighting
      targetAmbient = 0.35;
      targetKey = 1.2;
      targetPoint = 1.5;
    }

    if (ambientRef.current) {
      ambientRef.current.intensity +=
        (targetAmbient - ambientRef.current.intensity) * lerpSpeed;
    }
    if (keyLightRef.current) {
      keyLightRef.current.intensity +=
        (targetKey - keyLightRef.current.intensity) * lerpSpeed;
    }
    if (pointLightRef.current) {
      pointLightRef.current.intensity +=
        (targetPoint - pointLightRef.current.intensity) * lerpSpeed;
    }
  });

  return (
    <>
      {/* Dynamic Ambient Base Light */}
      <ambientLight ref={ambientRef} color="#0d111a" intensity={0.35} />

      {/* Primary Key Directional Sun Light with Shadows */}
      <directionalLight
        ref={keyLightRef}
        position={[18, 22, 14]}
        intensity={1.1}
        color="#f4f6ff"
        castShadow={shadowsEnabled}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Dynamic Contextual Emissive Accent Point Light */}
      <pointLight
        ref={pointLightRef}
        position={[-6, 4, 6]}
        intensity={0.8}
        color="#00e5ff"
        distance={35}
        decay={2}
      />

      {/* Subtle Warm Secondary Rim Light */}
      <directionalLight
        position={[-15, -10, -12]}
        intensity={0.4}
        color="#d4b483"
      />
    </>
  );
}

export default Lighting;
