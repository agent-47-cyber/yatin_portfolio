"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import { useAppStore } from "@/store/useAppStore";
import type { Group, Mesh } from "three";

export function Observatory() {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const starChartRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  const currentState = useAppStore((state) => state.currentState);
  const isAboutActive = currentState === "ABOUT";

  // Per-frame observation deck rotation & holographic chart drift
  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      const elapsed = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(elapsed * 0.5) * 0.05;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
    }
    if (starChartRef.current) {
      starChartRef.current.rotation.z -= delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.15;
    }
  });

  const { materials, colors } = DESIGN_SYSTEM;

  // Located on the Left Flank Sector
  return (
    <group ref={groupRef} position={[-16, 0, -2]}>
      {/* 1. Observation Deck Glass Chamber */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.6, 2.6, 3.4, 32, 1, true]} />
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

      {/* 2. Structural Deck Plates (Top & Bottom) */}
      {[-1.7, 1.7].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <cylinderGeometry args={[2.7, 2.7, 0.15, 32]} />
          <meshStandardMaterial color="#181a24" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* 3. Radial Structural Floor Ribs */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 4;
        return (
          <mesh key={i} position={[0, -1.65, 0]} rotation={[0, angle, 0]}>
            <boxGeometry args={[5.0, 0.04, 0.08]} />
            <meshStandardMaterial color="#2a2c3a" metalness={0.8} />
          </mesh>
        );
      })}

      {/* 4. Central Holographic Star-Chart Table */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.85, 0.7, 16]} />
        <meshStandardMaterial color="#1a1c28" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Holographic Projection Emitter */}
      <mesh ref={starChartRef} position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.6, 24]} />
        <meshBasicMaterial
          color={colors.electricCyan}
          transparent
          opacity={isAboutActive ? 0.5 : 0.1}
          depthWrite={false}
        />
      </mesh>

      {/* Floating Holographic Identity Matrix */}
      <mesh ref={coreRef} position={[0, 0.4, 0]}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color={colors.warmWhite}
          emissive={colors.warmWhite}
          emissiveIntensity={isAboutActive ? 1.4 : 0.3}
          wireframe
        />
      </mesh>

      {/* Orbital Telemetry Ring */}
      <mesh ref={ringRef} position={[0, 0.4, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.75, 0.015, 16, 48]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={isAboutActive ? 1.2 : 0.2}
        />
      </mesh>
    </group>
  );
}

export default Observatory;
