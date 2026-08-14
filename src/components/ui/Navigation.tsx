"use client";

import { useAppStore } from "@/store/useAppStore";
import { NAVIGATION_ITEMS } from "@/config/navigation";
import type { ApplicationState } from "@/types";

export function Navigation() {
  const currentState = useAppStore((state) => state.currentState);
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const transition = useAppStore((state) => state.transition);

  // Hidden during Intro or Project Detail mode
  if (currentState === "INTRO" || currentState === "PROJECT_DETAIL" || currentState === "OUTRO") {
    return null;
  }

  const handleNavClick = (state: ApplicationState) => {
    if (isTransitioning) return;
    transition(state);
  };

  return (
    <nav className="fixed bottom-8 left-0 w-full px-8 md:px-16 pointer-events-auto z-20 flex justify-between items-end select-none">
      {/* Overview Reset Trigger */}
      <button
        onClick={() => handleNavClick("MISSION_CONTROL")}
        className={`group text-left transition-all duration-300 ${
          currentState === "MISSION_CONTROL"
            ? "opacity-100"
            : "opacity-40 hover:opacity-90"
        }`}
      >
        <span className="block font-mono-system text-[9px] tracking-[0.25em] text-[#8a8a8e] group-hover:text-[#00e5ff] transition-colors">
          STATION
        </span>
        <span className="font-display text-xl md:text-2xl text-[#f0ece4] tracking-tight">
          OVERVIEW
        </span>
      </button>

      {/* Primary 3 Destinations */}
      <div className="flex items-end gap-8 md:gap-20">
        {NAVIGATION_ITEMS.map((item) => {
          const stateName = item.label as ApplicationState;
          const isActive = currentState === stateName;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(stateName)}
              className="group text-left focus:outline-none relative py-2"
            >
              {/* Huge Number Index */}
              <span
                className={`block font-display text-3xl sm:text-5xl md:text-6xl tracking-tighter transition-all duration-500 transform ${
                  isActive
                    ? "text-[#00e5ff] -translate-y-1.5 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                    : "text-[#8a8a8e] opacity-40 group-hover:opacity-100 group-hover:text-[#f0ece4] group-hover:-translate-y-1"
                }`}
              >
                {item.index}
              </span>

              {/* Minimal Section Label */}
              <span
                className={`block font-mono-system text-[10px] md:text-xs tracking-[0.2em] transition-colors duration-300 ${
                  isActive
                    ? "text-[#f0ece4] font-medium"
                    : "text-[#8a8a8e] group-hover:text-[#00e5ff]"
                }`}
              >
                {item.label}
              </span>

              {/* Active / Hover Cyan Underline Indicator */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#00e5ff] transition-all duration-500 ${
                  isActive
                    ? "w-full opacity-100 shadow-[0_0_8px_#00e5ff]"
                    : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-60"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;
