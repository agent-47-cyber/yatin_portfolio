"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { Object3D, type Group, type InstancedMesh } from "three";
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
  const starGroupRef = useRef<Group>(null);
  const dustGroupRef = useRef<Group>(null);

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

  // Upload immutable instance transforms only when the quality tier changes.
  // The previous implementation rewrote over 2,000 matrices every animation
  // frame, which consumed GPU bandwidth without a perceptible visual benefit.
  useEffect(() => {
    if (!starMeshRef.current) return;
    starData.forEach((star, i) => {
      dummy.position.set(star.x, star.y, star.z);
      dummy.scale.setScalar(star.scale);
      dummy.updateMatrix();
      starMeshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    starMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [starData]);

  useEffect(() => {
    if (!dustMeshRef.current) return;
    dustData.forEach((dust, i) => {
      dummy.position.set(dust.x, dust.y, dust.z);
      dummy.scale.setScalar(dust.scale);
      dummy.updateMatrix();
      dustMeshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    dustMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [dustData]);

  // Per-frame group motion preserves ambient life without per-instance uploads.
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (starGroupRef.current) {
      starGroupRef.current.rotation.y = time * 0.003;
    }
    if (dustGroupRef.current) {
      dustGroupRef.current.position.y = Math.sin(time * 0.08) * 0.18;
      dustGroupRef.current.rotation.y = Math.sin(time * 0.03) * 0.025;
    }
  });

  return (
    <group>
      {/* Background Starfield */}
      <group ref={starGroupRef}>
        <instancedMesh
          ref={starMeshRef}
          args={[geoStarSphere, matStarParticle, starData.length]}
          frustumCulled={false}
        />
      </group>

      {/* Foreground Ambient Space Dust */}
      <group ref={dustGroupRef}>
        <instancedMesh
          ref={dustMeshRef}
          args={[geoDustSphere, matDustParticle, dustData.length]}
          frustumCulled={false}
        />
      </group>
    </group>
  );
}

export default Particles;
