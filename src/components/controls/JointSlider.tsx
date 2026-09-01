import type { JointConfig } from '@/types/pose';

export interface JointSliderProps {
  config: JointConfig;
  value: number;
  onChange: (value: number) => void;
}

/**
 * A single slider control for one joint axis.
 */
export function JointSlider({ config, value, onChange }: JointSliderProps) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      <span className="text-xs text-gray-400 w-24 shrink-0 truncate">{config.axisLabel}</span>
      <input
        type="range"
        min={config.min}
        max={config.max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-blue-500"
        aria-label={`${config.label} ${config.axisLabel}`}
      />
      <span className="text-xs text-blue-400 w-10 text-right tabular-nums">
        {value.toFixed(0)}°
      </span>
    </div>
  );
}
