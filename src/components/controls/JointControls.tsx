import { useMemo } from 'react';
import { JointSlider } from './JointSlider';
import { JOINT_CONFIGS, groupJointConfigs } from '@/utils/jointConfig';
import { usePose } from '@/hooks/usePose';
import type { PoseAngles } from '@/types/pose';

/**
 * Full joint controls panel with sliders for every major joint.
 */
export function JointControls() {
  const { currentAngles, updateJoint } = usePose();
  const groups = useMemo(() => groupJointConfigs(), []);

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      {Object.entries(groups).map(([jointKey, configs]) => (
        <div key={jointKey} className="bg-dark-700 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-200 mb-2">{configs[0].label}</h3>
          {configs.map((cfg) => {
            const joint = currentAngles[cfg.jointKey as keyof PoseAngles] as Record<string, number>;
            const val = joint[cfg.axis] ?? 0;
            return (
              <JointSlider
                key={`${jointKey}-${cfg.axis}`}
                config={cfg}
                value={val}
                onChange={(v) => updateJoint(cfg.jointKey, cfg.axis, v)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
