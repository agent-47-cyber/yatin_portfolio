"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Group, Mesh } from "three";

export function Station() {
  const stationGroupRef = useRef<Group>(null);
  const outerRingRef = useRef<Mesh>(null);
  const innerRingRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const beaconLightsRef = useRef<Group>(null);

  // Subtle living rotation & beacon breathing (Zero allocations, zero setState)
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (stationGroupRef.current) {
      // Very slow global station orientation drift
      stationGroupRef.current.rotation.y += delta * 0.015;
    }
    if (outerRingRef.current) {
      // Outer habitation ring slow spin
      outerRingRef.current.rotation.z += delta * 0.03;
    }
    if (innerRingRef.current) {
      // Middle accelerator ring counter-rotation
      innerRingRef.current.rotation.z -= delta * 0.07;
      innerRingRef.current.rotation.x += delta * 0.02;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.05;
      coreRef.current.rotation.x += delta * 0.025;
    }
    if (beaconLightsRef.current) {
      // Gentle beacon breathing
      const pulse = 0.8 + Math.sin(elapsed * 2.5) * 0.3;
      beaconLightsRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const { colors, materials } = DESIGN_SYSTEM;

  return (
    <group ref={stationGroupRef} position={[0, 0, 0]}>
      {/* 1. CENTRAL COMMAND HUB */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <octahedronGeometry args={[2.4, 1]} />
        <meshStandardMaterial
          color="#12131a"
          metalness={0.9}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Observation Glass Dome */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[1.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={materials.glass.transmission}
          roughness={materials.glass.roughness}
          thickness={1.5}
          clearcoat={1.0}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 2. INNER ACCELERATOR RING */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[7.2, 0.08, 16, 120]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={1.4}
          roughness={0.1}
        />
      </mesh>

      {/* 3. PRIMARY HABITATION RING */}
      <group ref={outerRingRef}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[11.5, 0.55, 24, 120]} />
          <meshStandardMaterial
            color="#181924"
            metalness={materials.stationHull.metalness}
            roughness={materials.stationHull.roughness}
          />
        </mesh>

        {/* Windows / Emissive Habitation Slits */}
        <mesh>
          <torusGeometry args={[11.5, 0.57, 8, 60]} />
          <meshStandardMaterial
            color={colors.warmWhite}
            emissive={colors.warmWhite}
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>
      </group>

      {/* 4. 4 RADIAL DOCKING TRUSS ARMS */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            {/* Primary Truss Beam */}
            <mesh position={[5.8, 0, 0]} castShadow>
              <boxGeometry args={[11.2, 0.25, 0.35]} />
              <meshStandardMaterial
                color="#222433"
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>

            {/* Research Module Pod at End of Arm */}
            <mesh position={[10.2, 0, 0]} castShadow>
              <capsuleGeometry args={[0.45, 1.2, 8, 16]} />
              <meshStandardMaterial
                color="#141620"
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>

            {/* Solar Radiator Fins */}
            <mesh position={[7.5, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[2.2, 0.02, 0.9]} />
              <meshStandardMaterial
                color="#00e5ff"
                emissive="#00e5ff"
                emissiveIntensity={0.25}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* 5. CYAN TELEMETRY BEACON INDICATORS */}
      <group ref={beaconLightsRef}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2 + Math.PI / 4;
          const radius = 11.5;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0.6]}
            >
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial
                color={colors.electricCyan}
                emissive={colors.electricCyan}
                emissiveIntensity={2.0}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default Station;
