/**
 * Electron preload script.
 * Runs in a sandboxed renderer process — exposes only what the app needs
 * via contextBridge. Keep this minimal for security.
 */

// No APIs currently need to be bridged to the renderer.
// This file intentionally left minimal to maintain sandbox security.
// Add contextBridge.exposeInMainWorld() calls here if renderer needs
// to communicate with the main process in the future.
