"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Experience } from "@/types";
import type { Group, Mesh } from "three";

interface OrbitNodeProps {
  experience: Experience;
  position: [number, number, number];
  isActive: boolean;
  isHovered: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onClick: () => void;
}

export function OrbitNode({
  position,
  isActive,
  isHovered,
  onPointerEnter,
  onPointerLeave,
  onClick,
}: OrbitNodeProps) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  const { colors } = DESIGN_SYSTEM;

  // Subtle per-frame floating and rotation
  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    groupRef.current.position.y =
      position[1] + Math.sin(elapsed * (isHovered ? 1.4 : 0.8)) * 0.08;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (isHovered ? 1.0 : 0.4);
      coreRef.current.rotation.x += delta * (isHovered ? 0.5 : 0.2);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.6;
    }
  });

  const scale = isActive ? 1.3 : isHovered ? 1.15 : 1.0;
  const emissiveIntensity = isActive ? 1.8 : isHovered ? 1.4 : 0.7;

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      scale={scale}
      onPointerEnter={(e) => {
        e.stopPropagation();
        onPointerEnter();
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        onPointerLeave();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* 1. Octahedral Waypoint Beacon Core */}
      <mesh ref={coreRef} castShadow>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={emissiveIntensity}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 2. Pulsing Waypoint Orbital Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.75, 0.02, 16, 48]} />
        <meshStandardMaterial
          color={colors.warmWhite}
          emissive={colors.warmWhite}
          emissiveIntensity={isHovered || isActive ? 1.0 : 0.4}
        />
      </mesh>

      {/* 3. Outer Coordinate Ring Indicator */}
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.6, 32]} />
        <meshBasicMaterial
          color={colors.electricCyan}
          transparent
          opacity={isActive ? 0.4 : isHovered ? 0.25 : 0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default OrbitNode;
