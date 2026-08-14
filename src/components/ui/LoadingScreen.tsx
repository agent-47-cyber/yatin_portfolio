"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { AssetManager } from "@/lib/assets";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function LoadingScreen() {
  const currentState = useAppStore((state) => state.currentState);
  const transition = useAppStore((state) => state.transition);
  const skipIntro = useAppStore((state) => state.skipIntro);
  const prefersReducedMotion = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING ORBITAL SYSTEMS...");

  useEffect(() => {
    // Initial transition from BOOT to LOADING
    if (currentState === "BOOT") {
      transition("LOADING");
    }

    // Simulate asset readiness verification & subscribe to AssetManager
    const unsubscribe = AssetManager.onProgress((p) => {
      setProgress(Math.round(p * 100));
    });

    let currentP = 0;
    const interval = setInterval(() => {
      currentP += 20;
      setProgress((prev) => Math.min(prev + 25, 100));

      if (currentP >= 40 && currentP < 80) {
        setStatusText("CALIBRATING OBSERVATION OPTICS...");
      } else if (currentP >= 80 && currentP < 100) {
        setStatusText("STABILIZING 3D ENVIRONMENT...");
      } else if (currentP >= 100) {
        setStatusText("ALL SYSTEMS NOMINAL");
        clearInterval(interval);

        setTimeout(() => {
          if (prefersReducedMotion) {
            skipIntro();
          } else {
            transition("INTRO");
          }
        }, 400);
      }
    }, 250);

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [currentState, transition, skipIntro, prefersReducedMotion]);

  if (currentState !== "BOOT" && currentState !== "LOADING") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col justify-between p-8 md:p-12 font-mono-system text-xs text-[#8a8a8e] select-none">
      {/* Top Header */}
      <div className="flex justify-between items-start">
        <p className="text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase">
          ORBIT // YATIN
        </p>
        <p className="text-[10px] tracking-widest opacity-60">SYSTEM BOOT</p>
      </div>

      {/* Center Progress Telemetry */}
      <div className="flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto w-full">
        <div className="flex justify-between items-center w-full text-[10px] tracking-widest text-[#f0ece4]">
          <span>{statusText}</span>
          <span className="font-bold text-[#00e5ff]">{progress}%</span>
        </div>

        {/* Minimalist Progress Track */}
        <div className="w-full h-[2px] bg-[#1a1b24] overflow-hidden relative">
          <div
            className="h-full bg-[#00e5ff] transition-all duration-300 shadow-[0_0_12px_#00e5ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-end text-[9px] tracking-wider opacity-40">
        <div>STANDBY FOR ORBITAL INSERTION</div>
        <div>VER 1.0 // 60 FPS</div>
      </div>
    </div>
  );
}

export default LoadingScreen;
