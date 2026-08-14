"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Mesh } from "three";

export function OrbitRing() {
  const ringRef = useRef<Mesh>(null);

  // Very slow subtle trajectory drift
  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.015;
    }
  });

  const { colors } = DESIGN_SYSTEM;

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      {/* Slender Luminous Trajectory Path */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3.8, 0.015, 16, 80]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={0.35}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

export default OrbitRing;
