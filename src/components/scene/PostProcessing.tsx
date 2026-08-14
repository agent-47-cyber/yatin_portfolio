"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { POSTPROCESSING_CONFIG } from "@/config/postprocessing";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { useAppStore } from "@/store/useAppStore";
import { Vector2 } from "three";

// Static offset vector to prevent render allocations
const caOffset = new Vector2(
  POSTPROCESSING_CONFIG.chromaticAberration.offset[0],
  POSTPROCESSING_CONFIG.chromaticAberration.offset[1]
);

export function PostProcessing() {
  const {
    qualityTier,
    bloomEnabled,
    dofEnabled,
    noiseEnabled,
    chromaticAberrationEnabled,
  } = useAdaptiveQuality();
  const isTransitioning = useAppStore((state) => state.isTransitioning);

  // If low tier or minimal mode, skip heavy composer entirely
  if (qualityTier === "low") {
    return null;
  }

  const { bloom, vignette, noise, depthOfField } = POSTPROCESSING_CONFIG;

  return (
    <EffectComposer multisampling={qualityTier === "high" ? 2 : 0} enableNormalPass={false}>
      {/* Bloom - Restricted strictly to emissive objects */}
      {bloomEnabled && (
        <Bloom
          intensity={bloom.intensity}
          luminanceThreshold={bloom.luminanceThreshold}
          luminanceSmoothing={bloom.luminanceSmoothing}
          mipmapBlur={bloom.mipmapBlur}
        />
      )}

      {/* Depth of Field - Enabled ONLY during active camera transition on high tier */}
      {dofEnabled && isTransitioning && (
        <DepthOfField
          focusDistance={depthOfField.focusDistance}
          focalLength={depthOfField.focalLength}
          bokehScale={depthOfField.bokehScale}
        />
      )}

      {/* Chromatic Aberration - Camera movement effect on high tier */}
      {chromaticAberrationEnabled && isTransitioning && (
        <ChromaticAberration offset={caOffset} />
      )}

      {/* Subtle Film Grain Noise */}
      {noiseEnabled && <Noise opacity={noise.opacity} />}

      {/* Lightweight Edge Vignette */}
      <Vignette offset={vignette.offset} darkness={vignette.darkness} />
    </EffectComposer>
  );
}

export default PostProcessing;
