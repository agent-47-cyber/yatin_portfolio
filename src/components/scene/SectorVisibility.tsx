"use client";

import type { ReactNode } from "react";

interface SectorVisibilityProps {
  sector: "ABOUT" | "PROJECTS" | "EXPERIENCE" | "MISSION_CONTROL";
  children: ReactNode;
}

/**
 * Sectors stay mounted and render throughout every flight. Hiding a parent
 * group removes its geometry and local lights mid-route, which caused the
 * visible voids, light discontinuities, and shader wake-up on arrival.
 */
export function SectorVisibility({ children }: SectorVisibilityProps) {
  return <group>{children}</group>;
}

export default SectorVisibility;
