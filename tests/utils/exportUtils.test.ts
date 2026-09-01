import { describe, it, expect } from 'vitest';
import { serializePose, deserializePose } from '@/utils/exportUtils';
import { getDefaultPose } from '@/utils/posePresets';

describe('exportUtils', () => {
  it('serializePose produces valid JSON with correct structure', () => {
    const angles = getDefaultPose();
    const json = serializePose(angles, 'Test Pose');
    const parsed = JSON.parse(json);
    expect(parsed.version).toBe('1.0.0');
    expect(parsed.poseName).toBe('Test Pose');
    expect(parsed.angles).toBeDefined();
    expect(parsed.exportedAt).toBeDefined();
  });

  it('deserializePose round-trips correctly', () => {
    const angles = getDefaultPose();
    const json = serializePose(angles, 'Round Trip');
    const result = deserializePose(json);
    expect(result.poseName).toBe('Round Trip');
    expect(result.angles.head.x).toBe(angles.head.x);
  });

  it('deserializePose throws on invalid JSON', () => {
    expect(() => deserializePose('not json')).toThrow('Invalid JSON');
  });

  it('deserializePose throws on missing required fields', () => {
    expect(() => deserializePose(JSON.stringify({ poseName: 'X' }))).toThrow('missing required fields');
  });
});
