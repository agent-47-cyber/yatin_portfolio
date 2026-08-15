"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
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
  matGlass,
} from "@/lib/SharedMaterials";

export function Observatory() {
  const groupRef = useRef<Group>(null);
  const crystalRef = useRef<Mesh>(null);
  const innerEnergySeedRef = useRef<Mesh>(null);
  const outerGyroRef = useRef<Group>(null);
  const innerGimbalRef = useRef<Group>(null);
  const scanLaserRef = useRef<Mesh>(null);

  const currentState = useAppStore((state) => state.currentState);
  const isAboutActive = currentState === "ABOUT";

  // Per-frame living mechanical animation & subtle AI Core idle breathing (Zero GC allocations)
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    // 1. Structural assembly micro-breathing
    if (groupRef.current) {
      groupRef.current.position.y = 0.2 + Math.sin(elapsed * 0.25) * 0.025;
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
      {/* ============================================================ */}
      {/* DEDICATED SECTOR LIGHTING (Cinematic Specular & Rim Glint)  */}
      {/* ============================================================ */}
      {isAboutActive && (
        <>
          <pointLight
            position={[0, 1.2, 3.0]}
            intensity={10.0}
            color="#ffffff"
            distance={8}
          />
          <pointLight
            position={[-2.5, 0, 1.5]}
            intensity={8.0}
            color="#00e5ff"
            distance={8}
          />
          <pointLight
            position={[2.5, -1.0, -1.0]}
            intensity={5.0}
            color="#ffd166"
            distance={8}
          />
        </>
      )}

      {/* ============================================================ */}
      {/* 1. HEAVY INDUSTRIAL DOCKING FOUNDATION & ARTICULATED STANCHIONS */}
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
            {/* Carbon Fiber Primary Arm Pylon */}
            <mesh rotation={[0, 0, 0.32]} castShadow>
              <boxGeometry args={[0.24, 2.2, 0.3]} />
              <primitive object={matCarbonFiber} attach="material" />
            </mesh>
            {/* Machined Hydraulic Cylinder Actuator */}
            <mesh position={[-0.15, 0, 0]} rotation={[0, 0, 0.32]}>
              <cylinderGeometry args={[0.055, 0.055, 1.8, 12]} />
              <primitive object={matBrushedAluminum} attach="material" />
            </mesh>
            {/* Power Conduit Cable Line */}
            <mesh position={[-0.22, 0, 0]} rotation={[0, 0, 0.32]}>
              <cylinderGeometry args={[0.02, 0.02, 1.9, 8]} />
              <primitive object={matCyanEmissiveLow} attach="material" />
            </mesh>
            {/* Arm Joint Fastener Hub */}
            <mesh position={[0.3, 0.9, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.34, 16]} />
              <primitive object={matTrussAccent} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* Top Suspended Cryogenic Cooling Hood */}
      <group position={[0, 2.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[1.5, 1.1, 0.35, 24]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>
        {/* Heat Dissipation Radiator Grille Fins */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3;
          return (
            <mesh key={i} rotation={[0, angle, 0]} position={[0, 0.2, 0]}>
              <boxGeometry args={[1.8, 0.15, 0.03]} />
              <primitive object={matStructuralRib} attach="material" />
            </mesh>
          );
        })}
      </group>

      {/* ============================================================ */}
      {/* 2. THE ENGINEERED IDENTITY REACTOR HERO MACHINE              */}
      {/* ============================================================ */}
      {/* Outer Gyroscopic Dark Titanium Circular Housing */}
      <group ref={outerGyroRef}>
        {/* Main Outer Titanium Ring */}
        <mesh castShadow>
          <torusGeometry args={[1.75, 0.055, 16, 64]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>
        {/* Machined Aluminum Reinforcement Clamp Blocks with Allen Fasteners */}
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
              {/* Cyan Status Channel Strip */}
              <mesh position={[0, 0, 0.12]}>
                <boxGeometry args={[0.12, 0.02, 0.01]} />
                <primitive object={matCyanEmissiveLow} attach="material" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Inner Mechanical Gimbal Frame with Cyan Energy Channel */}
      <group ref={innerGimbalRef}>
        <mesh castShadow>
          <torusGeometry args={[1.4, 0.035, 16, 64]} />
          <primitive object={matCarbonFiber} attach="material" />
        </mesh>
        <mesh>
          <torusGeometry args={[1.37, 0.012, 16, 64]} />
          <primitive object={matCyanEmissive} attach="material" />
        </mesh>
        {/* 4 Articulated Titanium Containment Locking Claws */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2 + Math.PI / 4;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.15, Math.sin(angle) * 1.15, 0]}
              rotation={[0, 0, angle + Math.PI / 2]}
              castShadow
            >
              <boxGeometry args={[0.12, 0.35, 0.08]} />
              <primitive object={matBrushedAluminum} attach="material" />
            </mesh>
          );
        })}
      </group>

      {/* Central Faceted Optical Crystal (High Clarity Precision Gem) */}
      <mesh ref={crystalRef} position={[0, 0, 0]} castShadow>
        <octahedronGeometry args={[0.75, 0]} />
        <primitive object={matGlass} attach="material" />
      </mesh>

      {/* Internal Protected Energy Core Seed (Electric Cyan / Soft White Kernel) */}
      <mesh ref={innerEnergySeedRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={isAboutActive ? 1.4 : 0.3}
        />
      </mesh>

      {/* Vertical Optical Calibration Scanning Laser */}
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

      {/* Power Routing Bus Lines at Base */}
      <group position={[0, -2.1, 0]}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.2, 0.4, Math.sin(angle) * 1.2]}
            >
              <cylinderGeometry args={[0.025, 0.025, 0.8, 8]} />
              <primitive object={matCyanEmissiveLow} attach="material" />
            </mesh>
          );
        })}
      </group>

      {/* ============================================================ */}
      {/* 3. RIGHT SIDE INFRASTRUCTURE (Support Truss & Cable Routing)  */}
      {/* (Replaces the floating blue wireframe box completely)         */}
      {/* ============================================================ */}
      <group position={[2.4, 0, -0.4]}>
        {/* Vertical Station Structural Support Truss */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.18, 3.8, 0.18]} />
          <primitive object={matTrussAccent} attach="material" />
        </mesh>
        {/* Diagonal Truss Cross-Braces */}
        {[-1.0, 0.4].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.8, 0.04, 0.08]} />
            <primitive object={matStructuralRib} attach="material" />
          </mesh>
        ))}
        {/* Inspection Collar Station Telemetry Port */}
        <mesh position={[-0.15, 0.8, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.25, 16]} />
          <primitive object={matBrushedAluminum} attach="material" />
        </mesh>
        {/* Data Cable Conduit Line */}
        <mesh position={[-0.08, 0, 0.1]}>
          <cylinderGeometry args={[0.015, 0.015, 3.6, 8]} />
          <primitive object={matCyanEmissiveLow} attach="material" />
        </mesh>
      </group>
    </group>
  );
}

export default Observatory;
