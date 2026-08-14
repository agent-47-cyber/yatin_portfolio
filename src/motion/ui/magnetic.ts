import gsap from "gsap";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export function createMagneticAttraction(
  element: HTMLElement,
  mouseX: number,
  mouseY: number,
  strength = 0.35
): void {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = (mouseX - centerX) * strength;
  const deltaY = (mouseY - centerY) * strength;

  gsap.to(element, {
    x: deltaX,
    y: deltaY,
    duration: DESIGN_SYSTEM.duration.micro,
    ease: DESIGN_SYSTEM.easing.smoothOut,
    overwrite: "auto",
  });
}

export function releaseMagneticAttraction(element: HTMLElement): void {
  gsap.to(element, {
    x: 0,
    y: 0,
    duration: DESIGN_SYSTEM.duration.short,
    ease: DESIGN_SYSTEM.easing.smoothOut,
    overwrite: "auto",
  });
}
