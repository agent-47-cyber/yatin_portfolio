"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import { useResponsiveViewport } from "@/hooks/useResponsiveViewport";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import {
  matTitaniumHull,
  matBrushedAluminum,
  matCarbonFiber,
  matDarkPanel,
  matTrussAccent,
  matStructuralRib,
  matCyanEmissive,
  matCyanEmissiveLow,
  matSolarPanel,
  matSolarGrid,
  matGlass,
  geoSolarPanel,
  geoSolarGrid,
} from "@/lib/SharedMaterials";

export function Observatory() {
  const groupRef = useRef<Group>(null);
  const crystalRef = useRef<Mesh>(null);
  const innerEnergySeedRef = useRef<Mesh>(null);
  const outerGyroRef = useRef<Group>(null);
  const innerGimbalRef = useRef<Group>(null);
  const scanLaserRef = useRef<Mesh>(null);

  const { profile } = useResponsiveViewport();
  const currentState = useAppStore((state) => state.currentState);
  const isAboutActive = currentState === "ABOUT";

  // Per-frame living mechanical animation & subtle AI Core idle breathing (Zero GC allocations)
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    // 1. Structural assembly micro-breathing & adaptive scale
    if (groupRef.current) {
      groupRef.current.position.y = 0.2 + Math.sin(elapsed * 0.25) * 0.025;
      const targetScale = isAboutActive ? 1.0 : profile.heroScale;
      groupRef.current.scale.set(targetScale, targetScale, targetScale);
    }

    // 2. Faceted Optical Crystal slow refractive rotation & subtle vertical suspension
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * (isAboutActive ? 0.06 : 0.02);
      crystalRef.current.rotation.x = Math.sin(elapsed * 0.15) * 0.04;
      crystalRef.current.position.y = Math.sin(elapsed * 0.4) * 0.04;
    }

    // 3. Internal Energy Seed gentle pulse
    if (innerEnergySeedRef.current) {
      const pulse = 1.0 + Math.sin(elapsed * 1.5) * 0.03;
      innerEnergySeedRef.current.scale.set(pulse, pulse, pulse);
    }

    // 4. Counter-rotating titanium gyroscopic housing & gimbal frame
    if (outerGyroRef.current) {
      outerGyroRef.current.rotation.z += delta * (isAboutActive ? 0.08 : 0.02);
      outerGyroRef.current.rotation.x += delta * 0.03;
    }
    if (innerGimbalRef.current) {
      innerGimbalRef.current.rotation.y -= delta * (isAboutActive ? 0.1 : 0.03);
      innerGimbalRef.current.rotation.z -= delta * 0.02;
    }

    // 5. Delicate vertical optical calibration laser sweep
    if (scanLaserRef.current) {
      scanLaserRef.current.position.y = Math.sin(elapsed * 1.2) * 1.1;
      const laserMat = scanLaserRef.current.material as MeshStandardMaterial;
      if (laserMat) {
        laserMat.emissiveIntensity = isAboutActive ? 1.0 : 0.15;
      }
    }
  });

  return (
    <group ref={groupRef} position={[-13.8, 0.2, -0.8]}>
      {/* Dedicated Sector Lighting (Permanent stable fill) */}
      <pointLight
        position={[0, 1.2, 3.0]}
        intensity={2.5}
        color="#ffffff"
        distance={8}
      />
      <pointLight
        position={[-2.5, 0, 1.5]}
        intensity={2.0}
        color="#00e5ff"
        distance={8}
      />
      <pointLight
        position={[2.5, -1.0, -1.0]}
        intensity={1.5}
        color="#ffd166"
        distance={8}
      />

      {/* ============================================================ */}
      {/* 1. HORIZONTAL SCIENCE SOLAR WINGS (Distinct Observatory Profile) */}
      {/* ============================================================ */}
      <group position={[-2.8, -0.5, 0]} rotation={[0, 0.3, 0]}>
        <mesh geometry={geoSolarPanel} material={matSolarPanel} castShadow />
        <mesh
          position={[0, 0.025, 0]}
          geometry={geoSolarGrid}
          material={matSolarGrid}
        />
      </group>

      {/* ============================================================ */}
      {/* 2. HEAVY INDUSTRIAL DOCKING FOUNDATION & ARTICULATED STANCHIONS */}
      {/* ============================================================ */}
      {/* Heavy Station Foundation Base Block */}
      <mesh position={[0, -2.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.4, 2.8, 0.4, 32]} />
        <primitive object={matTitaniumHull} attach="material" />
      </mesh>

      {/* Machined Brushed Aluminum Collar Clamp Ring */}
      <mesh position={[0, -2.25, 0]}>
        <torusGeometry args={[2.45, 0.08, 16, 48]} />
        <primitive object={matBrushedAluminum} attach="material" />
      </mesh>

      {/* 3 Articulated Triangular Mounting Stanchions */}
      {[0, 1, 2].map((i) => {
        const angle = (i * Math.PI * 2) / 3;
        const x = Math.cos(angle) * 1.9;
        const z = Math.sin(angle) * 1.9;
        return (
          <group
            key={i}
            position={[x, -1.3, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <mesh rotation={[0, 0, 0.32]} castShadow>
              <boxGeometry args={[0.24, 2.2, 0.3]} />
              <primitive object={matCarbonFiber} attach="material" />
            </mesh>
            <mesh position={[-0.15, 0, 0]} rotation={[0, 0, 0.32]}>
              <cylinderGeometry args={[0.055, 0.055, 1.8, 12]} />
              <primitive object={matBrushedAluminum} attach="material" />
            </mesh>
            <mesh position={[-0.22, 0, 0]} rotation={[0, 0, 0.32]}>
              <cylinderGeometry args={[0.02, 0.02, 1.9, 8]} />
              <primitive object={matCyanEmissiveLow} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* Top Suspended Cryogenic Cooling Hood & Geodesic Ring */}
      <group position={[0, 2.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[1.5, 1.1, 0.35, 24]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <torusGeometry args={[1.3, 0.04, 16, 32]} />
          <primitive object={matCyanEmissiveLow} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 3. OPTICAL TELESCOPE GIMBAL & CRYSTAL AI CORE                */}
      {/* ============================================================ */}
      {/* Outer Gyroscopic Titanium Housing */}
      <group ref={outerGyroRef}>
        <mesh castShadow>
          <torusGeometry args={[1.75, 0.055, 16, 64]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2;
          return (
            <group
              key={i}
              position={[Math.cos(angle) * 1.75, Math.sin(angle) * 1.75, 0]}
              rotation={[0, 0, angle]}
            >
              <mesh castShadow>
                <boxGeometry args={[0.18, 0.14, 0.22]} />
                <primitive object={matBrushedAluminum} attach="material" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Inner Mechanical Gimbal Frame */}
      <group ref={innerGimbalRef}>
        <mesh castShadow>
          <torusGeometry args={[1.4, 0.035, 16, 64]} />
          <primitive object={matCarbonFiber} attach="material" />
        </mesh>
        <mesh>
          <torusGeometry args={[1.37, 0.012, 16, 64]} />
          <primitive object={matCyanEmissive} attach="material" />
        </mesh>
      </group>

      {/* Central Faceted Optical Crystal */}
      <mesh ref={crystalRef} position={[0, 0, 0]} castShadow>
        <octahedronGeometry args={[0.75, 0]} />
        <primitive object={matGlass} attach="material" />
      </mesh>

      {/* Internal Protected Energy Core Seed */}
      <mesh ref={innerEnergySeedRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={isAboutActive ? 1.4 : 0.3}
        />
      </mesh>

      {/* Vertical Optical Calibration Laser */}
      <mesh
        ref={scanLaserRef}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.05, 1.45, 32]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={isAboutActive ? 1.0 : 0.15}
          transparent
          opacity={isAboutActive ? 0.28 : 0.05}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default Observatory;
