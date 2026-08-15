"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import {
  matDroneChassis,
  matCyanBeacon,
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
}

export function Drones() {
  const groupRef = useRef<Group>(null);
  const drone1Ref = useRef<Group>(null);
  const drone2Ref = useRef<Group>(null);
  const drone3Ref = useRef<Group>(null);

  const droneRefs = [drone1Ref, drone2Ref, drone3Ref];

  const dronesData: DroneData[] = useMemo(
    () => [
      { radius: 13.5, speed: 0.12, height: 1.5, offset: 0, tilt: 0.2 },
      { radius: 15.0, speed: -0.09, height: -2.0, offset: Math.PI * 0.7, tilt: -0.15 },
      { radius: 12.0, speed: 0.15, height: -0.5, offset: Math.PI * 1.4, tilt: 0.3 },
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
      const y = data.height + Math.sin(time * 0.8 + i) * 0.3;

      droneGroup.position.set(x, y, z);
      droneGroup.rotation.y = -angle + Math.PI / 2;
      droneGroup.rotation.z = Math.sin(time * 1.2 + i) * 0.05;
    });
  });

  return (
    <group ref={groupRef}>
      {dronesData.map((_, i) => (
        <group key={i} ref={droneRefs[i]}>
          {/* Drone Chassis */}
          <mesh
            geometry={geoDroneChassis}
            material={matDroneChassis}
            castShadow
          />

          {/* Forward Sensor Pod */}
          <mesh
            position={[0, 0, 0.25]}
            geometry={geoDroneSensor}
            material={matCyanBeacon}
          />

          {/* Subtle Thruster Trail */}
          <mesh
            position={[0, 0, -0.25]}
            geometry={geoDroneThruster}
            material={matCyanTransparent}
          />
        </group>
      ))}
    </group>
  );
}

export default Drones;
