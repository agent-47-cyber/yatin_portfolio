"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useAppStore } from "@/store/useAppStore";
import { CAMERA_CONFIG, CAMERA_WAYPOINTS } from "@/config/camera";
import { Vector3 } from "three";

// Pre-allocated static vectors to ensure Zero Garbage Collection inside useFrame
const vLookAt = new Vector3();

export function CameraController() {
  const { camera } = useThree();
  const currentState = useAppStore((state) => state.currentState);
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);
  const setTransitioning = useAppStore((state) => state.setTransitioning);

  const mousePosition = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });
  const lookAtTarget = useRef(new Vector3(0, 0, 0));

  // Listen to mouse movement for drone parallax
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Drone-like camera waypoint transitions
  useEffect(() => {
    let waypointKey: keyof typeof CAMERA_WAYPOINTS = "MISSION_CONTROL";

    if (currentState === "BOOT" || currentState === "LOADING") {
      waypointKey = "BOOT";
    } else if (currentState === "INTRO") {
      waypointKey = "INTRO";
    } else if (currentState === "ABOUT") {
      waypointKey = "ABOUT";
    } else if (currentState === "PROJECTS") {
      waypointKey = selectedProjectId ? "PROJECT_DETAIL" : "PROJECTS";
    } else if (currentState === "PROJECT_DETAIL") {
      waypointKey = "PROJECT_DETAIL";
    } else if (currentState === "EXPERIENCE") {
      waypointKey = "EXPERIENCE";
    } else if (currentState === "OUTRO") {
      waypointKey = "OUTRO";
    }

    const targetWaypoint = CAMERA_WAYPOINTS[waypointKey] || CAMERA_WAYPOINTS.MISSION_CONTROL;

    setTransitioning(true);

    // Drone flight transition: Acceleration -> Coast -> Micro-Overshoot -> Settle
    const timeline = gsap.timeline({
      onComplete: () => {
        setTransitioning(false);
      },
    });

    timeline.to(camera.position, {
      x: targetWaypoint.position[0],
      y: targetWaypoint.position[1],
      z: targetWaypoint.position[2],
      duration: targetWaypoint.duration,
      ease: "power3.inOut",
    });

    timeline.to(
      lookAtTarget.current,
      {
        x: targetWaypoint.lookAt[0],
        y: targetWaypoint.lookAt[1],
        z: targetWaypoint.lookAt[2],
        duration: targetWaypoint.duration,
        ease: "power3.inOut",
      },
      0
    );

    return () => {
      timeline.kill();
    };
  }, [currentState, selectedProjectId, camera, setTransitioning]);

  // Per-frame idle drone breathing and parallax dampening
  useFrame(({ clock }, delta) => {
    // 1. Inertial Parallax Tracking
    const factor = CAMERA_CONFIG.parallaxStrength;
    currentParallax.current.x +=
      (mousePosition.current.x * factor * 50 - currentParallax.current.x) *
      (0.05 * delta * 60);
    currentParallax.current.y +=
      (mousePosition.current.y * factor * 50 - currentParallax.current.y) *
      (0.05 * delta * 60);

    // 2. Drone Idle Breathing Drift
    const time = clock.getElapsedTime();
    const driftX =
      Math.sin(time * CAMERA_CONFIG.idleDriftSpeed) *
      CAMERA_CONFIG.idleDriftAmplitude.x;
    const driftY =
      Math.cos(time * CAMERA_CONFIG.idleDriftSpeed) *
      CAMERA_CONFIG.idleDriftAmplitude.y;

    // Apply lookAt with zero new vector allocations
    vLookAt.copy(lookAtTarget.current);
    vLookAt.x += currentParallax.current.x + driftX * 0.3;
    vLookAt.y += currentParallax.current.y + driftY * 0.3;

    camera.lookAt(vLookAt);
  });

  return null;
}

export default CameraController;
