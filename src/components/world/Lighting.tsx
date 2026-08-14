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

    // Default Mission Control values
    let targetAmbient = 0.25;
    let targetKey = 1.0;
    let targetPoint = 0.6;
    let pointX = 0;
    let pointY = 2;
    let pointZ = 6;

    if (currentState === "ABOUT") {
      // Focused lighting on Left Observatory
      targetAmbient = 0.35;
      targetKey = 1.1;
      targetPoint = 1.2;
      pointX = -16;
      pointY = 1;
      pointZ = 3;
    } else if (currentState === "PROJECTS" || currentState === "PROJECT_DETAIL") {
      // Focused lighting on Lower Research Archive
      targetAmbient = 0.2;
      targetKey = 1.2;
      targetPoint = 1.0;
      pointX = 0;
      pointY = -12;
      pointZ = 3;
    } else if (currentState === "EXPERIENCE") {
      // Focused lighting on Right Orbital History
      targetAmbient = 0.3;
      targetKey = 1.1;
      targetPoint = 1.2;
      pointX = 16;
      pointY = 1;
      pointZ = 3;
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
      pointLightRef.current.position.x +=
        (pointX - pointLightRef.current.position.x) * lerpSpeed;
      pointLightRef.current.position.y +=
        (pointY - pointLightRef.current.position.y) * lerpSpeed;
      pointLightRef.current.position.z +=
        (pointZ - pointLightRef.current.position.z) * lerpSpeed;
    }
  });

  return (
    <>
      {/* Deep Obsidian Ambient Base */}
      <ambientLight ref={ambientRef} color="#080a10" intensity={0.25} />

      {/* Primary Key Directional Sun Light with Shadows */}
      <directionalLight
        ref={keyLightRef}
        position={[20, 25, 15]}
        intensity={1.0}
        color="#f0f3fa"
        castShadow={shadowsEnabled}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Dynamic Contextual Emissive Accent Point Light */}
      <pointLight
        ref={pointLightRef}
        position={[0, 2, 6]}
        intensity={0.6}
        color="#00e5ff"
        distance={25}
        decay={2}
      />
    </>
  );
}

export default Lighting;
