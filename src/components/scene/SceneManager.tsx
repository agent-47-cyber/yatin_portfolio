"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { AssetManager } from "@/lib/assets";

/**
 * SceneManager handles scene-wide GPU initialization:
 * - Pre-compiles all scene materials and shaders into the WebGL program cache
 * - Signals AssetManager upon complete compilation
 * - Eliminates runtime shader compilation hitches when first navigating to sectors
 */
export function SceneManager() {
  const { gl, scene, camera } = useThree();
  const hasCompiledRef = useRef(false);

  useEffect(() => {
    if (hasCompiledRef.current) return;

    try {
      // Warm up and precompile all shaders in the scene graph
      gl.compile(scene, camera);
      hasCompiledRef.current = true;
      AssetManager.markLoaded("shader_compilation");
    } catch (e) {
      console.warn("[SceneManager] Shader precompilation notice:", e);
      AssetManager.markLoaded("shader_compilation");
    }
  }, [gl, scene, camera]);

  return null;
}

export default SceneManager;
