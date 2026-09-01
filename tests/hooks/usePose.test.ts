import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePose } from '@/hooks/usePose';
import { usePoseStore } from '@/store/poseStore';
import { useUiStore } from '@/store/uiStore';
import { getDefaultPose } from '@/utils/posePresets';

beforeEach(() => {
  usePoseStore.setState({
    poseA: getDefaultPose(),
    poseB: getDefaultPose(),
    poseAName: 'T-Pose',
    poseBName: 'T-Pose',
  });
  useUiStore.setState({ activePose: 'A' });
});

describe('usePose', () => {
  it('returns current angles for active pose A', () => {
    const { result } = renderHook(() => usePose());
    expect(result.current.currentAngles.head.x).toBe(0);
    expect(result.current.currentName).toBe('T-Pose');
  });

  it('applyPreset changes the active pose', () => {
    const { result } = renderHook(() => usePose());
    act(() => {
      result.current.applyPreset('sitting');
    });
    expect(result.current.currentAngles.leftHip.x).toBe(90);
    expect(result.current.currentName).toBe('Sitting');
  });

  it('updateJoint updates a joint angle', () => {
    const { result } = renderHook(() => usePose());
    act(() => {
      result.current.updateJoint('leftKnee', 'x', 45);
    });
    expect(result.current.currentAngles.leftKnee.x).toBe(45);
  });

  it('resetPose restores T-Pose', () => {
    const { result } = renderHook(() => usePose());
    act(() => {
      result.current.updateJoint('leftKnee', 'x', 90);
      result.current.resetPose();
    });
    expect(result.current.currentAngles.leftKnee.x).toBe(0);
  });

  it('targets pose B when activePose is B', () => {
    useUiStore.setState({ activePose: 'B' });
    const { result } = renderHook(() => usePose());
    act(() => {
      result.current.applyPreset('squat');
    });
    expect(result.current.currentAngles.leftKnee.x).toBe(120);
    // Pose A should be unaffected
    expect(usePoseStore.getState().poseA.leftKnee.x).toBe(0);
  });
});
