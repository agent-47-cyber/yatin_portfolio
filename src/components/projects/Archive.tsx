"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { PROJECTS_DATA } from "@/data/projects";
import { ArchiveObject } from "@/components/projects/ArchiveObject";

const ARTIFACT_POSITIONS: Array<[number, number, number]> = [
  [-4.6, 0.1, -0.5],
  [-1.5, 0.2, 0.6],
  [1.5, -0.2, 0.6],
  [4.6, 0.1, -0.5],
];

export function Archive() {
  const currentState = useAppStore((state) => state.currentState);
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);
  const selectProject = useAppStore((state) => state.selectProject);
  const setActiveHover = useAppStore((state) => state.setActiveHover);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isArchiveVisible =
    currentState === "PROJECTS" || currentState === "PROJECT_DETAIL";

  if (!isArchiveVisible && currentState !== "MISSION_CONTROL") {
    // Dimmed / hidden when in other sections
    return null;
  }

  return (
    <group position={[0, 0.5, 0]}>
      {PROJECTS_DATA.map((project, index) => {
        const isSelected = selectedProjectId === project.id;
        const isHovered = hoveredId === project.id;
        const isDimmed =
          (selectedProjectId !== null && !isSelected) ||
          (hoveredId !== null && !isHovered && selectedProjectId === null);

        const position = isSelected
          ? ([0, 0, 0] as [number, number, number])
          : ARTIFACT_POSITIONS[index] || [0, 0, 0];

        return (
          <ArchiveObject
            key={project.id}
            project={project}
            position={position}
            isHovered={isHovered}
            isSelected={isSelected}
            isDimmed={isDimmed}
            onPointerEnter={() => {
              setHoveredId(project.id);
              setActiveHover(project.id);
            }}
            onPointerLeave={() => {
              setHoveredId(null);
              setActiveHover(null);
            }}
            onClick={() => {
              selectProject(project.id);
            }}
          />
        );
      })}
    </group>
  );
}

export default Archive;
