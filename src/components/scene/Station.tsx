"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, type Group, type Mesh, type InstancedMesh } from "three";
import { useResponsiveViewport } from "@/hooks/useResponsiveViewport";
import {
  matTitaniumHull,
  matBrushedAluminum,
  matGoldTrim,
  matCarbonFiber,
  matDarkPanel,
  matTrussAccent,
  matHabitationModule,
  matSolarPanel,
  matSolarGrid,
  matCommsMast,
  matRadarDish,
  matCyanEmissive,
  matCyanEmissiveLow,
  matPlasmaCore,
  matAmberEmissive,
  matRedBeacon,
  matCyanBeacon,
  matGlass,
  geoReactorCrystal,
  geoPlasmaOrb,
  geoReactorCradleRing,
  geoReactorGimbalInner,
  geoReactorIrisBlade,
  geoReactorSupportStrut,
  geoPrimaryRing,
  geoAcceleratorStrip,
  geoHabitationModule,
  geoSecondaryRing,
  geoDockingPylon,
  geoPylonRib,
  geoSolarPanel,
  geoSolarGrid,
  geoAntennaMast,
  geoRadarDish,
  geoBeacon,
} from "@/lib/SharedMaterials";

// Pre-allocated static Object3D for zero-allocation instanced matrix setup
const tempObj = new Object3D();

export function Station() {
  const { profile } = useResponsiveViewport();

  const stationGroupRef = useRef<Group>(null);
  const reactorGroupRef = useRef<Group>(null);
  const reactorCrystalRef = useRef<Mesh>(null);
  const innerPlasmaOrbRef = useRef<Mesh>(null);
  const outerGimbalRef = useRef<Group>(null);
  const innerGimbalRef = useRef<Group>(null);

  const primaryRingRef = useRef<Mesh>(null);
  const secondaryRingRef = useRef<Mesh>(null);
  const solarLeftRef = useRef<Group>(null);
  const solarRightRef = useRef<Group>(null);
  const commsMastRef = useRef<Group>(null);
  const radarDishRef = useRef<Mesh>(null);

  const beacon1Ref = useRef<Mesh>(null);
  const beacon2Ref = useRef<Mesh>(null);
  const beacon3Ref = useRef<Mesh>(null);
  const habInstancedRef = useRef<InstancedMesh>(null);

  // Initialize static instanced mesh matrices on mount
  useEffect(() => {
    // Setup 8 Habitation Modules on Primary Ring
    if (habInstancedRef.current) {
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        const x = Math.cos(angle) * 9.5;
        const y = Math.sin(angle) * 9.5;
        tempObj.position.set(x, y, 0);
        tempObj.rotation.set(0, 0, angle + Math.PI / 2);
        tempObj.scale.set(1, 1, 1);
        tempObj.updateMatrix();
        habInstancedRef.current?.setMatrixAt(i, tempObj.matrix);
      }
      habInstancedRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  // Per-frame slow majestic rotation & reactor core mechanics (Zero allocations)
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    // 1. Station Group floating micro-sway & responsive scale
    if (stationGroupRef.current) {
      stationGroupRef.current.position.y = Math.sin(elapsed * 0.3) * 0.08;
      const targetScale = profile.heroScale;
      stationGroupRef.current.scale.set(targetScale, targetScale, targetScale);
    }

    // 2. Suspended Crystalline AI Nucleus & Rotating Energy Prism
    if (reactorCrystalRef.current) {
      reactorCrystalRef.current.rotation.y += delta * 0.08;
      reactorCrystalRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.08;
      reactorCrystalRef.current.rotation.z = Math.cos(elapsed * 0.3) * 0.06;
      reactorCrystalRef.current.position.y = Math.sin(elapsed * 0.9) * 0.05;
    }

    // 3. Inner Hyper-dense Plasma Core Pulse
    if (innerPlasmaOrbRef.current) {
      const pulse = 1.0 + Math.sin(elapsed * 2.2) * 0.08;
      innerPlasmaOrbRef.current.scale.set(pulse, pulse, pulse);
    }

    // 4. Counter-Rotating Energetic Reactor Gimbals
    if (outerGimbalRef.current) {
      outerGimbalRef.current.rotation.z += delta * 0.06;
      outerGimbalRef.current.rotation.x += delta * 0.03;
    }
    if (innerGimbalRef.current) {
      innerGimbalRef.current.rotation.y -= delta * 0.1;
      innerGimbalRef.current.rotation.z -= delta * 0.04;
    }

    // 5. Majestic Station Living Rings
    if (primaryRingRef.current) {
      primaryRingRef.current.rotation.z += delta * 0.035;
    }
    if (secondaryRingRef.current) {
      secondaryRingRef.current.rotation.z -= delta * 0.02;
    }

    // 6. Communications Array Continuous Scan
    if (commsMastRef.current) {
      commsMastRef.current.rotation.y += delta * 0.08;
    }
    if (radarDishRef.current) {
      radarDishRef.current.rotation.x =
        Math.PI / 3 + Math.sin(elapsed * 0.5) * 0.15;
    }
  });

  return (
    <group ref={stationGroupRef} position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. THE STATION'S HEART: SUSPENDED REACTOR CORE & AI NUCLEUS   */}
      {/* ============================================================ */}
      <group ref={reactorGroupRef} position={[0, 0, 0]}>
        {/* Open Magnetic Suspension Cradle Framework */}
        <group>
          {/* Top & Bottom Magnetic Confinement Collar Rings */}
          <mesh position={[0, 1.3, 0]}>
            <primitive object={geoReactorCradleRing} attach="geometry" />
            <primitive object={matTitaniumHull} attach="material" />
          </mesh>
          <mesh position={[0, -1.3, 0]}>
            <primitive object={geoReactorCradleRing} attach="geometry" />
            <primitive object={matTitaniumHull} attach="material" />
          </mesh>

          {/* Precision Machined Aluminum Clamp Fasteners */}
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * Math.PI) / 2 + Math.PI / 4;
            const x = Math.cos(angle) * 1.55;
            const z = Math.sin(angle) * 1.55;
            return (
              <group key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
                {/* Vertical Support Pylon Strut */}
                <mesh castShadow>
                  <primitive object={geoReactorSupportStrut} attach="geometry" />
                  <primitive object={matCarbonFiber} attach="material" />
                </mesh>
                {/* Top Clamp Bracket with Gold Accent */}
                <mesh position={[0, 1.3, 0]}>
                  <boxGeometry args={[0.16, 0.22, 0.24]} />
                  <primitive object={matGoldTrim} attach="material" />
                </mesh>
                {/* Bottom Clamp Bracket */}
                <mesh position={[0, -1.3, 0]}>
                  <boxGeometry args={[0.16, 0.22, 0.24]} />
                  <primitive object={matBrushedAluminum} attach="material" />
                </mesh>
                {/* Power Conduit Cable Line */}
                <mesh position={[0.06, 0, 0]}>
                  <cylinderGeometry args={[0.012, 0.012, 2.5, 8]} />
                  <primitive object={matCyanEmissiveLow} attach="material" />
                </mesh>
              </group>
            );
          })}

          {/* Top & Bottom Mechanical Containment Iris Blades */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * Math.PI) / 3;
            return (
              <group key={i} rotation={[0, angle, 0]}>
                <mesh
                  position={[0.8, 1.35, 0]}
                  rotation={[0, 0, -0.25]}
                  castShadow
                >
                  <primitive object={geoReactorIrisBlade} attach="geometry" />
                  <primitive object={matDarkPanel} attach="material" />
                </mesh>
                <mesh
                  position={[0.8, -1.35, 0]}
                  rotation={[0, 0, 0.25]}
                  castShadow
                >
                  <primitive object={geoReactorIrisBlade} attach="geometry" />
                  <primitive object={matDarkPanel} attach="material" />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Counter-Rotating Outer Gyroscopic Gimbal (Amber Energy Channel) */}
        <group ref={outerGimbalRef}>
          <mesh castShadow>
            <primitive object={geoReactorCradleRing} attach="geometry" />
            <primitive object={matTrussAccent} attach="material" />
          </mesh>
          <mesh>
            <torusGeometry args={[1.52, 0.015, 16, 64]} />
            <primitive object={matAmberEmissive} attach="material" />
          </mesh>
        </group>

        {/* Counter-Rotating Inner Energetic Gimbal (Cyan Accelerator Channel) */}
        <group ref={innerGimbalRef} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
          <mesh castShadow>
            <primitive object={geoReactorGimbalInner} attach="geometry" />
            <primitive object={matBrushedAluminum} attach="material" />
          </mesh>
          <mesh>
            <torusGeometry args={[1.12, 0.016, 16, 64]} />
            <primitive object={matCyanEmissive} attach="material" />
          </mesh>
        </group>

        {/* Central Suspended Crystalline AI Nucleus (Refractive Faceted Gem) */}
        <mesh ref={reactorCrystalRef} position={[0, 0, 0]} castShadow>
          <primitive object={geoReactorCrystal} attach="geometry" />
          <primitive object={matGlass} attach="material" />
        </mesh>

        {/* Inner Hyper-dense Electric Cyan Plasma Seed */}
        <mesh ref={innerPlasmaOrbRef} position={[0, 0, 0]}>
          <primitive object={geoPlasmaOrb} attach="geometry" />
          <primitive object={matPlasmaCore} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. PRIMARY TITANIUM LIVING RING (Radius 9.5)                 */}
      {/* ============================================================ */}
      <group ref={primaryRingRef}>
        <mesh
          geometry={geoPrimaryRing}
          material={matTitaniumHull}
          castShadow
          receiveShadow
        />

        {/* Luminous Inner Accelerator Strip */}
        <mesh geometry={geoAcceleratorStrip} material={matCyanEmissive} />

        {/* Habitation Modules on Primary Ring (Instanced 8x) */}
        <instancedMesh
          ref={habInstancedRef}
          args={[geoHabitationModule, matHabitationModule, 8]}
          castShadow
        />
      </group>

      {/* ============================================================ */}
      {/* 3. COUNTER-ROTATING SECONDARY OBSERVATION RING (Radius 6.2)  */}
      {/* ============================================================ */}
      <group ref={secondaryRingRef} rotation={[0, 0, Math.PI / 6]}>
        <mesh geometry={geoSecondaryRing} material={matDarkPanel} castShadow />
      </group>

      {/* ============================================================ */}
      {/* 4. MASSIVE STRUCTURAL DOCKING ARMS & TRUSSES                 */}
      {/* ============================================================ */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            {/* Primary Connecting Pylon */}
            <mesh
              position={[4.8, 0, 0]}
              geometry={geoDockingPylon}
              material={matDarkPanel}
              castShadow
            />
            {/* Structural Reinforcement Ribs with Cyan Glow */}
            <mesh
              position={[4.8, 0.15, 0]}
              geometry={geoPylonRib}
              material={matCyanEmissiveLow}
            />
          </group>
        );
      })}

      {/* ============================================================ */}
      {/* 5. SOLAR RADIATOR PANELS (Left & Right Wings)                */}
      {/* ============================================================ */}
      <group ref={solarLeftRef} position={[-11.5, 0, 0]} rotation={[0, 0.2, 0]}>
        <mesh geometry={geoSolarPanel} material={matSolarPanel} castShadow />
        <mesh
          position={[0, 0.025, 0]}
          geometry={geoSolarGrid}
          material={matSolarGrid}
        />
      </group>

      <group ref={solarRightRef} position={[11.5, 0, 0]} rotation={[0, -0.2, 0]}>
        <mesh geometry={geoSolarPanel} material={matSolarPanel} castShadow />
        <mesh
          position={[0, 0.025, 0]}
          geometry={geoSolarGrid}
          material={matSolarGrid}
        />
      </group>

      {/* ============================================================ */}
      {/* 6. COMMUNICATIONS MAST & ROTATING RADAR ARRAY                */}
      {/* ============================================================ */}
      <group ref={commsMastRef} position={[0, 2.5, 0]}>
        <mesh geometry={geoAntennaMast} material={matCommsMast} castShadow />
        <mesh
          ref={radarDishRef}
          position={[0, 0.8, 0.2]}
          rotation={[Math.PI / 3, 0, 0]}
          geometry={geoRadarDish}
          material={matRadarDish}
          castShadow
        />
      </group>

      {/* ============================================================ */}
      {/* 7. SYNCHRONIZED AVIATION / ORBITAL NAVIGATION BEACONS        */}
      {/* ============================================================ */}
      <mesh
        ref={beacon1Ref}
        position={[0, 3.8, 0]}
        geometry={geoBeacon}
        material={matRedBeacon}
      />
      <mesh
        ref={beacon2Ref}
        position={[0, -3.4, 0]}
        geometry={geoBeacon}
        material={matCyanBeacon}
      />
      <mesh
        ref={beacon3Ref}
        position={[9.5, 0, 0.4]}
        geometry={geoBeacon}
        material={matCyanBeacon}
      />
      <mesh
        position={[-9.5, 0, 0.4]}
        geometry={geoBeacon}
        material={matRedBeacon}
      />
    </group>
  );
}

export default Station;
