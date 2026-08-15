"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Project } from "@/types";
import type { Group, Mesh } from "three";
import {
  matGlass,
  geoGlassOrb,
  geoRootNode,
  geoCodeNode,
  geoThreatCore,
  geoFirewallShield,
  geoThreatPacket,
  geoBallotAnchor,
  geoChainBlock,
  geoBallotRing,
  geoProcessorPlate,
  geoKernelCore,
  geoShaderRing,
  geoDatumHalo,
} from "@/lib/SharedMaterials";

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

  const accentColor = project.accentColor || "#00e5ff";

  // Living per-frame animations (Zero allocations)
  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    const floatSpeed = isSelected ? 0.3 : isHovered ? 1.2 : 0.6;
    const floatAmp = isSelected ? 0.02 : isHovered ? 0.08 : 0.04;

    groupRef.current.position.y =
      position[1] + Math.sin(elapsed * floatSpeed) * floatAmp;

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
      {/* 1. DEVSCOPE — AST CODE UNIVERSE */}
      {project.id === "devscope" && (
        <group>
          <mesh
            geometry={geoGlassOrb}
            material={matGlass}
            castShadow
            receiveShadow
          />

          <mesh ref={coreRef} geometry={geoRootNode}>
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={1.4 * emissiveMultiplier}
            />
          </mesh>

          <group ref={nodeGroupRef}>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * Math.PI * 2) / 6;
              const radius = 0.65;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle * 2) * 0.25;
              const z = Math.sin(angle) * radius;

              return (
                <group key={i} position={[x, y, z]}>
                  <mesh geometry={geoCodeNode}>
                    <meshStandardMaterial
                      color="#f0ece4"
                      emissive={accentColor}
                      emissiveIntensity={0.9 * emissiveMultiplier}
                      metalness={0.9}
                    />
                  </mesh>
                </group>
              );
            })}
          </group>
        </group>
      )}

      {/* 2. INTRUSION SHIELD — CYBERSECURITY FIREWALL */}
      {project.id === "network-analyzer" && (
        <group>
          <mesh ref={coreRef} geometry={geoThreatCore} castShadow>
            <meshStandardMaterial
              color="#ff6b2b"
              emissive="#ff6b2b"
              emissiveIntensity={1.2 * emissiveMultiplier}
              metalness={0.8}
            />
          </mesh>

          <mesh ref={shieldRef} geometry={geoFirewallShield}>
            <meshStandardMaterial
              color="#ff9f43"
              emissive="#ff9f43"
              emissiveIntensity={0.6 * emissiveMultiplier}
              wireframe
            />
          </mesh>

          <group ref={ring1Ref}>
            {[0, 1, 2].map((i) => {
              const angle = (i * Math.PI * 2) / 3;
              return (
                <mesh
                  key={i}
                  position={[
                    Math.cos(angle) * 0.75,
                    Math.sin(angle) * 0.75,
                    0,
                  ]}
                  geometry={geoThreatPacket}
                >
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

      {/* 3. SIH ZERO-BALLOT — CRYPTOGRAPHIC LEDGER */}
      {project.id === "sih-ballot" && (
        <group>
          <mesh ref={coreRef} geometry={geoBallotAnchor}>
            <meshStandardMaterial
              color="#00f5d4"
              emissive="#00f5d4"
              emissiveIntensity={1.4 * emissiveMultiplier}
            />
          </mesh>

          <group ref={ring1Ref}>
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = (i * Math.PI * 2) / 5;
              const radius = 0.75;
              return (
                <mesh
                  key={i}
                  position={[
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    0,
                  ]}
                  rotation={[0, 0, angle]}
                  geometry={geoChainBlock}
                >
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

          <mesh rotation={[Math.PI / 3, 0, 0]} geometry={geoBallotRing}>
            <meshStandardMaterial
              color="#00f5d4"
              emissive="#00f5d4"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      )}

      {/* 4. ORBIT ENGINE — QUANTUM COMPUTATION CORE */}
      {project.id === "orbit-engine" && (
        <group>
          <group ref={ring2Ref}>
            {[-0.35, 0, 0.35].map((y, i) => (
              <mesh
                key={i}
                position={[0, y, 0]}
                rotation={[0, (i * Math.PI) / 6, 0]}
                geometry={geoProcessorPlate}
                material={matGlass}
              />
            ))}
          </group>

          <mesh ref={coreRef} geometry={geoKernelCore}>
            <meshStandardMaterial
              color="#70a1ff"
              emissive="#70a1ff"
              emissiveIntensity={1.8 * emissiveMultiplier}
            />
          </mesh>

          <mesh
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
            geometry={geoShaderRing}
          >
            <meshStandardMaterial
              color="#70a1ff"
              emissive="#70a1ff"
              emissiveIntensity={1.0}
            />
          </mesh>
        </group>
      )}

      {/* Minimal Project Coordinate Datum Halo */}
      <mesh position={[0, -1.35, 0]} geometry={geoDatumHalo}>
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
