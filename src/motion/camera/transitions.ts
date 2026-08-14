import gsap from "gsap";
import { CAMERA_TARGETS } from "@/config/camera";
import type { ApplicationState } from "@/types";
import type { Camera } from "three";

export function transitionCameraToState(
  camera: Camera,
  targetState: ApplicationState,
  onComplete?: () => void
): gsap.core.Timeline {
  const target = CAMERA_TARGETS[targetState];
  const tl = gsap.timeline({
    onComplete,
  });

  tl.to(camera.position, {
    x: target.position[0],
    y: target.position[1],
    z: target.position[2],
    duration: target.duration,
    ease: target.easing,
  });

  return tl;
}
