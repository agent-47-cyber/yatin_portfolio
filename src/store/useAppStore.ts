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
  selectedMilestoneYear: string;
  activeHoverId: string | null;

  // Actions
  transition: (newState: ApplicationState) => boolean;
  skipIntro: () => void;
  setIntroComplete: () => void;
  toggleAudio: () => void;
  selectProject: (id: string | null) => void;
  selectMilestone: (year: string) => void;
  setTransitioning: (transitioning: boolean) => void;
  setActiveHover: (id: string | null) => void;
  markSectionVisited: (section: SectionId) => void;
}

const VALID_TRANSITIONS: Record<ApplicationState, ApplicationState[]> = {
  BOOT: ["LOADING", "INTRO", "MISSION_CONTROL"],
  LOADING: ["INTRO", "MISSION_CONTROL"],
  INTRO: ["MISSION_CONTROL"],
  MISSION_CONTROL: ["ABOUT", "PROJECTS", "EXPERIENCE", "OUTRO"],
  ABOUT: ["MISSION_CONTROL", "PROJECTS", "EXPERIENCE"],
  PROJECTS: ["MISSION_CONTROL", "PROJECT_DETAIL", "ABOUT", "EXPERIENCE"],
  PROJECT_DETAIL: ["PROJECTS", "MISSION_CONTROL"],
  EXPERIENCE: ["MISSION_CONTROL", "ABOUT", "PROJECTS"],
  OUTRO: ["MISSION_CONTROL"],
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
  selectedMilestoneYear: "2024",
  activeHoverId: null,

  transition: (newState: ApplicationState) => {
    const { currentState, isTransitioning } = get();

    if (currentState === newState) return false;

    // Allow startup lifecycle states even if camera is transitioning
    const isStartupState =
      currentState === "BOOT" ||
      currentState === "LOADING" ||
      currentState === "INTRO" ||
      newState === "MISSION_CONTROL";

    if (!isStartupState && isTransitioning) {
      return false;
    }

    const allowed = VALID_TRANSITIONS[currentState];
    if (!allowed || !allowed.includes(newState)) {
      console.warn(
        `[StateMachine] Transition fallback: ${currentState} -> ${newState}`
      );
      // Fallback: allow state transition anyway if not identical
    }

    const visited = new Set(get().visitedSections);
    if (newState === "ABOUT") visited.add("about");
    if (newState === "PROJECTS") visited.add("projects");
    if (newState === "EXPERIENCE") visited.add("experience");

    set({
      previousState: currentState,
      currentState: newState,
      visitedSections: visited,
      // Clear transitioning flag if returning to mission control
      ...(newState === "MISSION_CONTROL" ? { isTransitioning: false } : {}),
    });

    return true;
  },

  skipIntro: () => {
    set({
      isIntroSkipped: true,
      isIntroComplete: true,
      currentState: "MISSION_CONTROL",
      previousState: "INTRO",
      isTransitioning: false,
    });
  },

  setIntroComplete: () => {
    set({
      isIntroComplete: true,
      currentState: "MISSION_CONTROL",
      previousState: "INTRO",
      isTransitioning: false,
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

  selectMilestone: (year: string) => {
    set({ selectedMilestoneYear: year });
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
