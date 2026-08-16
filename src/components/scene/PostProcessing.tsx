"use client";

import {
  EffectComposer,
  Bloom,
  Noise,
} from "@react-three/postprocessing";
import { POSTPROCESSING_CONFIG } from "@/config/postprocessing";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

export function PostProcessing() {
  const { qualityTier, bloomEnabled, noiseEnabled } = useAdaptiveQuality();

  if (qualityTier === "low") {
    return null;
  }

  const { bloom, noise } = POSTPROCESSING_CONFIG;

  return (
    <EffectComposer multisampling={qualityTier === "high" ? 2 : 0} enableNormalPass={false}>
      {/* 1. Permanent, Stable Bloom (Restricted strictly to emissive objects) */}
      {bloomEnabled && (
        <Bloom
          intensity={bloom.intensity}
          luminanceThreshold={bloom.luminanceThreshold}
          luminanceSmoothing={bloom.luminanceSmoothing}
          mipmapBlur={bloom.mipmapBlur}
        />
      )}

      {/* 2. Permanent Subtle Film Grain Noise (Zero Vignette Dimming) */}
      {noiseEnabled && <Noise opacity={noise.opacity} />}
    </EffectComposer>
  );
}

export default PostProcessing;
