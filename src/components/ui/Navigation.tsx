"use client";

import { useState } from "react";
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

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleNavigate = (targetState: ApplicationState) => {
    if (isTransitioning || currentState === targetState) return;
    AudioEngine.playTransition();
    transition(targetState);
  };

  // Render exclusively in MISSION_CONTROL to keep sector views focused
  if (currentState !== "MISSION_CONTROL") {
    return null;
  }

  // Active selector position percentage: 01 = 16.6%, 02 = 50%, 03 = 83.3%
  const activePositionPercent =
    hoveredIndex === 0
      ? "16.6%"
      : hoveredIndex === 1
      ? "50%"
      : hoveredIndex === 2
      ? "83.3%"
      : "50%";

  return (
    <nav
      className="fixed bottom-6 sm:bottom-10 md:bottom-12 left-0 right-0 z-30 pointer-events-none flex flex-col items-center select-none px-4"
      aria-label="Mission Directory Navigation"
    >
      <div className="flex flex-col items-center w-full max-w-2xl pointer-events-auto">
        {/* 1. High-Tech System Header */}
        <div className="flex items-center gap-3 mb-3 sm:mb-4 text-[9px] sm:text-[10px] tracking-[0.3em] font-mono-system text-[#8a8a8e]/80 uppercase">
          <span className="w-2 h-[1px] bg-[#00e5ff]/60" />
          <span className="text-[#00e5ff] font-semibold">MISSION DIRECTORY</span>
          <span className="text-[8px] text-[#8a8a8e]/60">// DOCKING PROTOCOL</span>
          <span className="w-2 h-[1px] bg-[#00e5ff]/60" />
        </div>

        {/* 2. Illuminated Conduit Rail Container */}
        <div className="relative w-full flex flex-col items-center">
          {/* Background Conduit Rail Line */}
          <div className="absolute top-[28px] sm:top-[34px] left-[16.6%] right-[16.6%] h-[2px] bg-[rgba(255,255,255,0.08)] pointer-events-none">
            {/* Active Cyan Conduit Energy Channel */}
            <div
              className={`h-full bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent transition-opacity duration-300 ${
                hoveredIndex !== null ? "opacity-100" : "opacity-30"
              }`}
            />
            {/* Animated Traveling Pulse */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent w-1/3 animate-conduit-pulse opacity-40" />
          </div>

          {/* Traveling Kinetic Selector Shuttle / Drone */}
          <div
            className={`absolute top-[21px] sm:top-[27px] w-6 h-4 -ml-3 flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
              hoveredIndex !== null ? "opacity-100 scale-100" : "opacity-40 scale-75"
            }`}
            style={{ left: activePositionPercent }}
          >
            {/* Micro Drone Wings & Thruster Glint */}
            <div className="relative flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full border border-[#00e5ff] bg-[#00e5ff]/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_12px_#00e5ff]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f0ece4]" />
              </div>
              <div className="absolute -top-1 w-5 h-[1px] bg-[#00e5ff]/80" />
              <div className="absolute -bottom-1 w-5 h-[1px] bg-[#00e5ff]/80" />
            </div>
          </div>

          {/* 3. Docking Station Bays Grid */}
          <div className="grid grid-cols-3 w-full gap-4 sm:gap-8">
            {NAVIGATION_ITEMS.map((item, idx) => {
              const hoverHandlers = registerHover(`nav-${item.index}`);
              const isHovered = hoveredIndex === idx;

              const sectorSubtitles = [
                "RESEARCH LAB",
                "CODE VAULT",
                "FLIGHT LOGS",
              ];

              return (
                <button
                  key={item.index}
                  onClick={() => handleNavigate(item.label)}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    hoverHandlers.onPointerEnter();
                    AudioEngine.playHover();
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    hoverHandlers.onPointerLeave();
                  }}
                  disabled={isTransitioning}
                  className="group relative flex flex-col items-center text-center p-2 rounded-lg transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00e5ff]"
                  aria-label={`Dock at Sector ${item.index}: ${item.label}`}
                >
                  {/* Docking Bay Status Node */}
                  <div className="flex items-center justify-center mb-2 z-10">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                        isHovered
                          ? "border-[#00e5ff] bg-[#00e5ff] shadow-[0_0_12px_#00e5ff]"
                          : "border-[#8a8a8e]/40 bg-[#0a0a0c]"
                      }`}
                    >
                      <div
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          isHovered ? "bg-[#0a0a0c]" : "bg-[#8a8a8e]/60"
                        }`}
                      />
                    </div>
                  </div>

                  {/* +30% Scaled Fluid Syne Number */}
                  <span className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] leading-none text-[#8a8a8e] group-hover:text-[#f0ece4] group-hover:drop-shadow-[0_0_16px_rgba(240,236,228,0.4)] transition-all duration-300">
                    {item.index}
                  </span>

                  {/* Section Title */}
                  <span className="font-mono-system text-[clamp(0.75rem,1.1vw,0.95rem)] font-bold tracking-[0.25em] uppercase mt-1.5 text-[#8a8a8e] group-hover:text-[#00e5ff] transition-colors duration-300">
                    {item.label}
                  </span>

                  {/* Sector Telemetry Badge */}
                  <span className="font-mono-system text-[8px] sm:text-[9px] tracking-[0.2em] text-[#8a8a8e]/60 group-hover:text-[#8a8a8e] transition-colors duration-300 mt-0.5">
                    [ {sectorSubtitles[idx]} ]
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
