# ANIMATION.md
Version: 2.0

# ORBIT // YATIN — Animation Specification

---

## ANIMATION PHILOSOPHY

Animations should feel premium.

The website should have weight.

Every animation must have a purpose.

Do not animate everything.

Do not make everything bounce.

Do not make everything glow.

Do not make everything rotate.

All animation values come from DESIGN_SYSTEM.ts.

Never hardcode duration, easing, or timing values in components.

All animation logic lives in src/motion/.

Components call motion functions. Components never contain GSAP timelines directly.

---

## ANIMATION ENGINE

### GSAP (95%)

Used for:

- Camera choreography
- Scene transitions
- Object motion
- Timeline sequences
- Cinematic intro
- Text reveals
- Complex coordinated animation
- Cursor lerping
- Magnetic button attraction
- Parallax

### Framer Motion (5%)

Used only for:

- Opacity transitions on mount/unmount
- Presence animation (AnimatePresence)
- Tiny UI state changes

Never use Framer Motion for camera, objects, text reveals, or transitions.

---

## EASING

Never use linear easing for cinematic movement.

### Preferred Easing Curves

| Name | GSAP | Use Case |
| :--- | :--- | :--- |
| Smooth Out | `power2.out` | General UI, object settling |
| Dramatic Out | `power3.out` | Camera moves, section transitions |
| Cinematic Out | `expo.out` | Opening sequence, major reveals |
| Smooth InOut | `power2.inOut` | Bidirectional camera travel |
| Dramatic InOut | `power3.inOut` | Section-to-section camera transitions |

Never use `linear`.

Never use `bounce`.

Never use `elastic` unless specifically requested.

All easing values exported from DESIGN_SYSTEM.ts.

---

## DURATION GUIDELINES

| Category | Duration | Use Case |
| :--- | :--- | :--- |
| Micro | 200ms | Opacity, cursor state, hover feedback |
| Short | 300ms | Button interactions, tooltip, small reveals |
| Medium | 500ms | Text reveals, panel transitions, UI state changes |
| Long | 800ms | Section content reveals, object movements |
| Cinematic | 1200–2500ms | Camera transitions between sections |
| Epic | 3000–6000ms | Opening sequence, full intro timeline |

Only cinematic and epic transitions may exceed 800ms.

All duration values exported from DESIGN_SYSTEM.ts.

---

## TIMELINE ENGINE

Instead of scattered gsap.to() calls, use organized timelines.

All timelines live in motion/timeline.ts.

### Timeline Types

| Timeline | Purpose | File |
| :--- | :--- | :--- |
| IntroTimeline | Opening cinematic sequence | motion/timeline.ts |
| SectionTimeline | Section enter/exit orchestration | motion/section.ts |
| CameraTimeline | Camera transition between sections | motion/camera.ts |
| ProjectTimeline | Project detail enter/exit | motion/section.ts |
| OutroTimeline | Final scene, transmission complete | motion/timeline.ts |

Each timeline:

- Receives refs as parameters
- Returns a GSAP Timeline instance
- Can be killed/reversed for cleanup
- Reads timing values from DESIGN_SYSTEM.ts

---

## CAMERA ANIMATION

The camera is a major part of the experience.

Camera animation lives in motion/camera.ts.

Camera targets live in config/camera.ts.

### Rules

Never teleport between sections.

Never instantly change camera position.

Never instantly rotate.

Never snap.

### Camera Movement Must Feel

- Slow acceleration
- Smooth travel
- Subtle overshoot (tiny)
- Controlled deceleration
- Final settle

### Camera Transition Pattern

```
Start → Ease in → Smooth travel → Tiny overshoot → Settle
```

GSAP timeline with `power3.inOut` for travel, `power2.out` for settle.

Typical section-to-section camera transition: 1500–2500ms.

### Camera During Sections

- Subtle idle drift (very slow, nearly imperceptible)
- Mouse parallax influence (normalized, damped, via motion/parallax.ts)
- Never aggressive rotation
- Never motion sickness

### Camera Data Flow

```
Navigation click
    ↓
Store (setSection)
    ↓
SceneManager
    ↓
CameraController
    ↓
config/camera.ts (target lookup)
    ↓
motion/camera.ts (GSAP timeline)
    ↓
Camera moves
```

---

## OBJECT ANIMATION

Animation logic lives in motion/hover.ts.

### Idle State

- Slow floating (sinusoidal Y offset, period 4–8s, amplitude 0.05–0.15)
- Subtle rotation (0.1–0.3 rad/s maximum)
- Parallax response to mouse (damped, lerped, via motion/parallax.ts)

### Hover State

- Scale up subtly (1.0 → 1.05, 300ms, power2.out)
- Move toward camera slightly (Z offset, 300ms)
- Background dims (opacity transition, 500ms)

### Click / Active State

- Object moves to center frame
- Other objects fade (opacity 0, 500ms)
- Typography reveals begin

### Exit State

- Reverse of enter
- Object returns to position
- Other objects fade back in

---

## TYPOGRAPHY ANIMATION

Animation logic lives in motion/text.ts.

### Text Reveal Patterns

#### Word-by-word reveal

- Each word fades in + translates up
- Stagger: 50–80ms per word
- Duration: 500ms per word
- Easing: power3.out

#### Character reveal

- Each character slides in from bottom
- Stagger: 20–40ms per character
- Duration: 400ms per character
- Easing: power2.out

#### Clip-path reveal

- Text revealed via clip-path from left/bottom
- Duration: 800ms
- Easing: power3.inOut

#### Line reveal

- Entire line translates up from behind a mask
- Stagger: 100–150ms per line
- Duration: 600ms per line
- Easing: power3.out

### Rules

- Never reveal all text at once
- Always stagger
- Always use transform + opacity (never animate width/height)
- Text animations should never block user interaction

---

## TRANSITION ANIMATION

Animation logic lives in motion/section.ts.

### Section Transition Pattern

1. Current section content fades out (300ms, power2.out)
2. Transition overlay animates in (dark veil, 400ms)
3. Camera begins moving (1500–2500ms, power3.inOut)
4. Transition overlay fades (400ms, power2.out)
5. New section content reveals (staggered, 500–800ms)

Total perceived transition: ~2500–3500ms

The environment itself should transition. That is much more impressive than:

```
opacity: 0 → 1
```

### 3D ↔ 2D Contrast

Alternate between 3D spectacle and clean 2D typography:

3D station → cinematic camera move → almost-black screen → gigantic typography → 3D environment → clean editorial → back into 3D

---

## OPENING SEQUENCE TIMELINE (7-8 seconds)

Timeline lives in motion/timeline.ts as IntroTimeline.

| Time | Event | Duration |
| :--- | :--- | :--- |
| 0.0s | Black screen | — |
| 0.3s | "ORBITAL SYSTEM 01" fades in (mono, small) | 600ms |
| 1.2s | "INITIALIZING" fades in | 400ms |
| 1.8s | Thin horizontal line travels across screen | 800ms |
| 2.6s | Distant light appears | 600ms |
| 3.0s | Subtle low-frequency ambience begins | fade in 1500ms |
| 3.2s | Light grows, station silhouette visible | 1200ms |
| 4.4s | Camera approach to station | 1800ms |
| 6.2s | Station fully revealed | — |
| 6.5s | "YATIN" reveals (display size) | 600ms |
| 7.0s | "KHANDELWAL" reveals | 400ms |
| 7.4s | "SOFTWARE ENGINEER" reveals (small, muted) | 300ms |
| 7.8s | "[ ENTER ]" fades in | 300ms |
| — | User clicks ENTER | — |
| — | Station comes alive, navigation appears | 800ms |

Total intro before user interaction: ~8 seconds.

Skip immediately at any point via click or keypress.

---

## OUTRO TIMELINE

Timeline lives in motion/timeline.ts as OutroTimeline.

| Time | Event | Duration |
| :--- | :--- | :--- |
| 0.0s | Camera begins backing away | 2000ms |
| 1.0s | Station gets smaller | 2000ms |
| 2.0s | Lights dim | 1500ms |
| 3.0s | "TRANSMISSION COMPLETE" reveals | 800ms |
| 4.0s | Fade to black | 1000ms |

---

## UI MICRO-INTERACTIONS

### Magnetic Buttons (motion/magnetic.ts)

- Cursor enters button proximity (radius ~60px)
- Button shifts toward cursor position (lerped, 200ms)
- On leave: button returns to center (300ms, power2.out)

### Custom Cursor (motion/cursor.ts)

- Default: small dot (6px)
- Hovering interactive: expands (24px, 200ms)
- Hovering project: shows "VIEW" label
- Hovering navigation: shows section label
- Transition: smooth lerp following mouse (not instant)

### Navigation Hover

- Index number and label separate vertically on hover
- Subtle scale increase
- Environment reacts (lighting shift, camera drift)

---

## POST-PROCESSING ANIMATION

Post-processing effects should be subtle and restrained.

Parameters live in config/postprocessing.ts.

- Bloom: subtle glow on accent-colored elements only
- Vignette: constant, subtle darkening at edges
- DOF: activated during section transitions, disabled during interaction
- Noise: very subtle film grain
- Chromatic Aberration: extremely restrained, only during camera movement

All effects reduced or disabled on low-end devices per config/performance.ts.

---

## REDUCED MOTION

If `prefers-reduced-motion: reduce` is active:

- Disable all camera choreography (instant section switches)
- Disable parallax
- Disable particle animation
- Disable post-processing
- Keep opacity transitions (shortened to 200ms)
- Keep text content visible immediately
- The experience must remain fully usable

END OF FILE.
