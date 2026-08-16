"use client";

import { useState, useEffect } from "react";
import {
  getViewportPreset,
  VIEWPORT_PROFILES,
  type ViewportPreset,
  type ViewportProfile,
} from "@/config/viewport";

interface ResponsiveViewportState {
  preset: ViewportPreset;
  profile: ViewportProfile;
  width: number;
  height: number;
  aspectRatio: number;
  isUltrawide: boolean;
  isSmallLaptop: boolean;
}

const defaultProfile = VIEWPORT_PROFILES.laptop;

export function useResponsiveViewport(): ResponsiveViewportState {
  const [state, setState] = useState<ResponsiveViewportState>({
    preset: "laptop",
    profile: defaultProfile,
    width: 1440,
    height: 900,
    aspectRatio: 1.6,
    isUltrawide: false,
    isSmallLaptop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const preset = getViewportPreset(w, h);
      const profile = VIEWPORT_PROFILES[preset];
      const aspectRatio = w / Math.max(h, 1);

      setState({
        preset,
        profile,
        width: w,
        height: h,
        aspectRatio,
        isUltrawide: preset === "ultrawide",
        isSmallLaptop: preset === "smallLaptop",
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return state;
}

export default useResponsiveViewport;
