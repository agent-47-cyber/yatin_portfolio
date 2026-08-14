"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import { useAppStore } from "@/store/useAppStore";
import type { Group, Mesh } from "three";

export function Observatory() {
  const groupRef = useRef<Group>(null);
  const chamberRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  const currentState = useAppStore((state) => state.currentState);
  const isAboutActive = currentState === "ABOUT";

  // Per-frame floating and holographic rotation
  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      const elapsed = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(elapsed * 0.8) * 0.12;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
    }
  });

  const { materials, colors } = DESIGN_SYSTEM;

  return (
    <group ref={groupRef} position={[-8.5, 0, 0]}>
      {/* 1. Suspended Translucent Glass Chamber */}
      <mesh ref={chamberRef} castShadow receiveShadow>
        <cylinderGeometry args={[2.8, 2.8, 3.8, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={materials.glass.transmission}
          roughness={materials.glass.roughness}
          thickness={materials.glass.thickness}
          clearcoat={materials.glass.clearcoat}
          metalness={materials.glass.metalness}
          transparent
          opacity={isAboutActive ? 0.95 : 0.4}
        />
      </mesh>

      {/* 2. Top & Bottom Structural Collars */}
      {[-1.9, 1.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <cylinderGeometry args={[2.9, 2.9, 0.2, 32]} />
          <meshStandardMaterial color="#1a1b24" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* 3. Interior Floating Holographic Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={isAboutActive ? 1.4 : 0.6}
          wireframe
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 4. Internal Orbital Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.4, 0.04, 16, 64]} />
        <meshStandardMaterial
          color={colors.warmWhite}
          emissive={colors.warmWhite}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* 5. Ambient Cyan Floor Projection */}
      <mesh position={[0, -1.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 2.6, 32]} />
        <meshBasicMaterial
          color={colors.electricCyan}
          transparent
          opacity={isAboutActive ? 0.35 : 0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default Observatory;
