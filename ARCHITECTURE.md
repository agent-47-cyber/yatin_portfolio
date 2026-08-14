# ARCHITECTURE.md
Version: 2.0

# ORBIT // YATIN — Technical Architecture

---

## TECH STACK

### Core

- Next.js 15 (React Compiler enabled)
- TypeScript (strict mode)
- Tailwind CSS v4

### 3D

- Three.js (WebGL via React Three Fiber)
- React Three Fiber
- Drei

### Animation

- GSAP — 95% of all animation (camera, timelines, scene transitions, object movement, text sequences, cinematic intro)
- Framer Motion — only for opacity, mounting, unmounting, tiny UI presence

### State

- Zustand

### Post-Processing

- @react-three/postprocessing (Bloom, Vignette, DOF, subtle noise, restrained chromatic aberration)

### Audio (Phase 9)

- Howler.js (optional, muted by default, integrated in Phase 9)

### Development Only

- Leva (3D parameter tweaking, never in production)
- ESLint
- Prettier

### Deployment

- Cloudflare Pages (Static Export, Edge compatible)

### NOT Used

- Lenis (no meaningful scrolling)
- react-use (native hooks used instead)
- Framer Motion for anything beyond mount/unmount/opacity

---

## ASSET PIPELINE

```
Development (procedural placeholders)
    ↓
Optimized GLB models
    ↓
Draco geometry compression
    ↓
KTX2 textures
    ↓
Cloudflare CDN (immutable caching)
```

---

## IMPORT CONVENTIONS

- Absolute imports only via `@/` path alias.
- Never use relative navigation (`../../`).
- Never mix relative and absolute imports.

---

## FOLDER STRUCTURE

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── scene/
│   │   ├── World.tsx
│   │   ├── Station.tsx
│   │   ├── SceneManager.tsx
│   │   └── PostProcessing.tsx
│   │
│   ├── world/
│   │   ├── Lighting.tsx
│   │   ├── Environment.tsx
│   │   └── Particles.tsx
│   │
│   ├── about/
│   │   ├── Observatory.tsx
│   │   └── ObservatoryContent.tsx
│   │
│   ├── projects/
│   │   ├── Archive.tsx
│   │   ├── ArchiveObject.tsx
│   │   └── ArchiveDetail.tsx
│   │
│   ├── experience/
│   │   ├── OrbitalHistory.tsx
│   │   ├── OrbitRing.tsx
│   │   └── OrbitNode.tsx
│   │
│   ├── camera/
│   │   └── CameraController.tsx
│   │
│   ├── effects/
│   │   └── TransitionOverlay.tsx
│   │
│   └── ui/
│       ├── Navigation.tsx
│       ├── MagneticButton.tsx
│       ├── CustomCursor.tsx
│       ├── TextReveal.tsx
│       └── LoadingScreen.tsx
│
├── motion/
│   ├── camera/
│   │   ├── intro.ts
│   │   ├── transitions.ts
│   │   ├── parallax.ts
│   │   └── idle.ts
│   │
│   ├── ui/
│   │   ├── cursor.ts
│   │   ├── magnetic.ts
│   │   ├── hover.ts
│   │   └── text.ts
│   │
│   ├── sections/
│   │   ├── about.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── transitions.ts
│   │
│   └── timeline/
│       ├── intro.ts
│       └── outro.ts
│
├── hooks/
│   ├── usePerformanceMonitor.ts
│   ├── useAdaptiveQuality.ts
│   ├── useReducedMotion.ts
│   ├── useInteraction.ts
│   └── useSectionTransition.ts
│
├── store/
│   ├── useAppStore.ts
│   ├── useSceneStore.ts
│   └── usePerformanceStore.ts
│
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   └── about.ts
│
├── lib/
│   ├── assets.ts
│   ├── math.ts
│   └── utils.ts
│
├── config/
│   ├── camera.ts
│   ├── theme.ts
│   ├── performance.ts
│   ├── postprocessing.ts
│   └── navigation.ts
│
├── types/
│   └── index.ts
│
├── DESIGN_SYSTEM.ts
│
public/
├── models/
├── textures/
├── hdr/
├── images/
├── audio/
└── fonts/
│
docs/
├── DESIGN.md
├── RULES.md
├── ARCHITECTURE.md
├── ANIMATION.md
├── ASSETS.md
├── DESIGN_SYSTEM.md
├── SCENE_GRAPH.md
├── STATE_MACHINE.md
└── PERFORMANCE.md
```

No misc/.

No stuff/.

No random folders.

No random components in the root.

---

## CORE ARCHITECTURAL PRINCIPLES

### 1. World-First

The world always exists.

Never switch scenes.

Never unmount the world.

Camera moves. Environment changes. Sections activate.

Everything happens inside one persistent world.

### 2. Motion Engine

All animation logic lives in src/motion/.

Components never contain GSAP timelines directly.

Components call motion functions from motion/.

Motion functions receive refs and targets.

Motion functions return timeline instances for cleanup.

### 3. No React State in useFrame

Never call setState inside useFrame.

Use refs for mutable per-frame values.

Use GSAP for orchestrated animation.

React state is for UI state only.

### 4. Centralized Configuration

Nothing is hardcoded in components.

All values come from:

- DESIGN_SYSTEM.ts (animation, spacing, colors, typography)
- config/camera.ts (camera positions, targets)
- config/theme.ts (Three.js colors, lighting values)
- config/performance.ts (quality tiers, thresholds)
- config/postprocessing.ts (effect parameters)
- config/navigation.ts (section definitions, labels)

### 5. Asset Manager

All assets load through lib/assets.ts.

No direct useGLTF() or useTexture() calls scattered in components.

AssetManager provides:

- ModelCache
- TextureCache
- HDRCache
- AudioCache

### 6. Scene Manager

SceneManager orchestrates section activation.

Instead of `if (section === "about")` everywhere.

SceneManager → Observatory / Archive / OrbitalHistory.

Everything listens to SceneManager.

### 7. Interaction Manager

All hover, click, focus, release events go through a centralized interaction system via useInteraction hook.

Components do not have independent onHover/onClick/onLeave logic.

Consistent behavior across the entire application.

---

## COMPONENT RESPONSIBILITIES

### app/

| File | Responsibility |
| :--- | :--- |
| `layout.tsx` | Root layout, font loading, metadata, global providers |
| `page.tsx` | Main page composition, Canvas setup, overlay UI layers |
| `globals.css` | Tailwind config, CSS custom properties, global resets |

### components/scene/

| File | Responsibility |
| :--- | :--- |
| `World.tsx` | Root 3D component. Composes Station, Lighting, Environment, Particles, Camera, PostProcessing. The persistent world. |
| `Station.tsx` | The orbital station geometry. Always present. |
| `SceneManager.tsx` | Orchestrates section activation/deactivation. Reads store. Controls visibility, environment changes. |
| `PostProcessing.tsx` | Bloom, Vignette, DOF, noise, chromatic aberration. Adaptive. |

### components/world/

| File | Responsibility |
| :--- | :--- |
| `Lighting.tsx` | All lights, shadows, environment map binding |
| `Environment.tsx` | HDR environment, fog, atmospheric effects |
| `Particles.tsx` | Ambient particle system (dust, stars). Adaptive count. |

### components/about/

| File | Responsibility |
| :--- | :--- |
| `Observatory.tsx` | 3D glass chamber, floating portrait geometry, environment |
| `ObservatoryContent.tsx` | 2D overlay: magazine-style typography, bio, text reveals |

### components/projects/

| File | Responsibility |
| :--- | :--- |
| `Archive.tsx` | 3D archive environment, manages project objects |
| `ArchiveObject.tsx` | Individual project 3D object, hover/click via InteractionManager |
| `ArchiveDetail.tsx` | Immersive project detail, screenshot display, links |

### components/experience/

| File | Responsibility |
| :--- | :--- |
| `OrbitalHistory.tsx` | 3D orbital ring structure |
| `OrbitRing.tsx` | Ring/path geometry, camera path |
| `OrbitNode.tsx` | Individual experience point with content |

### components/camera/

| File | Responsibility |
| :--- | :--- |
| `CameraController.tsx` | Reads targets from config/camera.ts. Executes GSAP timelines from motion/camera.ts. Idle drift. Mouse parallax. |

### components/effects/

| File | Responsibility |
| :--- | :--- |
| `TransitionOverlay.tsx` | Cinematic transition veil between sections |

### components/ui/

| File | Responsibility |
| :--- | :--- |
| `Navigation.tsx` | Bottom nav: 01 ABOUT, 02 PROJECTS, 03 EXPERIENCE |
| `MagneticButton.tsx` | Reusable magnetic hover button |
| `CustomCursor.tsx` | Custom cursor with context-aware states |
| `TextReveal.tsx` | Reusable text reveal animation component |
| `LoadingScreen.tsx` | Loading progress, asset tracking |

### motion/

| File | Responsibility |
| :--- | :--- |
| `camera.ts` | Camera GSAP timelines (section transitions, intro approach) |
| `cursor.ts` | Cursor lerp, state transitions |
| `hover.ts` | Object hover scale, position, dim effects |
| `magnetic.ts` | Magnetic button attraction logic |
| `parallax.ts` | Mouse parallax for objects and camera |
| `section.ts` | Section enter/exit animation sequences |
| `text.ts` | Text reveal timelines (word, character, clip-path, line) |
| `timeline.ts` | Master timeline engine (Intro, Section, Project, Outro) |

### hooks/

| File | Responsibility |
| :--- | :--- |
| `usePerformanceMonitor.ts` | FPS tracking, quality regression triggers |
| `useAdaptiveQuality.ts` | Returns quality tier, controls DPR/effects |
| `useReducedMotion.ts` | Reads prefers-reduced-motion |
| `useInteraction.ts` | Centralized hover/click/focus/release system |
| `useSectionTransition.ts` | Section transition orchestration |

### store/

| File | Responsibility |
| :--- | :--- |
| `useAppStore.ts` | currentSection, isIntroComplete, isAudioEnabled |
| `useSceneStore.ts` | selectedProject, projectDetailActive, sectionState |
| `usePerformanceStore.ts` | qualityTier, fps, adaptations active |

### config/

| File | Responsibility |
| :--- | :--- |
| `camera.ts` | Camera targets per section (position, rotation, lookAt, duration, easing) |
| `theme.ts` | Three.js colors, lighting intensities, material params. Shared by React and Three.js. |
| `performance.ts` | Quality tier thresholds, DPR values, particle counts per tier |
| `postprocessing.ts` | Effect parameters per quality tier |
| `navigation.ts` | Section definitions, labels, indices |

### lib/

| File | Responsibility |
| :--- | :--- |
| `assets.ts` | AssetManager: ModelCache, TextureCache, HDRCache, AudioCache |
| `math.ts` | Lerp, clamp, normalize, remap utilities |
| `utils.ts` | General utilities |

### types/

| File | Responsibility |
| :--- | :--- |
| `index.ts` | All TypeScript interfaces: Project, Experience, AboutData, CameraTarget, AppState, QualityTier, SectionId |

### DESIGN_SYSTEM.ts

Single source of truth for all design tokens.

Every animation timing. Every easing. Every spacing. Every radius. Every shadow. Every color. Every typography size. Every opacity.

Nothing is ever hardcoded in components.

---

## DATA FLOW

```
User Input (click/hover)
    ↓
InteractionManager (hooks/useInteraction.ts)
    ↓
Store (store/useAppStore.ts)
    ↓
SceneManager (components/scene/SceneManager.tsx)
    ↓
CameraController ← config/camera.ts ← motion/camera.ts
    ↓
GSAP Timeline ← DESIGN_SYSTEM.ts
    ↓
World updates (lighting, environment, section visibility)
```

---

## CONTENT CONSTRAINT

The portfolio contains ONLY THREE primary sections:

01 — ABOUT (Observatory)

02 — PROJECTS (Archive)

03 — EXPERIENCE (Orbital History)

Do not create:

- Contact page
- Skills page
- Resume page
- Blog
- Services
- Testimonials
- AI assistant
- Terminal
- Cybersecurity section
- Separate education section
- Separate achievements section
- Extra navigation destinations

If information such as skills or education is necessary, it appears INSIDE Observatory or OrbitalHistory content.

It must never become a separate section.

END OF FILE.
