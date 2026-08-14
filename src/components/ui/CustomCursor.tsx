"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { updateCursorMotion, type CursorPosition } from "@/motion/ui/cursor";

export function CustomCursor() {
  const currentState = useAppStore((state) => state.currentState);
  const activeHoverId = useAppStore((state) => state.activeHoverId);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotPosRef = useRef<CursorPosition>({
    currentX: -100,
    currentY: -100,
    targetX: -100,
    targetY: -100,
  });

  const ringPosRef = useRef<CursorPosition>({
    currentX: -100,
    currentY: -100,
    targetX: -100,
    targetY: -100,
  });

  // Detect touch devices
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  // Passive mouse move tracking
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      dotPosRef.current.targetX = e.clientX;
      dotPosRef.current.targetY = e.clientY;
      ringPosRef.current.targetX = e.clientX;
      ringPosRef.current.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice]);

  // Physical spring RAF render loop (Zero React state updates)
  useEffect(() => {
    if (isTouchDevice) return;

    let animId: number;
    let lastTime = performance.now();

    const renderLoop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Fast precision tracking for center dot, smooth inertia for ambient ring
      updateCursorMotion(dotPosRef.current, delta * 3.5);
      updateCursorMotion(ringPosRef.current, delta * 1.5);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPosRef.current.currentX}px, ${dotPosRef.current.currentY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.currentX}px, ${ringPosRef.current.currentY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [isTouchDevice]);

  // Disabled during Boot, Loading, and Intro
  if (
    isTouchDevice ||
    currentState === "BOOT" ||
    currentState === "LOADING" ||
    currentState === "INTRO"
  ) {
    return null;
  }

  const isHovering = Boolean(activeHoverId);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#00e5ff] rounded-full will-change-transform shadow-[0_0_8px_#00e5ff]"
      />

      {/* Physical Spring Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border will-change-transform transition-all duration-300 ${
          isHovering
            ? "w-11 h-11 bg-[#00e5ff]/10 scale-120 border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            : "w-6 h-6 scale-100 border-[#00e5ff]/40"
        }`}
      />
    </div>
  );
}

export default CustomCursor;
