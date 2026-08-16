import { create } from "zustand";
import { PERFORMANCE_CONFIG } from "@/config/performance";
import type { QualityTier } from "@/types";

interface PerformanceStoreState {
  fps: number;
  qualityTier: QualityTier;
  dpr: number;
  shadowsEnabled: boolean;
  particleCount: number;
  bloomEnabled: boolean;
  dofEnabled: boolean;
  noiseEnabled: boolean;
  chromaticAberrationEnabled: boolean;

  // Actions
  reportFps: (fps: number) => void;
  setQualityTier: (tier: QualityTier) => void;
  applyDegradationStep: () => void;
  applyRecoveryStep: () => void;
}

const initialTier = PERFORMANCE_CONFIG.tiers.high;
let lowFpsSamples = 0;
let recoverySamples = 0;

export const usePerformanceStore = create<PerformanceStoreState>((set, get) => ({
  fps: 60,
  qualityTier: "high",
  dpr: initialTier.dpr,
  shadowsEnabled: initialTier.shadowsEnabled,
  particleCount: initialTier.particleCount,
  bloomEnabled: initialTier.bloomEnabled,
  dofEnabled: initialTier.dofEnabled,
  noiseEnabled: initialTier.noiseEnabled,
  chromaticAberrationEnabled: initialTier.chromaticAberrationEnabled,

  reportFps: (fps: number) => {
    const currentFps = get().fps;
    // Only update state if change is >= 2 FPS to reduce unnecessary subscriber re-renders
    if (Math.abs(fps - currentFps) >= 2) {
      set({ fps });
    }

    const { degradationThresholds, recoveryThreshold } = PERFORMANCE_CONFIG;

    if (fps < degradationThresholds.dpr) {
      lowFpsSamples += 1;
      recoverySamples = 0;
      if (lowFpsSamples >= PERFORMANCE_CONFIG.degradationSamples) {
        get().setQualityTier(
          fps < degradationThresholds.minimal ? "low" : "medium"
        );
        lowFpsSamples = 0;
      }
    } else if (fps >= recoveryThreshold) {
      recoverySamples += 1;
      lowFpsSamples = 0;
      if (recoverySamples >= PERFORMANCE_CONFIG.recoverySamples) {
        get().setQualityTier("high");
        recoverySamples = 0;
      }
    } else {
      lowFpsSamples = 0;
      recoverySamples = 0;
    }
  },

  setQualityTier: (tier: QualityTier) => {
    if (get().qualityTier === tier) return;
    const config = PERFORMANCE_CONFIG.tiers[tier];
    set({
      qualityTier: tier,
      dpr: config.dpr,
      shadowsEnabled: config.shadowsEnabled,
      particleCount: config.particleCount,
      bloomEnabled: config.bloomEnabled,
      dofEnabled: config.dofEnabled,
      noiseEnabled: config.noiseEnabled,
      chromaticAberrationEnabled: config.chromaticAberrationEnabled,
    });
  },

  applyDegradationStep: () => {
    const current = get().qualityTier;
    if (current === "high") {
      get().setQualityTier("medium");
    } else if (current === "medium") {
      get().setQualityTier("low");
    }
  },

  applyRecoveryStep: () => {
    const current = get().qualityTier;
    if (current === "low") {
      get().setQualityTier("medium");
    } else if (current === "medium") {
      get().setQualityTier("high");
    }
  },
}));
