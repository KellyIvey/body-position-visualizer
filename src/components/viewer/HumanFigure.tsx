import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import type { PoseAngles } from '@/types/pose';

export interface HumanFigureProps {
  /** Joint angles for this figure */
  angles: PoseAngles;
}

/** Converts degrees to radians */
const deg2rad = (d: number) => (d * Math.PI) / 180;

/**
 * Renders a complete segmented 3D human figure using geometric primitives.
 * Each body segment is connected hierarchically via joints.
 */
export function HumanFigure({ angles }: HumanFigureProps) {
  const groupRef = useRef<THREE.Group>(null);

  const colors = {
    head: '#6bb5e8',
    torso: '#3b82f6',
    limb: '#94a3b8',
    hand: '#fbbf24',
    foot: '#64748b',
  };

  const r = deg2rad;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Torso */}
      <group
        position={[0, 0, 0]}
        rotation={[r(angles.spine.x), r(angles.spine.y), r(angles.spine.z)]}
      >
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.7, 0.25]} />
          <meshStandardMaterial color={colors.torso} roughness={0.6} />
        </mesh>

        {/* Head/Neck */}
        <group
          position={[0, 0.5, 0]}
          rotation={[r(angles.head.x), r(angles.head.y), r(angles.head.z)]}
        >
          {/* Neck */}
          <mesh position={[0, 0.08, 0]} castShadow>
            <capsuleGeometry args={[0.05, 0.12, 4, 8]} />
            <meshStandardMaterial color={colors.limb} roughness={0.6} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 0.28, 0]} castShadow>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color={colors.head} roughness={0.5} />
          </mesh>
        </group>

        {/* Left Shoulder → Upper Arm → Forearm → Hand */}
        <group
          position={[0.3, 0.3, 0]}
          rotation={[r(angles.leftShoulder.x), r(angles.leftShoulder.y), r(angles.leftShoulder.z)]}
        >
          {/* Upper arm */}
          <mesh position={[0, -0.18, 0]} castShadow>
            <capsuleGeometry args={[0.065, 0.28, 4, 8]} />
            <meshStandardMaterial color={colors.limb} roughness={0.6} />
          </mesh>
          {/* Elbow joint → Forearm */}
          <group position={[0, -0.38, 0]} rotation={[r(angles.leftElbow.x), 0, 0]}>
            <mesh position={[0, -0.15, 0]} castShadow>
              <capsuleGeometry args={[0.055, 0.24, 4, 8]} />
              <meshStandardMaterial color={colors.limb} roughness={0.6} />
            </mesh>
            {/* Wrist → Hand */}
            <group position={[0, -0.28, 0]} rotation={[r(angles.leftWrist.x), 0, r(angles.leftWrist.z)]}>
              <mesh castShadow>
                <boxGeometry args={[0.1, 0.12, 0.04]} />
                <meshStandardMaterial color={colors.hand} roughness={0.5} />
              </mesh>
            </group>
          </group>
        </group>

        {/* Right Shoulder → Upper Arm → Forearm → Hand */}
        <group
          position={[-0.3, 0.3, 0]}
          rotation={[r(angles.rightShoulder.x), r(angles.rightShoulder.y), r(angles.rightShoulder.z)]}
        >
          <mesh position={[0, -0.18, 0]} castShadow>
            <capsuleGeometry args={[0.065, 0.28, 4, 8]} />
            <meshStandardMaterial color={colors.limb} roughness={0.6} />
          </mesh>
          <group position={[0, -0.38, 0]} rotation={[r(angles.rightElbow.x), 0, 0]}>
            <mesh position={[0, -0.15, 0]} castShadow>
              <capsuleGeometry args={[0.055, 0.24, 4, 8]} />
              <meshStandardMaterial color={colors.limb} roughness={0.6} />
            </mesh>
            <group position={[0, -0.28, 0]} rotation={[r(angles.rightWrist.x), 0, r(angles.rightWrist.z)]}>
              <mesh castShadow>
                <boxGeometry args={[0.1, 0.12, 0.04]} />
                <meshStandardMaterial color={colors.hand} roughness={0.5} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Pelvis / Hip area */}
      <group position={[0, -0.42, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.44, 0.2, 0.22]} />
          <meshStandardMaterial color={colors.torso} roughness={0.6} />
        </mesh>

        {/* Left Hip → Thigh → Shin → Foot */}
        <group
          position={[0.16, -0.1, 0]}
          rotation={[r(-angles.leftHip.x), r(angles.leftHip.y), r(angles.leftHip.z)]}
        >
          <mesh position={[0, -0.22, 0]} castShadow>
            <capsuleGeometry args={[0.085, 0.32, 4, 8]} />
            <meshStandardMaterial color={colors.limb} roughness={0.6} />
          </mesh>
          <group position={[0, -0.44, 0]} rotation={[r(-angles.leftKnee.x), 0, 0]}>
            <mesh position={[0, -0.2, 0]} castShadow>
              <capsuleGeometry args={[0.07, 0.32, 4, 8]} />
              <meshStandardMaterial color={colors.limb} roughness={0.6} />
            </mesh>
            <group position={[0, -0.4, 0]} rotation={[r(angles.leftAnkle.x), 0, r(angles.leftAnkle.z)]}>
              <mesh position={[0.03, -0.04, 0.06]} castShadow>
                <boxGeometry args={[0.1, 0.07, 0.22]} />
                <meshStandardMaterial color={colors.foot} roughness={0.7} />
              </mesh>
            </group>
          </group>
        </group>

        {/* Right Hip → Thigh → Shin → Foot */}
        <group
          position={[-0.16, -0.1, 0]}
          rotation={[r(-angles.rightHip.x), r(angles.rightHip.y), r(angles.rightHip.z)]}
        >
          <mesh position={[0, -0.22, 0]} castShadow>
            <capsuleGeometry args={[0.085, 0.32, 4, 8]} />
            <meshStandardMaterial color={colors.limb} roughness={0.6} />
          </mesh>
          <group position={[0, -0.44, 0]} rotation={[r(-angles.rightKnee.x), 0, 0]}>
            <mesh position={[0, -0.2, 0]} castShadow>
              <capsuleGeometry args={[0.07, 0.32, 4, 8]} />
              <meshStandardMaterial color={colors.limb} roughness={0.6} />
            </mesh>
            <group position={[0, -0.4, 0]} rotation={[r(angles.rightAnkle.x), 0, r(angles.rightAnkle.z)]}>
              <mesh position={[-0.03, -0.04, 0.06]} castShadow>
                <boxGeometry args={[0.1, 0.07, 0.22]} />
                <meshStandardMaterial color={colors.foot} roughness={0.7} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
