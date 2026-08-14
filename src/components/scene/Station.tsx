"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Group, Mesh } from "three";

export function Station() {
  const stationGroupRef = useRef<Group>(null);
  const outerRingRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);

  // Subtle living rotation (Zero allocations, zero setState)
  useFrame((_, delta) => {
    if (stationGroupRef.current) {
      stationGroupRef.current.rotation.y += delta * 0.008;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.02;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.03;
    }
  });

  const { colors, materials } = DESIGN_SYSTEM;

  return (
    <group ref={stationGroupRef} position={[0, 0, 0]}>
      {/* 1. CENTRAL COMMAND HUB */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <octahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#12131a"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Observation Glass Dome */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={materials.glass.transmission}
          roughness={materials.glass.roughness}
          thickness={1.2}
          clearcoat={1.0}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* 2. PRIMARY HABITATION RING (Halo-like architectural ring) */}
      <group ref={outerRingRef}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[9.5, 0.35, 16, 100]} />
          <meshStandardMaterial
            color="#181924"
            metalness={materials.stationHull.metalness}
            roughness={materials.stationHull.roughness}
          />
        </mesh>

        {/* Delicate Emissive Interior Tracer */}
        <mesh>
          <torusGeometry args={[9.5, 0.37, 8, 48]} />
          <meshStandardMaterial
            color={colors.electricCyan}
            emissive={colors.electricCyan}
            emissiveIntensity={0.25}
            wireframe
          />
        </mesh>
      </group>

      {/* 3. 4 SLENDER DOCKING TRUSS ARMS */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            {/* Primary Truss Beam */}
            <mesh position={[4.8, 0, 0]} castShadow>
              <boxGeometry args={[9.2, 0.12, 0.18]} />
              <meshStandardMaterial
                color="#1e202d"
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>

            {/* Research Module Pod at Arm Tip */}
            <mesh position={[8.8, 0, 0]} castShadow>
              <capsuleGeometry args={[0.3, 0.8, 6, 12]} />
              <meshStandardMaterial
                color="#141620"
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
          </group>
        );
      })}

      {/* 4. SUBTLE TELEMETRY INDICATOR LIGHTS */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2 + Math.PI / 4;
        const radius = 9.5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0.4]}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color={colors.electricCyan}
              emissive={colors.electricCyan}
              emissiveIntensity={1.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default Station;
