import gsap from "gsap";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export function animateObservatoryEnter(
  container: HTMLElement,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });
  tl.fromTo(
    container,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: DESIGN_SYSTEM.duration.long,
      ease: DESIGN_SYSTEM.easing.dramaticOut,
    }
  );
  return tl;
}

export function animateObservatoryExit(
  container: HTMLElement,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });
  tl.to(container, {
    opacity: 0,
    y: -20,
    duration: DESIGN_SYSTEM.duration.short,
    ease: DESIGN_SYSTEM.easing.smoothOut,
  });
  return tl;
}
