# PERFORMANCE.md
Version: 1.0

# ORBIT // YATIN — Performance Specification

---

## PURPOSE

Performance is a first-class feature.

This is where Awwwards winners differentiate themselves.

Nobody notices quality reductions.

Everything feels smooth.

---

## TARGETS

| Device | FPS Target |
| :--- | :--- |
| Desktop (high-end) | 60 FPS |
| Laptop (mid-range) | 60 FPS |
| Mobile (reasonable) | 50 FPS minimum |

### Lighthouse

| Category | Target |
| :--- | :--- |
| Performance | > 95 |
| Accessibility | > 95 |
| SEO | > 95 |
| Best Practices | > 95 |

### Hard Budgets

| Metric | Budget |
| :--- | :--- |
| Initial JS Bundle | < 180KB gzipped |
| Draw Calls | < 40 per frame |
| Triangles | < 500k visible |
| Active Materials | < 20 |
| Shadow Maps | Maximum 2 |
| Active HDR Maps | Maximum 1 |
| Active Lights | Maximum 5 |
| Post-Processing Passes | Maximum 5 |

---

## ADAPTIVE QUALITY SYSTEM

The Performance Manager automatically adjusts rendering quality based on real-time FPS.

### Quality Tiers

| Tier | DPR | Shadows | Particles | Post-Processing | Textures |
| :--- | :--- | :--- | :--- | :--- | :--- |
| High | 1.5–2.0 | Full | 2000 | Full (Bloom, Vignette, DOF, Noise, CA) | High |
| Medium | 1.0–1.5 | Reduced | 1000 | Reduced (Bloom, Vignette only) | Medium |
| Low | 1.0 | None | 500 | Minimal (Vignette only) | Low |

### Degradation Cascade

When FPS drops, reductions happen in this order:

```
FPS drops below 55
    ↓
Disable Depth of Field
    ↓
Still below 50
    ↓
Reduce Bloom intensity
    ↓
Still below 48
    ↓
Lower DPR by 0.25
    ↓
Still below 45
    ↓
Reduce particle count by 50%
    ↓
Still below 40
    ↓
Disable shadows
    ↓
Still below 35
    ↓
Disable all post-processing except vignette
    ↓
Stable
```

Each step waits 2 seconds before applying the next reduction.

Never reduce all at once.

Nobody notices gradual changes.

### Recovery

When FPS is stable above 58 for 5 seconds:

Begin restoring quality one step at a time.

Never restore all at once.

---

## PERFORMANCE MANAGER ARCHITECTURE

```
usePerformanceMonitor (hook)
    ↓
Tracks FPS over rolling 60-frame window
    ↓
Reports to usePerformanceStore
    ↓
useAdaptiveQuality (hook)
    ↓
Reads store, returns current quality tier
    ↓
Components read quality tier
    ↓
Adjust rendering accordingly
```

### Store (usePerformanceStore.ts)

```typescript
interface PerformanceState {
  fps: number;
  qualityTier: 'high' | 'medium' | 'low';
  dpr: number;
  shadowsEnabled: boolean;
  particleCount: number;
  bloomEnabled: boolean;
  dofEnabled: boolean;
  noiseEnabled: boolean;
  chromaticAberrationEnabled: boolean;
}
```

---

## THREE.JS PERFORMANCE RULES

### Geometry

- Never create duplicate geometries
- Reuse geometries across similar objects
- Use BufferGeometry only
- Use InstancedMesh for particles and repeated elements
- Target < 10k triangles per object
- Total scene < 100k triangles

### Materials

- Reuse materials across objects with same appearance
- Never create materials inside render loops
- Dispose materials when no longer needed
- Use MeshStandardMaterial by default
- Use MeshPhysicalMaterial only for glass/transmission effects

### Textures

- Compress using KTX2/Basis where possible
- Max texture resolution: 2048×2048 (high), 1024×1024 (medium), 512×512 (low)
- Dispose textures when not visible
- Use texture atlases where practical

### Draw Calls

- Target < 40 draw calls per frame
- Use instancing to reduce draw calls
- Merge static geometry where possible

### useFrame

- Never call React setState inside useFrame
- Use refs for mutable values
- Use GSAP for orchestrated animation
- Keep useFrame callbacks lightweight
- Avoid allocations (new Vector3, etc.) inside useFrame

### Disposal

- Dispose geometries on unmount
- Dispose materials on unmount
- Dispose textures on unmount
- Dispose render targets on unmount
- Use useEffect cleanup functions
- Never introduce memory leaks

---

## LOADING PERFORMANCE

### Critical Path (< 3MB)

Must load before first paint:

- CSS
- JavaScript bundle
- Fonts (subset, woff2)
- Initial 3D geometry (station shell only)

### Lazy Loaded (after interaction)

- Full station model
- Section-specific models
- HDR environment maps
- Project screenshots
- Audio files
- Full textures

### Loading Manager

All assets load through lib/assets.ts (AssetManager).

```
AssetManager
    ↓
Track total assets
    ↓
Track loaded assets
    ↓
Report progress (0-100%)
    ↓
Signal "critical ready" (intro can start)
    ↓
Signal "fully loaded" (all assets cached)
```

LoadingScreen shows progress.

Transition to INTRO when critical assets are ready.

Continue loading non-critical assets in background.

---

## BUNDLE PERFORMANCE

### Code Splitting

- Dynamic import for Three.js Canvas (no SSR)
- Dynamic import for section components
- Dynamic import for post-processing
- Dynamic import for audio (Howler.js)

### Tree Shaking

- Import only used Drei helpers
- Import only used postprocessing effects
- Never import entire libraries

### Bundle Budget

| Category | Target |
| :--- | :--- |
| Initial JS | < 150KB gzipped |
| Initial CSS | < 20KB gzipped |
| Total initial transfer | < 200KB |
| Three.js + R3F chunk | < 200KB gzipped |
| GSAP chunk | < 35KB gzipped |

---

## NETWORK PERFORMANCE

### Caching

- All static assets: immutable Cache-Control headers
- Cloudflare CDN caching
- Service worker for repeat visits (optional)

### Compression

- Brotli compression for text assets
- WebP for images
- Draco for 3D models
- KTX2 for textures

### Preloading

- Preload critical fonts
- Preload initial model
- Prefetch section assets on hover (anticipatory loading)

---

## MONITORING

### Development

- Leva panel with FPS display
- R3F Stats component
- Console warnings for:
  - Draw calls > 40
  - Triangles > 100k
  - FPS < 50

### Production

- Performance API metrics
- Web Vitals tracking
- No console output

---

## MOBILE CONSIDERATIONS

- Touch events instead of hover
- No custom cursor on touch devices
- Simplified particle system
- Reduced post-processing
- DPR capped at 1.0
- Simplified navigation (tap instead of hover)
- Reduced animation complexity (fewer staggered reveals)
- Respect prefers-reduced-motion

---

## RULES

1. Never sacrifice user experience for visual effects.
2. Always measure before and after adding effects.
3. If an effect drops FPS below target, make it adaptive or remove it.
4. Performance regression is a bug.
5. Every frame matters.

END OF FILE.
