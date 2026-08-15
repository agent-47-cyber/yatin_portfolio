"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import type { Group, Mesh } from "three";
import {
  matGlass,
  matDarkPanel,
  matStructuralRib,
  matWarmWhiteWireframe,
  matCyanEmissive,
  geoObservatoryGlass,
  geoObservatoryDeck,
  geoObservatoryRib,
  geoObservatoryTable,
  geoHoloRing,
  geoIdentityOctahedron,
  geoTelemetryRing,
} from "@/lib/SharedMaterials";

export function Observatory() {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const starChartRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  const currentState = useAppStore((state) => state.currentState);
  const isAboutActive = currentState === "ABOUT";

  // Per-frame observation deck rotation & holographic chart drift (Zero allocations)
  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      const elapsed = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(elapsed * 0.5) * 0.05;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
    }
    if (starChartRef.current) {
      starChartRef.current.rotation.z -= delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[-16, 0, -2]}>
      {/* 1. Observation Deck Glass Chamber */}
      <mesh
        geometry={geoObservatoryGlass}
        material={matGlass}
        castShadow
        receiveShadow
      />

      {/* 2. Structural Deck Plates (Top & Bottom) */}
      {[-1.7, 1.7].map((y, i) => (
        <mesh
          key={i}
          position={[0, y, 0]}
          geometry={geoObservatoryDeck}
          material={matDarkPanel}
          castShadow
        />
      ))}

      {/* 3. Radial Structural Floor Ribs */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 4;
        return (
          <mesh
            key={i}
            position={[0, -1.65, 0]}
            rotation={[0, angle, 0]}
            geometry={geoObservatoryRib}
            material={matStructuralRib}
          />
        );
      })}

      {/* 4. Central Holographic Star-Chart Table */}
      <mesh
        position={[0, -0.6, 0]}
        geometry={geoObservatoryTable}
        material={matDarkPanel}
        castShadow
      />

      {/* Holographic Projection Emitter */}
      <mesh
        ref={starChartRef}
        position={[0, -0.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={geoHoloRing}
      >
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={isAboutActive ? 0.5 : 0.1}
          depthWrite={false}
        />
      </mesh>

      {/* Floating Holographic Identity Matrix */}
      <mesh
        ref={coreRef}
        position={[0, 0.4, 0]}
        geometry={geoIdentityOctahedron}
        material={matWarmWhiteWireframe}
      />

      {/* Orbital Telemetry Ring */}
      <mesh
        ref={ringRef}
        position={[0, 0.4, 0]}
        rotation={[Math.PI / 4, 0, 0]}
        geometry={geoTelemetryRing}
        material={matCyanEmissive}
      />
    </group>
  );
}

export default Observatory;
