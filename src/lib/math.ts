/**
 * ORBIT // YATIN — Mathematical Utilities
 * Pure functions for interpolation, clamping, and geometric calculations.
 */

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const norm = normalize(value, inMin, inMax);
  return lerp(outMin, outMax, clamp(norm, 0, 1));
}

export function dampedLerp(
  current: number,
  target: number,
  smoothing: number,
  deltaTime: number
): number {
  return lerp(current, target, 1 - Math.exp(-smoothing * deltaTime));
}

export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}
