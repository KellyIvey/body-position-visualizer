import { useCallback, useRef } from 'react';
import type { PoseAngles } from '@/types/pose';
import { serializePose, deserializePose, downloadFile } from '@/utils/exportUtils';

/**
 * Custom hook providing export and import utilities for poses.
 */
export function useExport() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const exportPoseAsJson = useCallback((angles: PoseAngles, poseName: string) => {
    const json = serializePose(angles, poseName);
    downloadFile(json, `${poseName.replace(/\s+/g, '_')}_pose.json`, 'application/json');
  }, []);

  const importPoseFromJson = useCallback(
    (file: File): Promise<{ angles: PoseAngles; poseName: string }> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = e.target?.result as string;
            const data = deserializePose(json);
            resolve({ angles: data.angles, poseName: data.poseName });
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file.'));
        reader.readAsText(file);
      });
    },
    []
  );

  const captureScreenshot = useCallback((poseName: string) => {
    // Find canvas in the DOM if not directly referenced
    const canvas = canvasRef.current ?? (document.querySelector('canvas') as HTMLCanvasElement | null);
    if (!canvas) {
      console.error('No canvas found for screenshot.');
      return;
    }
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${poseName.replace(/\s+/g, '_')}_pose.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, []);

  return { exportPoseAsJson, importPoseFromJson, captureScreenshot, canvasRef };
}
