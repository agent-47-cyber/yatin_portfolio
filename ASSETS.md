# ASSETS.md
Version: 1.0

# ORBIT // YATIN — Asset Specification

---

## ASSET DIRECTORIES

```
public/
├── models/      ← 3D models (.glb, .gltf)
├── textures/    ← Textures, normal maps, environment maps
├── hdr/         ← HDR environment maps
├── images/      ← Project screenshots, portraits, icons
├── audio/       ← Ambient sounds, interaction sounds
└── fonts/       ← Self-hosted font files (if needed)
```

Every asset must be placed in the correct directory.

No assets in the project root.

No assets in random component folders.

---

## 3D MODELS

### Format

- Primary: `.glb` (binary glTF)
- Fallback: `.gltf` (only if `.glb` is not viable)

### Compression

- Use Draco compression for geometry
- Target: < 500KB per model (uncompressed geometry)
- Station total budget: < 5MB compressed

### Naming Convention

```
station_main.glb
chamber_glass.glb
archive_frame.glb
orbit_ring.glb
project_sphere.glb
project_network.glb
project_topology.glb
project_architecture.glb
```

Lowercase. Underscores. Descriptive.

### Rules

- Never include unused meshes
- Remove invisible geometry
- Merge meshes where possible
- Bake complex materials to textures
- Optimize polygon count (target < 10k tris per object)
- Lazy load all models
- Use Suspense boundaries

---

## TEXTURES

### Format

- Primary: `.webp` (screenshots, UI images)
- 3D Textures: KTX2/Basis where appropriate
- Fallback: `.png` (only for transparency requirements)
- Never use `.bmp` or uncompressed `.tiff`

### Compression

- Project screenshots: max 200KB each, 1920×1080 max resolution
- Normal maps: max 512×512 unless detail requires more
- Environment textures: KTX2 compressed

### Naming Convention

```
project_devscope_screenshot.webp
project_aiml_screenshot.webp
portrait_yatin.webp
noise_grain.webp
normal_glass.ktx2
```

Lowercase. Underscores. Descriptive. Include category prefix.

### Rules

- Never use oversized textures
- Always compress before committing
- Reuse textures where possible
- Dispose textures when no longer visible

---

## HDR ENVIRONMENT

### Format

- `.hdr` or `.exr`
- Compressed to KTX2 if possible

### Budget

- Max 2MB per HDR file
- Max 1 active HDR at a time

### Naming Convention

```
env_station.hdr
env_space.hdr
```

### Rules

- Lazy load HDR files
- Dispose when switching environments
- Use lower resolution on mobile devices

---

## IMAGES

### Format

- `.webp` (primary)
- `.svg` (icons, simple graphics)
- `.png` (only if transparency + quality requires it)

### Budget

- Project screenshots: max 200KB, 1920×1080
- Portrait/avatar: max 100KB, 800×800
- Icons: SVG preferred, < 5KB each

### Naming Convention

```
screenshot_devscope.webp
screenshot_aiml.webp
avatar_yatin.webp
icon_github.svg
icon_external.svg
```

---

## AUDIO

### Format

- `.mp3` (compressed, wide compatibility)
- `.ogg` (fallback)

### Budget

- Ambient loop: max 500KB, loopable
- Interaction sounds: max 50KB each
- Total audio budget: < 2MB

### Naming Convention

```
ambient_station.mp3
sfx_hover.mp3
sfx_transition.mp3
sfx_enter.mp3
```

### Rules

- Audio is optional and muted by default
- User must explicitly enable audio
- Respect system audio preferences
- Never autoplay audio
- Lazy load audio files

---

## FONTS

### Primary Method

Use Google Fonts CDN via Next.js font optimization:

- Syne (headings)
- Inter (body)
- JetBrains Mono (system/mono text)

### Self-Hosted Fallback

If self-hosting is required:

```
public/fonts/
├── syne-variable.woff2
├── inter-variable.woff2
└── jetbrains-mono-variable.woff2
```

### Rules

- Use variable fonts (`.woff2`)
- Never use `.ttf` or `.otf` for web delivery
- Subset fonts if possible (latin only)
- Preload critical fonts

---

## GENERAL ASSET RULES

1. Every asset must have a meaningful filename
2. No duplicate assets
3. No placeholder assets in production
4. Compress everything before committing
5. Lazy load everything possible
6. Dispose assets when no longer visible
7. Track total asset budget (target < 15MB total initial load)
8. Use CDN caching via Cloudflare

---

## ASSET BUDGET SUMMARY

| Category | Budget |
| :--- | :--- |
| 3D Models (total) | < 5MB compressed |
| Textures (total) | < 3MB |
| HDR Environment | < 2MB |
| Images (total) | < 2MB |
| Audio (total) | < 2MB |
| Fonts (total) | < 500KB |
| **Total Initial Load** | **< 15MB** |

Critical path assets (fonts, initial model, CSS, JS) should be under 3MB for fast first paint.

Non-critical assets lazy loaded after interaction.

END OF FILE.
