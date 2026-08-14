import gsap from "gsap";
import { CAMERA_TARGETS } from "@/config/camera";
import type { Camera } from "three";

export function animateCameraIntro(
  camera: Camera,
  onComplete?: () => void
): gsap.core.Timeline {
  const target = CAMERA_TARGETS.MISSION_CONTROL;
  const start = CAMERA_TARGETS.INTRO;

  camera.position.set(...start.position);
  camera.lookAt(...start.lookAt);

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
