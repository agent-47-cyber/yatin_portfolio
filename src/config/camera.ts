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
    position: [0, 8, 45],
    lookAt: [0, 0, 0],
    duration: DESIGN_SYSTEM.duration.epic,
    easing: DESIGN_SYSTEM.easing.cinematicOut,
  },
  MISSION_CONTROL: {
    position: [0, 1.8, 14],
    lookAt: [0, 0, 0],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  ABOUT: {
    position: [-8.5, 1.2, 5.5],
    lookAt: [-8.5, 0, 0],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  PROJECTS: {
    position: [0, 0.5, 7.5],
    lookAt: [0, 0, 0],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  PROJECT_DETAIL: {
    position: [0, 0, 3.8],
    lookAt: [0, 0, 0],
    duration: DESIGN_SYSTEM.duration.long,
    easing: DESIGN_SYSTEM.easing.dramaticOut,
  },
  EXPERIENCE: {
    position: [9.5, 2.8, 7.0],
    lookAt: [8.5, 0, 0],
    duration: DESIGN_SYSTEM.duration.cinematic,
    easing: DESIGN_SYSTEM.easing.dramaticInOut,
  },
  OUTRO: {
    position: [0, 14, 50],
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
    x: 0.15,
    y: 0.08,
    z: 0.05,
  },
  idleDriftSpeed: 0.4,
  parallaxStrength: 0.0008,
} as const;
