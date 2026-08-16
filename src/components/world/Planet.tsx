"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Group, Mesh } from "three";

export function Planet() {
  const planetGroupRef = useRef<Group>(null);
  const planetMeshRef = useRef<Mesh>(null);
  const innerAtmoRef = useRef<Mesh>(null);
  const outerAtmoRef = useRef<Mesh>(null);

  // Slow majestic planetary axial rotation and atmospheric drift
  useFrame((_, delta) => {
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += delta * 0.002;
    }
    if (innerAtmoRef.current) {
      innerAtmoRef.current.rotation.y += delta * 0.003;
    }
    if (outerAtmoRef.current) {
      outerAtmoRef.current.rotation.y -= delta * 0.0015;
    }
  });

  const { colors } = DESIGN_SYSTEM;

  return (
    <group ref={planetGroupRef} position={[0, -56, -42]}>
      {/* 1. Deep Planetary Body with Atmospheric Shading */}
      <mesh ref={planetMeshRef} receiveShadow>
        <sphereGeometry args={[50, 64, 64]} />
        <meshStandardMaterial
          color="#04070d"
          roughness={0.88}
          metalness={0.2}
          emissive="#001827"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* 2. Inner Dense Cyan Stratosphere Glow Layer */}
      <mesh ref={innerAtmoRef}>
        <sphereGeometry args={[50.45, 64, 64]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={0.75}
          transparent
          opacity={0.35}
          roughness={0.6}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Outer Rayleigh Scattering Horizon Halo (Quietly fills bottom third) */}
      <mesh ref={outerAtmoRef}>
        <sphereGeometry args={[51.2, 64, 64]} />
        <meshBasicMaterial
          color="#0088cc"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Solar Horizon Rim Highlight Crescent Ring */}
      <mesh position={[0, 48.8, 12]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14, 26, 64]} />
        <meshBasicMaterial
          color={colors.electricCyan}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default Planet;
