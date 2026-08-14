"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { EXPERIENCE_DATA } from "@/data/experience";
import { OrbitRing } from "@/components/experience/OrbitRing";
import { OrbitNode } from "@/components/experience/OrbitNode";

const WAYPOINT_POSITIONS: Array<[number, number, number]> = [
  [2.4, 0.4, 0],
  [0, 0.8, 2.2],
  [-2.4, -0.4, -0.8],
];

export function OrbitalHistory() {
  const currentState = useAppStore((state) => state.currentState);
  const setActiveHover = useAppStore((state) => state.setActiveHover);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeWaypointId, setActiveWaypointId] = useState<string>(
    EXPERIENCE_DATA[0].id
  );

  const isExperienceActive = currentState === "EXPERIENCE";

  // Positioned on the Right Flank Sector
  return (
    <group position={[16, 0, -2]}>
      {/* 3D Career Flight Trajectory Path */}
      <OrbitRing />

      {/* Chronological Spacecraft Flight Waypoints */}
      {EXPERIENCE_DATA.map((exp, index) => {
        const isActive = activeWaypointId === exp.id;
        const isHovered = hoveredId === exp.id;
        const position = WAYPOINT_POSITIONS[index] || [0, 0, 0];

        return (
          <OrbitNode
            key={exp.id}
            experience={exp}
            position={position}
            isActive={isActive && isExperienceActive}
            isHovered={isHovered && isExperienceActive}
            onPointerEnter={() => {
              if (!isExperienceActive) return;
              setHoveredId(exp.id);
              setActiveHover(exp.id);
            }}
            onPointerLeave={() => {
              if (!isExperienceActive) return;
              setHoveredId(null);
              setActiveHover(null);
            }}
            onClick={() => {
              if (!isExperienceActive) return;
              setActiveWaypointId(exp.id);
            }}
          />
        );
      })}
    </group>
  );
}

export default OrbitalHistory;
