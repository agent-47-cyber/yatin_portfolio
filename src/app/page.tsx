"use client";

import { useAppStore } from "@/store/useAppStore";
import { SITE_IDENTITY } from "@/config/navigation";

export default function Home() {
  const currentState = useAppStore((state) => state.currentState);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0a0a0c] flex flex-col justify-between p-8 font-mono-system text-xs text-[#8a8a8e]">
      {/* Top HUD */}
      <header className="flex justify-between items-start w-full">
        <div>
          <p className="text-[#f0ece4] font-medium tracking-widest">
            {SITE_IDENTITY.systemName}
          </p>
          <p className="opacity-60">{SITE_IDENTITY.coordinates}</p>
        </div>
        <div className="text-right">
          <p className="text-[#00e5ff]">ENGINE FOUNDATION // PHASE 1</p>
          <p className="opacity-60">STATUS: {currentState}</p>
        </div>
      </header>

      {/* Center Display */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="font-display text-4xl sm:text-6xl text-[#f0ece4] tracking-tight">
          {SITE_IDENTITY.name}
        </h1>
        <p className="text-sm tracking-widest text-[#00e5ff]">
          {SITE_IDENTITY.role}
        </p>
        <p className="max-w-md text-[#8a8a8e] font-sans text-sm mt-4">
          {SITE_IDENTITY.tagline}
        </p>
      </div>

      {/* Bottom Status */}
      <footer className="flex justify-between items-end w-full text-[10px] tracking-wider opacity-60">
        <div>ORBITAL OBSERVATION STATION</div>
        <div>ALL SYSTEMS NOMINAL</div>
      </footer>
    </main>
  );
}
