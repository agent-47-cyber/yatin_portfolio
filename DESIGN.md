# DESIGN.md
Version: 2.0

# ORBIT // YATIN — Visual Language

---

## CONCEPT

A mysterious futuristic observation station floating above a planet.

The visitor enters the station.

The world always exists.

Camera moves. Environment changes. Sections activate.

Never "switch scenes."

The visitor should feel like they are in one gigantic orbital station.

There are three massive objects in the environment:

01 — ABOUT (Observatory)
A suspended glass chamber containing the identity.

02 — PROJECTS (Archive)
A massive rotating holographic archive containing projects.

03 — EXPERIENCE (Orbital History)
A chronological orbital structure showing the journey.

No unnecessary navigation.

No unnecessary sections.

---

## VISUAL DIRECTION

Think:

Interstellar × Apple × Awwwards × futuristic editorial design

NOT:

gaming website × neon everywhere

The biggest difference is restraint.

---

## COLOR PALETTE

| Token | Name | Value | Usage |
| :--- | :--- | :--- | :--- |
| `--obsidian` | Obsidian Black | `#0a0a0c` | Primary background, deep space |
| `--warm-white` | Warm White | `#f0ece4` | Primary text, headings |
| `--soft-silver` | Soft Silver | `#8a8a8e` | Secondary text, muted labels |
| `--electric-cyan` | Electric Cyan | `#00e5ff` | Primary accent, interactive states |
| `--warm-orange` | Warm Orange | `#ff6b2b` | Secondary accent, very subtle use |
| `--glass-bg` | Glass Background | `hsla(240, 10%, 12%, 0.4)` | Glass panels, overlays |
| `--glass-border` | Glass Border | `hsla(0, 0%, 100%, 0.06)` | Subtle glass edges |

Most of the scene should be dark and monochromatic.

Then the cyan/orange accents become extremely powerful.

All colors are exported from config/theme.ts and DESIGN_SYSTEM.ts.

Never hardcode hex values in components.

---

## TYPOGRAPHY

Primary Heading: Syne (Google Fonts)
- Ultra-bold, wide, modern
- Used for: YATIN, section titles, project names, big stats

Secondary / Body: Inter (Google Fonts)
- Neutral, clean, highly readable
- Used for: descriptions, labels, meta text, navigation indices

Mono / System: JetBrains Mono (Google Fonts)
- Used for: INITIALIZING, system text, indices like 01 02 03

### Typography Scale

| Level | Size (desktop) | Weight | Font |
| :--- | :--- | :--- | :--- |
| Display | clamp(4rem, 8vw, 10rem) | 800 | Syne |
| H1 | clamp(2.5rem, 5vw, 5rem) | 700 | Syne |
| H2 | clamp(1.5rem, 3vw, 2.5rem) | 600 | Syne |
| Body | 1rem (16px) | 400 | Inter |
| Caption | 0.75rem (12px) | 400 | Inter |
| Mono | 0.75rem (12px) | 400 | JetBrains Mono |

---

## VISUAL PRIORITY ORDER

When making any design, composition, or rendering decision, follow this strict hierarchy:

1. **Motion**
2. **Composition**
3. **Typography**
4. **Lighting**
5. **Interaction**
6. **Materials**
7. **Effects**

**Golden Rule of Aesthetics**: Never add an effect if it weakens a higher priority item.
- Do not add bloom that reduces typography readability.
- Do not add particles that distract from interaction.
- Do not add lighting that hurts composition.

---

## DESIGN PHILOSOPHY

### Contrast Between 3D and 2D

The best version alternates between 3D spectacle and extremely clean 2D typography.

3D station → cinematic camera move → almost-black screen → gigantic typography → 3D environment → clean editorial information → back into 3D.

That contrast is what makes it feel premium.

### Restraint

- No excessive neon
- No rainbow gradients
- No gamer-style UI
- No generic glassmorphism
- No excessive cards
- No excessive rounded rectangles
- No Bootstrap or Material UI patterns

### Weight

The website should have weight.

Objects feel massive.

Camera feels physical.

Typography feels carved.

Transitions feel expensive.

---

## NAVIGATION

No conventional navbar.

At the bottom of the screen:

```
01              02              03
ABOUT           PROJECTS        EXPERIENCE
```

Huge typography index numbers.

Almost invisible labels underneath.

Very Apple.

Hover behavior:

```
01
ABOUT
```

Index and label separate vertically.

Subtle scale increase.

The environment subtly reacts (lighting shift, camera drift).

The camera begins moving toward that destination.

Click: the entire world transitions.

---

## SECTIONS

### Opening Sequence (7-8 seconds, skippable immediately)

Black screen.

Tiny text: `ORBITAL SYSTEM 01`

Then: `INITIALIZING`

A thin horizontal line begins travelling across the screen.

A distant light appears.

Subtle low-frequency ambience.

The light grows larger.

Camera approaches the orbital station.

Then the entire station becomes visible.

```
YATIN
KHANDELWAL

SOFTWARE ENGINEER
```

And underneath: `[ ENTER ]`

The station comes alive.

Skip at any point via click or keypress.

Recruiters decide within seconds. Respect their time.

### 01 — ABOUT (Observatory)

Camera enters a huge glass chamber.

Floating portrait / silhouette / visual representation.

Magazine layout. No paragraphs.

```
YATIN KHANDELWAL

Software Engineer
```

Then:

```
"I build software
that blends engineering,
AI and interaction."
```

Then tiny details.

Words reveal progressively.

Concise. Human. No HUD overload.

### 02 — PROJECTS (Archive)

Camera enters a huge dark archive.

3–5 projects floating in space.

Not cards. Ever.

Each project is an object → experience → presentation.

Each project is a different physical object:

- DevScope: translucent computational sphere
- AI/ML project: neural-network-like structure
- Cybersecurity project: glowing network topology
- Full-stack project: miniature architectural environment

Project objects slowly rotate.

Hover: object comes toward camera, background dims.

```
01
DEVSCOPE
AI / FULL STACK
2026
```

Then: `VIEW PROJECT →`

Click: object explodes into immersive project presentation.

#### Project Detail

Giant typography: project name.

Project screenshot as floating glass display.

Scroll/wheel/drag: screenshot rotates.

Around it:

```
PROBLEM
SOLUTION
TECHNOLOGY
RESULT
```

At the bottom:

```
LIVE SITE ↗
GITHUB ↗
```

Then: `RETURN TO ORBIT`

Camera smoothly exits.

### 03 — EXPERIENCE (Orbital History)

Not a timeline. An orbital history.

Orbital ring structure. Not a boring vertical list.

Each experience is a point along the orbit.

```
2024
     ●

2025
        ●

2026
              ●
```

Camera follows the orbital path.

As you move:

```
2026
SOFTWARE ENGINEERING
Company / Organization
Description...
```

Previous experience fades into distance.

Next one approaches.

### Final Scene (Outro)

After visiting all three sections:

Camera slowly backs away.

Station gets smaller.

Lights dim.

```
TRANSMISSION COMPLETE
```

Fade to black.

No giant contact form. No unnecessary sections.

---

## RENDERING LAYERS

Separate rendering concerns:

1. **3D** — Three.js Canvas, world, objects
2. **HUD** — Navigation, status indicators
3. **Typography** — Section labels, editorial text
4. **Cursor** — Custom cursor overlay
5. **Transition** — Section transition overlays
6. **Debug** — Leva controls (development only)

---

## QUALITY BAR

The result should feel suitable for:

- Awwwards
- CSS Design Awards
- FWA

The site must prioritize:

- art direction
- interaction design
- motion design
- typography
- composition
- performance
- accessibility
- technical quality

Do not chase visual effects for their own sake.

The website should feel expensive because of restraint, timing, spacing, composition and motion.

---

## FINAL PRINCIPLE

Make the visitor forget they are browsing a portfolio.

They should feel like they are entering a world.

But the portfolio content must remain immediately understandable:

ABOUT — PROJECTS — EXPERIENCE

Only three destinations.

Everything else exists to make those three destinations extraordinary.

END OF FILE.
