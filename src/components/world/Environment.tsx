"use client";

import { useAppStore } from "@/store/useAppStore";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export function Environment() {
  const currentState = useAppStore((state) => state.currentState);

  // Dynamic atmospheric fog density based on sector
  let fogColor: string = DESIGN_SYSTEM.colors.obsidian;
  let fogNear = 15;
  let fogFar = 160;

  if (currentState === "ABOUT") {
    fogColor = "#0a0808";
    fogNear = 8;
    fogFar = 60;
  } else if (currentState === "PROJECTS" || currentState === "PROJECT_DETAIL") {
    fogColor = "#030406";
    fogNear = 6;
    fogFar = 50;
  } else if (currentState === "EXPERIENCE") {
    fogColor = "#04060e";
    fogNear = 8;
    fogFar = 70;
  }

  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
    </>
  );
}

export default Environment;
