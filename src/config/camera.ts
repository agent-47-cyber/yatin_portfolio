import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { ApplicationState, CameraTarget } from "@/types";
import type { ViewportProfile } from "./viewport";

export const BASE_CAMERA_TARGETS: Record<ApplicationState, CameraTarget> = {
  BOOT: {
    position: [-15.2, 0.3, 4.5],
    lookAt: [-14.0, 0.1, -0.6],
    duration: DESIGN_SYSTEM.duration.micro,
    easing: DESIGN_SYSTEM.easing.smoothOut,
  },
  LOADING: {
    position: [-15.2, 0.3, 4.5],
    lookAt: [-14.0, 0.1, -0.6],
    duration: DESIGN_SYSTEM.duration.micro,
    easing: DESIGN_SYSTEM.easing.smoothOut,
  },
  INTRO: {
    position: [-4.5, 1.2, 11.5],
    lookAt: [0, 0, 0],
    duration: 3.2,
    easing: DESIGN_SYSTEM.easing.cinematicOut,
  },
  MISSION_CONTROL: {
    position: [0, 1.5, 18],
    lookAt: [0, 0, 0],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  ABOUT: {
    position: [-16.8, 0.4, 5.0],
    lookAt: [-14.5, 0.1, -0.5],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  PROJECTS: {
    position: [-2.8, -11.6, 5.2],
    lookAt: [1.0, -11.8, -0.8],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  PROJECT_DETAIL: {
    position: [-2.8, -11.6, 5.2],
    lookAt: [1.0, -11.8, -0.8],
    duration: DESIGN_SYSTEM.duration.long,
    easing: DESIGN_SYSTEM.easing.dramaticOut,
  },
  EXPERIENCE: {
    position: [14.5, 0.4, 6.2],
    lookAt: [14.5, 0.1, -0.8],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  OUTRO: {
    position: [0, 14, 45],
    lookAt: [0, 0, 0],
    duration: 4.0,
    easing: DESIGN_SYSTEM.easing.smoothInOut,
  },
};

export const CAMERA_TARGETS = BASE_CAMERA_TARGETS;
export const CAMERA_WAYPOINTS = BASE_CAMERA_TARGETS;

/** Compute responsive camera target dynamically adjusting for viewport profile */
export function getResponsiveCameraTarget(
  state: ApplicationState,
  profile: ViewportProfile
): CameraTarget {
  const base = BASE_CAMERA_TARGETS[state] || BASE_CAMERA_TARGETS.MISSION_CONTROL;
  const distMult = profile.cameraDistanceMultiplier;
  const durMult = profile.transitionDurationMultiplier;

  return {
    position: [
      base.position[0],
      base.position[1] + profile.yOffset,
      base.position[2] * distMult,
    ],
    lookAt: [base.lookAt[0], base.lookAt[1], base.lookAt[2]],
    duration: base.duration * durMult,
    easing: base.easing,
  };
}

export const CAMERA_CONFIG = {
  fov: 44,
  near: 0.35,
  far: 280,
  positionSpringTime: 0.82,
  lookAtSpringTime: 0.62,
  parallaxSpringTime: 0.4,
  idleDriftAmplitude: {
    x: 0.12,
    y: 0.08,
    z: 0.04,
  },
  idleDriftSpeed: 0.35,
  parallaxStrength: 0.11,
} as const;
