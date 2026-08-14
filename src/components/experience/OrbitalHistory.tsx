"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { EXPERIENCE_DATA } from "@/data/experience";
import { OrbitRing } from "@/components/experience/OrbitRing";
import { OrbitNode } from "@/components/experience/OrbitNode";

const WAYPOINT_POSITIONS: Array<[number, number, number]> = [
  [3.6, 0.4, 0],
  [0, 1.2, 3.8],
  [-3.6, -0.6, -1.2],
];

export function OrbitalHistory() {
  const currentState = useAppStore((state) => state.currentState);
  const setActiveHover = useAppStore((state) => state.setActiveHover);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeWaypointId, setActiveWaypointId] = useState<string>(
    EXPERIENCE_DATA[0].id
  );

  const isVisible = currentState === "EXPERIENCE" || currentState === "MISSION_CONTROL";

  if (!isVisible) {
    return null;
  }

  return (
    <group position={[8.5, 0, 0]}>
      {/* Orbital Trajectory Path */}
      <OrbitRing />

      {/* Orbital Waypoint Checkpoints */}
      {EXPERIENCE_DATA.map((exp, index) => {
        const isActive = activeWaypointId === exp.id;
        const isHovered = hoveredId === exp.id;
        const position = WAYPOINT_POSITIONS[index] || [0, 0, 0];

        return (
          <OrbitNode
            key={exp.id}
            experience={exp}
            position={position}
            isActive={isActive}
            isHovered={isHovered}
            onPointerEnter={() => {
              setHoveredId(exp.id);
              setActiveHover(exp.id);
            }}
            onPointerLeave={() => {
              setHoveredId(null);
              setActiveHover(null);
            }}
            onClick={() => {
              setActiveWaypointId(exp.id);
            }}
          />
        );
      })}
    </group>
  );
}

export default OrbitalHistory;
