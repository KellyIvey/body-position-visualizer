import type { PoseAngles, PoseExport } from '@/types/pose';

const EXPORT_VERSION = '1.0.0';

/**
 * Serializes pose angles to a JSON export string.
 * @param angles - The joint angles to export.
 * @param poseName - Human-readable name for the exported pose.
 */
export function serializePose(angles: PoseAngles, poseName: string): string {
  const exportData: PoseExport = {
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    poseName,
    angles,
  };
  return JSON.stringify(exportData, null, 2);
}

/**
 * Parses a JSON export string back to pose angles.
 * Throws if the data is invalid or incompatible.
 * @param json - The JSON string to parse.
 */
export function deserializePose(json: string): PoseExport {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Invalid JSON: could not parse pose file.');
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Invalid pose file: root must be an object.');
  }

  const obj = parsed as Record<string, unknown>;

  if (!obj['version'] || !obj['angles']) {
    throw new Error('Invalid pose file: missing required fields (version, angles).');
  }

  return obj as unknown as PoseExport;
}

/**
 * Triggers a browser file download for the given content.
 * @param content - The string content to download.
 * @param filename - The filename for the download.
 * @param mimeType - MIME type of the file.
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a canvas element as a PNG file.
 * @param canvas - The HTMLCanvasElement to capture.
 * @param filename - The filename for the PNG.
 */
export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (!blob) throw new Error('Failed to capture canvas as image.');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}
