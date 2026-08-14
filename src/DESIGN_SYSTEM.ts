/**
 * ORBIT // YATIN — Design System
 * Single Source of Truth for all visual and motion tokens.
 * Both React (DOM/CSS) and Three.js (materials/lights) consume these tokens.
 * NO MAGIC NUMBERS ALLOWED IN COMPONENTS.
 */

export const DESIGN_SYSTEM = {
  colors: {
    obsidian: "#0a0a0c",
    warmWhite: "#f0ece4",
    softSilver: "#8a8a8e",
    electricCyan: "#00e5ff",
    warmOrange: "#ff6b2b",
    glassBg: "hsla(240, 10%, 12%, 0.4)",
    glassBorder: "hsla(0, 0%, 100%, 0.06)",
    gridLine: "hsla(0, 0%, 100%, 0.03)",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "96px",
  },

  radius: {
    sm: "8px",
    md: "16px",
    lg: "24px",
    full: "9999px",
  },

  typography: {
    display: "clamp(4rem, 8vw, 10rem)",
    h1: "clamp(2.5rem, 5vw, 5rem)",
    h2: "clamp(1.5rem, 3vw, 2.5rem)",
    body: "1rem",
    caption: "0.75rem",
    mono: "0.75rem",
  },

  duration: {
    micro: 0.2,
    short: 0.3,
    medium: 0.5,
    long: 0.8,
    cinematic: 2.2,
    epic: 5.0,
  },

  easing: {
    smoothOut: "power2.out",
    dramaticOut: "power3.out",
    cinematicOut: "expo.out",
    smoothInOut: "power2.inOut",
    dramaticInOut: "power3.inOut",
  },

  opacity: {
    hidden: 0,
    subtle: 0.1,
    muted: 0.4,
    secondary: 0.6,
    primary: 0.85,
    full: 1,
  },

  cursor: {
    defaultSize: 6,
    hoverSize: 24,
    lerpFactor: 0.15,
  },

  glass: {
    blur: "20px",
    opacity: 0.4,
    borderOpacity: 0.06,
  },

  glow: {
    intensity: 0.8,
    radius: "40px",
    color: "#00e5ff",
  },

  shadow: {
    sm: "0 2px 8px rgba(0,0,0,0.3)",
    md: "0 4px 16px rgba(0,0,0,0.4)",
    lg: "0 8px 32px rgba(0,0,0,0.5)",
  },

  lighting: {
    ambient: {
      intensity: 0.4,
      color: "#ffffff",
    },
    directional: {
      intensity: 1.2,
      position: [5, 5, 5] as const,
      color: "#ffffff",
    },
    point: {
      intensity: 2.0,
      position: [-5, -3, 2] as const,
      color: "#00e5ff",
    },
  },

  particles: {
    count: {
      high: 2000,
      medium: 1000,
      low: 500,
    },
    size: 0.02,
    speed: 0.001,
  },

  materials: {
    glass: {
      transmission: 0.9,
      roughness: 0.15,
      thickness: 1.5,
      clearcoat: 1.0,
      metalness: 0.1,
    },
    stationHull: {
      roughness: 0.4,
      metalness: 0.85,
    },
  },

  postprocessing: {
    bloom: {
      intensity: 0.5,
      threshold: 0.8,
    },
    vignette: {
      darkness: 0.4,
    },
    noise: {
      opacity: 0.03,
    },
    chromaticAberration: {
      offset: 0.0005,
    },
  },
} as const;

export type DesignSystem = typeof DESIGN_SYSTEM;
export default DESIGN_SYSTEM;
