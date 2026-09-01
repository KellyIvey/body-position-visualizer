import { create } from 'zustand';

export type ActivePanel = 'controls' | 'poses' | 'info' | 'export';
export type ActivePose = 'A' | 'B';
export type CameraAngle = 'front' | 'side' | 'back' | 'top';

/**
 * Shape of the UI state store.
 */
export interface UiStore {
  /** Whether comparison mode (side-by-side) is active */
  isComparisonMode: boolean;
  /** Currently active side panel */
  activePanel: ActivePanel;
  /** Which pose is currently being edited (A or B) */
  activePose: ActivePose;
  /** Sidebar collapsed state */
  isSidebarCollapsed: boolean;
  /** Current camera angle preset */
  cameraAngle: CameraAngle;
  toggleComparisonMode: () => void;
  setActivePanel: (panel: ActivePanel) => void;
  setActivePose: (pose: ActivePose) => void;
  toggleSidebar: () => void;
  setCameraAngle: (angle: CameraAngle) => void;
}

/**
 * Zustand store for UI state management.
 */
export const useUiStore = create<UiStore>((set) => ({
  isComparisonMode: false,
  activePanel: 'controls',
  activePose: 'A',
  isSidebarCollapsed: false,
  cameraAngle: 'front',

  toggleComparisonMode: () =>
    set((state) => ({ isComparisonMode: !state.isComparisonMode })),

  setActivePanel: (panel) => set({ activePanel: panel }),
  setActivePose: (pose) => set({ activePose: pose }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setCameraAngle: (angle) => set({ cameraAngle: angle }),
}));
