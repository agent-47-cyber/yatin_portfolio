import gsap from "gsap";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export interface IntroTimelineElements {
  systemLabel: HTMLElement | null;
  statusLabel: HTMLElement | null;
  line: HTMLElement | null;
  namePrimary: HTMLElement | null;
  nameSecondary: HTMLElement | null;
  role: HTMLElement | null;
  enterButton: HTMLElement | null;
}

export function createIntroTimeline(
  elements: IntroTimelineElements,
  onEnterVisible?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({
    paused: true,
  });

  // 0.3s - System label
  if (elements.systemLabel) {
    tl.fromTo(
      elements.systemLabel,
      { opacity: 0 },
      {
        opacity: DESIGN_SYSTEM.opacity.muted,
        duration: DESIGN_SYSTEM.duration.long,
        ease: DESIGN_SYSTEM.easing.smoothOut,
      },
      0.3
    );
  }

  // 1.2s - Initializing status
  if (elements.statusLabel) {
    tl.fromTo(
      elements.statusLabel,
      { opacity: 0 },
      {
        opacity: DESIGN_SYSTEM.opacity.primary,
        duration: DESIGN_SYSTEM.duration.medium,
        ease: DESIGN_SYSTEM.easing.smoothOut,
      },
      1.2
    );
  }

  // 1.8s - Horizontal scan line
  if (elements.line) {
    tl.fromTo(
      elements.line,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 0.6,
        duration: 0.8,
        ease: DESIGN_SYSTEM.easing.smoothInOut,
      },
      1.8
    );
  }

  // 6.5s - YATIN
  if (elements.namePrimary) {
    tl.fromTo(
      elements.namePrimary,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: DESIGN_SYSTEM.easing.dramaticOut,
      },
      6.5
    );
  }

  // 7.0s - KHANDELWAL
  if (elements.nameSecondary) {
    tl.fromTo(
      elements.nameSecondary,
      { opacity: 0, y: 20 },
      {
        opacity: DESIGN_SYSTEM.opacity.secondary,
        y: 0,
        duration: 0.4,
        ease: DESIGN_SYSTEM.easing.dramaticOut,
      },
      7.0
    );
  }

  // 7.4s - SOFTWARE ENGINEER
  if (elements.role) {
    tl.fromTo(
      elements.role,
      { opacity: 0 },
      {
        opacity: DESIGN_SYSTEM.opacity.muted,
        duration: DESIGN_SYSTEM.duration.short,
        ease: DESIGN_SYSTEM.easing.smoothOut,
      },
      7.4
    );
  }

  // 7.8s - [ ENTER ]
  if (elements.enterButton) {
    tl.fromTo(
      elements.enterButton,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1.0,
        duration: DESIGN_SYSTEM.duration.short,
        ease: DESIGN_SYSTEM.easing.smoothOut,
        onComplete: onEnterVisible,
      },
      7.8
    );
  }

  return tl;
}
