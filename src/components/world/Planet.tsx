"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Mesh } from "three";

export function Planet() {
  const planetRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);

  // Very slow planetary axial rotation
  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.003;
    }
  });

  const { colors } = DESIGN_SYSTEM;

  return (
    <group position={[0, -95, -85]}>
      {/* 1. Distant Dark Planetary Body */}
      <mesh ref={planetRef} receiveShadow>
        <sphereGeometry args={[80, 64, 64]} />
        <meshStandardMaterial
          color="#06070a"
          roughness={0.95}
          metalness={0.1}
          emissive="#00141f"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* 2. Delicate Atmospheric Rim Glow Horizon */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[80.8, 64, 64]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={0.3}
          transparent
          opacity={0.12}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

export default Planet;
