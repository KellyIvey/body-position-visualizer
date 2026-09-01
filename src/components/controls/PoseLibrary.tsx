import { POSE_PRESETS } from '@/utils/posePresets';
import { usePose } from '@/hooks/usePose';

/**
 * Grid of clickable preset pose cards.
 */
export function PoseLibrary() {
  const { applyPreset, currentName } = usePose();

  return (
    <div className="grid grid-cols-2 gap-2">
      {POSE_PRESETS.map((preset) => (
        <button
          key={preset.id}
          onClick={() => applyPreset(preset.id)}
          className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
            currentName === preset.name
              ? 'border-blue-500 bg-blue-500/10 text-blue-300'
              : 'border-dark-600 bg-dark-700 text-gray-300 hover:border-blue-400 hover:bg-dark-600'
          }`}
        >
          <span className="text-2xl">{preset.icon}</span>
          <span className="text-xs font-medium text-center">{preset.name}</span>
        </button>
      ))}
    </div>
  );
}
