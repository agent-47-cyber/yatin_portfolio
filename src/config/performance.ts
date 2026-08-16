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
    // Canvas backing-store budget. DPR is derived from this rather than a
    // fixed device threshold so 4K and ultrawide displays do not oversubscribe
    // the GPU while regular desktop displays retain high-density rendering.
    maxRenderPixels: {
      high: 4500000,
      medium: 3200000,
      low: 2200000,
    },
  },
  tiers: {
    high: {
      dpr: 1.5,
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
    dof: 50,
    bloom: 45,
    dpr: 40,
    particles: 35,
    shadows: 30,
    minimal: 25,
  },
  recoveryThreshold: 57,
  recoveryWindowFrames: 300,
  degradationSamples: 3,
  recoverySamples: 5,
} as const;

export function getSafeDprCap(
  tier: QualityTier,
  configuredCap: number,
  width: number,
  height: number
) {
  const pixelBudget = PERFORMANCE_CONFIG.budgets.maxRenderPixels[tier];
  const viewportPixels = Math.max(width * height, 1);
  const pixelBoundedCap = Math.sqrt(pixelBudget / viewportPixels);
  return Math.max(1, Math.min(configuredCap, pixelBoundedCap));
}
