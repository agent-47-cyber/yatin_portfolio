# STATE_MACHINE.md
Version: 1.0

# ORBIT // YATIN — State Machine

---

## PURPOSE

Every application state is explicitly defined.

Every transition is explicit.

Never invent new states without documenting them here.

This prevents bugs, race conditions, and undefined behavior.

---

## APPLICATION STATES

```
BOOT
  ↓
LOADING
  ↓
INTRO
  ↓
MISSION_CONTROL
  ↓
ABOUT
  ↓ ↑
MISSION_CONTROL
  ↓
PROJECTS
  ↓ ↑
PROJECT_DETAIL
  ↓ ↑
PROJECTS
  ↓ ↑
MISSION_CONTROL
  ↓
EXPERIENCE
  ↓ ↑
MISSION_CONTROL
  ↓
OUTRO
```

---

## STATE DEFINITIONS

### BOOT

The application is initializing.

React is mounting.

Three.js canvas is not yet ready.

No visuals.

### LOADING

Assets are being loaded through AssetManager.

LoadingScreen is visible.

Progress is tracked.

Models, textures, HDR, fonts, audio are loading.

Transitions to INTRO when all critical assets are ready.

### INTRO

The cinematic opening sequence is playing.

IntroTimeline (motion/timeline.ts) is active.

System text appears.

Light appears.

Station reveals.

Name reveals.

[ ENTER ] appears.

Skippable at any point.

Transitions to MISSION_CONTROL on:

- User clicks ENTER
- User clicks anywhere
- User presses any key

### MISSION_CONTROL

The default state after intro.

The station is fully visible.

Navigation is visible at the bottom.

Camera is at the overview position.

No section is active.

The visitor can choose where to go.

### ABOUT

Camera has moved to the Observatory.

Observatory content is visible.

Navigation is still accessible.

Can transition back to MISSION_CONTROL or to another section.

### PROJECTS

Camera has moved to the Archive.

Project objects are visible and interactive.

Navigation is still accessible.

Can transition to PROJECT_DETAIL on click.

Can transition back to MISSION_CONTROL.

### PROJECT_DETAIL

A specific project is selected.

Camera has entered the project.

Project detail content is visible.

Navigation is hidden.

Only RETURN TO ORBIT is available.

Can transition back to PROJECTS.

### EXPERIENCE

Camera has moved to OrbitalHistory.

Orbital ring is visible.

Experience nodes are interactive.

Navigation is still accessible.

Can transition back to MISSION_CONTROL.

### OUTRO

Triggered after visiting all three sections (optional).

Camera backs away.

Station gets smaller.

Lights dim.

"TRANSMISSION COMPLETE" reveals.

Fade to black.

---

## VALID TRANSITIONS

| From | To | Trigger |
| :--- | :--- | :--- |
| BOOT | LOADING | App mounted |
| LOADING | INTRO | Critical assets loaded |
| INTRO | MISSION_CONTROL | User click/keypress or intro complete |
| MISSION_CONTROL | ABOUT | Navigation click: 01 ABOUT |
| MISSION_CONTROL | PROJECTS | Navigation click: 02 PROJECTS |
| MISSION_CONTROL | EXPERIENCE | Navigation click: 03 EXPERIENCE |
| ABOUT | MISSION_CONTROL | Navigation click or back |
| ABOUT | PROJECTS | Navigation click: 02 PROJECTS |
| ABOUT | EXPERIENCE | Navigation click: 03 EXPERIENCE |
| PROJECTS | MISSION_CONTROL | Navigation click or back |
| PROJECTS | PROJECT_DETAIL | Project object click |
| PROJECTS | ABOUT | Navigation click: 01 ABOUT |
| PROJECTS | EXPERIENCE | Navigation click: 03 EXPERIENCE |
| PROJECT_DETAIL | PROJECTS | RETURN TO ORBIT click |
| EXPERIENCE | MISSION_CONTROL | Navigation click or back |
| EXPERIENCE | ABOUT | Navigation click: 01 ABOUT |
| EXPERIENCE | PROJECTS | Navigation click: 02 PROJECTS |
| MISSION_CONTROL | OUTRO | All sections visited (optional) |

### Invalid Transitions

- LOADING → any section (must go through INTRO)
- PROJECT_DETAIL → any section directly (must return to PROJECTS first)
- OUTRO → any state (terminal state, page reload required)

---

## STATE DATA

Each state has associated data in the store:

```typescript
interface AppState {
  // Current state
  currentState: ApplicationState;
  previousState: ApplicationState | null;

  // Section tracking
  visitedSections: Set<SectionId>;

  // Loading
  loadingProgress: number;
  criticalAssetsLoaded: boolean;

  // Intro
  isIntroComplete: boolean;
  isIntroSkipped: boolean;

  // Project detail
  selectedProjectId: string | null;

  // Audio
  isAudioEnabled: boolean;

  // Transition
  isTransitioning: boolean;
}
```

---

## TRANSITION FLOW

Every state transition follows this flow:

```
User action
    ↓
Store: setCurrentState(newState)
    ↓
Store: setPreviousState(oldState)
    ↓
SceneManager: detects state change
    ↓
SceneManager: validates transition (is it in the valid transitions table?)
    ↓
SceneManager: triggers exit sequence for current state
    ↓
motion/section.ts: runs exit timeline
    ↓
SceneManager: triggers camera transition
    ↓
motion/camera.ts: runs camera timeline
    ↓
SceneManager: triggers enter sequence for new state
    ↓
motion/section.ts: runs enter timeline
    ↓
Store: isTransitioning = false
```

---

## RULES

1. Never transition to a state not in the valid transitions table.
2. Never skip states (e.g., LOADING → ABOUT).
3. Never allow transitions while isTransitioning is true.
4. Always update previousState before changing currentState.
5. Always track visited sections for outro trigger.
6. The state machine is the source of truth for what is visible and interactive.

END OF FILE.
