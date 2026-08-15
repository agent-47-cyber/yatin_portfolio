"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, type Group, type Mesh, type InstancedMesh } from "three";
import {
  matTitaniumHull,
  matDarkPanel,
  matTrussAccent,
  matHabitationModule,
  matSolarPanel,
  matSolarGrid,
  matCommsMast,
  matRadarDish,
  matCyanEmissive,
  matCyanEmissiveLow,
  matRedBeacon,
  matCyanBeacon,
  geoCoreHub,
  geoCollarRing,
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
  const stationGroupRef = useRef<Group>(null);
  const coreHubRef = useRef<Mesh>(null);
  const primaryRingRef = useRef<Mesh>(null);
  const secondaryRingRef = useRef<Mesh>(null);
  const solarLeftRef = useRef<Group>(null);
  const solarRightRef = useRef<Group>(null);
  const commsMastRef = useRef<Group>(null);
  const beacon1Ref = useRef<Mesh>(null);
  const beacon2Ref = useRef<Mesh>(null);

  const collarInstancedRef = useRef<InstancedMesh>(null);
  const habInstancedRef = useRef<InstancedMesh>(null);

  // Initialize static instanced mesh matrices on mount
  useEffect(() => {
    // 1. Setup 3 Collar Rings
    if (collarInstancedRef.current) {
      [-1.2, 0, 1.2].forEach((y, i) => {
        tempObj.position.set(0, y, 0);
        tempObj.rotation.set(0, 0, 0);
        tempObj.scale.set(1, 1, 1);
        tempObj.updateMatrix();
        collarInstancedRef.current?.setMatrixAt(i, tempObj.matrix);
      });
      collarInstancedRef.current.instanceMatrix.needsUpdate = true;
    }

    // 2. Setup 8 Habitation Modules on Primary Ring
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

  // Per-frame slow majestic rotation (Zero allocations)
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (stationGroupRef.current) {
      stationGroupRef.current.position.y = Math.sin(elapsed * 0.3) * 0.08;
    }
    if (coreHubRef.current) {
      coreHubRef.current.rotation.y += delta * 0.03;
    }
    if (primaryRingRef.current) {
      primaryRingRef.current.rotation.z += delta * 0.04;
    }
    if (secondaryRingRef.current) {
      secondaryRingRef.current.rotation.z -= delta * 0.025;
    }
    if (commsMastRef.current) {
      commsMastRef.current.rotation.y += delta * 0.1;
    }

    // Staggered navigation beacon strobes
    if (beacon1Ref.current) {
      matRedBeacon.emissiveIntensity = Math.sin(elapsed * 4.0) > 0.7 ? 2.5 : 0.2;
    }
    if (beacon2Ref.current) {
      matCyanBeacon.emissiveIntensity =
        Math.sin(elapsed * 4.0 + Math.PI) > 0.7 ? 2.5 : 0.2;
    }
  });

  return (
    <group ref={stationGroupRef} position={[0, 0, 0]}>
      {/* 1. CENTRAL COMMAND HUB */}
      <mesh
        ref={coreHubRef}
        geometry={geoCoreHub}
        material={matTitaniumHull}
        castShadow
        receiveShadow
      />

      {/* Titanium Core Collar Rings (Instanced 3x) */}
      <instancedMesh
        ref={collarInstancedRef}
        args={[geoCollarRing, matTrussAccent, 3]}
        castShadow
      />

      {/* 2. PRIMARY TITANIUM LIVING RING (Radius 9.5) */}
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

      {/* 3. COUNTER-ROTATING SECONDARY OBSERVATION RING (Radius 6.2) */}
      <group ref={secondaryRingRef} rotation={[0, 0, Math.PI / 6]}>
        <mesh geometry={geoSecondaryRing} material={matDarkPanel} castShadow />
      </group>

      {/* 4. MASSIVE STRUCTURAL DOCKING ARMS & TRUSSES */}
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
            {/* Structural Reinforcement Ribs */}
            <mesh
              position={[4.8, 0.15, 0]}
              geometry={geoPylonRib}
              material={matCyanEmissiveLow}
            />
          </group>
        );
      })}

      {/* 5. SOLAR RADIATOR PANELS (Left & Right Wings) */}
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

      {/* 6. COMMUNICATIONS MAST & ROTATING RADAR ARRAY */}
      <group ref={commsMastRef} position={[0, 2.5, 0]}>
        <mesh geometry={geoAntennaMast} material={matCommsMast} castShadow />
        <mesh
          position={[0, 0.8, 0.2]}
          rotation={[Math.PI / 3, 0, 0]}
          geometry={geoRadarDish}
          material={matRadarDish}
          castShadow
        />
      </group>

      {/* 7. NAVIGATION BEACON STROBES */}
      <mesh
        ref={beacon1Ref}
        position={[0, 3.6, 0]}
        geometry={geoBeacon}
        material={matRedBeacon}
      />
      <mesh
        ref={beacon2Ref}
        position={[0, -3.2, 0]}
        geometry={geoBeacon}
        material={matCyanBeacon}
      />
    </group>
  );
}

export default Station;
