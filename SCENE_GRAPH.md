# SCENE_GRAPH.md
Version: 1.0

# ORBIT // YATIN — Scene Graph

---

## PURPOSE

The scene graph defines the complete 3D hierarchy.

Nothing renders itself.

Everything belongs to World.

Exactly like Unreal Engine.

---

## HIERARCHY

```
World
│
├── Lighting
│   ├── AmbientLight
│   ├── DirectionalLight (castShadow)
│   └── PointLight (electric cyan accent)
│
├── Camera
│   └── CameraController
│       ├── Idle Drift
│       ├── Mouse Parallax
│       └── GSAP Timeline Transitions
│
├── Environment
│   ├── HDR Environment Map
│   ├── Fog / Atmospheric Depth
│   └── Background Color
│
├── Station
│   ├── Station Geometry (always visible)
│   └── Station Materials
│
├── Particles
│   └── InstancedMesh (adaptive count)
│
├── Observatory (About)
│   ├── Glass Chamber Geometry
│   ├── Glass Material (MeshPhysicalMaterial)
│   ├── Floating Portrait / Silhouette
│   └── Internal Lighting
│
├── Archive (Projects)
│   ├── Archive Environment Geometry
│   ├── ArchiveObject[0] — Computational Sphere
│   ├── ArchiveObject[1] — Neural Network Structure
│   ├── ArchiveObject[2] — Network Topology
│   ├── ArchiveObject[3] — Architectural Environment
│   └── ArchiveObject[N] — Additional projects
│
├── OrbitalHistory (Experience)
│   ├── OrbitRing (ring/path geometry)
│   ├── OrbitNode[0] — 2024
│   ├── OrbitNode[1] — 2025
│   ├── OrbitNode[2] — 2026
│   └── OrbitNode[N] — Additional entries
│
└── PostProcessing
    ├── Bloom
    ├── Vignette
    ├── Depth of Field (transition-only)
    ├── Noise (film grain)
    └── Chromatic Aberration (camera-movement-only)
```

---

## RULES

### Persistence

The world is always mounted.

Never unmount World.

Never unmount Station.

Never unmount Lighting.

Never unmount Camera.

Never unmount Environment.

### Visibility

Sections (Observatory, Archive, OrbitalHistory) are always mounted but may be:

- Fully visible (active section)
- Partially visible (adjacent, dimmed)
- Hidden (opacity 0, renderOrder adjusted)

Never unmount sections. Control visibility via opacity and material properties.

This allows seamless camera transitions without loading delays.

### Ownership

Every 3D object has exactly one parent in the scene graph.

No object renders itself independently.

No floating components outside the hierarchy.

### Rendering Order

1. Environment (background)
2. Station (mid-ground)
3. Section objects (foreground)
4. Particles (overlay)
5. PostProcessing (screen-space)

### Performance

Objects outside camera frustum should not receive expensive material updates.

Use frustum culling.

Use adaptive level-of-detail when possible.

Disable shadows on objects not in the active section.

---

## SCENE MANAGER RELATIONSHIP

```
SceneManager reads → Store (currentSection)
SceneManager controls → Section visibility
SceneManager triggers → CameraController transition
SceneManager updates → Lighting mood
SceneManager updates → Environment atmosphere
SceneManager triggers → Motion timelines
```

SceneManager is the orchestrator.

Individual sections never control their own activation.

---

## CAMERA POSITIONS

Camera positions for each section are defined in config/camera.ts.

The scene graph is laid out in 3D space such that:

- Observatory occupies one region
- Archive occupies another region
- OrbitalHistory occupies another region

Camera travels between them.

The station is always visible from every angle (at varying distances).

This creates the feeling of one continuous world.

END OF FILE.
