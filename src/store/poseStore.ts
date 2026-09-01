import { create } from 'zustand';
import type { PoseAngles } from '@/types/pose';
import { getDefaultPose } from '@/utils/posePresets';

/**
 * Shape of the pose store state and actions.
 */
export interface PoseStore {
  /** Currently active pose angles for pose A (primary) */
  poseA: PoseAngles;
  /** Currently active pose angles for pose B (comparison) */
  poseB: PoseAngles;
  /** Name of the current active pose for A */
  poseAName: string;
  /** Name of the current active pose for B */
  poseBName: string;
  /** Sets all joint angles at once for pose A */
  setPoseA: (angles: PoseAngles, name?: string) => void;
  /** Sets all joint angles at once for pose B */
  setPoseB: (angles: PoseAngles, name?: string) => void;
  /** Updates a single joint value for pose A */
  updateJointA: (jointKey: keyof PoseAngles, axis: 'x' | 'y' | 'z', value: number) => void;
  /** Updates a single joint value for pose B */
  updateJointB: (jointKey: keyof PoseAngles, axis: 'x' | 'y' | 'z', value: number) => void;
  /** Resets pose A to default T-Pose */
  resetPoseA: () => void;
  /** Resets pose B to default T-Pose */
  resetPoseB: () => void;
}

/**
 * Zustand store for managing body pose state.
 */
export const usePoseStore = create<PoseStore>((set) => ({
  poseA: getDefaultPose(),
  poseB: getDefaultPose(),
  poseAName: 'T-Pose',
  poseBName: 'T-Pose',

  setPoseA: (angles, name = 'Custom') =>
    set({ poseA: angles, poseAName: name }),

  setPoseB: (angles, name = 'Custom') =>
    set({ poseB: angles, poseBName: name }),

  updateJointA: (jointKey, axis, value) =>
    set((state) => ({
      poseA: {
        ...state.poseA,
        [jointKey]: {
          ...(state.poseA[jointKey] as Record<string, number>),
          [axis]: value,
        },
      },
      poseAName: 'Custom',
    })),

  updateJointB: (jointKey, axis, value) =>
    set((state) => ({
      poseB: {
        ...state.poseB,
        [jointKey]: {
          ...(state.poseB[jointKey] as Record<string, number>),
          [axis]: value,
        },
      },
      poseBName: 'Custom',
    })),

  resetPoseA: () => set({ poseA: getDefaultPose(), poseAName: 'T-Pose' }),
  resetPoseB: () => set({ poseB: getDefaultPose(), poseBName: 'T-Pose' }),
}));
