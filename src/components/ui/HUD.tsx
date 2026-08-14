"use client";

import { useAppStore } from "@/store/useAppStore";
import { usePerformanceStore } from "@/store/usePerformanceStore";
import { SITE_IDENTITY } from "@/config/navigation";

export function HUD() {
  const currentState = useAppStore((state) => state.currentState);
  const fps = usePerformanceStore((state) => state.fps);
  const qualityTier = usePerformanceStore((state) => state.qualityTier);

  // Hidden during Boot, Loading, and Intro
  if (currentState === "BOOT" || currentState === "LOADING" || currentState === "INTRO") {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-12 font-mono-system text-xs text-[#8a8a8e] z-10 select-none">
      {/* Top Header Grid */}
      <header className="flex justify-between items-start w-full">
        {/* Identity & Coordinates */}
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase">
            {SITE_IDENTITY.systemName}
          </p>
          <h1 className="font-display text-lg md:text-xl text-[#f0ece4] tracking-tight">
            {SITE_IDENTITY.name}
          </h1>
          <p className="text-[10px] tracking-wider text-[#8a8a8e]">
            {SITE_IDENTITY.role}
          </p>
        </div>

        {/* Telemetry & State Status */}
        <div className="text-right glass-panel px-4 py-2 rounded-sm border border-[hsla(0,0%,100%,0.06)] backdrop-blur-md">
          <p className="text-[9px] tracking-[0.25em] text-[#00e5ff] uppercase">
            STATUS // {currentState}
          </p>
          <div className="flex items-center justify-end gap-2.5 text-[10px] mt-0.5">
            <span className="text-[#f0ece4] font-medium">{fps} FPS</span>
            <span className="opacity-30">/</span>
            <span className="uppercase text-[#8a8a8e]">{qualityTier} TIER</span>
          </div>
        </div>
      </header>

      {/* Center Canvas Ambient Space */}
      <div className="flex-1 flex items-center justify-center pointer-events-none">
        {currentState === "MISSION_CONTROL" && (
          <div className="text-center opacity-25 pointer-events-none transform translate-y-24">
            <p className="font-mono-system text-[9px] tracking-[0.4em] uppercase text-[#8a8a8e]">
              ORBITAL OBSERVATION PLATFORM
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HUD;
