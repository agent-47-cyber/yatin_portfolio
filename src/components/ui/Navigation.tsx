"use client";

import { useAppStore } from "@/store/useAppStore";
import { NAVIGATION_ITEMS } from "@/config/navigation";
import { useInteraction } from "@/hooks/useInteraction";
import { AudioEngine } from "@/lib/audio";
import type { ApplicationState } from "@/types";

export function Navigation() {
  const currentState = useAppStore((state) => state.currentState);
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const transition = useAppStore((state) => state.transition);
  const { registerHover } = useInteraction();

  const handleNavigate = (targetState: ApplicationState) => {
    if (isTransitioning || currentState === targetState) return;
    AudioEngine.playTransition();
    transition(targetState);
  };

  // Only active after entering Mission Control
  if (
    currentState === "BOOT" ||
    currentState === "LOADING" ||
    currentState === "INTRO"
  ) {
    return null;
  }

  return (
    <nav
      className="fixed bottom-8 sm:bottom-12 left-0 right-0 z-30 pointer-events-none flex flex-col items-center select-none"
      aria-label="Orbital Sector Navigation"
    >
      {/* Floating Minimalist Navigation (No pill background / No heavy navbar container) */}
      <div className="flex items-end justify-center gap-10 sm:gap-16 md:gap-24 pointer-events-auto">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = currentState === item.label;
          const hoverHandlers = registerHover(`nav-${item.index}`);

          return (
            <button
              key={item.index}
              onClick={() => handleNavigate(item.label)}
              onMouseEnter={() => {
                hoverHandlers.onPointerEnter();
                AudioEngine.playHover();
              }}
              onMouseLeave={hoverHandlers.onPointerLeave}
              disabled={isTransitioning}
              className="group relative flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00e5ff]"
              aria-label={`Navigate to ${item.label}`}
            >
              {/* Huge Syne Typography Number */}
              <span
                className={`font-display text-4xl sm:text-6xl md:text-7xl leading-none transition-all duration-300 ${
                  isActive
                    ? "text-[#00e5ff] drop-shadow-[0_0_16px_rgba(0,229,255,0.6)] scale-105"
                    : "text-[#8a8a8e] group-hover:text-[#f0ece4] group-hover:drop-shadow-[0_0_12px_rgba(240,236,228,0.3)]"
                }`}
              >
                {item.index}
              </span>

              {/* Minimalist Mono Label */}
              <span
                className={`font-mono-system text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mt-1.5 transition-colors duration-300 ${
                  isActive
                    ? "text-[#00e5ff] font-semibold"
                    : "text-[#8a8a8e] group-hover:text-[#f0ece4]"
                }`}
              >
                {item.label}
              </span>

              {/* Cyan Active Bottom Glow Line */}
              <span
                className={`h-[2px] bg-[#00e5ff] transition-all duration-300 rounded-full mt-1 ${
                  isActive
                    ? "w-full shadow-[0_0_8px_#00e5ff]"
                    : "w-0 group-hover:w-1/2 group-hover:bg-[#8a8a8e]"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Overview Reset Trigger when inside a section */}
      {currentState !== "MISSION_CONTROL" && currentState !== "PROJECT_DETAIL" && (
        <button
          onClick={() => {
            AudioEngine.playTransition();
            transition("MISSION_CONTROL");
          }}
          className="pointer-events-auto mt-4 font-mono-system text-[9px] tracking-[0.3em] uppercase text-[#8a8a8e] hover:text-[#00e5ff] transition-colors duration-200"
        >
          [ OVERVIEW ]
        </button>
      )}
    </nav>
  );
}

export default Navigation;
