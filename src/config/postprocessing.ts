import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export const POSTPROCESSING_CONFIG = {
  bloom: {
    intensity: DESIGN_SYSTEM.postprocessing.bloom.intensity,
    luminanceThreshold: DESIGN_SYSTEM.postprocessing.bloom.threshold,
    luminanceSmoothing: 0.3,
    mipmapBlur: true,
  },
  vignette: {
    offset: 0.35,
    darkness: DESIGN_SYSTEM.postprocessing.vignette.darkness,
  },
  noise: {
    opacity: DESIGN_SYSTEM.postprocessing.noise.opacity,
  },
  chromaticAberration: {
    offset: [
      DESIGN_SYSTEM.postprocessing.chromaticAberration.offset,
      DESIGN_SYSTEM.postprocessing.chromaticAberration.offset,
    ] as [number, number],
  },
  depthOfField: {
    focusDistance: 0.02,
    focalLength: 0.5,
    bokehScale: 3.0,
  },
} as const;
