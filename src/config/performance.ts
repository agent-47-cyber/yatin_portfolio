import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { QualityTier } from "@/types";

export const PERFORMANCE_CONFIG = {
  targetFps: {
    desktop: 60,
    mobile: 50,
  },
  budgets: {
    maxInitialJsKb: 200,
    maxDrawCalls: 40,
    maxTriangles: 500000,
    maxMaterials: 20,
    maxShadowMaps: 2,
    maxHdrMaps: 1,
    maxLights: 5,
    maxPostprocessingPasses: 5,
  },
  tiers: {
    high: {
      dpr: 1.8,
      shadowsEnabled: true,
      particleCount: DESIGN_SYSTEM.particles.count.high,
      bloomEnabled: true,
      dofEnabled: true,
      noiseEnabled: true,
      chromaticAberrationEnabled: true,
    },
    medium: {
      dpr: 1.25,
      shadowsEnabled: false,
      particleCount: DESIGN_SYSTEM.particles.count.medium,
      bloomEnabled: true,
      dofEnabled: false,
      noiseEnabled: false,
      chromaticAberrationEnabled: false,
    },
    low: {
      dpr: 1.0,
      shadowsEnabled: false,
      particleCount: DESIGN_SYSTEM.particles.count.low,
      bloomEnabled: false,
      dofEnabled: false,
      noiseEnabled: false,
      chromaticAberrationEnabled: false,
    },
  } as Record<
    QualityTier,
    {
      dpr: number;
      shadowsEnabled: boolean;
      particleCount: number;
      bloomEnabled: boolean;
      dofEnabled: boolean;
      noiseEnabled: boolean;
      chromaticAberrationEnabled: boolean;
    }
  >,
  degradationThresholds: {
    dof: 55,
    bloom: 50,
    dpr: 48,
    particles: 45,
    shadows: 40,
    minimal: 35,
  },
  recoveryThreshold: 58,
  recoveryWindowFrames: 300,
} as const;
