"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import {
  matDroneChassis,
  matCyanBeacon,
  matRedBeacon,
  matCyanTransparent,
  geoDroneChassis,
  geoDroneSensor,
  geoDroneThruster,
} from "@/lib/SharedMaterials";

interface DroneData {
  radius: number;
  speed: number;
  height: number;
  offset: number;
  tilt: number;
  beaconColor: "cyan" | "red";
}

export function Drones() {
  const groupRef = useRef<Group>(null);
  const drone1Ref = useRef<Group>(null);
  const drone2Ref = useRef<Group>(null);
  const drone3Ref = useRef<Group>(null);
  const drone4Ref = useRef<Group>(null);

  const droneRefs = [drone1Ref, drone2Ref, drone3Ref, drone4Ref];

  const dronesData: DroneData[] = useMemo(
    () => [
      {
        radius: 14.5,
        speed: 0.08,
        height: 1.8,
        offset: 0,
        tilt: 0.15,
        beaconColor: "cyan",
      },
      {
        radius: 16.2,
        speed: -0.065,
        height: -2.2,
        offset: Math.PI * 0.65,
        tilt: -0.12,
        beaconColor: "red",
      },
      {
        radius: 12.8,
        speed: 0.11,
        height: -0.4,
        offset: Math.PI * 1.3,
        tilt: 0.2,
        beaconColor: "cyan",
      },
      {
        radius: 18.0,
        speed: -0.05,
        height: 3.0,
        offset: Math.PI * 1.8,
        tilt: 0.1,
        beaconColor: "cyan",
      },
    ],
    []
  );

  // Per-frame orbital drone patrol with zero memory allocation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    dronesData.forEach((data, i) => {
      const droneGroup = droneRefs[i]?.current;
      if (!droneGroup) return;

      const angle = time * data.speed + data.offset;
      const x = Math.cos(angle) * data.radius;
      const z = Math.sin(angle) * data.radius;
      const y = data.height + Math.sin(time * 0.6 + i) * 0.35;

      droneGroup.position.set(x, y, z);
      droneGroup.rotation.y = -angle + Math.PI / 2;
      droneGroup.rotation.z = Math.sin(time * 1.0 + i) * 0.08;
      droneGroup.rotation.x = Math.cos(time * 0.8 + i) * 0.04;
    });
  });

  return (
    <group ref={groupRef}>
      {dronesData.map((data, i) => (
        <group key={i} ref={droneRefs[i]}>
          {/* Main Inspection Drone Chassis */}
          <mesh
            geometry={geoDroneChassis}
            material={matDroneChassis}
            castShadow
          />

          {/* Forward Telemetry Sensor Pod */}
          <mesh
            position={[0, 0, 0.25]}
            geometry={geoDroneSensor}
            material={data.beaconColor === "cyan" ? matCyanBeacon : matRedBeacon}
          />

          {/* Subtle Ion Thruster Trail Cone */}
          <mesh
            position={[0, 0, -0.28]}
            rotation={[Math.PI / 2, 0, 0]}
            geometry={geoDroneThruster}
            material={matCyanTransparent}
          />
        </group>
      ))}
    </group>
  );
}

export default Drones;
