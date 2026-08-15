"use client";

import { useAppStore } from "@/store/useAppStore";
import { NAVIGATION_ITEMS } from "@/config/navigation";

export function TransitionOverlay() {
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const currentState = useAppStore((state) => state.currentState);

  const activeItem = NAVIGATION_ITEMS.find(
    (item) => item.label === currentState
  );

  const isVisible = isTransitioning && currentState !== "BOOT" && currentState !== "LOADING";

  return (
    <div
      className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-700 flex items-center justify-center ${
        isVisible
          ? "opacity-100 bg-[#0a0a0c]/60 backdrop-blur-xs"
          : "opacity-0"
      }`}
    >
      {isVisible && (
        <div className="text-center font-mono-system space-y-2 transform -translate-y-4">
          <p className="text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase">
            ORBITAL VECTOR ENGAGED
          </p>
          <h2 className="font-display text-2xl sm:text-4xl text-[#f0ece4] tracking-tight uppercase">
            {activeItem
              ? `${activeItem.index} // ${activeItem.internalName}`
              : currentState}
          </h2>
        </div>
      )}
    </div>
  );
}

export default TransitionOverlay;
