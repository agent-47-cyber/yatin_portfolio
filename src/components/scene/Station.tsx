"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Group, Mesh, MeshStandardMaterial } from "three";

export function Station() {
  const stationGroupRef = useRef<Group>(null);
  const coreHubRef = useRef<Mesh>(null);
  const primaryRingRef = useRef<Mesh>(null);
  const secondaryRingRef = useRef<Mesh>(null);
  const solarLeftRef = useRef<Group>(null);
  const solarRightRef = useRef<Group>(null);
  const commsMastRef = useRef<Group>(null);
  const beacon1Ref = useRef<Mesh>(null);
  const beacon2Ref = useRef<Mesh>(null);

  // Per-frame slow majestic rotation (Zero allocations)
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (stationGroupRef.current) {
      stationGroupRef.current.position.y = Math.sin(elapsed * 0.3) * 0.08;
    }
    if (coreHubRef.current) {
      coreHubRef.current.rotation.y += delta * 0.03;
    }
    if (primaryRingRef.current) {
      primaryRingRef.current.rotation.z += delta * 0.04;
    }
    if (secondaryRingRef.current) {
      secondaryRingRef.current.rotation.z -= delta * 0.025;
    }
    if (commsMastRef.current) {
      commsMastRef.current.rotation.y += delta * 0.1;
    }

    // Staggered navigation beacon strobes
    if (beacon1Ref.current) {
      const mat1 = beacon1Ref.current.material as MeshStandardMaterial;
      if (mat1) {
        mat1.emissiveIntensity = Math.sin(elapsed * 4.0) > 0.7 ? 2.5 : 0.2;
      }
    }
    if (beacon2Ref.current) {
      const mat2 = beacon2Ref.current.material as MeshStandardMaterial;
      if (mat2) {
        mat2.emissiveIntensity = Math.sin(elapsed * 4.0 + Math.PI) > 0.7 ? 2.5 : 0.2;
      }
    }
  });

  const { colors } = DESIGN_SYSTEM;

  return (
    <group ref={stationGroupRef} position={[0, 0, 0]}>
      {/* 1. CENTRAL COMMAND HUB (Multi-Tiered Octagonal Core) */}
      <mesh ref={coreHubRef} castShadow receiveShadow>
        <cylinderGeometry args={[1.6, 1.8, 3.8, 8]} />
        <meshStandardMaterial
          color="#12141c"
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>

      {/* Titanium Core Collar Rings */}
      {[-1.2, 0, 1.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <torusGeometry args={[1.85, 0.06, 16, 32]} />
          <meshStandardMaterial color="#252936" metalness={0.95} roughness={0.2} />
        </mesh>
      ))}

      {/* 2. PRIMARY TITANIUM LIVING RING (Radius 9.5) */}
      <group ref={primaryRingRef}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[9.5, 0.35, 24, 96]} />
          <meshStandardMaterial
            color="#141722"
            metalness={0.9}
            roughness={0.28}
          />
        </mesh>

        {/* Luminous Inner Accelerator Strip */}
        <mesh>
          <torusGeometry args={[9.25, 0.02, 16, 96]} />
          <meshStandardMaterial
            color={colors.electricCyan}
            emissive={colors.electricCyan}
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Habitation Modules on Primary Ring */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI * 2) / 8;
          const x = Math.cos(angle) * 9.5;
          const y = Math.sin(angle) * 9.5;
          return (
            <mesh
              key={i}
              position={[x, y, 0]}
              rotation={[0, 0, angle + Math.PI / 2]}
              castShadow
            >
              <boxGeometry args={[0.7, 1.2, 0.7]} />
              <meshStandardMaterial color="#1f2330" metalness={0.9} roughness={0.3} />
            </mesh>
          );
        })}
      </group>

      {/* 3. COUNTER-ROTATING SECONDARY OBSERVATION RING (Radius 6.2) */}
      <group ref={secondaryRingRef} rotation={[0, 0, Math.PI / 6]}>
        <mesh castShadow>
          <torusGeometry args={[6.2, 0.18, 16, 64]} />
          <meshStandardMaterial
            color="#1a1d28"
            metalness={0.88}
            roughness={0.32}
          />
        </mesh>
      </group>

      {/* 4. MASSIVE STRUCTURAL DOCKING ARMS & TRUSSES */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            {/* Primary Connecting Pylon */}
            <mesh position={[4.8, 0, 0]} castShadow>
              <boxGeometry args={[7.2, 0.18, 0.35]} />
              <meshStandardMaterial color="#1a1d2a" metalness={0.92} roughness={0.25} />
            </mesh>
            {/* Structural Reinforcement Ribs */}
            <mesh position={[4.8, 0.15, 0]}>
              <boxGeometry args={[6.8, 0.04, 0.15]} />
              <meshStandardMaterial
                color={colors.electricCyan}
                emissive={colors.electricCyan}
                emissiveIntensity={0.4}
              />
            </mesh>
          </group>
        );
      })}

      {/* 5. SOLAR RADIATOR PANELS (Left & Right Wings) */}
      <group ref={solarLeftRef} position={[-11.5, 0, 0]} rotation={[0, 0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3.2, 0.04, 1.6]} />
          <meshStandardMaterial
            color="#080c18"
            metalness={0.98}
            roughness={0.15}
          />
        </mesh>
        {/* Photovoltaic Grid Lines */}
        <mesh position={[0, 0.025, 0]}>
          <planeGeometry args={[3.1, 1.5]} />
          <meshStandardMaterial
            color="#0077b6"
            emissive="#0077b6"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      </group>

      <group ref={solarRightRef} position={[11.5, 0, 0]} rotation={[0, -0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3.2, 0.04, 1.6]} />
          <meshStandardMaterial
            color="#080c18"
            metalness={0.98}
            roughness={0.15}
          />
        </mesh>
        {/* Photovoltaic Grid Lines */}
        <mesh position={[0, 0.025, 0]}>
          <planeGeometry args={[3.1, 1.5]} />
          <meshStandardMaterial
            color="#0077b6"
            emissive="#0077b6"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      </group>

      {/* 6. COMMUNICATIONS MAST & ROTATING RADAR ARRAY */}
      <group ref={commsMastRef} position={[0, 2.5, 0]}>
        {/* Antenna Mast Spine */}
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.08, 2.0, 8]} />
          <meshStandardMaterial color="#33384a" metalness={0.95} />
        </mesh>
        {/* Parabolic High-Gain Dish */}
        <mesh position={[0, 0.8, 0.2]} rotation={[Math.PI / 3, 0, 0]} castShadow>
          <coneGeometry args={[0.45, 0.15, 16, 1, true]} />
          <meshStandardMaterial color="#4a5068" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      {/* 7. NAVIGATION BEACON STROBES */}
      <mesh ref={beacon1Ref} position={[0, 3.6, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial
          color="#ff3838"
          emissive="#ff3838"
          emissiveIntensity={2.5}
        />
      </mesh>
      <mesh ref={beacon2Ref} position={[0, -3.2, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2.5}
        />
      </mesh>
    </group>
  );
}

export default Station;
