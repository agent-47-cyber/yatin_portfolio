import type { NavigationItem } from "@/types";

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    id: "about",
    index: "01",
    label: "ABOUT",
    internalName: "Observatory",
  },
  {
    id: "projects",
    index: "02",
    label: "PROJECTS",
    internalName: "Archive",
  },
  {
    id: "experience",
    index: "03",
    label: "EXPERIENCE",
    internalName: "OrbitalHistory",
  },
] as const;

export const SITE_IDENTITY = {
  name: "YATIN KHANDELWAL",
  role: "SOFTWARE ENGINEER",
  systemName: "ORBITAL SYSTEM 01",
  coordinates: "OBSERVATION STATION // 43.12° N, 79.38° W",
  tagline: "I build software that blends engineering, AI and interaction.",
  closingStatement: "TRANSMISSION COMPLETE",
} as const;
