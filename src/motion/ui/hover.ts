import gsap from "gsap";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import type { Object3D } from "three";

export function animateObjectHoverEnter(
  object: Object3D,
  baseScale = 1.0
): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.to(
    object.scale,
    {
      x: baseScale * 1.08,
      y: baseScale * 1.08,
      z: baseScale * 1.08,
      duration: DESIGN_SYSTEM.duration.short,
      ease: DESIGN_SYSTEM.easing.smoothOut,
    },
    0
  );
  return tl;
}

export function animateObjectHoverLeave(
  object: Object3D,
  baseScale = 1.0
): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.to(
    object.scale,
    {
      x: baseScale,
      y: baseScale,
      z: baseScale,
      duration: DESIGN_SYSTEM.duration.short,
      ease: DESIGN_SYSTEM.easing.smoothOut,
    },
    0
  );
  return tl;
}
