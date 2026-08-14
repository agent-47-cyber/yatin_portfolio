"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Group, Mesh } from "three";

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

  const { colors } = DESIGN_SYSTEM;

  return (
    <group ref={groupRef}>
      {dronesData.map((_, i) => (
        <group key={i} ref={droneRefs[i]}>
          {/* Drone Chassis */}
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.08, 0.45]} />
            <meshStandardMaterial color="#1a1c26" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Forward Sensor Pod */}
          <mesh position={[0, 0, 0.25]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color={colors.electricCyan}
              emissive={colors.electricCyan}
              emissiveIntensity={2.5}
            />
          </mesh>

          {/* Subtle Thruster Trail */}
          <mesh position={[0, 0, -0.25]}>
            <coneGeometry args={[0.04, 0.2, 8]} />
            <meshBasicMaterial
              color={colors.electricCyan}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default Drones;
