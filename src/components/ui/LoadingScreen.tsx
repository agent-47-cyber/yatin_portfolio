"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { AssetManager } from "@/lib/assets";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, AnimatePresence } from "framer-motion";
import { AudioEngine } from "@/lib/audio";

const DIAGNOSTIC_STEPS = [
  { id: "renderer", label: "INITIALIZING RENDERER", threshold: 10 },
  { id: "shaders", label: "COMPILING SHADER PIPELINE", threshold: 22 },
  { id: "materials", label: "VERIFYING MATERIAL LIBRARY", threshold: 35 },
  { id: "optics", label: "CALIBRATING OPTICAL SENSORS", threshold: 48 },
  { id: "topology", label: "LOADING STATION TOPOLOGY", threshold: 62 },
  { id: "core", label: "SYNCHRONIZING IDENTITY CORE", threshold: 75 },
  { id: "nav", label: "VERIFYING NAVIGATION SYSTEM", threshold: 88 },
  { id: "mission", label: "MISSION CONTROL ONLINE", threshold: 98 },
];

export function LoadingScreen() {
  const currentState = useAppStore((state) => state.currentState);
  const transition = useAppStore((state) => state.transition);
  const skipIntro = useAppStore((state) => state.skipIntro);
  const prefersReducedMotion = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [isMissionReady, setIsMissionReady] = useState(false);

  useEffect(() => {
    if (currentState !== "BOOT" && currentState !== "LOADING") return;

    if (currentState === "BOOT") {
      transition("LOADING");
    }

    let animationFrameId: number;
    let completionTimeoutId: number | undefined;
    let currentSmoothProgress = 0;
    let lastTime = Date.now();
    let isCompleted = false;
    let realProgress = AssetManager.getProgress();
    const unsubscribe = AssetManager.onProgress((value) => {
      realProgress = value;
    });

    // The UI may approach readiness smoothly, but never completes until the
    // renderer has mounted, compiled, and drawn the critical environment.
    const PROGRESS_PER_MS = 100 / 2200;
    let hasPlayedHover = false;
    let hasPlayedClick = false;

    const tick = () => {
      if (isCompleted) return;
      const now = Date.now();
      const deltaMs = Math.min(now - lastTime, 50);
      lastTime = now;

      const isCriticalReady = realProgress >= 1 || AssetManager.isCriticalReady();
      if (isCriticalReady) {
        currentSmoothProgress = Math.min(
          100,
          currentSmoothProgress + Math.max(deltaMs * 0.18, (100 - currentSmoothProgress) * 0.08)
        );
      } else {
        currentSmoothProgress = Math.min(
          92,
          currentSmoothProgress + deltaMs * PROGRESS_PER_MS
        );
      }
      const roundedProgress = Math.floor(currentSmoothProgress);

      setProgress(roundedProgress);

      // Trigger audio milestones
      if (roundedProgress >= 25 && !hasPlayedHover) {
        try {
          AudioEngine.playHover();
        } catch {}
        hasPlayedHover = true;
      }
      if (roundedProgress >= 75 && !hasPlayedClick) {
        try {
          AudioEngine.playClick();
        } catch {}
        hasPlayedClick = true;
      }

      // Check for completion
      if (roundedProgress >= 100 && isCriticalReady) {
        isCompleted = true;
        setIsMissionReady(true);
        try {
          AudioEngine.playTransition();
        } catch {}

        completionTimeoutId = window.setTimeout(() => {
          if (prefersReducedMotion) {
            skipIntro();
          } else {
            transition("INTRO");
          }
        }, 250);
        return;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (completionTimeoutId) window.clearTimeout(completionTimeoutId);
      unsubscribe();
    };
  }, [currentState, transition, skipIntro, prefersReducedMotion]);

  const isVisible = currentState === "BOOT" || currentState === "LOADING";

  const getAtmosphereStyles = (p: number) => {
    if (p < 10) {
      return { bgAlpha: 0.85, blurPx: 16 };
    } else if (p < 25) {
      const ratio = (p - 10) / 15;
      return { bgAlpha: 0.85 - ratio * 0.17, blurPx: 16 - ratio * 7 };
    } else if (p < 50) {
      const ratio = (p - 25) / 25;
      return { bgAlpha: 0.68 - ratio * 0.3, blurPx: 9 - ratio * 4 };
    } else if (p < 75) {
      const ratio = (p - 50) / 25;
      return { bgAlpha: 0.38 - ratio * 0.22, blurPx: 5 - ratio * 3 };
    } else if (p < 90) {
      const ratio = (p - 75) / 15;
      return { bgAlpha: 0.16 - ratio * 0.12, blurPx: 2 - ratio * 2 };
    } else {
      return { bgAlpha: 0.04, blurPx: 0 };
    }
  };

  const { bgAlpha, blurPx } = getAtmosphereStyles(progress);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-station-boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: `rgba(10, 10, 12, ${bgAlpha})`,
            backdropFilter: `blur(${blurPx}px)`,
            WebkitBackdropFilter: `blur(${blurPx}px)`,
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 md:p-12 font-mono-system text-xs pointer-events-none select-none transition-all duration-300"
        >
          {/* Top Bar: Station Link Status */}
          <div className="flex justify-between items-start w-full">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                <p className="text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase font-semibold">
                  ORBIT // REMOTE UPLINK
                </p>
              </div>
              <p className="text-[8.5px] tracking-widest text-[#8a8a8e] uppercase pl-3.5">
                DEEP SPACE RESEARCH STATION // AWAKENING
              </p>
            </div>

            <div className="text-right space-y-0.5">
              <span className="text-[9px] tracking-widest text-[#f0ece4] font-bold">
                CORE STATUS // {isMissionReady ? "MISSION READY" : "INITIALIZING"}
              </span>
              <p className="text-[8px] tracking-wider text-[#8a8a8e]">
                POWER BUS // {progress}% CAPACITY
              </p>
            </div>
          </div>

          {/* Center Area */}
          <div className="flex-1 flex items-center justify-center pointer-events-none" />

          {/* Bottom Diagnostic Terminal & Power Conduit */}
          <div className="w-full max-w-xl mx-auto space-y-4">
            <div className="p-3.5 rounded-sm border border-[hsla(0,0%,100%,0.08)] bg-[#0a0a0c]/85 backdrop-blur-md space-y-1.5 shadow-2xl">
              <div className="flex justify-between items-center pb-1.5 border-b border-[hsla(0,0%,100%,0.06)] text-[8.5px]">
                <span className="text-[#8a8a8e] tracking-[0.2em] uppercase font-semibold">
                  STATION DIAGNOSTIC TELEMETRY
                </span>
                <span
                  className={`tracking-widest uppercase font-bold transition-colors duration-300 ${
                    isMissionReady ? "text-[#00e5ff]" : "text-[#ffd166]"
                  }`}
                >
                  {isMissionReady
                    ? "[ IDENTITY CORE ONLINE // MISSION READY ]"
                    : "[ SYSTEM AWAKENING IN PROGRESS ]"}
                </span>
              </div>

              {/* Grid of Diagnostic Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 font-mono-system text-[9px]">
                {DIAGNOSTIC_STEPS.map((step) => {
                  const isDone = progress >= step.threshold;
                  const isCurrent =
                    progress >= step.threshold - 8 && progress < step.threshold;

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-2 transition-all duration-150 ${
                        isDone
                          ? "text-[#00e5ff] font-medium"
                          : isCurrent
                          ? "text-[#f0ece4] font-bold"
                          : "text-[#8a8a8e]/35"
                      }`}
                    >
                      <span className="text-[10px] leading-none">
                        {isDone ? "✓" : isCurrent ? "›" : "·"}
                      </span>
                      <span className="tracking-wider truncate">{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Power Conduit Flow Line */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[8.5px] font-mono-system tracking-widest text-[#8a8a8e]">
                <span>CONDUIT POWER FLOW</span>
                <span className="text-[#00e5ff] font-bold">{progress}%</span>
              </div>

              <div className="w-full h-[3px] bg-[#12141c] rounded-full overflow-hidden relative border border-[hsla(0,0%,100%,0.05)]">
                <div
                  className="h-full bg-gradient-to-r from-[#00e5ff]/40 via-[#00e5ff] to-[#ffffff] shadow-[0_0_16px_#00e5ff]"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="flex justify-between items-end text-[8px] tracking-[0.2em] uppercase text-[#8a8a8e] opacity-40 pt-2">
            <div>SECTOR // DEEP SPACE OBSERVATION</div>
            <div>VER 2.0 // ZERO-HITCH PIPELINE</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
