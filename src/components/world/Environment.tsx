import { THEME_CONFIG } from "@/config/theme";

export function Environment() {
  const { fog, colors } = THEME_CONFIG;

  return (
    <>
      <color attach="background" args={[colors.obsidian]} />
      <fog attach="fog" args={[fog.color, fog.near, fog.far]} />
    </>
  );
}

export default Environment;
