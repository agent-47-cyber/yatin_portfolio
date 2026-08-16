"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import { useAppStore } from "@/store/useAppStore";
import { getResponsiveCameraTarget, CAMERA_CONFIG } from "@/config/camera";
import { useResponsiveViewport } from "@/hooks/useResponsiveViewport";
import type { ApplicationState, CameraTarget } from "@/types";

const lookAtWithIdle = new Vector3();
const centerState: ApplicationState = "MISSION_CONTROL";

function isInspectionState(state: ApplicationState) {
  return state === "ABOUT" || state === "PROJECTS" || state === "PROJECT_DETAIL" || state === "EXPERIENCE";
}

/**
 * Critically damped spring integration. This is stable across frame rates and
 * avoids a direct cursor-to-camera mapping or competing timeline writes.
 */
function dampVector(
  value: Vector3,
  velocity: Vector3,
  target: Vector3,
  smoothTime: number,
  delta: number,
  change: Vector3,
  temp: Vector3
) {
  const safeDelta = Math.min(delta, 1 / 20);
  const omega = 2 / smoothTime;
  const x = omega * safeDelta;
  const exponential = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

  change.copy(value).sub(target);
  temp.copy(velocity).addScaledVector(change, omega).multiplyScalar(safeDelta);
  velocity.addScaledVector(temp, -omega).multiplyScalar(exponential);
  value.copy(target).add(change.add(temp).multiplyScalar(exponential));
}

export function CameraController() {
  const { camera } = useThree();
  const { profile } = useResponsiveViewport();
  const currentState = useAppStore((state) => state.currentState);
  const previousState = useAppStore((state) => state.previousState);
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);
  const setTransitioning = useAppStore((state) => state.setTransitioning);

  const mousePosition = useRef(new Vector3());
  const parallax = useRef(new Vector3());
  const parallaxVelocity = useRef(new Vector3());
  const parallaxTarget = useRef(new Vector3());
  const positionVelocity = useRef(new Vector3());
  const lookAtVelocity = useRef(new Vector3());
  const cameraTarget = useRef(new Vector3(0, 1.5, 18));
  const lookAtTarget = useRef(new Vector3());
  const currentLookAt = useRef(new Vector3());
  const route = useRef<CameraTarget[]>([]);
  const change = useRef(new Vector3());
  const temp = useRef(new Vector3());

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0
      );
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      camera.fov = profile.fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, profile.fov]);

  useEffect(() => {
    const effectiveState = currentState === "PROJECTS" && selectedProjectId
      ? "PROJECT_DETAIL"
      : currentState;
    const previousEffectiveState = previousState === "PROJECTS" && selectedProjectId
      ? "PROJECT_DETAIL"
      : previousState;
    const destination = getResponsiveCameraTarget(effectiveState, profile);
    const requiresCenterWaypoint =
      previousEffectiveState !== null &&
      isInspectionState(previousEffectiveState) &&
      isInspectionState(effectiveState) &&
      previousEffectiveState !== effectiveState;

    route.current = requiresCenterWaypoint
      ? [getResponsiveCameraTarget(centerState, profile), destination]
      : [destination];

    const firstWaypoint = route.current[0];
    cameraTarget.current.fromArray(firstWaypoint.position);
    lookAtTarget.current.fromArray(firstWaypoint.lookAt);
    setTransitioning(true);
  }, [camera, currentState, previousState, profile, selectedProjectId, setTransitioning]);

  useFrame(({ clock }, delta) => {
    dampVector(
      camera.position,
      positionVelocity.current,
      cameraTarget.current,
      CAMERA_CONFIG.positionSpringTime,
      delta,
      change.current,
      temp.current
    );
    dampVector(
      currentLookAt.current,
      lookAtVelocity.current,
      lookAtTarget.current,
      CAMERA_CONFIG.lookAtSpringTime,
      delta,
      change.current,
      temp.current
    );

    parallaxTarget.current.set(
      mousePosition.current.x * CAMERA_CONFIG.parallaxStrength,
      mousePosition.current.y * CAMERA_CONFIG.parallaxStrength * 0.7,
      0
    );
    dampVector(
      parallax.current,
      parallaxVelocity.current,
      parallaxTarget.current,
      CAMERA_CONFIG.parallaxSpringTime,
      delta,
      change.current,
      temp.current
    );

    const elapsed = clock.getElapsedTime();
    const drift = CAMERA_CONFIG.idleDriftAmplitude;
    lookAtWithIdle.copy(currentLookAt.current).add(parallax.current);
    lookAtWithIdle.x += Math.sin(elapsed * CAMERA_CONFIG.idleDriftSpeed) * drift.x * 0.5;
    lookAtWithIdle.y += Math.cos(elapsed * CAMERA_CONFIG.idleDriftSpeed * 0.8) * drift.y * 0.5;
    lookAtWithIdle.z += Math.sin(elapsed * CAMERA_CONFIG.idleDriftSpeed * 0.5) * drift.z * 0.5;
    camera.lookAt(lookAtWithIdle);

    if (
      camera.position.distanceToSquared(cameraTarget.current) < 0.0009 &&
      lookAtVelocity.current.lengthSq() < 0.0004 &&
      positionVelocity.current.lengthSq() < 0.0004
    ) {
      const nextWaypoint = route.current.shift();
      if (nextWaypoint && route.current.length > 0) {
        const waypoint = route.current[0];
        cameraTarget.current.fromArray(waypoint.position);
        lookAtTarget.current.fromArray(waypoint.lookAt);
      } else if (nextWaypoint) {
        setTransitioning(false);
      }
    }
  });

  return null;
}

export default CameraController;
