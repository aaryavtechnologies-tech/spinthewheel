export const SEGMENT_ANGLE = 45;
export const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;
export function calculateTargetRotation(currentRotation: number, selectedIndex: number, fullRotations: number) {
  const desired = normalizeAngle(-selectedIndex * SEGMENT_ANGLE);
  return currentRotation + fullRotations * 360 + normalizeAngle(desired - normalizeAngle(currentRotation));
}
