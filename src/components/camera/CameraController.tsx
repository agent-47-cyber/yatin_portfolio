"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import { CAMERA_TARGETS } from "@/config/camera";
import { transitionCameraToState } from "@/motion/camera/transitions";
import { applyCameraIdleDrift } from "@/motion/camera/idle";
import { applyCameraParallax } from "@/motion/camera/parallax";
import { Vector3 } from "three";

// Reusable vector outside component render loop to guarantee zero frame allocations
const vLookAt = new Vector3();

export function CameraController() {
  const { camera } = useThree();
  const currentState = useAppStore((state) => state.currentState);
  const setTransitioning = useAppStore((state) => state.setTransitioning);

  const mousePositionRef = useRef({ x: 0, y: 0 });
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Mouse move listener for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePositionRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle section & state transitions via GSAP
  useEffect(() => {
    const target = CAMERA_TARGETS[currentState];
    if (!target) return;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    setTransitioning(true);

    activeTimelineRef.current = transitionCameraToState(
      camera,
      currentState,
      () => {
        setTransitioning(false);
      }
    );

    return () => {
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }
    };
  }, [currentState, camera, setTransitioning]);

  // Per-frame idle drift and parallax (Zero allocations, direct mutation)
  useFrame(({ clock }) => {
    const target = CAMERA_TARGETS[currentState];
    if (!target) return;

    const elapsed = clock.getElapsedTime();
    applyCameraIdleDrift(camera, target.position, elapsed);
    applyCameraParallax(
      camera,
      target.position,
      mousePositionRef.current.x,
      mousePositionRef.current.y
    );

    vLookAt.set(...target.lookAt);
    camera.lookAt(vLookAt);
  });

  return null;
}

export default CameraController;
