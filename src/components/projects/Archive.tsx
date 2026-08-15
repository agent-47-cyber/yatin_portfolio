"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import { PROJECTS_DATA } from "@/data/projects";
import type { Group, Mesh } from "three";
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

export function Archive() {
  const currentState = useAppStore((state) => state.currentState);
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);

  const activeProjectId = selectedProjectId || PROJECTS_DATA[0].id;
  const activeIndex = useMemo(() => {
    const idx = PROJECTS_DATA.findIndex((p) => p.id === activeProjectId);
    return idx >= 0 ? idx : 0;
  }, [activeProjectId]);

  const isVaultActive =
    currentState === "PROJECTS" || currentState === "PROJECT_DETAIL";

  const machineGroupRef = useRef<Group>(null);
  const coreRotorRef = useRef<Group>(null);
  const leftArmorRef = useRef<Group>(null);
  const rightArmorRef = useRef<Group>(null);
  const scanLaserRef = useRef<Mesh>(null);
  const targetRotationY = useRef(0);

  // Per-frame mechanical animations & physical project module rotation (Zero GC allocations)
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    // 1. Monolithic Machine Micro-Vibration & Heavy Breathing
    if (machineGroupRef.current) {
      machineGroupRef.current.position.y =
        -12.0 + Math.sin(elapsed * 0.25) * 0.025;
    }

    // 2. Interpolate Central Archive Rotor to Selected Project Index (90 deg steps)
    targetRotationY.current = -(activeIndex * (Math.PI / 2));
    if (coreRotorRef.current) {
      coreRotorRef.current.rotation.y +=
        (targetRotationY.current - coreRotorRef.current.rotation.y) *
        (0.06 * delta * 60);
    }

    // 3. Articulated Mechanical Armor Panels (Slide open during active inspection)
    const armorTargetX = isVaultActive ? 0.45 : 0.0;
    if (leftArmorRef.current) {
      leftArmorRef.current.position.x +=
        (-armorTargetX - leftArmorRef.current.position.x) * (0.05 * delta * 60);
    }
    if (rightArmorRef.current) {
      rightArmorRef.current.position.x +=
        (armorTargetX - rightArmorRef.current.position.x) * (0.05 * delta * 60);
    }

    // 4. Optical Calibration Laser Scanning Sweep
    if (scanLaserRef.current) {
      scanLaserRef.current.position.y = Math.sin(elapsed * 1.4) * 0.8;
    }
  });

  return (
    <group ref={machineGroupRef} position={[1.4, -12, -0.6]}>
      {/* ============================================================ */}
      {/* DEDICATED SECTOR LIGHTING (Cinematic Specular & Rim Glint)  */}
      {/* ============================================================ */}
      {isVaultActive && (
        <>
          <pointLight
            position={[0, 1.0, 3.2]}
            intensity={12.0}
            color="#ffffff"
            distance={10}
          />
          <pointLight
            position={[-2.5, 0, 1.5]}
            intensity={8.0}
            color="#00e5ff"
            distance={8}
          />
          <pointLight
            position={[2.5, -1.0, -1.0]}
            intensity={6.0}
            color="#00e5ff"
            distance={8}
          />
        </>
      )}

      {/* ============================================================ */}
      {/* 1. MASSIVE TITANIUM FOUNDATION BASE & HYDRAULIC PYLONS       */}
      {/* ============================================================ */}
      {/* Heavy Base Plinth */}
      <mesh position={[0, -2.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.8, 3.2, 0.45, 32]} />
        <primitive object={matTitaniumHull} attach="material" />
      </mesh>

      {/* Machined Aluminum Clamp Ring with Fasteners */}
      <mesh position={[0, -2.25, 0]}>
        <torusGeometry args={[2.82, 0.08, 16, 48]} />
        <primitive object={matBrushedAluminum} attach="material" />
      </mesh>

      {/* 4 Heavy Hydraulic Foundation Stanchions */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2;
        const x = Math.cos(angle) * 2.3;
        const z = Math.sin(angle) * 2.3;
        return (
          <group key={i} position={[x, -1.4, z]} rotation={[0, -angle, 0]}>
            {/* Carbon Fiber Pylon */}
            <mesh castShadow>
              <boxGeometry args={[0.3, 1.8, 0.35]} />
              <primitive object={matCarbonFiber} attach="material" />
            </mesh>
            {/* Machined Actuator Cylinder */}
            <mesh position={[0, 0, 0.16]}>
              <cylinderGeometry args={[0.045, 0.045, 1.7, 12]} />
              <primitive object={matBrushedAluminum} attach="material" />
            </mesh>
            {/* Power Conduit Cable Line */}
            <mesh position={[0, 0, 0.22]}>
              <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
              <primitive object={matCyanEmissiveLow} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* Top Suspended Cryogenic Containment Dome */}
      <group position={[0, 2.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[1.9, 1.6, 0.35, 32]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>
        {/* Heat Dissipation Radiator Grille Fins */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI) / 4;
          return (
            <mesh key={i} position={[0, 0.2, 0]} rotation={[0, angle, 0]}>
              <boxGeometry args={[2.1, 0.12, 0.03]} />
              <primitive object={matStructuralRib} attach="material" />
            </mesh>
          );
        })}
      </group>

      {/* ============================================================ */}
      {/* 2. ARTICULATED SLIDING TITANIUM ARMOR PANELS (LEFT & RIGHT)  */}
      {/* ============================================================ */}
      <group ref={leftArmorRef} position={[-0.8, 0, 0]}>
        {/* Main Shell */}
        <mesh position={[-1.2, 0, 0]} castShadow>
          <boxGeometry args={[0.22, 3.2, 1.9]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>
        {/* Machined Aluminum Reinforcement Ribs & Seams */}
        {[-1.0, 0, 1.0].map((y, i) => (
          <mesh key={i} position={[-1.08, y, 0]}>
            <boxGeometry args={[0.04, 0.1, 1.8]} />
            <primitive object={matBrushedAluminum} attach="material" />
          </mesh>
        ))}
        {/* Status Bus Line */}
        <mesh position={[-1.08, 0, 0]}>
          <boxGeometry args={[0.02, 3.0, 0.05]} />
          <primitive object={matCyanEmissiveLow} attach="material" />
        </mesh>
      </group>

      <group ref={rightArmorRef} position={[0.8, 0, 0]}>
        {/* Main Shell */}
        <mesh position={[1.2, 0, 0]} castShadow>
          <boxGeometry args={[0.22, 3.2, 1.9]} />
          <primitive object={matTitaniumHull} attach="material" />
        </mesh>
        {/* Machined Aluminum Reinforcement Ribs */}
        {[-1.0, 0, 1.0].map((y, i) => (
          <mesh key={i} position={[1.08, y, 0]}>
            <boxGeometry args={[0.04, 0.1, 1.8]} />
            <primitive object={matBrushedAluminum} attach="material" />
          </mesh>
        ))}
        {/* Status Bus Line */}
        <mesh position={[1.08, 0, 0]}>
          <boxGeometry args={[0.02, 3.0, 0.05]} />
          <primitive object={matCyanEmissiveLow} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 3. PROTECTED OPTICAL GLASS CONTAINMENT CANISTER              */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Heavy Optical Glass Cylinder */}
        <mesh castShadow>
          <cylinderGeometry args={[1.35, 1.35, 2.8, 32, 1, true]} />
          <primitive object={matGlass} attach="material" />
        </mesh>
        {/* Machined Aluminium Top & Bottom Endcaps */}
        <mesh position={[0, 1.45, 0]}>
          <cylinderGeometry args={[1.4, 1.35, 0.12, 32]} />
          <primitive object={matBrushedAluminum} attach="material" />
        </mesh>
        <mesh position={[0, -1.45, 0]}>
          <cylinderGeometry args={[1.35, 1.4, 0.12, 32]} />
          <primitive object={matBrushedAluminum} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 4. OPTICAL CALIBRATION SCANNING LASER                        */}
      {/* ============================================================ */}
      <mesh
        ref={scanLaserRef}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.05, 1.28, 32]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={isVaultActive ? 1.4 : 0.2}
          transparent
          opacity={isVaultActive ? 0.25 : 0.05}
          depthWrite={false}
        />
      </mesh>

      {/* ============================================================ */}
      {/* 5. ROTATING 4-SIDED QUANTUM ARCHIVE CARTRIDGE ROTOR          */}
      {/* ============================================================ */}
      <group ref={coreRotorRef} position={[0, 0, 0]}>
        {/* Central Carbon Fiber Spindle */}
        <mesh castShadow>
          <cylinderGeometry args={[0.38, 0.38, 2.7, 16]} />
          <primitive object={matCarbonFiber} attach="material" />
        </mesh>

        {/* ------------------------------------------------------------ */}
        {/* QUADRANT 1 (0 deg): DEVSCOPE — High-Density AI Compute Module*/}
        {/* ------------------------------------------------------------ */}
        <group position={[0, 0, 0.72]}>
          {/* Cartridge Housing Chassis */}
          <mesh castShadow>
            <boxGeometry args={[0.7, 1.4, 0.25]} />
            <primitive object={matTitaniumHull} attach="material" />
          </mesh>
          {/* Layered Heat Dissipation Fin Slices */}
          {[-0.45, -0.15, 0.15, 0.45].map((y, i) => (
            <mesh key={i} position={[0, y, 0.14]}>
              <boxGeometry args={[0.62, 0.06, 0.08]} />
              <primitive object={matBrushedAluminum} attach="material" />
            </mesh>
          ))}
          {/* Optical Data Bus Line */}
          <mesh position={[0, 0, 0.14]}>
            <boxGeometry args={[0.03, 1.2, 0.04]} />
            <primitive object={matCyanEmissive} attach="material" />
          </mesh>
          {/* AI Compute Kernel Seed */}
          <mesh position={[0, 0, 0.05]}>
            <octahedronGeometry args={[0.15, 0]} />
            <primitive object={matCyanEmissiveLow} attach="material" />
          </mesh>
        </group>

        {/* ------------------------------------------------------------ */}
        {/* QUADRANT 2 (90 deg): STANDBY COMPARTMENT 02 (Sealed Vault)   */}
        {/* ------------------------------------------------------------ */}
        <group position={[0.72, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          {/* Sealed Titanium Vault Block */}
          <mesh castShadow>
            <boxGeometry args={[0.7, 1.4, 0.25]} />
            <primitive object={matDarkPanel} attach="material" />
          </mesh>
          {/* Machined Clamp Seal Plates */}
          {[-0.35, 0.35].map((y, i) => (
            <mesh key={i} position={[0, y, 0.14]}>
              <boxGeometry args={[0.62, 0.14, 0.05]} />
              <primitive object={matBrushedAluminum} attach="material" />
            </mesh>
          ))}
          {/* Low-power Standby Indicator */}
          <mesh position={[0, 0, 0.14]}>
            <boxGeometry args={[0.2, 0.03, 0.02]} />
            <primitive object={matCyanEmissiveLow} attach="material" />
          </mesh>
        </group>

        {/* ------------------------------------------------------------ */}
        {/* QUADRANT 3 (180 deg): STANDBY COMPARTMENT 03 (Sealed Vault)  */}
        {/* ------------------------------------------------------------ */}
        <group position={[0, 0, -0.72]} rotation={[0, Math.PI, 0]}>
          {/* Sealed Titanium Vault Block */}
          <mesh castShadow>
            <boxGeometry args={[0.7, 1.4, 0.25]} />
            <primitive object={matDarkPanel} attach="material" />
          </mesh>
          {/* Machined Clamp Seal Plates */}
          {[-0.35, 0.35].map((y, i) => (
            <mesh key={i} position={[0, y, 0.14]}>
              <boxGeometry args={[0.62, 0.14, 0.05]} />
              <primitive object={matBrushedAluminum} attach="material" />
            </mesh>
          ))}
          {/* Low-power Standby Indicator */}
          <mesh position={[0, 0, 0.14]}>
            <boxGeometry args={[0.2, 0.03, 0.02]} />
            <primitive object={matCyanEmissiveLow} attach="material" />
          </mesh>
        </group>

        {/* ------------------------------------------------------------ */}
        {/* QUADRANT 4 (270 deg): STANDBY COMPARTMENT 04 (Sealed Vault)  */}
        {/* ------------------------------------------------------------ */}
        <group position={[-0.72, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          {/* Sealed Titanium Vault Block */}
          <mesh castShadow>
            <boxGeometry args={[0.7, 1.4, 0.25]} />
            <primitive object={matDarkPanel} attach="material" />
          </mesh>
          {/* Machined Clamp Seal Plates */}
          {[-0.35, 0.35].map((y, i) => (
            <mesh key={i} position={[0, y, 0.14]}>
              <boxGeometry args={[0.62, 0.14, 0.05]} />
              <primitive object={matBrushedAluminum} attach="material" />
            </mesh>
          ))}
          {/* Low-power Standby Indicator */}
          <mesh position={[0, 0, 0.14]}>
            <boxGeometry args={[0.2, 0.03, 0.02]} />
            <primitive object={matCyanEmissiveLow} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default Archive;
