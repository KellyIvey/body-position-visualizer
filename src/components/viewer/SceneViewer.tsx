import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { HumanFigure } from './HumanFigure';
import type { PoseAngles } from '@/types/pose';

export interface SceneViewerProps {
  /** Pose angles to render */
  angles: PoseAngles;
  /** Optional label to display */
  label?: string;
  /** Height of the canvas */
  height?: string;
}

/**
 * React Three Fiber canvas with lighting, orbit controls, and the human figure.
 */
export function SceneViewer({ angles, label, height = '100%' }: SceneViewerProps) {
  return (
    <div className="relative w-full" style={{ height }}>
      {label && (
        <div className="absolute top-3 left-3 z-10 bg-black/50 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {label}
        </div>
      )}
      <Canvas
        shadows
        camera={{ position: [0, 1, 3.5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true }}
        style={{ background: '#1a1a2e' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.4} />

          <HumanFigure angles={angles} />

          <Grid
            position={[0, -1.55, 0]}
            args={[10, 10]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#2a2a4a"
            sectionSize={2}
            sectionThickness={1}
            sectionColor="#3b3b6a"
            fadeDistance={8}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />

          <OrbitControls
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minDistance={1.5}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
