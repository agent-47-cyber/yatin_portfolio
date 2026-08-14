# DESIGN_SYSTEM.md
Version: 1.0

# ORBIT // YATIN — Design System

---

## PURPOSE

DESIGN_SYSTEM.ts is the single source of truth for every visual and motion value in the application.

Nothing is ever hardcoded in components.

Every animation timing. Every easing. Every spacing. Every radius. Every shadow. Every color. Every typography size. Every opacity. Every cursor size. Every glow value. Every blur value. Every noise amount.

Everything comes from DESIGN_SYSTEM.ts.

Both React (CSS/DOM) and Three.js (materials/lights) share these values.

---

## FILE LOCATION

```
src/DESIGN_SYSTEM.ts
```

---

## TOKEN CATEGORIES

### Colors

| Token | Value | Usage |
| :--- | :--- | :--- |
| `colors.obsidian` | `#0a0a0c` | Primary background |
| `colors.warmWhite` | `#f0ece4` | Primary text |
| `colors.softSilver` | `#8a8a8e` | Secondary text |
| `colors.electricCyan` | `#00e5ff` | Primary accent |
| `colors.warmOrange` | `#ff6b2b` | Secondary accent |
| `colors.glassBg` | `hsla(240, 10%, 12%, 0.4)` | Glass panels |
| `colors.glassBorder` | `hsla(0, 0%, 100%, 0.06)` | Glass edges |

### Spacing

| Token | Value |
| :--- | :--- |
| `spacing.xs` | `4px` |
| `spacing.sm` | `8px` |
| `spacing.md` | `16px` |
| `spacing.lg` | `24px` |
| `spacing.xl` | `32px` |
| `spacing.2xl` | `48px` |
| `spacing.3xl` | `64px` |
| `spacing.4xl` | `96px` |

### Radius

| Token | Value | Usage |
| :--- | :--- | :--- |
| `radius.sm` | `8px` | Small elements |
| `radius.md` | `16px` | Cards, panels |
| `radius.lg` | `24px` | Large containers |
| `radius.full` | `9999px` | Circular elements |

### Typography

| Token | Size | Weight | Font |
| :--- | :--- | :--- | :--- |
| `typography.display` | `clamp(4rem, 8vw, 10rem)` | 800 | Syne |
| `typography.h1` | `clamp(2.5rem, 5vw, 5rem)` | 700 | Syne |
| `typography.h2` | `clamp(1.5rem, 3vw, 2.5rem)` | 600 | Syne |
| `typography.body` | `1rem` | 400 | Inter |
| `typography.caption` | `0.75rem` | 400 | Inter |
| `typography.mono` | `0.75rem` | 400 | JetBrains Mono |

### Animation Durations

| Token | Value | Usage |
| :--- | :--- | :--- |
| `duration.micro` | `0.2` | Opacity, cursor, hover |
| `duration.short` | `0.3` | Button, tooltip |
| `duration.medium` | `0.5` | Text reveals, panels |
| `duration.long` | `0.8` | Section content, objects |
| `duration.cinematic` | `2.2` | Camera transitions |
| `duration.epic` | `5.0` | Intro sequence |

### Easing

| Token | Value | Usage |
| :--- | :--- | :--- |
| `easing.smoothOut` | `power2.out` | General UI |
| `easing.dramaticOut` | `power3.out` | Camera, transitions |
| `easing.cinematicOut` | `expo.out` | Opening, reveals |
| `easing.smoothInOut` | `power2.inOut` | Bidirectional travel |
| `easing.dramaticInOut` | `power3.inOut` | Section transitions |

### Opacity

| Token | Value | Usage |
| :--- | :--- | :--- |
| `opacity.hidden` | `0` | Fully hidden |
| `opacity.subtle` | `0.1` | Very faint elements |
| `opacity.muted` | `0.4` | Dimmed background objects |
| `opacity.secondary` | `0.6` | Secondary text |
| `opacity.primary` | `0.85` | Primary elements |
| `opacity.full` | `1` | Fully visible |

### Cursor

| Token | Value |
| :--- | :--- |
| `cursor.defaultSize` | `6px` |
| `cursor.hoverSize` | `24px` |
| `cursor.lerpFactor` | `0.15` |

### Glass

| Token | Value |
| :--- | :--- |
| `glass.blur` | `20px` |
| `glass.opacity` | `0.4` |
| `glass.borderOpacity` | `0.06` |

### Glow

| Token | Value |
| :--- | :--- |
| `glow.intensity` | `0.8` |
| `glow.radius` | `40px` |
| `glow.color` | `colors.electricCyan` |

### Shadows

| Token | Value |
| :--- | :--- |
| `shadow.sm` | `0 2px 8px rgba(0,0,0,0.3)` |
| `shadow.md` | `0 4px 16px rgba(0,0,0,0.4)` |
| `shadow.lg` | `0 8px 32px rgba(0,0,0,0.5)` |

### Lighting (Three.js)

| Token | Value |
| :--- | :--- |
| `lighting.ambient.intensity` | `0.4` |
| `lighting.ambient.color` | `#ffffff` |
| `lighting.directional.intensity` | `1.2` |
| `lighting.directional.position` | `[5, 5, 5]` |
| `lighting.point.intensity` | `2.0` |
| `lighting.point.position` | `[-5, -3, 2]` |
| `lighting.point.color` | `colors.electricCyan` |

### Particles

| Token | Value |
| :--- | :--- |
| `particles.count.high` | `2000` |
| `particles.count.medium` | `1000` |
| `particles.count.low` | `500` |
| `particles.size` | `0.02` |
| `particles.speed` | `0.001` |

### Materials (Three.js)

| Token | Value |
| :--- | :--- |
| `materials.glass.transmission` | `0.9` |
| `materials.glass.roughness` | `0.15` |
| `materials.glass.thickness` | `1.5` |
| `materials.glass.clearcoat` | `1.0` |
| `materials.glass.metalness` | `0.1` |

### Post-Processing

| Token | Value |
| :--- | :--- |
| `postprocessing.bloom.intensity` | `0.5` |
| `postprocessing.bloom.threshold` | `0.8` |
| `postprocessing.vignette.darkness` | `0.4` |
| `postprocessing.noise.opacity` | `0.03` |
| `postprocessing.chromaticAberration.offset` | `0.0005` |

---

## RULES

1. Every visual value in a component MUST reference DESIGN_SYSTEM.ts.
2. Never write `duration: 0.8` or `opacity: 0.5` or `borderRadius: 12` directly.
3. Always write `duration: DS.duration.long` or `opacity: DS.opacity.primary`.
4. If a new token is needed, add it to DESIGN_SYSTEM.ts first.
5. Both Tailwind classes and Three.js materials share these values.
6. config/theme.ts re-exports relevant tokens for Three.js-specific usage.

END OF FILE.
