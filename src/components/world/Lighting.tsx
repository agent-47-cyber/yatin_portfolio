"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { Color, type DirectionalLight, type PointLight, type AmbientLight } from "three";

// Pre-allocated static Color objects for zero-allocation lerping inside useFrame
const targetAmbientColor = new Color();
const targetPointColor = new Color();

export function Lighting() {
  const { shadowsEnabled } = useAdaptiveQuality();
  const currentState = useAppStore((state) => state.currentState);

  const ambientRef = useRef<AmbientLight>(null);
  const keyLightRef = useRef<DirectionalLight>(null);
  const pointLightRef = useRef<PointLight>(null);
  const secondaryPointRef = useRef<PointLight>(null);

  // Smooth per-frame mood lighting & color palette transitions (Zero allocations)
  useFrame((_, delta) => {
    const lerpSpeed = delta * 2.5;

    // 1. Mission Control: Cold Sapphire & Cyan
    let targetAmbient = 0.25;
    let targetKey = 1.0;
    let targetPoint = 0.6;
    let pointX = 0;
    let pointY = 2;
    let pointZ = 6;
    targetAmbientColor.set("#060a14");
    targetPointColor.set("#00e5ff");

    if (currentState === "ABOUT") {
      // 2. About: Warm Champagne & Amber Crystalline
      targetAmbient = 0.35;
      targetKey = 1.2;
      targetPoint = 1.3;
      pointX = -16;
      pointY = 1.5;
      pointZ = 3.5;
      targetAmbientColor.set("#14100a");
      targetPointColor.set("#ffd166");
    } else if (currentState === "PROJECTS" || currentState === "PROJECT_DETAIL") {
      // 3. Projects: High-Contrast Electric Amber / Orange Spotlight
      targetAmbient = 0.18;
      targetKey = 1.3;
      targetPoint = 1.4;
      pointX = 0;
      pointY = -12;
      pointZ = 3.5;
      targetAmbientColor.set("#050403");
      targetPointColor.set("#ff7b00");
    } else if (currentState === "EXPERIENCE") {
      // 4. Experience: Deep Galactic Violet & Magenta Orbital Twilight
      targetAmbient = 0.28;
      targetKey = 1.1;
      targetPoint = 1.5;
      pointX = 16;
      pointY = 1.5;
      pointZ = 3.5;
      targetAmbientColor.set("#080512");
      targetPointColor.set("#e0aaff");
    }

    if (ambientRef.current) {
      ambientRef.current.intensity +=
        (targetAmbient - ambientRef.current.intensity) * lerpSpeed;
      ambientRef.current.color.lerp(targetAmbientColor, lerpSpeed);
    }
    if (keyLightRef.current) {
      keyLightRef.current.intensity +=
        (targetKey - keyLightRef.current.intensity) * lerpSpeed;
    }
    if (pointLightRef.current) {
      pointLightRef.current.intensity +=
        (targetPoint - pointLightRef.current.intensity) * lerpSpeed;
      pointLightRef.current.color.lerp(targetPointColor, lerpSpeed);
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
      {/* Dynamic Ambient Base Light */}
      <ambientLight ref={ambientRef} color="#060a14" intensity={0.25} />

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
        distance={30}
        decay={2}
      />

      {/* Secondary Rim Fill */}
      <pointLight
        ref={secondaryPointRef}
        position={[0, -5, -8]}
        intensity={0.3}
        color="#2b2d42"
        distance={40}
      />
    </>
  );
}

export default Lighting;
