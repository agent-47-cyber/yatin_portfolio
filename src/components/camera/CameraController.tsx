"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useAppStore } from "@/store/useAppStore";
import { CAMERA_CONFIG, CAMERA_WAYPOINTS } from "@/config/camera";
import { Vector3 } from "three";

// Pre-allocated static vectors to eliminate GC overhead inside useFrame
const vLookAt = new Vector3();

export function CameraController() {
  const { camera } = useThree();
  const currentState = useAppStore((state) => state.currentState);
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);
  const setTransitioning = useAppStore((state) => state.setTransitioning);

  const mousePosition = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });
  const lookAtTarget = useRef(new Vector3(0, 0, 0));

  // Passive mouse coordinate tracking
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

    const targetWaypoint =
      CAMERA_WAYPOINTS[waypointKey] || CAMERA_WAYPOINTS.MISSION_CONTROL;

    setTransitioning(true);

    // Physical flight curve: Accelerate -> Coast -> Micro-Overshoot -> Settle
    const timeline = gsap.timeline({
      autoRemoveChildren: true,
      onComplete: () => {
        setTransitioning(false);
      },
    });

    timeline.to(
      camera.position,
      {
        x: targetWaypoint.position[0],
        y: targetWaypoint.position[1],
        z: targetWaypoint.position[2],
        duration: targetWaypoint.duration,
        ease: "power3.inOut",
        overwrite: "auto",
      },
      0
    );

    timeline.to(
      lookAtTarget.current,
      {
        x: targetWaypoint.lookAt[0],
        y: targetWaypoint.lookAt[1],
        z: targetWaypoint.lookAt[2],
        duration: targetWaypoint.duration,
        ease: "power3.inOut",
        overwrite: "auto",
      },
      0
    );

    return () => {
      timeline.kill();
    };
  }, [currentState, selectedProjectId, camera, setTransitioning]);

  // Continuous per-frame drone breathing, roll, and inertial parallax (Zero allocations)
  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();

    // 1. Inertial Parallax Tracking with dampening
    const factor = CAMERA_CONFIG.parallaxStrength;
    currentParallax.current.x +=
      (mousePosition.current.x * factor * 60 - currentParallax.current.x) *
      (0.04 * delta * 60);
    currentParallax.current.y +=
      (mousePosition.current.y * factor * 60 - currentParallax.current.y) *
      (0.04 * delta * 60);

    // 2. Drone Multi-Axis Idle Sway & Breathing (Never completely frozen)
    const driftSpeed = CAMERA_CONFIG.idleDriftSpeed;
    const driftX =
      Math.sin(time * driftSpeed) * CAMERA_CONFIG.idleDriftAmplitude.x;
    const driftY =
      Math.cos(time * driftSpeed * 0.7) * CAMERA_CONFIG.idleDriftAmplitude.y;
    const driftZ =
      Math.sin(time * driftSpeed * 0.5) * CAMERA_CONFIG.idleDriftAmplitude.z;

    // Apply subtle drone roll on z-axis
    const droneRoll =
      Math.sin(time * 0.25) * 0.005 + currentParallax.current.x * -0.015;
    camera.rotation.z = droneRoll;

    // 3. Apply target lookAt with continuous inertial sway
    vLookAt.copy(lookAtTarget.current);
    vLookAt.x += currentParallax.current.x + driftX * 0.5;
    vLookAt.y += currentParallax.current.y + driftY * 0.5;
    vLookAt.z += driftZ * 0.5;

    camera.lookAt(vLookAt);
  });

  return null;
}

export default CameraController;
