/**
 * ORBIT // YATIN — Asset Manager
 * Centralized registry and caching layer for all 3D assets, textures, HDRs, and audio.
 */

export interface AssetManifestItem {
  id: string;
  url: string;
  type: "model" | "texture" | "hdr" | "audio";
  critical: boolean;
}

export const ASSET_MANIFEST: AssetManifestItem[] = [
  {
    id: "station_shell",
    url: "/models/station_main.glb",
    type: "model",
    critical: true,
  },
  {
    id: "env_space",
    url: "/hdr/env_space.hdr",
    type: "hdr",
    critical: false,
  },
];

class AssetManagerService {
  private loadedAssets: Set<string> = new Set();
  private totalCritical = ASSET_MANIFEST.filter((a) => a.critical).length;
  private progressCallbacks: Array<(progress: number) => void> = [];

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
    this.loadedAssets.add(id);
    const p = this.getProgress();
    this.progressCallbacks.forEach((cb) => cb(p));
  }

  public onProgress(callback: (progress: number) => void): () => void {
    this.progressCallbacks.push(callback);
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
