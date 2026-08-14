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
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const shellLeftRef = useRef<Mesh>(null);
  const shellRightRef = useRef<Mesh>(null);

  const { colors, materials } = DESIGN_SYSTEM;
  const accentColor = project.accentColor || colors.electricCyan;

  // Mechanical rotation & unfolding state transition
  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    const floatSpeed = isSelected ? 0.3 : isHovered ? 1.0 : 0.5;
    const floatAmp = isSelected ? 0.03 : isHovered ? 0.08 : 0.04;

    groupRef.current.position.y = position[1] + Math.sin(elapsed * floatSpeed) * floatAmp;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (isHovered ? 0.5 : 0.2);
      coreRef.current.rotation.x += delta * (isHovered ? 0.25 : 0.1);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * (isHovered ? 0.6 : 0.25);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * (isHovered ? 0.4 : 0.15);
    }

    // Mechanical unfolding expansion when selected
    const targetShellOffset = isSelected ? 0.35 : 0;
    if (shellLeftRef.current) {
      shellLeftRef.current.position.x +=
        (-targetShellOffset - shellLeftRef.current.position.x) * (delta * 4.0);
    }
    if (shellRightRef.current) {
      shellRightRef.current.position.x +=
        (targetShellOffset - shellRightRef.current.position.x) * (delta * 4.0);
    }
  });

  const scale = isSelected ? 1.25 : isHovered ? 1.04 : 1.0;
  const targetZ = isSelected ? 0.3 : isHovered ? position[2] + 0.35 : position[2];
  const emissiveMultiplier = isHovered || isSelected ? 1.6 : isDimmed ? 0.3 : 0.8;

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
      {/* 1. COMPUTATIONAL CORE (DevScope) */}
      {project.objectType === "computational" && (
        <group>
          {/* Glass Outer Containment Sphere */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={materials.glass.transmission}
              roughness={materials.glass.roughness}
              thickness={1.1}
              transparent
              opacity={0.92}
            />
          </mesh>

          {/* Unfolding Mechanical Protective Shell Petals */}
          <mesh ref={shellLeftRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[1.15, 1.15, 0.4, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#1a1c26" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh ref={shellRightRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[1.15, 1.15, 0.4, 16, 1, false, Math.PI, Math.PI]} />
            <meshStandardMaterial color="#1a1c26" metalness={0.9} roughness={0.3} />
          </mesh>

          {/* Gyroscopic Telemetry Rings */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.75, 0.02, 16, 48]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.6 * emissiveMultiplier}
            />
          </mesh>

          {/* Central Pulsing Data Core */}
          <mesh ref={coreRef}>
            <octahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={1.2 * emissiveMultiplier}
            />
          </mesh>
        </group>
      )}

      {/* 2. NEURAL LATTICE (Intrusion Shield) */}
      {project.objectType === "neural" && (
        <group>
          {/* Icosahedral Neural Wireframe */}
          <mesh ref={coreRef} castShadow>
            <icosahedronGeometry args={[1.0, 1]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.7 * emissiveMultiplier}
              wireframe
            />
          </mesh>

          {/* Internal Core Node */}
          <mesh ref={ring1Ref}>
            <dodecahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial
              color="#f0ece4"
              emissive={accentColor}
              emissiveIntensity={0.6 * emissiveMultiplier}
              metalness={0.9}
            />
          </mesh>
        </group>
      )}

      {/* 3. SECURITY TOPOLOGY (SIH Zero-Ballot) */}
      {project.objectType === "topology" && (
        <group>
          {/* Main Octahedral Topology Shell */}
          <mesh ref={coreRef} castShadow>
            <octahedronGeometry args={[1.05, 0]} />
            <meshStandardMaterial
              color="#1a1c26"
              metalness={0.9}
              roughness={0.2}
              wireframe
            />
          </mesh>

          {/* Inner Coordinate Prism */}
          <mesh ref={ring1Ref}>
            <octahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.8 * emissiveMultiplier}
            />
          </mesh>

          {/* Outer Ring Cage */}
          <mesh ref={ring2Ref} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.85, 0.02, 16, 48]} />
            <meshStandardMaterial color="#2d2f3d" metalness={0.9} />
          </mesh>
        </group>
      )}

      {/* 4. ARCHITECTURAL ENGINE (ORBIT Engine) */}
      {project.objectType === "architectural" && (
        <group>
          {/* Layered Floor Plates */}
          {[-0.5, 0, 0.5].map((y, i) => (
            <mesh key={i} position={[0, y, 0]} castShadow>
              <boxGeometry args={[1.3, 0.06, 1.3]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={0.8}
                roughness={0.1}
                transparent
                opacity={0.85}
              />
            </mesh>
          ))}

          {/* Structural Columns */}
          {[-0.55, 0.55].map((x, i) =>
            [-0.55, 0.55].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 0, z]}>
                <cylinderGeometry args={[0.025, 0.025, 1.1, 8]} />
                <meshStandardMaterial color="#333544" metalness={0.9} />
              </mesh>
            ))
          )}

          {/* Central Compute Block */}
          <mesh ref={coreRef}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.9 * emissiveMultiplier}
            />
          </mesh>
        </group>
      )}

      {/* Minimal Project Datum Halo */}
      <mesh position={[0, -1.4, 0]}>
        <ringGeometry args={[0.08, 0.75, 32]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={isHovered || isSelected ? 0.45 : 0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default ArchiveObject;
