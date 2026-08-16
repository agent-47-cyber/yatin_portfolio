"use client";

import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export function Environment() {
  return (
    <>
      {/* Permanent Pure Obsidian Deep Space Background (Zero Fog Dimming) */}
      <color attach="background" args={[DESIGN_SYSTEM.colors.obsidian]} />

      {/* Distant Cosmic Backdrop Elements at ~3% opacity for subtle scale */}
      <group position={[0, -10, -90]}>
        {/* Distant Industrial Silhouettes / Superstructure Ring */}
        <mesh rotation={[0, 0, 0.4]}>
          <torusGeometry args={[85, 0.4, 8, 64]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.025}
            depthWrite={false}
          />
        </mesh>

        {/* Distant Structural Truss Lattice Spire 1 */}
        <mesh position={[-45, 15, -20]} rotation={[0, 0, -0.15]}>
          <cylinderGeometry args={[0.08, 0.25, 45, 6]} />
          <meshBasicMaterial
            color="#f0ece4"
            transparent
            opacity={0.03}
            depthWrite={false}
          />
        </mesh>

        {/* Distant Structural Truss Lattice Spire 2 */}
        <mesh position={[50, 18, -25]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.08, 0.25, 50, 6]} />
          <meshBasicMaterial
            color="#f0ece4"
            transparent
            opacity={0.03}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

export default Environment;
