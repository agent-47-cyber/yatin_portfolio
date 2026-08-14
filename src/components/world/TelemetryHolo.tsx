"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Group, Mesh } from "three";

export function TelemetryHolo() {
  const radarSweepRef = useRef<Mesh>(null);
  const gridGroupRef = useRef<Group>(null);

  // Subtle per-frame radar sweep & holo rotation
  useFrame(({ clock }, delta) => {
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z -= delta * 0.4;
    }
    if (gridGroupRef.current) {
      gridGroupRef.current.rotation.y += delta * 0.01;
    }
  });

  const { colors } = DESIGN_SYSTEM;

  return (
    <group ref={gridGroupRef} position={[0, -0.4, 0]}>
      {/* 1. Large Subtle Orbital Radar Sweep */}
      <mesh ref={radarSweepRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 14.5, 64, 1, 0, Math.PI / 3]} />
        <meshBasicMaterial
          color={colors.electricCyan}
          transparent
          opacity={0.04}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Concentric Telemetry Distance Rings */}
      {[5.5, 10.5, 15.5].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.015, 64]} />
          <meshBasicMaterial
            color={colors.electricCyan}
            transparent
            opacity={0.06}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default TelemetryHolo;
