import gsap from "gsap";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export interface OutroTimelineElements {
  transmissionText: HTMLElement | null;
  overlay: HTMLElement | null;
}

export function createOutroTimeline(
  elements: OutroTimelineElements,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });

  // 0s - Begin fade
  if (elements.overlay) {
    tl.to(
      elements.overlay,
      {
        opacity: 0.8,
        duration: 2.0,
        ease: DESIGN_SYSTEM.easing.smoothInOut,
      },
      0
    );
  }

  // 3.0s - Reveal TRANSMISSION COMPLETE
  if (elements.transmissionText) {
    tl.fromTo(
      elements.transmissionText,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1.0,
        duration: 0.8,
        ease: DESIGN_SYSTEM.easing.dramaticOut,
      },
      3.0
    );
  }

  // 4.0s - Fade to black
  if (elements.overlay) {
    tl.to(
      elements.overlay,
      {
        opacity: 1.0,
        duration: 1.0,
        ease: DESIGN_SYSTEM.easing.smoothOut,
      },
      4.0
    );
  }

  return tl;
}
