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

  const { colors, materials } = DESIGN_SYSTEM;
  const accentColor = project.accentColor || colors.electricCyan;

  // Continuous per-frame mechanical rotation & hover floating (Zero allocations)
  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    const floatSpeed = isSelected ? 0.3 : isHovered ? 1.5 : 0.8;
    const floatAmp = isSelected ? 0.05 : isHovered ? 0.15 : 0.08;

    groupRef.current.position.y = position[1] + Math.sin(elapsed * floatSpeed) * floatAmp;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (isHovered ? 0.8 : 0.3);
      coreRef.current.rotation.x += delta * (isHovered ? 0.4 : 0.15);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * (isHovered ? 0.9 : 0.4);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * (isHovered ? 0.7 : 0.3);
    }
  });

  const scale = isSelected ? 1.4 : isHovered ? 1.15 : 1.0;
  const targetZ = isSelected ? 0.5 : isHovered ? position[2] + 0.6 : position[2];
  const opacity = isDimmed ? 0.15 : isHovered || isSelected ? 1.0 : 0.85;

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
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={materials.glass.transmission}
              roughness={materials.glass.roughness}
              thickness={1.2}
              transparent
              opacity={opacity}
            />
          </mesh>

          {/* Gyroscopic Telemetry Ring 1 */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.85, 0.03, 16, 64]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={isHovered || isSelected ? 1.2 : 0.5}
            />
          </mesh>

          {/* Gyroscopic Ring 2 */}
          <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.65, 0.02, 16, 64]} />
            <meshStandardMaterial color="#f0ece4" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Central Pulsing Data Core */}
          <mesh ref={coreRef}>
            <octahedronGeometry args={[0.35, 1]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={isHovered || isSelected ? 2.0 : 0.8}
            />
          </mesh>
        </group>
      )}

      {/* 2. NEURAL LATTICE (Synapse AI) */}
      {project.objectType === "neural" && (
        <group>
          {/* Icosahedral Neural Wireframe */}
          <mesh ref={coreRef} castShadow>
            <icosahedronGeometry args={[1.1, 1]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={isHovered || isSelected ? 1.5 : 0.6}
              wireframe
            />
          </mesh>

          {/* Internal Synaptic Core */}
          <mesh ref={ring1Ref}>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color="#f0ece4"
              emissive={accentColor}
              emissiveIntensity={0.8}
              metalness={0.9}
            />
          </mesh>

          {/* Orbiting Synapse Node Points */}
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * Math.PI) / 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0]}
              >
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshStandardMaterial
                  color={accentColor}
                  emissive={accentColor}
                  emissiveIntensity={1.8}
                />
              </mesh>
            );
          })}
        </group>
      )}

      {/* 3. SECURITY TOPOLOGY (Sentinel Mesh) */}
      {project.objectType === "topology" && (
        <group>
          {/* Main Octahedral Topology Shell */}
          <mesh ref={coreRef} castShadow>
            <octahedronGeometry args={[1.15, 0]} />
            <meshStandardMaterial
              color="#1a1c26"
              metalness={0.9}
              roughness={0.2}
              wireframe
            />
          </mesh>

          {/* Inner Cyan Coordinate Prism */}
          <mesh ref={ring1Ref}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={isHovered || isSelected ? 1.4 : 0.7}
            />
          </mesh>

          {/* Protective Orbital Cage */}
          <mesh ref={ring2Ref} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.95, 0.025, 16, 48]} />
            <meshStandardMaterial color="#2d2f3d" metalness={0.9} />
          </mesh>
        </group>
      )}

      {/* 4. ARCHITECTURAL ENGINE (Strata Cloud) */}
      {project.objectType === "architectural" && (
        <group>
          {/* Layered Translucent Floor Plates */}
          {[-0.6, 0, 0.6].map((y, i) => (
            <mesh key={i} position={[0, y, 0]} castShadow>
              <boxGeometry args={[1.5, 0.08, 1.5]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={0.8}
                roughness={0.1}
                transparent
                opacity={opacity}
              />
            </mesh>
          ))}

          {/* Structural Corner Columns */}
          {[-0.65, 0.65].map((x, i) =>
            [-0.65, 0.65].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 0, z]}>
                <cylinderGeometry args={[0.03, 0.03, 1.3, 8]} />
                <meshStandardMaterial color="#333544" metalness={0.9} />
              </mesh>
            ))
          )}

          {/* Floating Central Compute Block */}
          <mesh ref={coreRef}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={isHovered || isSelected ? 1.6 : 0.7}
            />
          </mesh>
        </group>
      )}

      {/* Minimal Project Index Hologram Badge */}
      <mesh position={[0, -1.6, 0]}>
        <ringGeometry args={[0.1, 0.9, 32]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={isHovered || isSelected ? 0.4 : 0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default ArchiveObject;
