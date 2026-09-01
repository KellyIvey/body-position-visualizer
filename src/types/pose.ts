/**
 * Represents rotation angles (in degrees) for a single joint axis.
 */
export interface JointAngle {
  /** Flexion/extension angle in degrees */
  x: number;
  /** Abduction/adduction or rotation angle in degrees */
  y: number;
  /** Lateral bend or deviation angle in degrees */
  z: number;
}

/**
 * Complete set of joint angles defining a body pose.
 */
export interface PoseAngles {
  head: JointAngle;
  spine: JointAngle;
  leftShoulder: JointAngle;
  rightShoulder: JointAngle;
  leftElbow: Pick<JointAngle, 'x'>;
  rightElbow: Pick<JointAngle, 'x'>;
  leftWrist: Pick<JointAngle, 'x' | 'z'>;
  rightWrist: Pick<JointAngle, 'x' | 'z'>;
  leftHip: JointAngle;
  rightHip: JointAngle;
  leftKnee: Pick<JointAngle, 'x'>;
  rightKnee: Pick<JointAngle, 'x'>;
  leftAnkle: Pick<JointAngle, 'x' | 'z'>;
  rightAnkle: Pick<JointAngle, 'x' | 'z'>;
}

/**
 * A named preset pose with joint angle data.
 */
export interface PosePreset {
  /** Unique identifier for the pose */
  id: string;
  /** Human-readable name */
  name: string;
  /** Brief description */
  description: string;
  /** Emoji icon for display */
  icon: string;
  /** Joint angle data */
  angles: PoseAngles;
}

/**
 * Joint metadata for UI controls.
 */
export interface JointConfig {
  /** Joint identifier key from PoseAngles */
  jointKey: keyof PoseAngles;
  /** Display name */
  label: string;
  /** Axis label */
  axis: 'x' | 'y' | 'z';
  /** Minimum angle in degrees */
  min: number;
  /** Maximum angle in degrees */
  max: number;
  /** Display label for axis */
  axisLabel: string;
}

/**
 * Export format for pose JSON files.
 */
export interface PoseExport {
  version: string;
  exportedAt: string;
  poseName: string;
  angles: PoseAngles;
}
