import gsap from "gsap";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export function animateTransitionVeil(
  veilElement: HTMLElement,
  textElement: HTMLElement | null,
  onMidpoint?: () => void,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });

  // Fade veil in
  tl.to(veilElement, {
    opacity: 1,
    duration: DESIGN_SYSTEM.duration.medium,
    ease: DESIGN_SYSTEM.easing.smoothInOut,
  });

  if (textElement) {
    tl.fromTo(
      textElement,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1.0,
        duration: DESIGN_SYSTEM.duration.short,
        ease: DESIGN_SYSTEM.easing.dramaticOut,
      },
      "-=0.2"
    );
  }

  // Midpoint trigger (e.g. camera switch)
  if (onMidpoint) {
    tl.add(() => onMidpoint());
  }

  tl.to({}, { duration: 0.2 });

  if (textElement) {
    tl.to(textElement, {
      opacity: 0,
      scale: 1.05,
      duration: DESIGN_SYSTEM.duration.short,
      ease: DESIGN_SYSTEM.easing.smoothOut,
    });
  }

  // Fade veil out
  tl.to(veilElement, {
    opacity: 0,
    duration: DESIGN_SYSTEM.duration.medium,
    ease: DESIGN_SYSTEM.easing.smoothOut,
  });

  return tl;
}
