import { useUiStore } from '@/store/uiStore';

/**
 * App header with title and comparison mode toggle.
 */
export function Header() {
  const { isComparisonMode, toggleComparisonMode, activePose, setActivePose, isSidebarCollapsed, toggleSidebar } =
    useUiStore();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-600 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1 className="text-base font-bold text-white">
          Body Position <span className="text-blue-400">&</span> Articulation Visualizer
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {isComparisonMode && (
          <div className="flex rounded-lg overflow-hidden border border-dark-600">
            {(['A', 'B'] as const).map((pose) => (
              <button
                key={pose}
                onClick={() => setActivePose(pose)}
                className={`px-4 py-1 text-sm font-medium transition-colors ${
                  activePose === pose
                    ? 'bg-blue-600 text-white'
                    : 'bg-dark-700 text-gray-400 hover:text-white'
                }`}
              >
                Pose {pose}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={toggleComparisonMode}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isComparisonMode
              ? 'bg-blue-600 text-white'
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white border border-dark-600'
          }`}
        >
          {isComparisonMode ? '⊞ Split View' : '⊞ Compare'}
        </button>
      </div>
    </header>
  );
}
