"use client";

import { useAppStore } from "@/store/useAppStore";
import type { ApplicationState } from "@/types";

export function useSectionTransition() {
  const currentState = useAppStore((state) => state.currentState);
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const transition = useAppStore((state) => state.transition);

  const navigateTo = (targetState: ApplicationState) => {
    if (isTransitioning) return false;
    return transition(targetState);
  };

  return {
    currentState,
    isTransitioning,
    navigateTo,
  };
}

export default useSectionTransition;
