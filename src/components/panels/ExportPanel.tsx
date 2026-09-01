import { useRef } from 'react';
import { usePose } from '@/hooks/usePose';
import { useExport } from '@/hooks/useExport';

/**
 * Panel for exporting and importing pose data.
 */
export function ExportPanel() {
  const { currentAngles, currentName, setCustomPose } = usePose();
  const { exportPoseAsJson, importPoseFromJson, captureScreenshot } = useExport();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { angles, poseName } = await importPoseFromJson(file);
      setCustomPose(angles, poseName);
    } catch (err) {
      alert(`Import failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => captureScreenshot(currentName)}
        className="w-full flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
      >
        <span>📸</span> Screenshot (PNG)
      </button>

      <button
        onClick={() => exportPoseAsJson(currentAngles, currentName)}
        className="w-full flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
      >
        <span>⬇️</span> Export Pose (JSON)
      </button>

      <div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <span>⬆️</span> Import Pose (JSON)
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      <div className="bg-dark-700 rounded-lg p-3 text-xs text-gray-400 space-y-1">
        <p className="font-semibold text-gray-300">Current Pose: {currentName}</p>
        <p>Export saves all joint angles as a JSON file you can reimport later.</p>
        <p>Screenshot captures the 3D viewport as a PNG image.</p>
      </div>
    </div>
  );
}
