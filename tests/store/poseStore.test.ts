import { describe, it, expect, beforeEach } from 'vitest';
import { usePoseStore } from '@/store/poseStore';
import { getDefaultPose } from '@/utils/posePresets';

beforeEach(() => {
  usePoseStore.setState({
    poseA: getDefaultPose(),
    poseB: getDefaultPose(),
    poseAName: 'T-Pose',
    poseBName: 'T-Pose',
  });
});

describe('poseStore', () => {
  it('initializes with T-Pose angles for pose A and B', () => {
    const { poseA, poseB, poseAName, poseBName } = usePoseStore.getState();
    expect(poseAName).toBe('T-Pose');
    expect(poseBName).toBe('T-Pose');
    expect(poseA.head.x).toBe(0);
    expect(poseB.head.x).toBe(0);
  });

  it('setPoseA updates pose A angles and name', () => {
    const { setPoseA } = usePoseStore.getState();
    const newAngles = { ...getDefaultPose(), head: { x: 10, y: 20, z: 5 } };
    setPoseA(newAngles, 'Custom Head');
    const { poseA, poseAName } = usePoseStore.getState();
    expect(poseA.head.x).toBe(10);
    expect(poseAName).toBe('Custom Head');
  });

  it('updateJointA updates a single joint axis', () => {
    const { updateJointA } = usePoseStore.getState();
    updateJointA('leftElbow', 'x', 90);
    const { poseA, poseAName } = usePoseStore.getState();
    expect(poseA.leftElbow.x).toBe(90);
    expect(poseAName).toBe('Custom');
  });

  it('resetPoseA restores T-Pose and name', () => {
    const { updateJointA, resetPoseA } = usePoseStore.getState();
    updateJointA('leftElbow', 'x', 90);
    resetPoseA();
    const { poseA, poseAName } = usePoseStore.getState();
    expect(poseA.leftElbow.x).toBe(0);
    expect(poseAName).toBe('T-Pose');
  });

  it('setPoseB updates pose B independently from A', () => {
    const { setPoseB } = usePoseStore.getState();
    const newAngles = { ...getDefaultPose(), spine: { x: 15, y: 5, z: 3 } };
    setPoseB(newAngles, 'Spine Bent');
    const { poseB, poseBName, poseA } = usePoseStore.getState();
    expect(poseB.spine.x).toBe(15);
    expect(poseBName).toBe('Spine Bent');
    expect(poseA.spine.x).toBe(0); // A unaffected
  });
});
