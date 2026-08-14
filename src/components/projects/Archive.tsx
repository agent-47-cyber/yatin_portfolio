"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { PROJECTS_DATA } from "@/data/projects";
import { ArchiveObject } from "@/components/projects/ArchiveObject";

const ARTIFACT_POSITIONS: Array<[number, number, number]> = [
  [-4.2, 0, 0],
  [-1.4, 0.15, 0.4],
  [1.4, -0.15, 0.4],
  [4.2, 0, 0],
];

export function Archive() {
  const currentState = useAppStore((state) => state.currentState);
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);
  const selectProject = useAppStore((state) => state.selectProject);
  const setActiveHover = useAppStore((state) => state.setActiveHover);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isArchiveActive =
    currentState === "PROJECTS" || currentState === "PROJECT_DETAIL";

  // Positioned in the Lower Research Docking Bay Sector
  return (
    <group position={[0, -12, -2]}>
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
            isDimmed={isDimmed || !isArchiveActive}
            onPointerEnter={() => {
              if (!isArchiveActive) return;
              setHoveredId(project.id);
              setActiveHover(project.id);
            }}
            onPointerLeave={() => {
              if (!isArchiveActive) return;
              setHoveredId(null);
              setActiveHover(null);
            }}
            onClick={() => {
              if (!isArchiveActive) return;
              selectProject(project.id);
            }}
          />
        );
      })}
    </group>
  );
}

export default Archive;
