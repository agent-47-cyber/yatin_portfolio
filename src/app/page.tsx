"use client";

import dynamic from "next/dynamic";
import { useAppStore } from "@/store/useAppStore";
import { usePerformanceStore } from "@/store/usePerformanceStore";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { SITE_IDENTITY, NAVIGATION_ITEMS } from "@/config/navigation";
import type { ApplicationState } from "@/types";

// Dynamic import for persistent 3D Canvas (No SSR)
const World = dynamic(() => import("@/components/scene/World"), {
  ssr: false,
});

export default function Home() {
  // Initialize real-time FPS monitor
  usePerformanceMonitor();

  const currentState = useAppStore((state) => state.currentState);
  const transition = useAppStore((state) => state.transition);
  const fps = usePerformanceStore((state) => state.fps);
  const qualityTier = usePerformanceStore((state) => state.qualityTier);
  const particleCount = usePerformanceStore((state) => state.particleCount);

  const handleStateClick = (state: ApplicationState) => {
    transition(state);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0a0a0c]">
      {/* Layer 1: Persistent 3D World Canvas with Subsystems */}
      <World />

      {/* Layer 2: Interactive HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 font-mono-system text-xs text-[#8a8a8e] z-10">
        {/* Header */}
        <header className="flex justify-between items-start w-full">
          <div>
            <p className="text-[#f0ece4] font-medium tracking-widest">
              {SITE_IDENTITY.systemName}
            </p>
            <p className="opacity-60 text-[10px]">{SITE_IDENTITY.coordinates}</p>
          </div>

          {/* Telemetry Display */}
          <div className="text-right glass-panel px-4 py-2 rounded border border-[hsla(0,0%,100%,0.08)]">
            <p className="text-[#00e5ff] font-medium">SUBSYSTEMS // PHASE 3</p>
            <div className="flex items-center justify-end gap-3 text-[10px] mt-0.5">
              <span className="text-[#f0ece4] font-bold">
                {fps} FPS
              </span>
              <span className="opacity-40">|</span>
              <span className="uppercase text-[#00e5ff]">
                TIER: {qualityTier}
              </span>
              <span className="opacity-40">|</span>
              <span>
                PARTICLES: {particleCount}
              </span>
            </div>
          </div>
        </header>

        {/* Center / Navigation Testing Trigger */}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div>
            <h1 className="font-display text-4xl sm:text-7xl text-[#f0ece4] tracking-tight drop-shadow-lg">
              {SITE_IDENTITY.name}
            </h1>
            <p className="text-xs tracking-widest text-[#00e5ff] mt-1">
              {SITE_IDENTITY.role}
            </p>
          </div>

          {/* Quick State Transition Verification Buttons */}
          <div className="pointer-events-auto flex flex-wrap gap-3 glass-panel px-6 py-3 rounded-full border border-[hsla(0,0%,100%,0.08)]">
            <button
              onClick={() => handleStateClick("MISSION_CONTROL")}
              className={`px-3 py-1.5 rounded text-[11px] transition-colors ${
                currentState === "MISSION_CONTROL"
                  ? "bg-[#00e5ff] text-[#0a0a0c] font-semibold"
                  : "hover:text-[#f0ece4] text-[#8a8a8e]"
              }`}
            >
              OVERVIEW
            </button>
            {NAVIGATION_ITEMS.map((item) => {
              const stateName = item.label as ApplicationState;
              return (
                <button
                  key={item.id}
                  onClick={() => handleStateClick(stateName)}
                  className={`px-3 py-1.5 rounded text-[11px] transition-colors ${
                    currentState === stateName
                      ? "bg-[#00e5ff] text-[#0a0a0c] font-semibold"
                      : "hover:text-[#f0ece4] text-[#8a8a8e]"
                  }`}
                >
                  {item.index} {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-between items-end w-full text-[10px] tracking-wider opacity-60">
          <div>ORBITAL OBSERVATION STATION</div>
          <div>ADAPTIVE QUALITY CASCADE ACTIVE</div>
        </footer>
      </div>
    </main>
  );
}
