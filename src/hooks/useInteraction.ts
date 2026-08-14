"use client";

import { useAppStore } from "@/store/useAppStore";

export type InteractionCursorMode = "default" | "hover" | "view" | "drag";

export function useInteraction() {
  const setActiveHover = useAppStore((state) => state.setActiveHover);

  const registerHover = (id: string) => {
    return {
      onPointerEnter: () => setActiveHover(id),
      onPointerLeave: () => setActiveHover(null),
    };
  };

  return {
    registerHover,
  };
}

export default useInteraction;
