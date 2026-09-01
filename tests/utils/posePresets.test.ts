import { describe, it, expect } from 'vitest';
import { POSE_PRESETS, getDefaultPose, findPresetById } from '@/utils/posePresets';

describe('posePresets', () => {
  it('has at least 8 preset poses', () => {
    expect(POSE_PRESETS.length).toBeGreaterThanOrEqual(8);
  });

  it('each preset has required fields', () => {
    for (const preset of POSE_PRESETS) {
      expect(preset.id).toBeTruthy();
      expect(preset.name).toBeTruthy();
      expect(preset.angles).toBeDefined();
      expect(preset.angles.head).toBeDefined();
      expect(preset.angles.leftElbow).toBeDefined();
    }
  });

  it('getDefaultPose returns T-Pose angles', () => {
    const angles = getDefaultPose();
    expect(angles.head.x).toBe(0);
    expect(angles.leftShoulder.z).toBe(90);
    expect(angles.rightShoulder.z).toBe(-90);
  });

  it('findPresetById returns correct preset', () => {
    const preset = findPresetById('sitting');
    expect(preset).toBeDefined();
    expect(preset!.name).toBe('Sitting');
    expect(preset!.angles.leftHip.x).toBe(90);
  });

  it('findPresetById returns undefined for unknown id', () => {
    expect(findPresetById('nonexistent')).toBeUndefined();
  });
});
