import gsap from "gsap";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export function animateOrbitalHistoryEnter(
  container: HTMLElement,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });
  tl.fromTo(
    container,
    {
      opacity: 0,
      x: 30,
    },
    {
      opacity: 1,
      x: 0,
      duration: DESIGN_SYSTEM.duration.long,
      ease: DESIGN_SYSTEM.easing.dramaticOut,
    }
  );
  return tl;
}

export function animateOrbitalHistoryExit(
  container: HTMLElement,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });
  tl.to(container, {
    opacity: 0,
    x: -30,
    duration: DESIGN_SYSTEM.duration.short,
    ease: DESIGN_SYSTEM.easing.smoothOut,
  });
  return tl;
}
