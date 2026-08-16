"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Group, Mesh } from "three";

export function TelemetryHolo() {
  const sweepGroupRef = useRef<Group>(null);
  const radarSweepRef = useRef<Mesh>(null);
  const scanningBeamConeRef = useRef<Mesh>(null);
  const gridGroupRef = useRef<Group>(null);

  // 12-Second Majestic 360° Radar & Sensor Sweep (2*PI / 12 rad/sec = ~0.523 rad/sec)
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    // Exactly 1 full 360 rotation every 12.0 seconds
    if (sweepGroupRef.current) {
      sweepGroupRef.current.rotation.y += delta * ((Math.PI * 2) / 12.0);
    }
    if (gridGroupRef.current) {
      gridGroupRef.current.rotation.y += delta * 0.008;
    }
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z -= delta * 0.3;
    }
  });

  const { colors } = DESIGN_SYSTEM;

  return (
    <group ref={gridGroupRef} position={[0, -0.2, 0]}>
      {/* 1. 12-Second Sweeping Volumetric Sensor Beam Cone */}
      <group ref={sweepGroupRef} position={[0, 1.5, 0]}>
        {/* Soft Holographic Scan Wedge */}
        <mesh
          ref={scanningBeamConeRef}
          position={[0, 0, 7.5]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <coneGeometry args={[4.5, 15, 24, 1, true, -Math.PI / 8, Math.PI / 4]} />
          <meshBasicMaterial
            color={colors.electricCyan}
            transparent
            opacity={0.035}
            depthWrite={false}
          />
        </mesh>

        {/* Primary Laser Scan Line Ray */}
        <mesh position={[0, 0, 8.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 17, 8]} />
          <meshBasicMaterial
            color={colors.electricCyan}
            transparent
            opacity={0.25}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 2. Flat Concentric Telemetry Distance Range Rings */}
      {[4.8, 8.5, 12.5, 16.5].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.02, 64]} />
          <meshBasicMaterial
            color={colors.electricCyan}
            transparent
            opacity={0.06}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* 3. Subtle Horizontal Grid Plane Wireframe */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 18, 64, 1, 0, Math.PI * 2]} />
        <meshBasicMaterial
          color={colors.electricCyan}
          transparent
          opacity={0.02}
          wireframe
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default TelemetryHolo;
