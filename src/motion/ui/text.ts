import gsap from "gsap";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export function revealTextWords(
  elements: HTMLElement[] | NodeListOf<HTMLElement>,
  stagger = 0.06,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });
  tl.fromTo(
    elements,
    {
      opacity: 0,
      y: 18,
    },
    {
      opacity: 1,
      y: 0,
      duration: DESIGN_SYSTEM.duration.medium,
      ease: DESIGN_SYSTEM.easing.dramaticOut,
      stagger,
    }
  );
  return tl;
}

export function revealTextLines(
  elements: HTMLElement[] | NodeListOf<HTMLElement>,
  stagger = 0.12,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });
  tl.fromTo(
    elements,
    {
      opacity: 0,
      y: 28,
    },
    {
      opacity: 1,
      y: 0,
      duration: DESIGN_SYSTEM.duration.long,
      ease: DESIGN_SYSTEM.easing.dramaticOut,
      stagger,
    }
  );
  return tl;
}
