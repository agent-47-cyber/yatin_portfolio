"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { usePerformanceStore } from "@/store/usePerformanceStore";
import { useResponsiveViewport } from "@/hooks/useResponsiveViewport";
import { SITE_IDENTITY } from "@/config/navigation";
import { AudioEngine } from "@/lib/audio";

export function HUD() {
  const currentState = useAppStore((state) => state.currentState);
  const transition = useAppStore((state) => state.transition);
  const selectProject = useAppStore((state) => state.selectProject);
  const fps = usePerformanceStore((state) => state.fps);
  const { profile } = useResponsiveViewport();

  const [isMuted, setIsMuted] = useState(AudioEngine.getIsMuted());

  const handleAudioToggle = () => {
    const newMuteState = AudioEngine.toggleMute();
    setIsMuted(newMuteState);
  };

  // Hidden during Boot, Loading, and Intro
  if (currentState === "BOOT" || currentState === "LOADING" || currentState === "INTRO") {
    return null;
  }

  const isMissionControl = currentState === "MISSION_CONTROL";

  return (
    <div
      className={`absolute inset-0 pointer-events-none flex flex-col justify-between ${profile.hudPadding} font-mono-system text-xs text-[#8a8a8e] z-40 select-none`}
    >
      {/* Top Header Grid */}
      <header className="flex justify-between items-start w-full">
        {/* Left Identity & Role (Visible only in Mission Control) */}
        <div
          className={`space-y-1 transition-opacity duration-500 ${isMissionControl ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <p className="text-[clamp(0.6rem,0.75vw,0.75rem)] tracking-[0.3em] text-[#00e5ff] uppercase font-semibold">
            {SITE_IDENTITY.systemName}
          </p>
          <h1 className="font-display text-[clamp(1.15rem,2.2vw,1.75rem)] text-[#f0ece4] tracking-tight">
            {SITE_IDENTITY.name}
          </h1>
          <p className="text-[clamp(0.6rem,0.75vw,0.75rem)] tracking-wider text-[#8a8a8e]">
            {SITE_IDENTITY.role}
          </p>
        </div>

        {/* Top-Right Navigation & Telemetry Cluster */}
        <div className="flex flex-col items-end gap-2.5 sm:gap-3 ml-auto pointer-events-auto min-w-[190px] sm:min-w-[220px]">
          {/* Row 1: SOUND */}
          <button
            onClick={handleAudioToggle}
            className="w-full flex items-center justify-between text-[clamp(0.55rem,0.7vw,0.7rem)] tracking-[0.2em] uppercase px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-sm border border-[hsla(0,0%,100%,0.08)] bg-[#0a0a0c]/90 backdrop-blur-md text-[#8a8a8e] hover:text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all focus:outline-none shadow-sm"
            aria-label="Toggle sound"
          >
            <span>SOUND</span>
            <span className={isMuted ? "text-[#8a8a8e]" : "text-[#00e5ff]"}>
              // {isMuted ? "MUTED" : "ACTIVE"}
            </span>
          </button>

          {/* Row 2: STATUS */}
          <div className="w-full flex items-center justify-between bg-[#0a0a0c]/90 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-sm border border-[hsla(0,0%,100%,0.08)] text-[clamp(0.55rem,0.7vw,0.7rem)] tracking-wider shadow-sm">
            <span className="text-[#00e5ff] uppercase font-semibold">
              STATUS // {currentState}
            </span>
            <span className="text-[#f0ece4]">{fps} FPS</span>
          </div>

          {/* Row 3: RETURN TO MISSION CONTROL */}
          {!isMissionControl && (
            <button
              onClick={() => {
                selectProject(null);
                transition("MISSION_CONTROL");
              }}
              className="w-full text-center text-[clamp(0.6rem,0.75vw,0.72rem)] tracking-[0.25em] text-[#f0ece4] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-sm border border-[hsla(0,0%,100%,0.15)] bg-[#12141c]/95 backdrop-blur-md shadow-md transition-all focus:outline-none"
            >
              [ RETURN TO MISSION CONTROL ]
            </button>
          )}
        </div>
      </header>

      {/* Center Canvas Ambient Watermark */}
      <div className="flex-1 flex items-center justify-center pointer-events-none">
        {isMissionControl && (
          <div className="text-center opacity-25 pointer-events-none transform translate-y-28">
            <p className="font-mono-system text-[clamp(0.55rem,0.75vw,0.7rem)] tracking-[0.4em] uppercase text-[#8a8a8e]">
              ORBITAL OBSERVATION PLATFORM
            </p>
          </div>
        )}
      </div>

      {/* Minimalist Colophon Footer (Mission Control Only) */}
      <footer
        className={`flex justify-between items-end w-full text-[clamp(0.5rem,0.65vw,0.65rem)] tracking-[0.2em] uppercase text-[#8a8a8e] transition-opacity duration-500 ${isMissionControl ? "opacity-40 hover:opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div>COORDINATES // 43.12° N, 79.38° W</div>
        <div className="hidden sm:block">
          BUILT WITH NEXT.JS 15 · THREE.JS · GSAP · TYPESCRIPT
        </div>
        <div>DESIGNED & ENGINEERED BY YATIN KHANDELWAL</div>
      </footer>
    </div>
  );
}

export default HUD;
