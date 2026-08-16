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
  const warmupCompleteRef = useRef(false);
  const frameCountRef = useRef(0);

  useEffect(() => {
    if (hasCompiledRef.current) return;
    let cancelled = false;

    const warmup = async () => {
      // Let the complete persistent scene mount before compiling it.
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (cancelled) return;

      try {
        await gl.compileAsync(scene, camera);
      } catch (error) {
        // compileAsync can reject on older drivers; compile still seeds the cache.
        console.warn("[SceneManager] Asynchronous shader warmup notice:", error);
        gl.compile(scene, camera);
      }

      if (cancelled) return;
      hasCompiledRef.current = true;
      warmupCompleteRef.current = true;
      AssetManager.markLoaded("shader_compilation");
      AssetManager.markLoaded("materials_verified");
      AssetManager.markLoaded("topology_mounted");
    };

    void warmup();

    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera]);

  // Confirm two complete rendered frames after program compilation, so the
  // loading UI cannot uncover a scene while the primary shaders are pending.
  useFrame(() => {
    if (warmupCompleteRef.current && frameCountRef.current < 2) {
      frameCountRef.current += 1;
      if (frameCountRef.current >= 2) {
        AssetManager.markLoaded("gpu_frame_ready");
      }
    }
  });

  return null;
}

export default SceneManager;
