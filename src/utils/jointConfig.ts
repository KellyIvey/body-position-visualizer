import type { JointConfig } from '@/types/pose';

/**
 * Complete configuration for all controllable joints.
 * Defines display labels, axis info, and angle ranges for sliders.
 */
export const JOINT_CONFIGS: JointConfig[] = [
  // Head/Neck
  { jointKey: 'head', axis: 'x', label: 'Head', axisLabel: 'Tilt (Nod)', min: -60, max: 60 },
  { jointKey: 'head', axis: 'y', label: 'Head', axisLabel: 'Turn', min: -80, max: 80 },
  { jointKey: 'head', axis: 'z', label: 'Head', axisLabel: 'Side Tilt', min: -45, max: 45 },
  // Spine
  { jointKey: 'spine', axis: 'x', label: 'Spine', axisLabel: 'Flex/Extend', min: -60, max: 30 },
  { jointKey: 'spine', axis: 'y', label: 'Spine', axisLabel: 'Rotation', min: -45, max: 45 },
  { jointKey: 'spine', axis: 'z', label: 'Spine', axisLabel: 'Lateral Bend', min: -40, max: 40 },
  // Shoulders
  { jointKey: 'leftShoulder', axis: 'x', label: 'Left Shoulder', axisLabel: 'Flex/Extend', min: -60, max: 180 },
  { jointKey: 'leftShoulder', axis: 'y', label: 'Left Shoulder', axisLabel: 'Rotate', min: -90, max: 90 },
  { jointKey: 'leftShoulder', axis: 'z', label: 'Left Shoulder', axisLabel: 'Abduct/Adduct', min: -30, max: 180 },
  { jointKey: 'rightShoulder', axis: 'x', label: 'Right Shoulder', axisLabel: 'Flex/Extend', min: -60, max: 180 },
  { jointKey: 'rightShoulder', axis: 'y', label: 'Right Shoulder', axisLabel: 'Rotate', min: -90, max: 90 },
  { jointKey: 'rightShoulder', axis: 'z', label: 'Right Shoulder', axisLabel: 'Abduct/Adduct', min: -180, max: 30 },
  // Elbows
  { jointKey: 'leftElbow', axis: 'x', label: 'Left Elbow', axisLabel: 'Flex/Extend', min: 0, max: 145 },
  { jointKey: 'rightElbow', axis: 'x', label: 'Right Elbow', axisLabel: 'Flex/Extend', min: 0, max: 145 },
  // Wrists
  { jointKey: 'leftWrist', axis: 'x', label: 'Left Wrist', axisLabel: 'Flex/Extend', min: -80, max: 80 },
  { jointKey: 'leftWrist', axis: 'z', label: 'Left Wrist', axisLabel: 'Deviation', min: -30, max: 30 },
  { jointKey: 'rightWrist', axis: 'x', label: 'Right Wrist', axisLabel: 'Flex/Extend', min: -80, max: 80 },
  { jointKey: 'rightWrist', axis: 'z', label: 'Right Wrist', axisLabel: 'Deviation', min: -30, max: 30 },
  // Hips
  { jointKey: 'leftHip', axis: 'x', label: 'Left Hip', axisLabel: 'Flex/Extend', min: -30, max: 120 },
  { jointKey: 'leftHip', axis: 'y', label: 'Left Hip', axisLabel: 'Rotate', min: -45, max: 45 },
  { jointKey: 'leftHip', axis: 'z', label: 'Left Hip', axisLabel: 'Abduct/Adduct', min: -45, max: 45 },
  { jointKey: 'rightHip', axis: 'x', label: 'Right Hip', axisLabel: 'Flex/Extend', min: -30, max: 120 },
  { jointKey: 'rightHip', axis: 'y', label: 'Right Hip', axisLabel: 'Rotate', min: -45, max: 45 },
  { jointKey: 'rightHip', axis: 'z', label: 'Right Hip', axisLabel: 'Abduct/Adduct', min: -45, max: 45 },
  // Knees
  { jointKey: 'leftKnee', axis: 'x', label: 'Left Knee', axisLabel: 'Flex/Extend', min: 0, max: 135 },
  { jointKey: 'rightKnee', axis: 'x', label: 'Right Knee', axisLabel: 'Flex/Extend', min: 0, max: 135 },
  // Ankles
  { jointKey: 'leftAnkle', axis: 'x', label: 'Left Ankle', axisLabel: 'Dorsi/Plantar', min: -45, max: 30 },
  { jointKey: 'leftAnkle', axis: 'z', label: 'Left Ankle', axisLabel: 'Inversion', min: -30, max: 30 },
  { jointKey: 'rightAnkle', axis: 'x', label: 'Right Ankle', axisLabel: 'Dorsi/Plantar', min: -45, max: 30 },
  { jointKey: 'rightAnkle', axis: 'z', label: 'Right Ankle', axisLabel: 'Inversion', min: -30, max: 30 },
];

/**
 * Groups joint configs by their jointKey for UI rendering.
 */
export function groupJointConfigs(): Record<string, JointConfig[]> {
  return JOINT_CONFIGS.reduce<Record<string, JointConfig[]>>((acc, cfg) => {
    const key = cfg.jointKey as string;
    if (!acc[key]) acc[key] = [];
    acc[key].push(cfg);
    return acc;
  }, {});
}
