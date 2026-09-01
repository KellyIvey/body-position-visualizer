import { useCallback } from 'react';
import { usePoseStore } from '@/store/poseStore';
import { useUiStore } from '@/store/uiStore';
import type { PoseAngles } from '@/types/pose';
import { POSE_PRESETS } from '@/utils/posePresets';

/**
 * Custom hook providing pose manipulation utilities.
 * Automatically targets the active pose (A or B).
 */
export function usePose() {
  const activePose = useUiStore((s) => s.activePose);
  const { poseA, poseB, poseAName, poseBName, setPoseA, setPoseB, updateJointA, updateJointB, resetPoseA, resetPoseB } =
    usePoseStore();

  const currentAngles = activePose === 'A' ? poseA : poseB;
  const currentName = activePose === 'A' ? poseAName : poseBName;

  const applyPreset = useCallback(
    (presetId: string) => {
      const preset = POSE_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      if (activePose === 'A') {
        setPoseA(preset.angles, preset.name);
      } else {
        setPoseB(preset.angles, preset.name);
      }
    },
    [activePose, setPoseA, setPoseB]
  );

  const updateJoint = useCallback(
    (jointKey: keyof PoseAngles, axis: 'x' | 'y' | 'z', value: number) => {
      if (activePose === 'A') {
        updateJointA(jointKey, axis, value);
      } else {
        updateJointB(jointKey, axis, value);
      }
    },
    [activePose, updateJointA, updateJointB]
  );

  const resetPose = useCallback(() => {
    if (activePose === 'A') resetPoseA();
    else resetPoseB();
  }, [activePose, resetPoseA, resetPoseB]);

  const setCustomPose = useCallback(
    (angles: PoseAngles, name?: string) => {
      if (activePose === 'A') setPoseA(angles, name);
      else setPoseB(angles, name);
    },
    [activePose, setPoseA, setPoseB]
  );

  return {
    currentAngles,
    currentName,
    activePose,
    presets: POSE_PRESETS,
    applyPreset,
    updateJoint,
    resetPose,
    setCustomPose,
  };
}
