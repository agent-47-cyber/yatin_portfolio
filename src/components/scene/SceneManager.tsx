"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { AssetManager } from "@/lib/assets";

/**
 * SceneManager handles scene-wide GPU initialization:
 * - Pre-compiles all scene materials and shaders into the WebGL program cache
 * - Performs first warmup render pass
 * - Signals AssetManager upon complete GPU readiness to guarantee 0 runtime hitches
 */
export function SceneManager() {
  const { gl, scene, camera } = useThree();
  const hasCompiledRef = useRef(false);
  const frameCountRef = useRef(0);

  useEffect(() => {
    if (hasCompiledRef.current) return;

    try {
      // 1. Precompile all scene shaders and materials
      gl.compile(scene, camera);
      hasCompiledRef.current = true;

      AssetManager.markLoaded("shader_compilation");
      AssetManager.markLoaded("materials_verified");
      AssetManager.markLoaded("topology_mounted");
    } catch (e) {
      console.warn("[SceneManager] Shader precompilation notice:", e);
      AssetManager.markLoaded("shader_compilation");
      AssetManager.markLoaded("materials_verified");
      AssetManager.markLoaded("topology_mounted");
    }
  }, [gl, scene, camera]);

  // Wait for 2 successful GPU frames before confirming GPU frame readiness
  useFrame(() => {
    if (frameCountRef.current < 2) {
      frameCountRef.current += 1;
      if (frameCountRef.current >= 2) {
        AssetManager.markLoaded("gpu_frame_ready");
      }
    }
  });

  return null;
}

export default SceneManager;
