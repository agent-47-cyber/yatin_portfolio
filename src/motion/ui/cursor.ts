import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import { dampedLerp } from "@/lib/math";

export interface CursorPosition {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
}

export function updateCursorMotion(
  pos: CursorPosition,
  deltaTime: number
): void {
  pos.currentX = dampedLerp(
    pos.currentX,
    pos.targetX,
    1 / DESIGN_SYSTEM.cursor.lerpFactor,
    deltaTime
  );
  pos.currentY = dampedLerp(
    pos.currentY,
    pos.targetY,
    1 / DESIGN_SYSTEM.cursor.lerpFactor,
    deltaTime
  );
}
