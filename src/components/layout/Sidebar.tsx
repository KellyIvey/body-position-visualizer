import { useUiStore, type ActivePanel } from '@/store/uiStore';
import { JointControls } from '@/components/controls/JointControls';
import { PoseLibrary } from '@/components/controls/PoseLibrary';
import { ArticulationPanel } from '@/components/panels/ArticulationPanel';
import { ExportPanel } from '@/components/panels/ExportPanel';

const TABS: { id: ActivePanel; label: string; icon: string }[] = [
  { id: 'controls', label: 'Joints', icon: '🦴' },
  { id: 'poses', label: 'Poses', icon: '🧍' },
  { id: 'info', label: 'Info', icon: '📊' },
  { id: 'export', label: 'Export', icon: '💾' },
];

/**
 * Sidebar navigation and panel container.
 */
export function Sidebar() {
  const { activePanel, setActivePanel, isSidebarCollapsed } = useUiStore();

  if (isSidebarCollapsed) return null;

  return (
    <aside className="w-72 bg-dark-800 border-r border-dark-600 flex flex-col shrink-0">
      {/* Tab nav */}
      <nav className="flex border-b border-dark-600">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-xs transition-colors ${
              activePanel === tab.id
                ? 'bg-dark-700 text-blue-400 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-300 hover:bg-dark-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Panel content */}
      <div className="flex-1 overflow-hidden p-3">
        {activePanel === 'controls' && <JointControls />}
        {activePanel === 'poses' && <PoseLibrary />}
        {activePanel === 'info' && <ArticulationPanel />}
        {activePanel === 'export' && <ExportPanel />}
      </div>
    </aside>
  );
}
