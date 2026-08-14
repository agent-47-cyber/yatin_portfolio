"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Group, Mesh } from "three";

export function Station() {
  const stationGroupRef = useRef<Group>(null);
  const outerRingRef = useRef<Mesh>(null);
  const innerRingRef = useRef<Mesh>(null);
  const coreHubRef = useRef<Mesh>(null);
  const beaconGroupRef = useRef<Group>(null);

  // Smooth per-frame mechanical rotation (Zero allocations, direct mutation)
  useFrame((_, delta) => {
    if (stationGroupRef.current) {
      stationGroupRef.current.rotation.y += delta * 0.015;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.03;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.045;
    }
    if (coreHubRef.current) {
      coreHubRef.current.rotation.y += delta * 0.02;
    }
    if (beaconGroupRef.current) {
      beaconGroupRef.current.rotation.y -= delta * 0.015;
    }
  });

  const { materials, colors } = DESIGN_SYSTEM;

  return (
    <group ref={stationGroupRef} position={[0, 0, 0]}>
      {/* 1. Central Core Hub */}
      <mesh ref={coreHubRef} castShadow receiveShadow>
        <octahedronGeometry args={[3.2, 2]} />
        <meshStandardMaterial
          color="#12131a"
          roughness={materials.stationHull.roughness}
          metalness={materials.stationHull.metalness}
        />
      </mesh>

      {/* 2. Suspended Observation Glass Chamber */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={materials.glass.transmission}
          roughness={materials.glass.roughness}
          thickness={materials.glass.thickness}
          clearcoat={materials.glass.clearcoat}
          metalness={materials.glass.metalness}
          transparent
        />
      </mesh>

      {/* 3. Primary Massive Habitation Ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 3.5, 0, 0]} castShadow>
        <torusGeometry args={[11.5, 0.35, 16, 120]} />
        <meshStandardMaterial
          color="#181922"
          roughness={0.4}
          metalness={0.88}
        />
      </mesh>

      {/* 4. Secondary Glowing Cyan Accelerator Ring */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 4, 0, 0]} castShadow>
        <torusGeometry args={[7.2, 0.18, 16, 100]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={0.85}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* 5. Structural Docking Arms & Trusses */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => {
        const x = Math.cos(angle) * 7.5;
        const z = Math.sin(angle) * 7.5;
        return (
          <group key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            {/* Main Spine Truss */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 7.0, 8]} />
              <meshStandardMaterial color="#22232e" metalness={0.85} roughness={0.3} />
            </mesh>

            {/* Research Module Pods */}
            <mesh position={[2.5, 0, 0]}>
              <boxGeometry args={[1.2, 1.2, 1.8]} />
              <meshStandardMaterial color="#14151e" metalness={0.9} roughness={0.35} />
            </mesh>

            {/* Cyan Telemetry Strip */}
            <mesh position={[2.5, 0.65, 0]}>
              <boxGeometry args={[0.8, 0.04, 1.4]} />
              <meshStandardMaterial
                color={colors.electricCyan}
                emissive={colors.electricCyan}
                emissiveIntensity={1.2}
              />
            </mesh>

            {/* Solar Radiator Fin */}
            <mesh position={[4.5, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
              <boxGeometry args={[0.06, 2.5, 4.0]} />
              <meshStandardMaterial color="#0c0d12" metalness={0.95} roughness={0.2} />
            </mesh>
          </group>
        );
      })}

      {/* 6. Rotating Beacon Telemetry Indicator Lights */}
      <group ref={beaconGroupRef}>
        {[11.5, -11.5].map((pos, i) => (
          <mesh key={i} position={[pos, 0, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial
              color={colors.electricCyan}
              emissive={colors.electricCyan}
              emissiveIntensity={2.0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default Station;
