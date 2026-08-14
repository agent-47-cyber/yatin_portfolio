import gsap from "gsap";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export function animateArchiveEnter(
  container: HTMLElement,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });
  tl.fromTo(
    container,
    {
      opacity: 0,
      scale: 0.96,
    },
    {
      opacity: 1,
      scale: 1.0,
      duration: DESIGN_SYSTEM.duration.long,
      ease: DESIGN_SYSTEM.easing.dramaticOut,
    }
  );
  return tl;
}

export function animateArchiveExit(
  container: HTMLElement,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });
  tl.to(container, {
    opacity: 0,
    scale: 1.04,
    duration: DESIGN_SYSTEM.duration.short,
    ease: DESIGN_SYSTEM.easing.smoothOut,
  });
  return tl;
}
