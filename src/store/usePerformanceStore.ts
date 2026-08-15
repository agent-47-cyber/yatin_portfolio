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

    if (fps < degradationThresholds.minimal) {
      get().setQualityTier("low");
    } else if (fps < degradationThresholds.dpr) {
      get().setQualityTier("medium");
    } else if (fps >= recoveryThreshold && get().qualityTier !== "high") {
      get().setQualityTier("high");
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
