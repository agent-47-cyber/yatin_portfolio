"use client";

import { useAppStore } from "@/store/useAppStore";
import type { ReactNode } from "react";

interface SectorVisibilityProps {
  sector: "ABOUT" | "PROJECTS" | "EXPERIENCE" | "MISSION_CONTROL";
  children: ReactNode;
}

/**
 * Coarse-grained sector visibility controller.
 * Keeps off-screen sector details at minimal visual intensity or toggles visibility
 * to reduce draw call overhead during distant camera positions without pop-in.
 */
export function SectorVisibility({ sector, children }: SectorVisibilityProps) {
  const currentState = useAppStore((state) => state.currentState);

  // In Mission Control, all sectors are visible at overview distance.
  // In specific sectors, non-active sector groups remain mounted but can be managed.
  const isDirectlyActive =
    currentState === sector ||
    (sector === "PROJECTS" && currentState === "PROJECT_DETAIL");

  const isOverview =
    currentState === "MISSION_CONTROL" ||
    currentState === "INTRO" ||
    currentState === "BOOT" ||
    currentState === "LOADING";

  const isVisible = isDirectlyActive || isOverview;

  return <group visible={isVisible}>{children}</group>;
}

export default SectorVisibility;
