"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { Object3D, type InstancedMesh } from "three";
import {
  matStarParticle,
  matDustParticle,
  geoStarSphere,
  geoDustSphere,
} from "@/lib/SharedMaterials";

// Pre-allocated static Object3D to eliminate garbage collection inside useFrame
const dummy = new Object3D();

export function Particles() {
  const { particleCount } = useAdaptiveQuality();

  const starMeshRef = useRef<InstancedMesh>(null);
  const dustMeshRef = useRef<InstancedMesh>(null);

  // Background Starfield Coordinates
  const starData = useMemo(() => {
    const data = [];
    const count = particleCount;
    for (let i = 0; i < count; i++) {
      const radius = 60 + Math.random() * 160;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const scale = 0.04 + Math.random() * 0.12;
      const speed = 0.01 + Math.random() * 0.03;

      data.push({ x, y, z, scale, speed, phase: Math.random() * Math.PI * 2 });
    }
    return data;
  }, [particleCount]);

  // Foreground Micro-Dust Coordinates (Creates spatial parallax depth)
  const dustData = useMemo(() => {
    const data = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 30;
      const scale = 0.02 + Math.random() * 0.04;
      const speed = 0.02 + Math.random() * 0.05;

      data.push({ x, y, z, scale, speed, phase: Math.random() * Math.PI * 2 });
    }
    return data;
  }, []);

  // Per-frame multi-plane particle drift (Zero allocations)
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // 1. Background Stars Slow Rotation
    if (starMeshRef.current) {
      starData.forEach((star, i) => {
        const pulse = Math.sin(time * star.speed * 20 + star.phase) * 0.3 + 1;
        dummy.position.set(star.x, star.y, star.z);
        dummy.scale.setScalar(star.scale * pulse);
        dummy.updateMatrix();
        starMeshRef.current?.setMatrixAt(i, dummy.matrix);
      });
      starMeshRef.current.instanceMatrix.needsUpdate = true;
      starMeshRef.current.rotation.y = time * 0.003;
    }

    // 2. Foreground Floating Dust Parallax
    if (dustMeshRef.current) {
      dustData.forEach((dust, i) => {
        const dy = Math.sin(time * dust.speed + dust.phase) * 0.4;
        const dx = Math.cos(time * dust.speed * 0.8 + dust.phase) * 0.3;
        dummy.position.set(dust.x + dx, dust.y + dy, dust.z);
        dummy.scale.setScalar(dust.scale);
        dummy.updateMatrix();
        dustMeshRef.current?.setMatrixAt(i, dummy.matrix);
      });
      dustMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Background Starfield */}
      <instancedMesh
        ref={starMeshRef}
        args={[geoStarSphere, matStarParticle, starData.length]}
        frustumCulled={false}
      />

      {/* Foreground Ambient Space Dust */}
      <instancedMesh
        ref={dustMeshRef}
        args={[geoDustSphere, matDustParticle, dustData.length]}
        frustumCulled={false}
      />
    </group>
  );
}

export default Particles;
