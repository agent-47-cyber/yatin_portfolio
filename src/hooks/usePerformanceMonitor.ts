"use client";

import { useEffect, useRef } from "react";
import { usePerformanceStore } from "@/store/usePerformanceStore";

export function usePerformanceMonitor() {
  const reportFps = usePerformanceStore((state) => state.reportFps);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const measureFps = () => {
      frameCountRef.current++;
      const now = performance.now();
      const delta = now - lastTimeRef.current;

      // Calculate every 1000ms over rolling frame count
      if (delta >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / delta);
        reportFps(fps);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationFrameIdRef.current = requestAnimationFrame(measureFps);
    };

    animationFrameIdRef.current = requestAnimationFrame(measureFps);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [reportFps]);
}

export default usePerformanceMonitor;
