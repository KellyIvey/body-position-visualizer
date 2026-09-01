import type { PoseAngles, PosePreset } from '@/types/pose';

/** Zero angles for all joints */
const ZERO_ANGLES: PoseAngles = {
  head: { x: 0, y: 0, z: 0 },
  spine: { x: 0, y: 0, z: 0 },
  leftShoulder: { x: 0, y: 0, z: 0 },
  rightShoulder: { x: 0, y: 0, z: 0 },
  leftElbow: { x: 0 },
  rightElbow: { x: 0 },
  leftWrist: { x: 0, z: 0 },
  rightWrist: { x: 0, z: 0 },
  leftHip: { x: 0, y: 0, z: 0 },
  rightHip: { x: 0, y: 0, z: 0 },
  leftKnee: { x: 0 },
  rightKnee: { x: 0 },
  leftAnkle: { x: 0, z: 0 },
  rightAnkle: { x: 0, z: 0 },
};

/**
 * All preset pose definitions.
 */
export const POSE_PRESETS: PosePreset[] = [
  {
    id: 'tpose',
    name: 'T-Pose',
    description: 'Arms extended horizontally, default position',
    icon: '✋',
    angles: {
      ...ZERO_ANGLES,
      leftShoulder: { x: 0, y: 0, z: 90 },
      rightShoulder: { x: 0, y: 0, z: -90 },
    },
  },
  {
    id: 'apose',
    name: 'A-Pose',
    description: 'Arms at 45 degrees, relaxed position',
    icon: '🧍',
    angles: {
      ...ZERO_ANGLES,
      leftShoulder: { x: 0, y: 0, z: 45 },
      rightShoulder: { x: 0, y: 0, z: -45 },
    },
  },
  {
    id: 'standing',
    name: 'Standing Neutral',
    description: 'Natural standing position',
    icon: '🧍',
    angles: {
      ...ZERO_ANGLES,
      leftShoulder: { x: 0, y: 0, z: 15 },
      rightShoulder: { x: 0, y: 0, z: -15 },
    },
  },
  {
    id: 'sitting',
    name: 'Sitting',
    description: 'Seated position with hips and knees at 90°',
    icon: '🪑',
    angles: {
      ...ZERO_ANGLES,
      leftHip: { x: 90, y: 0, z: 0 },
      rightHip: { x: 90, y: 0, z: 0 },
      leftKnee: { x: 90 },
      rightKnee: { x: 90 },
      leftShoulder: { x: 0, y: 0, z: 15 },
      rightShoulder: { x: 0, y: 0, z: -15 },
    },
  },
  {
    id: 'walking',
    name: 'Walking Stance',
    description: 'Mid-stride walking position',
    icon: '🚶',
    angles: {
      ...ZERO_ANGLES,
      leftHip: { x: 30, y: 0, z: 0 },
      rightHip: { x: -15, y: 0, z: 0 },
      leftKnee: { x: 0 },
      rightKnee: { x: 20 },
      leftShoulder: { x: -20, y: 0, z: 15 },
      rightShoulder: { x: 20, y: 0, z: -15 },
      leftElbow: { x: 30 },
      rightElbow: { x: 30 },
    },
  },
  {
    id: 'running',
    name: 'Running',
    description: 'Dynamic running pose',
    icon: '🏃',
    angles: {
      ...ZERO_ANGLES,
      leftHip: { x: 50, y: 0, z: 0 },
      rightHip: { x: -20, y: 0, z: 0 },
      leftKnee: { x: 10 },
      rightKnee: { x: 80 },
      leftShoulder: { x: -40, y: 0, z: 15 },
      rightShoulder: { x: 40, y: 0, z: -15 },
      leftElbow: { x: 90 },
      rightElbow: { x: 90 },
      spine: { x: 10, y: 5, z: 0 },
    },
  },
  {
    id: 'squat',
    name: 'Squat',
    description: 'Full squat position',
    icon: '🏋️',
    angles: {
      ...ZERO_ANGLES,
      leftHip: { x: 100, y: 0, z: 5 },
      rightHip: { x: 100, y: 0, z: -5 },
      leftKnee: { x: 120 },
      rightKnee: { x: 120 },
      leftAnkle: { x: 25, z: 0 },
      rightAnkle: { x: 25, z: 0 },
      spine: { x: 15, y: 0, z: 0 },
      leftShoulder: { x: 20, y: 0, z: 30 },
      rightShoulder: { x: 20, y: 0, z: -30 },
      leftElbow: { x: 45 },
      rightElbow: { x: 45 },
    },
  },
  {
    id: 'arms_raised',
    name: 'Arms Raised',
    description: 'Both arms raised overhead',
    icon: '🙌',
    angles: {
      ...ZERO_ANGLES,
      leftShoulder: { x: 0, y: 0, z: 170 },
      rightShoulder: { x: 0, y: 0, z: -170 },
      leftElbow: { x: 10 },
      rightElbow: { x: 10 },
    },
  },
];

/**
 * Returns a deep copy of the T-Pose (default/reset pose).
 * Returns a copy to prevent callers from mutating the preset definition.
 */
export function getDefaultPose(): PoseAngles {
  return structuredClone(POSE_PRESETS.find((p) => p.id === 'tpose')!.angles);
}

/**
 * Finds a preset pose by its id.
 * @param id - The preset id to look up.
 */
export function findPresetById(id: string): PosePreset | undefined {
  return POSE_PRESETS.find((p) => p.id === id);
}
