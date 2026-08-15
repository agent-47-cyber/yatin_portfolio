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

  // Only render in MISSION_CONTROL. In all other states (ABOUT, PROJECTS, EXPERIENCE, etc.),
  // navigation numbers are hidden to prevent UI collisions and give 100% negative space to sector scenes.
  if (currentState !== "MISSION_CONTROL") {
    return null;
  }

  return (
    <nav
      className="fixed bottom-8 sm:bottom-12 left-0 right-0 z-30 pointer-events-none flex flex-col items-center select-none"
      aria-label="Orbital Sector Navigation"
    >
      <div className="flex items-end justify-center gap-12 sm:gap-16 md:gap-20 pointer-events-auto">
        {NAVIGATION_ITEMS.map((item) => {
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
              {/* Syne Typography Number (Clean 4xl-5xl max) */}
              <span className="font-display text-4xl sm:text-5xl leading-none text-[#8a8a8e] group-hover:text-[#f0ece4] group-hover:drop-shadow-[0_0_12px_rgba(240,236,228,0.3)] transition-all duration-300">
                {item.index}
              </span>

              {/* Minimalist Mono Label */}
              <span className="font-mono-system text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mt-1.5 text-[#8a8a8e] group-hover:text-[#00e5ff] transition-colors duration-300">
                {item.label}
              </span>

              {/* Active Bottom Indicator */}
              <span className="h-[2px] w-0 group-hover:w-full bg-[#00e5ff] transition-all duration-300 rounded-full mt-1" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;
