import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export const THEME_CONFIG = {
  colors: DESIGN_SYSTEM.colors,
  lighting: DESIGN_SYSTEM.lighting,
  materials: DESIGN_SYSTEM.materials,
  particles: DESIGN_SYSTEM.particles,
  fog: {
    color: DESIGN_SYSTEM.colors.obsidian,
    near: 15,
    far: 90,
  },
  glass: DESIGN_SYSTEM.glass,
  glow: DESIGN_SYSTEM.glow,
} as const;

export default THEME_CONFIG;
