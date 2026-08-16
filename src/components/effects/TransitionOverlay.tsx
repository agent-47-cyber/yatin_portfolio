"use client";

import { useAppStore } from "@/store/useAppStore";
import { NAVIGATION_ITEMS } from "@/config/navigation";

export function TransitionOverlay() {
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const currentState = useAppStore((state) => state.currentState);

  const activeItem = NAVIGATION_ITEMS.find(
    (item) => item.label === currentState
  );

  const isVisible =
    isTransitioning &&
    currentState !== "BOOT" &&
    currentState !== "LOADING";

  return (
    <div
      className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-500 flex items-center justify-center ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Completely transparent overlay — Zero background dimming */}
      {isVisible && (
        <div className="text-center font-mono-system space-y-2 transform -translate-y-4 pointer-events-none">
          <p className="text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase drop-shadow-[0_0_8px_#00e5ff]">
            ORBITAL VECTOR ENGAGED
          </p>
          <h2 className="font-display text-2xl sm:text-4xl text-[#f0ece4] tracking-tight uppercase drop-shadow-md">
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
