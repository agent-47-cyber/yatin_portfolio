"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, type InstancedMesh } from "three";
import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

// Static dummy Object3D pre-allocated outside render loop (Zero frame allocations)
const dummy = new Object3D();
const MAX_PARTICLES = DESIGN_SYSTEM.particles.count.high;

export function Particles() {
  const meshRef = useRef<InstancedMesh>(null);
  const { particleCount } = useAdaptiveQuality();

  // Generate particle coordinate distribution once
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const radius = 8 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const speed = 0.0005 + Math.random() * 0.0015;
      const scale = 0.4 + Math.random() * 0.8;

      data.push({ x, y, z, speed, scale, radius, angle: theta });
    }
    return data;
  }, []);

  // Update instanced mesh visibility count when quality tier changes
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.count = particleCount;
    }
  }, [particleCount]);

  // Per-frame instance matrix updates via direct mutation
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.angle += p.speed * delta * 60;

      const currentX = p.x + Math.sin(p.angle) * 0.8;
      const currentY = p.y + Math.cos(p.angle * 0.7) * 0.8;
      const currentZ = p.z;

      dummy.position.set(currentX, currentY, currentZ);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, MAX_PARTICLES]}
      count={particleCount}
      frustumCulled={false}
    >
      <sphereGeometry args={[DESIGN_SYSTEM.particles.size, 6, 6]} />
      <meshBasicMaterial
        color={DESIGN_SYSTEM.colors.electricCyan}
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default Particles;
