"use client";

import { usePerformanceStore } from "@/store/usePerformanceStore";

export function useAdaptiveQuality() {
  const qualityTier = usePerformanceStore((state) => state.qualityTier);
  const dpr = usePerformanceStore((state) => state.dpr);
  const shadowsEnabled = usePerformanceStore((state) => state.shadowsEnabled);
  const particleCount = usePerformanceStore((state) => state.particleCount);
  const bloomEnabled = usePerformanceStore((state) => state.bloomEnabled);
  const dofEnabled = usePerformanceStore((state) => state.dofEnabled);
  const noiseEnabled = usePerformanceStore((state) => state.noiseEnabled);
  const chromaticAberrationEnabled = usePerformanceStore(
    (state) => state.chromaticAberrationEnabled
  );

  return {
    qualityTier,
    dpr,
    shadowsEnabled,
    particleCount,
    bloomEnabled,
    dofEnabled,
    noiseEnabled,
    chromaticAberrationEnabled,
  };
}

export default useAdaptiveQuality;
