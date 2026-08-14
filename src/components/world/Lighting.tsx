import { DESIGN_SYSTEM } from "@/DESIGN_SYSTEM";

export function Lighting() {
  const { ambient, directional, point } = DESIGN_SYSTEM.lighting;

  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={ambient.intensity} color={ambient.color} />

      {/* Primary Key Light */}
      <directionalLight
        position={[...directional.position]}
        intensity={directional.intensity}
        color={directional.color}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Electric Cyan Accent Point Light */}
      <pointLight
        position={[...point.position]}
        intensity={point.intensity}
        color={point.color}
        distance={25}
        decay={2}
      />
    </>
  );
}

export default Lighting;
