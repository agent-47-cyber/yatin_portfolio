"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Mesh } from "three";

export function OrbitRing() {
  const ringRef = useRef<Mesh>(null);

  // Subtle trajectory drift
  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.02;
    }
  });

  const { colors } = DESIGN_SYSTEM;

  return (
    <group rotation={[Math.PI / 4, Math.PI / 6, 0]}>
      {/* Primary Luminous Trajectory Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[5.2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Faint Outer Telemetry Guide Ring */}
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[6.4, 0.015, 16, 80]} />
        <meshStandardMaterial
          color="#3a3c4a"
          metalness={0.9}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

export default OrbitRing;
