import { SceneViewer } from './SceneViewer';
import { usePoseStore } from '@/store/poseStore';

/**
 * Side-by-side comparison view showing Pose A and Pose B.
 */
export function ComparisonView() {
  const { poseA, poseB, poseAName, poseBName } = usePoseStore();

  return (
    <div className="flex w-full h-full gap-1">
      <div className="flex-1 h-full">
        <SceneViewer angles={poseA} label={`Pose A: ${poseAName}`} height="100%" />
      </div>
      <div className="flex-1 h-full">
        <SceneViewer angles={poseB} label={`Pose B: ${poseBName}`} height="100%" />
      </div>
    </div>
  );
}
