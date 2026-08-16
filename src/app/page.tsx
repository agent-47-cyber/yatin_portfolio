"use client";

import dynamic from "next/dynamic";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
import { TransitionOverlay } from "@/components/effects/TransitionOverlay";
import { ObservatoryContent } from "@/components/about/ObservatoryContent";
import { ArchiveDetail } from "@/components/projects/ArchiveDetail";
import { OrbitalHistoryContent } from "@/components/experience/OrbitalHistoryContent";
import { HUD } from "@/components/ui/HUD";
import { Navigation } from "@/components/ui/Navigation";

// Dynamic import for persistent 3D Canvas (No SSR)
const World = dynamic(() => import("@/components/scene/World"), {
  ssr: false,
});

export default function Home() {
  // Global performance & FPS telemetry tracker
  usePerformanceMonitor();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0a0a0c]">
      {/* Layer 1: Persistent 3D World Canvas */}
      <World />

      {/* Layer 2: Asset Loading Screen */}
      <LoadingScreen />

      {/* Layer 3: Cinematic Intro Sequence */}
      <IntroOverlay />

      {/* Layer 4: Section Transition Overlay (Zero Dimming) */}
      <TransitionOverlay />

      {/* Layer 5: Observatory Section Content Overlay */}
      <ObservatoryContent />

      {/* Layer 6: Archive Project Detail Overlay */}
      <ArchiveDetail />

      {/* Layer 7: Orbital History Experience Overlay */}
      <OrbitalHistoryContent />

      {/* Layer 8: Station Telemetry HUD */}
      <HUD />

      {/* Layer 9: Minimalist Bottom Navigation */}
      <Navigation />
    </main>
  );
}
