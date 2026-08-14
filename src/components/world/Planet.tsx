"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Mesh } from "three";

export function Planet() {
  const planetRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);

  // Very slow planetary rotation
  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.003;
    }
  });

  return (
    <group position={[0, -58, -30]}>
      {/* Massive Distant Planet Body */}
      <mesh ref={planetRef} receiveShadow>
        <sphereGeometry args={[50, 64, 64]} />
        <meshStandardMaterial
          color="#0c0e14"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Atmospheric Rim Glow */}
      <mesh ref={atmosphereRef} scale={1.015}>
        <sphereGeometry args={[50, 48, 48]} />
        <meshStandardMaterial
          color={DESIGN_SYSTEM.colors.electricCyan}
          emissive={DESIGN_SYSTEM.colors.electricCyan}
          emissiveIntensity={0.25}
          roughness={1.0}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      {/* Warm Sunlit Terminator Rim */}
      <mesh scale={1.02} rotation={[0.4, 0.8, 0]}>
        <sphereGeometry args={[50, 32, 32]} />
        <meshStandardMaterial
          color={DESIGN_SYSTEM.colors.warmOrange}
          emissive={DESIGN_SYSTEM.colors.warmOrange}
          emissiveIntensity={0.12}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default Planet;
