"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import { useAppStore } from "@/store/useAppStore";
import type { Group, Mesh } from "three";

export function Observatory() {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);

  const currentState = useAppStore((state) => state.currentState);
  const isAboutActive = currentState === "ABOUT";

  // Per-frame floating and rotation
  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      const elapsed = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(elapsed * 0.6) * 0.08;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
      coreRef.current.rotation.x += delta * 0.15;
    }
  });

  const { materials, colors } = DESIGN_SYSTEM;

  // Located on the Left Flank Sector
  return (
    <group ref={groupRef} position={[-16, 0, -2]}>
      {/* 1. Suspended Translucent Glass Chamber */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.2, 3.2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={materials.glass.transmission}
          roughness={materials.glass.roughness}
          thickness={materials.glass.thickness}
          clearcoat={materials.glass.clearcoat}
          metalness={materials.glass.metalness}
          transparent
          opacity={isAboutActive ? 0.95 : 0.15}
        />
      </mesh>

      {/* 2. Structural Collars */}
      {[-1.6, 1.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <cylinderGeometry args={[2.3, 2.3, 0.15, 32]} />
          <meshStandardMaterial color="#1a1b24" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* 3. Interior Floating Holographic Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={isAboutActive ? 1.4 : 0.2}
          wireframe
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 4. Ambient Cyan Floor Datum */}
      <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 2.0, 32]} />
        <meshBasicMaterial
          color={colors.electricCyan}
          transparent
          opacity={isAboutActive ? 0.3 : 0.05}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default Observatory;
