/**
 * ORBIT // YATIN — Asset & GPU Readiness Manager
 * Tracks real loading state of fonts, WebGL shaders, textures, materials, and first-frame GPU render.
 */

export interface AssetManifestItem {
  id: string;
  type: "font" | "shader" | "model" | "texture" | "gpu" | "topology";
  critical: boolean;
}

export const ASSET_MANIFEST: AssetManifestItem[] = [
  {
    id: "system_fonts",
    type: "font",
    critical: true,
  },
  {
    id: "shader_compilation",
    type: "shader",
    critical: true,
  },
  {
    id: "materials_verified",
    type: "texture",
    critical: true,
  },
  {
    id: "gpu_frame_ready",
    type: "gpu",
    critical: true,
  },
  {
    id: "topology_mounted",
    type: "topology",
    critical: true,
  },
];

class AssetManagerService {
  private loadedAssets: Set<string> = new Set();
  private totalCritical = ASSET_MANIFEST.filter((a) => a.critical).length;
  private progressCallbacks: Array<(progress: number) => void> = [];

  constructor() {
    // Check font readiness if in browser environment
    if (typeof window !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        this.markLoaded("system_fonts");
      });
    } else {
      this.markLoaded("system_fonts");
    }
  }

  public getProgress(): number {
    if (this.totalCritical === 0) return 1.0;
    const loadedCritical = ASSET_MANIFEST.filter(
      (a) => a.critical && this.loadedAssets.has(a.id)
    ).length;
    return loadedCritical / this.totalCritical;
  }

  public isCriticalReady(): boolean {
    return this.getProgress() >= 1.0;
  }

  public markLoaded(id: string): void {
    if (this.loadedAssets.has(id)) return;
    this.loadedAssets.add(id);
    const p = this.getProgress();
    this.progressCallbacks.forEach((cb) => cb(p));
  }

  public onProgress(callback: (progress: number) => void): () => void {
    this.progressCallbacks.push(callback);
    // Trigger immediate current progress on registration
    callback(this.getProgress());
    return () => {
      this.progressCallbacks = this.progressCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  public isLoaded(id: string): boolean {
    return this.loadedAssets.has(id);
  }
}

export const AssetManager = new AssetManagerService();
export default AssetManager;
