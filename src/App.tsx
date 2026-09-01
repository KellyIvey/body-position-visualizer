import { useUiStore } from '@/store/uiStore';
import { usePoseStore } from '@/store/poseStore';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { SceneViewer } from '@/components/viewer/SceneViewer';
import { ComparisonView } from '@/components/viewer/ComparisonView';

/**
 * Root application component.
 */
function App() {
  const { isComparisonMode } = useUiStore();
  const { poseA, poseAName } = usePoseStore();

  return (
    <div className="flex flex-col h-screen bg-dark-900 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          {isComparisonMode ? (
            <ComparisonView />
          ) : (
            <SceneViewer angles={poseA} label={poseAName} height="100%" />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
