import { create } from "zustand";
import type { ApplicationState, SectionId } from "@/types";

interface AppStoreState {
  currentState: ApplicationState;
  previousState: ApplicationState | null;
  visitedSections: Set<SectionId>;
  isIntroComplete: boolean;
  isIntroSkipped: boolean;
  isAudioEnabled: boolean;
  isTransitioning: boolean;
  selectedProjectId: string | null;
  activeHoverId: string | null;

  // Actions
  transition: (newState: ApplicationState) => boolean;
  skipIntro: () => void;
  setIntroComplete: () => void;
  toggleAudio: () => void;
  selectProject: (id: string | null) => void;
  setTransitioning: (transitioning: boolean) => void;
  setActiveHover: (id: string | null) => void;
  markSectionVisited: (section: SectionId) => void;
}

const VALID_TRANSITIONS: Record<ApplicationState, ApplicationState[]> = {
  BOOT: ["LOADING"],
  LOADING: ["INTRO"],
  INTRO: ["MISSION_CONTROL"],
  MISSION_CONTROL: ["ABOUT", "PROJECTS", "EXPERIENCE", "OUTRO"],
  ABOUT: ["MISSION_CONTROL", "PROJECTS", "EXPERIENCE"],
  PROJECTS: ["MISSION_CONTROL", "PROJECT_DETAIL", "ABOUT", "EXPERIENCE"],
  PROJECT_DETAIL: ["PROJECTS"],
  EXPERIENCE: ["MISSION_CONTROL", "ABOUT", "PROJECTS"],
  OUTRO: [],
};

export const useAppStore = create<AppStoreState>((set, get) => ({
  currentState: "BOOT",
  previousState: null,
  visitedSections: new Set<SectionId>(),
  isIntroComplete: false,
  isIntroSkipped: false,
  isAudioEnabled: false,
  isTransitioning: false,
  selectedProjectId: null,
  activeHoverId: null,

  transition: (newState: ApplicationState) => {
    const { currentState, isTransitioning } = get();

    if (currentState === newState) return false;
    if (isTransitioning) return false;

    const allowed = VALID_TRANSITIONS[currentState];
    if (!allowed || !allowed.includes(newState)) {
      console.warn(
        `[StateMachine] Invalid transition attempt: ${currentState} -> ${newState}`
      );
      return false;
    }

    const visited = new Set(get().visitedSections);
    if (newState === "ABOUT") visited.add("about");
    if (newState === "PROJECTS") visited.add("projects");
    if (newState === "EXPERIENCE") visited.add("experience");

    set({
      previousState: currentState,
      currentState: newState,
      visitedSections: visited,
    });

    return true;
  },

  skipIntro: () => {
    set({
      isIntroSkipped: true,
      isIntroComplete: true,
      currentState: "MISSION_CONTROL",
      previousState: "INTRO",
    });
  },

  setIntroComplete: () => {
    set({
      isIntroComplete: true,
      currentState: "MISSION_CONTROL",
      previousState: "INTRO",
    });
  },

  toggleAudio: () => {
    set((state) => ({ isAudioEnabled: !state.isAudioEnabled }));
  },

  selectProject: (id: string | null) => {
    if (id) {
      set({
        selectedProjectId: id,
        previousState: get().currentState,
        currentState: "PROJECT_DETAIL",
      });
    } else {
      set({
        selectedProjectId: null,
        previousState: get().currentState,
        currentState: "PROJECTS",
      });
    }
  },

  setTransitioning: (transitioning: boolean) => {
    set({ isTransitioning: transitioning });
  },

  setActiveHover: (id: string | null) => {
    set({ activeHoverId: id });
  },

  markSectionVisited: (section: SectionId) => {
    const visited = new Set(get().visitedSections);
    visited.add(section);
    set({ visitedSections: visited });
  },
}));
