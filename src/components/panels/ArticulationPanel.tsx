import { usePose } from '@/hooks/usePose';
import { JOINT_CONFIGS } from '@/utils/jointConfig';
import type { PoseAngles } from '@/types/pose';

/**
 * Displays current joint angles in a readable table format.
 */
export function ArticulationPanel() {
  const { currentAngles, currentName } = usePose();

  return (
    <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="bg-dark-700 rounded-lg p-3">
        <p className="text-xs text-gray-400">Active Pose</p>
        <p className="text-sm font-semibold text-blue-300">{currentName}</p>
      </div>
      <div className="bg-dark-700 rounded-lg overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-dark-600 text-gray-400">
              <th className="text-left px-3 py-2">Joint</th>
              <th className="text-left px-3 py-2">Axis</th>
              <th className="text-right px-3 py-2">Angle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-600">
            {JOINT_CONFIGS.map((cfg, i) => {
              const joint = currentAngles[cfg.jointKey as keyof PoseAngles] as Record<string, number>;
              const val = joint[cfg.axis] ?? 0;
              return (
                <tr key={i} className="text-gray-300 hover:bg-dark-600/50">
                  <td className="px-3 py-1.5">{cfg.label}</td>
                  <td className="px-3 py-1.5 text-gray-500">{cfg.axisLabel}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-blue-400">
                    {val.toFixed(1)}°
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
