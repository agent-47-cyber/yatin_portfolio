import { CAMERA_CONFIG } from "@/config/camera";
import type { Camera } from "three";

export function applyCameraParallax(
  camera: Camera,
  basePosition: readonly [number, number, number],
  mouseX: number,
  mouseY: number
): void {
  const offsetX = mouseX * CAMERA_CONFIG.parallaxStrength * 10;
  const offsetY = -mouseY * CAMERA_CONFIG.parallaxStrength * 10;

  camera.position.x = basePosition[0] + offsetX;
  camera.position.y = basePosition[1] + offsetY;
}
