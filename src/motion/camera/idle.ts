import { CAMERA_CONFIG } from "@/config/camera";
import type { Camera } from "three";

export function applyCameraIdleDrift(
  camera: Camera,
  basePosition: readonly [number, number, number],
  elapsedTime: number
): void {
  const { idleDriftAmplitude, idleDriftSpeed } = CAMERA_CONFIG;
  const t = elapsedTime * idleDriftSpeed;

  camera.position.x = basePosition[0] + Math.sin(t * 0.7) * idleDriftAmplitude.x;
  camera.position.y = basePosition[1] + Math.cos(t * 0.5) * idleDriftAmplitude.y;
  camera.position.z = basePosition[2] + Math.sin(t * 0.3) * idleDriftAmplitude.z;
}
