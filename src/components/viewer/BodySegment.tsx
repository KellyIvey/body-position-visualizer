import { useRef } from 'react';
import * as THREE from 'three';

export interface BodySegmentProps {
  /** Geometry type for the segment */
  shape: 'capsule' | 'box' | 'sphere';
  /** Dimensions [radius/width, height/depth, depth] */
  dims: [number, number, number?];
  /** Color of the segment */
  color: string;
  /** Local position offset */
  position?: [number, number, number];
  /** Local rotation in radians [x, y, z] */
  rotation?: [number, number, number];
  /** Child segments */
  children?: React.ReactNode;
}

/**
 * Renders a single body segment using Three.js geometry primitives.
 * Supports capsule, box, and sphere shapes.
 */
export function BodySegment({
  shape,
  dims,
  color,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  children,
}: BodySegmentProps) {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = (() => {
    switch (shape) {
      case 'capsule':
        return <capsuleGeometry args={[dims[0], dims[1], 8, 16]} />;
      case 'box':
        return <boxGeometry args={[dims[0], dims[1], dims[2] ?? dims[0]]} />;
      case 'sphere':
        return <sphereGeometry args={[dims[0], 16, 16]} />;
    }
  })();

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        {geometry}
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      </mesh>
      {children}
    </group>
  );
}
