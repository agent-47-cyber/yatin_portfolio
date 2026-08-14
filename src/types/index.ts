/**
 * ORBIT // YATIN — Core TypeScript Type Definitions
 * Single source of truth for all data structures, states, and interfaces.
 */

export type ApplicationState =
  | "BOOT"
  | "LOADING"
  | "INTRO"
  | "MISSION_CONTROL"
  | "ABOUT"
  | "PROJECTS"
  | "PROJECT_DETAIL"
  | "EXPERIENCE"
  | "OUTRO";

export type SectionId = "about" | "projects" | "experience";

export type QualityTier = "high" | "medium" | "low";

export type ProjectObjectType =
  | "computational"
  | "neural"
  | "topology"
  | "architectural";

export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  technology: string[];
  result: string;
  liveUrl?: string;
  githubUrl?: string;
  objectType: ProjectObjectType;
  accentColor?: string;
}

export interface Experience {
  id: string;
  year: string;
  period: string;
  organization: string;
  role: string;
  description: string;
  accomplishments: string[];
  technologies?: string[];
  coordinates?: {
    orbitAngle: number;
    orbitRadius: number;
    height: number;
  };
}

export interface AboutData {
  name: string;
  title: string;
  roleSubtitle: string;
  statement: string;
  bio: string;
  focusAreas: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  metrics: Array<{
    label: string;
    value: string;
  }>;
}

export interface CameraTarget {
  position: readonly [number, number, number];
  rotation?: readonly [number, number, number];
  lookAt: readonly [number, number, number];
  duration: number;
  easing: string;
}

export interface PerformanceState {
  fps: number;
  qualityTier: QualityTier;
  dpr: number;
  shadowsEnabled: boolean;
  particleCount: number;
  bloomEnabled: boolean;
  dofEnabled: boolean;
  noiseEnabled: boolean;
  chromaticAberrationEnabled: boolean;
}

export interface NavigationItem {
  id: SectionId;
  index: string;
  label: ApplicationState;
  internalName: "Observatory" | "Archive" | "OrbitalHistory";
}
