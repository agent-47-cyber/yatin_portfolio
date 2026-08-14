"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Project } from "@/types";
import type { Group, Mesh } from "three";

interface ArchiveObjectProps {
  project: Project;
  position: [number, number, number];
  isHovered: boolean;
  isSelected: boolean;
  isDimmed: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onClick: () => void;
}

export function ArchiveObject({
  project,
  position,
  isHovered,
  isSelected,
  isDimmed,
  onPointerEnter,
  onPointerLeave,
  onClick,
}: ArchiveObjectProps) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const nodeGroupRef = useRef<Group>(null);
  const shieldRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);

  const { colors, materials } = DESIGN_SYSTEM;
  const accentColor = project.accentColor || colors.electricCyan;

  // Living per-frame animations
  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    const floatSpeed = isSelected ? 0.3 : isHovered ? 1.2 : 0.6;
    const floatAmp = isSelected ? 0.02 : isHovered ? 0.08 : 0.04;

    groupRef.current.position.y = position[1] + Math.sin(elapsed * floatSpeed) * floatAmp;

    // 1. DevScope: Flowing Code Tree Node Rotations
    if (nodeGroupRef.current) {
      nodeGroupRef.current.rotation.y += delta * (isHovered ? 0.6 : 0.2);
      nodeGroupRef.current.rotation.z += delta * (isHovered ? 0.3 : 0.1);
    }

    // 2. Intrusion Shield: Firewall Pulse & Threat Orbit
    if (shieldRef.current) {
      shieldRef.current.rotation.y += delta * 0.4;
      const pulse = 1.0 + Math.sin(elapsed * 3.0) * 0.05;
      shieldRef.current.scale.set(pulse, pulse, pulse);
    }

    // 3. SIH Ballot: Cryptographic Block Ledger Spin
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y += delta * (isHovered ? 0.8 : 0.3);
      ring1Ref.current.rotation.x += delta * 0.2;
    }

    // 4. ORBIT Engine: Quantum Processor Counter-Rotation
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * (isHovered ? 0.9 : 0.35);
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
    }
  });

  const scale = isSelected ? 1.3 : isHovered ? 1.06 : 1.0;
  const targetZ = isSelected ? 0.4 : isHovered ? position[2] + 0.4 : position[2];
  const emissiveMultiplier = isHovered || isSelected ? 1.8 : isDimmed ? 0.3 : 0.85;

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], targetZ]}
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
      {/* ============================================================ */}
      {/* 1. DEVSCOPE — AST CODE UNIVERSE & DEPENDENCY GRAPH           */}
      {/* ============================================================ */}
      {project.id === "devscope" && (
        <group>
          {/* Glass Containment Orb */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={materials.glass.transmission}
              roughness={materials.glass.roughness}
              thickness={1.1}
              transparent
              opacity={0.88}
            />
          </mesh>

          {/* Central Root AST Syntax Node */}
          <mesh ref={coreRef}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={1.4 * emissiveMultiplier}
            />
          </mesh>

          {/* Orbiting Child Code Nodes & Dependency Branches */}
          <group ref={nodeGroupRef}>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * Math.PI * 2) / 6;
              const radius = 0.65;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle * 2) * 0.25;
              const z = Math.sin(angle) * radius;

              return (
                <group key={i} position={[x, y, z]}>
                  {/* Code Node */}
                  <mesh>
                    <boxGeometry args={[0.1, 0.1, 0.1]} />
                    <meshStandardMaterial
                      color="#f0ece4"
                      emissive={accentColor}
                      emissiveIntensity={0.9 * emissiveMultiplier}
                      metalness={0.9}
                    />
                  </mesh>
                  {/* Dependency Conduit Line to Center */}
                  <line>
                    <bufferGeometry />
                    <lineBasicMaterial color={accentColor} transparent opacity={0.4} />
                  </line>
                </group>
              );
            })}
          </group>
        </group>
      )}

      {/* ============================================================ */}
      {/* 2. INTRUSION SHIELD — CYBERSECURITY FIREWALL & THREAT TELEMETRY */}
      {/* ============================================================ */}
      {project.id === "network-analyzer" && (
        <group>
          {/* Central Threat Core */}
          <mesh ref={coreRef} castShadow>
            <dodecahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial
              color="#ff6b2b"
              emissive="#ff6b2b"
              emissiveIntensity={1.2 * emissiveMultiplier}
              metalness={0.8}
            />
          </mesh>

          {/* Protective Hexagonal Firewall Shield Shell */}
          <mesh ref={shieldRef}>
            <icosahedronGeometry args={[0.95, 1]} />
            <meshStandardMaterial
              color="#ff9f43"
              emissive="#ff9f43"
              emissiveIntensity={0.6 * emissiveMultiplier}
              wireframe
            />
          </mesh>

          {/* Intercepted Threat Packet Stream Orbit */}
          <group ref={ring1Ref}>
            {[0, 1, 2].map((i) => {
              const angle = (i * Math.PI * 2) / 3;
              return (
                <mesh
                  key={i}
                  position={[Math.cos(angle) * 0.75, Math.sin(angle) * 0.75, 0]}
                >
                  <sphereGeometry args={[0.05, 8, 8]} />
                  <meshStandardMaterial
                    color="#ff3838"
                    emissive="#ff3838"
                    emissiveIntensity={2.0}
                  />
                </mesh>
              );
            })}
          </group>
        </group>
      )}

      {/* ============================================================ */}
      {/* 3. SIH ZERO-BALLOT — CRYPTOGRAPHIC BLOCKCHAIN LEDGER         */}
      {/* ============================================================ */}
      {project.id === "sih-ballot" && (
        <group>
          {/* Central Zero-Knowledge Proof Anchor */}
          <mesh ref={coreRef}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color="#00f5d4"
              emissive="#00f5d4"
              emissiveIntensity={1.4 * emissiveMultiplier}
            />
          </mesh>

          {/* Interconnected Immutable Blockchain Ring */}
          <group ref={ring1Ref}>
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = (i * Math.PI * 2) / 5;
              const radius = 0.75;
              return (
                <mesh
                  key={i}
                  position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
                  rotation={[0, 0, angle]}
                >
                  <boxGeometry args={[0.18, 0.12, 0.12]} />
                  <meshStandardMaterial
                    color="#1a1e29"
                    emissive="#00f5d4"
                    emissiveIntensity={0.5 * emissiveMultiplier}
                    metalness={0.9}
                  />
                </mesh>
              );
            })}
          </group>

          {/* Cryptographic ZKP Verification Orbit */}
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.9, 0.015, 16, 48]} />
            <meshStandardMaterial
              color="#00f5d4"
              emissive="#00f5d4"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      )}

      {/* ============================================================ */}
      {/* 4. ORBIT ENGINE — QUANTUM ORBITAL COMPUTATION CORE          */}
      {/* ============================================================ */}
      {project.id === "orbit-engine" && (
        <group>
          {/* Counter-Rotating Quantum Processor Plates */}
          <group ref={ring2Ref}>
            {[-0.35, 0, 0.35].map((y, i) => (
              <mesh key={i} position={[0, y, 0]} rotation={[0, (i * Math.PI) / 6, 0]}>
                <boxGeometry args={[1.0, 0.04, 1.0]} />
                <meshPhysicalMaterial
                  color="#ffffff"
                  transmission={0.85}
                  roughness={0.1}
                  thickness={0.8}
                  transparent
                  opacity={0.9}
                />
              </mesh>
            ))}
          </group>

          {/* Central Luminous WebGL Kernel Core */}
          <mesh ref={coreRef}>
            <icosahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color="#70a1ff"
              emissive="#70a1ff"
              emissiveIntensity={1.8 * emissiveMultiplier}
            />
          </mesh>

          {/* High-Speed Shader Processing Ring */}
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[0.8, 0.02, 16, 48]} />
            <meshStandardMaterial
              color="#70a1ff"
              emissive="#70a1ff"
              emissiveIntensity={1.0}
            />
          </mesh>
        </group>
      )}

      {/* Minimal Project Coordinate Datum Halo */}
      <mesh position={[0, -1.35, 0]}>
        <ringGeometry args={[0.08, 0.75, 32]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={isHovered || isSelected ? 0.4 : 0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default ArchiveObject;
