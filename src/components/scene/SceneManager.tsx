"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import type { Group } from "three";

export function SceneManager() {
  const currentState = useAppStore((state) => state.currentState);
  const managerRef = useRef<Group>(null);

  useEffect(() => {
    // Coordinate subsystem reactions when section changes
  }, [currentState]);

  // Subtle per-frame scene coordinate sync if needed
  useFrame(() => {
    if (!managerRef.current) return;
  });

  return <group ref={managerRef} name="scene-manager" />;
}

export default SceneManager;
