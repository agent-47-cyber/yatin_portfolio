"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Group, Mesh } from "three";

export function Station() {
  const stationRef = useRef<Group>(null);
  const outerRingRef = useRef<Mesh>(null);
  const innerRingRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);

  // Per-frame rotational animation via direct mutation (Zero setState, Zero allocations)
  useFrame((_, delta) => {
    if (stationRef.current) {
      stationRef.current.rotation.y += delta * 0.02;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.04;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.06;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.01;
    }
  });

  const { materials, colors } = DESIGN_SYSTEM;

  return (
    <group ref={stationRef} position={[0, 0, 0]}>
      {/* Central Command Hub */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <octahedronGeometry args={[2.2, 2]} />
        <meshStandardMaterial
          color="#16161e"
          roughness={materials.stationHull.roughness}
          metalness={materials.stationHull.metalness}
        />
      </mesh>

      {/* Observation Glass Dome */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
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

      {/* Outer Counter-Rotating Habitation Ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]} castShadow>
        <torusGeometry args={[6.5, 0.18, 16, 100]} />
        <meshStandardMaterial
          color="#1c1c24"
          roughness={0.35}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Accelerator Ring */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 4, 0, 0]} castShadow>
        <torusGeometry args={[4.2, 0.12, 16, 80]} />
        <meshStandardMaterial
          color={colors.electricCyan}
          emissive={colors.electricCyan}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Structural Solar Fins */}
      {[-1, 1].map((dir) => (
        <group key={dir} position={[dir * 4.5, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 3.5, 8]} />
            <meshStandardMaterial color="#2d2d38" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.05, 1.2, 2.5]} />
            <meshStandardMaterial
              color="#0d0d12"
              roughness={0.2}
              metalness={0.95}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default Station;
