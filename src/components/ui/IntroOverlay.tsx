"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import {
  createIntroTimeline,
  killIntroTimeline,
  type IntroTimelineElements,
} from "@/motion/timeline/intro";
import { SITE_IDENTITY } from "@/config/navigation";

export function IntroOverlay() {
  const currentState = useAppStore((state) => state.currentState);
  const skipIntro = useAppStore((state) => state.skipIntro);
  const setIntroComplete = useAppStore((state) => state.setIntroComplete);

  const containerRef = useRef<HTMLDivElement>(null);
  const systemLabelRef = useRef<HTMLParagraphElement>(null);
  const statusLabelRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const namePrimaryRef = useRef<HTMLHeadingElement>(null);
  const nameSecondaryRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Trigger instant skip and clean up GSAP tweens
  const handleSkip = () => {
    const elements: IntroTimelineElements = {
      container: containerRef.current,
      systemLabel: systemLabelRef.current,
      statusLabel: statusLabelRef.current,
      line: lineRef.current,
      namePrimary: namePrimaryRef.current,
      nameSecondary: nameSecondaryRef.current,
      role: roleRef.current,
      enterButton: enterButtonRef.current,
      skipButton: skipButtonRef.current,
    };

    killIntroTimeline(timelineRef.current, elements);
    skipIntro();
  };

  const handleEnter = () => {
    handleSkip();
  };

  useEffect(() => {
    if (currentState !== "INTRO") return;

    const elements: IntroTimelineElements = {
      container: containerRef.current,
      systemLabel: systemLabelRef.current,
      statusLabel: statusLabelRef.current,
      line: lineRef.current,
      namePrimary: namePrimaryRef.current,
      nameSecondary: nameSecondaryRef.current,
      role: roleRef.current,
      enterButton: enterButtonRef.current,
      skipButton: skipButtonRef.current,
    };

    const tl = createIntroTimeline(elements, () => {
      // Auto complete or stay waiting for user click
    });

    timelineRef.current = tl;
    tl.play();

    // Global keydown listener for instant skip (Escape / Enter / Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      killIntroTimeline(timelineRef.current, elements);
    };
  }, [currentState]);

  if (currentState !== "INTRO") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 bg-[#0a0a0c]/85 backdrop-blur-sm flex flex-col justify-between p-8 md:p-12 font-mono-system text-xs text-[#8a8a8e] select-none"
    >
      {/* Top Header */}
      <div className="flex justify-between items-start">
        <p
          ref={systemLabelRef}
          className="text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase opacity-0"
        >
          {SITE_IDENTITY.systemName}
        </p>
        <button
          ref={skipButtonRef}
          onClick={handleSkip}
          className="opacity-0 text-[10px] tracking-widest text-[#8a8a8e] hover:text-[#00e5ff] transition-colors pointer-events-auto"
        >
          [ SKIP INTRO ]
        </button>
      </div>

      {/* Center Cinematic Display */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto w-full">
        {/* Status Line */}
        <p
          ref={statusLabelRef}
          className="text-[11px] tracking-[0.25em] text-[#00e5ff] opacity-0"
        >
          INITIALIZING CORE TELEMETRY...
        </p>

        {/* Scan Line */}
        <div
          ref={lineRef}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-0 origin-center"
        />

        {/* Name Reveals */}
        <div className="pt-6 space-y-1">
          <h1
            ref={namePrimaryRef}
            className="font-display text-5xl sm:text-7xl md:text-8xl text-[#f0ece4] tracking-tighter opacity-0"
          >
            YATIN
          </h1>
          <h2
            ref={nameSecondaryRef}
            className="font-display text-3xl sm:text-5xl md:text-6xl text-[#8a8a8e] tracking-tight opacity-0"
          >
            KHANDELWAL
          </h2>
        </div>

        <p
          ref={roleRef}
          className="text-xs tracking-[0.25em] text-[#00e5ff] opacity-0 pt-2"
        >
          {SITE_IDENTITY.role}
        </p>

        {/* Enter Trigger */}
        <div className="pt-8">
          <button
            ref={enterButtonRef}
            onClick={handleEnter}
            className="opacity-0 pointer-events-auto px-8 py-3 rounded-full border border-[#00e5ff]/40 bg-[#00e5ff]/10 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#0a0a0c] font-semibold text-xs tracking-[0.2em] transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_#00e5ff]"
          >
            [ ENTER STATION ]
          </button>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="flex justify-between items-end text-[9px] tracking-wider opacity-40">
        <div>ORBITAL OBSERVATION PLATFORM</div>
        <div>PRESS ANY KEY TO SKIP</div>
      </div>
    </div>
  );
}

export default IntroOverlay;
