import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { ApplicationState, CameraTarget } from "@/types";

export const CAMERA_TARGETS: Record<ApplicationState, CameraTarget> = {
  BOOT: {
    position: [0, 0, 80],
    lookAt: [0, 0, 0],
    duration: DESIGN_SYSTEM.duration.micro,
    easing: DESIGN_SYSTEM.easing.smoothOut,
  },
  LOADING: {
    position: [0, 0, 80],
    lookAt: [0, 0, 0],
    duration: DESIGN_SYSTEM.duration.micro,
    easing: DESIGN_SYSTEM.easing.smoothOut,
  },
  INTRO: {
    position: [0, 6, 38],
    lookAt: [0, 0, 0],
    duration: DESIGN_SYSTEM.duration.epic,
    easing: DESIGN_SYSTEM.easing.cinematicOut,
  },
  MISSION_CONTROL: {
    position: [0, 1.5, 18],
    lookAt: [0, 0, 0],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  ABOUT: {
    position: [-16, 0.6, 4.8],
    lookAt: [-16, 0, -2],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  PROJECTS: {
    position: [0, -12, 4.8],
    lookAt: [0, -12, -2],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  PROJECT_DETAIL: {
    position: [0, -12, 2.0],
    lookAt: [0, -12, -2],
    duration: DESIGN_SYSTEM.duration.long,
    easing: DESIGN_SYSTEM.easing.dramaticOut,
  },
  EXPERIENCE: {
    position: [16, 0.6, 4.8],
    lookAt: [16, 0, -2],
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

export const CAMERA_WAYPOINTS = CAMERA_TARGETS;

export const CAMERA_CONFIG = {
  fov: 45,
  near: 0.1,
  far: 1000,
  idleDriftAmplitude: {
    x: 0.1,
    y: 0.05,
    z: 0.03,
  },
  idleDriftSpeed: 0.3,
  parallaxStrength: 0.0006,
} as const;
