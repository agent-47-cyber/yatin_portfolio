"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import { useResponsiveViewport } from "@/hooks/useResponsiveViewport";
import { EXPERIENCE_DATA } from "@/data/experience";
import type { Group, Mesh } from "three";
import {
  matTitaniumHull,
  matBrushedAluminum,
  matCarbonFiber,
  matDarkPanel,
  matTrussAccent,
  matCommsMast,
  matRadarDish,
  matCyanEmissive,
  matCyanEmissiveLow,
  matRedBeacon,
  matCyanBeacon,
  geoSpireMast,
  geoParabolicDishLarge,
  geoTransceiverArray,
  geoBeacon,
} from "@/lib/SharedMaterials";

export function OrbitalHistory() {
  const currentState = useAppStore((state) => state.currentState);
  const selectedMilestoneYear = useAppStore(
    (state) => state.selectedMilestoneYear
  );
  const selectMilestone = useAppStore((state) => state.selectMilestone);
  const { profile } = useResponsiveViewport();

  const isExperienceActive = currentState === "EXPERIENCE";

  const groupRef = useRef<Group>(null);
  const chronologyRingRef = useRef<Group>(null);
  const magneticBearingRef = useRef<Group>(null);
  const commsSpireRef = useRef<Group>(null);
  const largeDishRef = useRef<Mesh>(null);
  const beaconRef = useRef<Mesh>(null);
  const targetRotationZ = useRef(0);

  // Map 5 milestone positions evenly along the 360-deg ring
  const activeIndex = useMemo(() => {
    const idx = EXPERIENCE_DATA.findIndex(
      (m) => m.year === selectedMilestoneYear
    );
    return idx >= 0 ? idx : 3; // Default to 2025
  }, [selectedMilestoneYear]);

  // Per-frame slow majestic mechanics & milestone alignment rotation
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    // 1. Structural micro-sway & adaptive scale
    if (groupRef.current) {
      groupRef.current.position.y = 0.2 + Math.sin(elapsed * 0.3) * 0.03;
      const targetScale = isExperienceActive ? 1.0 : profile.heroScale;
      groupRef.current.scale.set(targetScale, targetScale, targetScale);
    }

    // 2. Smoothly rotate Chronology Ring to align the active milestone node to top inspection position
    const stepAngle = (Math.PI * 2) / EXPERIENCE_DATA.length;
    targetRotationZ.current = -(activeIndex * stepAngle) + Math.PI / 2;

    if (chronologyRingRef.current) {
      chronologyRingRef.current.rotation.z +=
        (targetRotationZ.current - chronologyRingRef.current.rotation.z) *
        (0.06 * delta * 60);
    }

    // 3. Magnetic Bearings micro-rotation
    if (magneticBearingRef.current) {
      magneticBearingRef.current.rotation.z += delta * 0.1;
    }

    // 4. Communications Spire Slow Azimuth Tracking
    if (commsSpireRef.current) {
      commsSpireRef.current.rotation.y = Math.sin(elapsed * 0.15) * 0.25;
    }
    if (largeDishRef.current) {
      largeDishRef.current.rotation.x =
        Math.PI / 4 + Math.sin(elapsed * 0.2) * 0.1;
    }

  });

  return (
    <group ref={groupRef} position={[14.5, 0.2, -0.8]}>
      {/* Dedicated Sector Lighting (Permanent stable fill) */}
      <pointLight
        position={[0, 1.5, 3.0]}
        intensity={2.5}
        color="#ffffff"
        distance={10}
      />
      <pointLight
        position={[-2.5, 0, 1.5]}
        intensity={2.0}
        color="#e0aaff"
        distance={8}
      />
      <pointLight
        position={[2.5, -1.0, -1.0]}
        intensity={1.5}
        color="#00e5ff"
        distance={8}
      />

      {/* ============================================================ */}
      {/* 1. TALL COMMUNICATIONS SPIRE & DEEP SPACE PARABOLIC DISH     */}
      {/* (Distinct Vertical Communications Tower Silhouette)           */}
      {/* ============================================================ */}
      <group ref={commsSpireRef} position={[2.6, 1.2, -0.4]}>
        {/* Tall Vertical Lattice Spire Mast */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <primitive object={geoSpireMast} attach="geometry" />
          <primitive object={matCommsMast} attach="material" />
        </mesh>

        {/* Large Parabolic Deep Space Relay Dish */}
        <mesh
          ref={largeDishRef}
          position={[0.4, 2.2, 0.3]}
          rotation={[Math.PI / 4, 0, -0.2]}
          castShadow
        >
          <primitive object={geoParabolicDishLarge} attach="geometry" />
          <primitive object={matRadarDish} attach="material" />
        </mesh>

        {/* High-Gain Transceiver Array Pods */}
        {[-0.3, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0.8, 0]} castShadow>
            <primitive object={geoTransceiverArray} attach="geometry" />
            <primitive object={matDarkPanel} attach="material" />
          </mesh>
        ))}

        {/* Spire Peak Aviation Beacon Strobe */}
        <mesh ref={beaconRef} position={[0, 4.2, 0]}>
          <primitive object={geoBeacon} attach="geometry" />
          <primitive object={matRedBeacon} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. STRUCTURAL STATION MOUNTING TRUSSES & MAGNETIC BEARINGS   */}
      {/* ============================================================ */}
      {/* Heavy Station Foundation Base */}
      <mesh position={[0, -2.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.4, 2.8, 0.4, 32]} />
        <primitive object={matTitaniumHull} attach="material" />
      </mesh>

      {/* Titanium Collar Ring with Aluminum Trim */}
      <mesh position={[0, -2.25, 0]}>
        <torusGeometry args={[2.45, 0.08, 16, 48]} />
        <primitive object={matBrushedAluminum} attach="material" />
      </mesh>

      {/* 4 Heavy Hydraulic Foundation Support Stanchions */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2;
        const x = Math.cos(angle) * 2.0;
        const z = Math.sin(angle) * 2.0;
        return (
          <group key={i} position={[x, -1.4, z]} rotation={[0, -angle, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.25, 1.8, 0.3]} />
              <primitive object={matCarbonFiber} attach="material" />
            </mesh>
            <mesh position={[0, 0, 0.12]}>
              <cylinderGeometry args={[0.035, 0.035, 1.7, 8]} />
              <primitive object={matCyanEmissiveLow} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* Top Suspended Structural Beam */}
      <group position={[0, 2.4, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[1.6, 1.3, 0.3, 24]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>
      </group>

      {/* Magnetic Bearing Stabilizer Rings */}
      <group ref={magneticBearingRef} position={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.1, 0.04, 16, 64]} />
          <primitive object={matTrussAccent} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 3. THE MONUMENTAL ROTATING CHRONOLOGY RING                   */}
      {/* ============================================================ */}
      <group ref={chronologyRingRef} position={[0, 0, 0]}>
        {/* Main Titanium Chronology Track */}
        <mesh castShadow>
          <torusGeometry args={[1.85, 0.06, 24, 96]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>

        {/* Luminous Inner Data Channel Guide Rail */}
        <mesh>
          <torusGeometry args={[1.81, 0.015, 16, 96]} />
          <primitive object={matCyanEmissive} attach="material" />
        </mesh>

        {/* Central Navigational Gyro Hub */}
        <mesh castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.6, 24]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>

        {/* Optical Navigation Kernel */}
        <mesh>
          <icosahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            color="#00e5ff"
            metalness={0.9}
            roughness={0.1}
            emissive="#00e5ff"
            emissiveIntensity={0.5}
            flatShading
          />
        </mesh>

        {/* 5 MILESTONE NODES (2022, 2023, 2024, 2025, FUTURE) */}
        {EXPERIENCE_DATA.map((milestone, index) => {
          const angle = (index * (Math.PI * 2)) / EXPERIENCE_DATA.length;
          const x = Math.cos(angle) * 1.85;
          const y = Math.sin(angle) * 1.85;
          const isSelected = milestone.year === selectedMilestoneYear;

          return (
            <group
              key={milestone.id}
              position={[x, y, 0]}
              rotation={[0, 0, angle]}
              onClick={(e) => {
                e.stopPropagation();
                selectMilestone(milestone.year);
              }}
            >
              {/* Milestone Mechanical Housing Block */}
              <mesh castShadow>
                <boxGeometry args={[0.28, 0.18, 0.28]} />
                <primitive object={matDarkPanel} attach="material" />
              </mesh>

              {/* Milestone Indicator Node */}
              <mesh position={[0, 0, 0.16]}>
                <sphereGeometry args={[0.065, 12, 12]} />
                <meshStandardMaterial
                  color={isSelected ? "#e0aaff" : "#8a8a8e"}
                  emissive={isSelected ? "#e0aaff" : "#8a8a8e"}
                  emissiveIntensity={
                    isSelected ? (isExperienceActive ? 2.5 : 1.2) : 0.2
                  }
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export default OrbitalHistory;
