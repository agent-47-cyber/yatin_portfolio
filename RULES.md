# RULES.md
Version: 4.0

# IMPORTANT

BEFORE DOING ANYTHING:

1. Read RULES.md completely.
2. Read DESIGN.md completely.
3. Read ARCHITECTURE.md completely.
4. Read ANIMATION.md completely.
5. Read ASSETS.md completely.
6. Read DESIGN_SYSTEM.md completely.
7. Read SCENE_GRAPH.md completely.
8. Read STATE_MACHINE.md completely.
9. Read PERFORMANCE.md completely.
10. Follow every rule unless the user explicitly overrides it.
11. If any instruction conflicts with these documents, ASK before proceeding.
12. Never assume.

These files are the source of truth for the project.

This file is the highest priority for development behavior.

---

# PROJECT PHILOSOPHY

This project is a premium interactive 3D portfolio.

It is NOT a template.

It is NOT a landing page.

It is NOT a CRUD application.

It is a polished software product built like a software engine.

Every decision must improve:

- performance
- maintainability
- smoothness
- immersion
- code quality

Never prioritize writing less code over writing better code.

---

# VISUAL PRIORITY ORDER

When making any design or rendering decision, follow this strict hierarchy:

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

# RENDERING ENGINE & SHADER LOCK

### Rendering Engine Lock
- WebGL via React Three Fiber only.
- Do not migrate to WebGPU.
- Do not introduce Babylon.js, PlayCanvas, or Pixi.
- Rendering engine is strictly locked.

### Shader Policy
- Prefer `MeshPhysicalMaterial` and standard Drei materials.
- Custom GLSL shaders only when visually or mechanically impossible otherwise.
- Keep shaders modular; never create monolithic fragment shaders (>100 lines).

---

# ARCHITECTURE LOCK & CODE OWNERSHIP

The project architecture is frozen.

### Code Ownership
- Every file owns exactly one responsibility.
- Never make another file responsible for it.
- Do not duplicate logic, constants, or timelines.
- If something already exists, reuse it.

Never:
- move files
- rename folders
- split components
- merge components
- change routing
- reorganize project structure

unless explicitly instructed.

---

# IMPORTS & CODE STYLE

### Import Rules
- Absolute imports only using `@/` path aliases.
- Never use relative traversal (`../../`).
- Never mix relative and absolute imports.
- Keep imports sorted and prune unused imports.

### TypeScript & React
- TypeScript Strict Mode. Never use `any`, `ts-ignore`, or `ts-expect-error`.
- React 19 / Next.js 15 Compiler enabled.
- Write compiler-friendly pure functional components.
- Avoid unnecessary `useMemo`/`useCallback` unless performance profiling demonstrates a necessity.
- No class components.
- Keep components under ~300 lines. Extract logic to hooks, lib, or motion.

---

# PERFORMANCE BUDGETS

Hard ceilings for the application:

| Metric | Budget |
| :--- | :--- |
| Target FPS | 60 FPS Desktop / 50+ FPS Mobile |
| Initial JS Bundle | < 180KB gzipped |
| Draw Calls | < 40 per frame |
| Triangles | < 500k visible |
| Active Materials | < 20 |
| Shadow Maps | Maximum 2 |
| Active HDR Maps | Maximum 1 |
| Active Lights | Maximum 5 |
| Post-Processing Passes | Maximum 5 |

---

# THREE.JS RULES

- Never allocate objects (e.g. `new THREE.Vector3()`, `new THREE.Color()`) inside `useFrame()`.
- Reuse vectors, colors, geometries, and materials.
- Never call React `setState` or mutate Zustand inside `useFrame()`.
- Use refs and mutable values for per-frame animation.
- Dispose textures, geometries, materials, and render targets properly on unmount.
- Use InstancedMesh whenever rendering repeated elements.

---

# ANIMATION RULES

- All animation values originate from `DESIGN_SYSTEM.ts`.
- All animation logic lives in `src/motion/`.
- Components never contain complex inline GSAP timelines; they invoke the motion engine.
- GSAP drives 95% of animations (camera, objects, transitions, text reveals).
- Framer Motion is restricted to 5% (DOM presence, mount/unmount opacity).
- Never use linear easing for camera or cinematic movement.

---

# CLOUDFLARE DEPLOYMENT LOCK

- Deployment Target: Cloudflare Pages (Static Export).
- Edge-compatible; zero Node.js runtime dependencies (no `fs`, no server-only Node modules).
- Immutable asset caching on CDN.

---

---

# RUNTIME & TOOLCHAIN LOCK

- **Package Manager**: `npm` only. Never migrate to pnpm or bun. Preserve `package-lock.json`.
- **Runtime**: Node.js 22 LTS, modern evergreen browser targets.
- **Git Workflow**: 1 phase = 1 commit. Never mix unrelated changes.

---

# CANVAS & CAMERA LOCK

- **Single Canvas instance**: Never recreate or remount `<Canvas>`. Everything exists inside one persistent world.
- **Single PerspectiveCamera**: Never recreate or remount camera. Only animate transforms via CameraController.

---

# NO MAGIC NUMBERS RULE

- No hardcoded colors, spacing, font sizes, durations, easing, z-index, opacity, lighting, or camera distances.
- All values MUST originate from `DESIGN_SYSTEM.ts` or `config/`.

---

# DEFINITION OF DONE

A phase is complete only when:

✓ Build succeeds (`npm run build`)
✓ TypeScript passes with zero errors (`npx tsc --noEmit`)
✓ ESLint passes with zero errors
✓ No runtime errors or unhandled promise rejections
✓ No console warnings
✓ Architecture matches `ARCHITECTURE.md` exactly
✓ Documentation respected
✓ User approves

Only then proceed to the next phase.

---

# GOLDEN RULE

The user owns the architecture.
The user owns the design.
The user owns the codebase.
Never override user decisions. Implement requested functionality.
If uncertain, ASK. Never assume.

END OF FILE.
