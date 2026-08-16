/**
 * ORBIT // Viewport & Responsive Preset Configuration
 * Single source of truth for responsive cinematic art direction across all display sizes.
 */

export type ViewportPreset =
  | "smallLaptop"
  | "laptop"
  | "desktop"
  | "display2k"
  | "display4k"
  | "ultrawide";

export interface ViewportProfile {
  preset: ViewportPreset;
  fov: number;
  heroScale: number;
  cameraDistanceMultiplier: number;
  yOffset: number;
  transitionDurationMultiplier: number;
  lightRadiusMultiplier: number;
  hudPadding: string;
}

export const VIEWPORT_PROFILES: Record<ViewportPreset, ViewportProfile> = {
  smallLaptop: {
    preset: "smallLaptop",
    fov: 38,
    heroScale: 0.95,
    cameraDistanceMultiplier: 0.92,
    yOffset: 0.0,
    transitionDurationMultiplier: 0.85,
    lightRadiusMultiplier: 0.9,
    hudPadding: "p-4 sm:p-6",
  },
  laptop: {
    preset: "laptop",
    fov: 44,
    heroScale: 1.0,
    cameraDistanceMultiplier: 1.0,
    yOffset: 0.0,
    transitionDurationMultiplier: 1.0,
    lightRadiusMultiplier: 1.0,
    hudPadding: "p-6 sm:p-8 md:p-10",
  },
  desktop: {
    preset: "desktop",
    fov: 46,
    heroScale: 1.05,
    cameraDistanceMultiplier: 1.04,
    yOffset: 0.0,
    transitionDurationMultiplier: 1.05,
    lightRadiusMultiplier: 1.08,
    hudPadding: "p-8 sm:p-10 md:p-12",
  },
  display2k: {
    preset: "display2k",
    fov: 48,
    heroScale: 1.12,
    cameraDistanceMultiplier: 1.1,
    yOffset: 0.1,
    transitionDurationMultiplier: 1.12,
    lightRadiusMultiplier: 1.15,
    hudPadding: "p-10 sm:p-12 md:p-14",
  },
  display4k: {
    preset: "display4k",
    fov: 50,
    heroScale: 1.2,
    cameraDistanceMultiplier: 1.16,
    yOffset: 0.2,
    transitionDurationMultiplier: 1.2,
    lightRadiusMultiplier: 1.25,
    hudPadding: "p-12 sm:p-16 md:p-20",
  },
  ultrawide: {
    preset: "ultrawide",
    fov: 42, // Narrower vertical FOV to expand horizontal aspect architecture
    heroScale: 1.08,
    cameraDistanceMultiplier: 1.05,
    yOffset: 0.0,
    transitionDurationMultiplier: 1.1,
    lightRadiusMultiplier: 1.2,
    hudPadding: "px-16 py-10",
  },
};

/** Determine active preset from window width and aspect ratio */
export function getViewportPreset(width: number, height: number): ViewportPreset {
  const aspectRatio = width / Math.max(height, 1);

  if (aspectRatio >= 2.1) {
    return "ultrawide";
  }
  if (width >= 2560) {
    return "display4k";
  }
  if (width >= 1920) {
    return "display2k";
  }
  if (width >= 1600) {
    return "desktop";
  }
  if (width >= 1360) {
    return "laptop";
  }
  return "smallLaptop";
}
