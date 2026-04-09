// Query preset management utilities

export interface QueryPreset {
  id: string;
  name: string;
  pageUrl: string;
  query: {
    search?: string;
    filters?: Record<string, unknown>;
    sort?: { field: string; direction: "asc" | "desc" };
    pagination?: { page: number; pageSize: number };
    columnVisibility?: Record<string, boolean>;
    columnOrder?: string[];
  };
  createdAt: number;
  isDefault?: boolean;
}

const STORAGE_KEY = "queryPresets";

export const queryPresetsManager = {
  // Get all presets for a page
  getPagePresets(pageUrl: string): QueryPreset[] {
    try {
      const presets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return (presets[pageUrl] || []).sort((a: QueryPreset, b: QueryPreset) => {
        // Default presets first, then by creation date
        if (a.isDefault) return -1;
        if (b.isDefault) return 1;
        return b.createdAt - a.createdAt;
      });
    } catch {
      return [];
    }
  },

  // Save a new preset
  savePreset(preset: Omit<QueryPreset, "id" | "createdAt">): void {
    const id = `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newPreset: QueryPreset = {
      ...preset,
      id,
      createdAt: Date.now(),
    };

    try {
      const allPresets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (!allPresets[preset.pageUrl]) {
        allPresets[preset.pageUrl] = [];
      }
      allPresets[preset.pageUrl].push(newPreset);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allPresets));
    } catch (error) {
      console.error("Failed to save preset:", error);
    }
  },

  // Update a preset
  updatePreset(
    pageUrl: string,
    presetId: string,
    updates: Partial<QueryPreset>
  ): QueryPreset | null {
    try {
      const allPresets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (!allPresets[pageUrl]) return null;

      const index = allPresets[pageUrl].findIndex((p: QueryPreset) => p.id === presetId);
      if (index === -1) return null;

      const updated = { ...allPresets[pageUrl][index], ...updates, id: presetId, pageUrl };
      allPresets[pageUrl][index] = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allPresets));

      return updated;
    } catch (error) {
      console.error("Failed to update preset:", error);
      return null;
    }
  },

  // Delete a preset
  deletePreset(pageUrl: string, presetId: string): boolean {
    try {
      const allPresets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (!allPresets[pageUrl]) return false;

      allPresets[pageUrl] = allPresets[pageUrl].filter((p: QueryPreset) => p.id !== presetId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allPresets));
      return true;
    } catch (error) {
      console.error("Failed to delete preset:", error);
      return false;
    }
  },

  // Set as default preset
  setDefaultPreset(pageUrl: string, presetId: string): boolean {
    try {
      const allPresets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (!allPresets[pageUrl]) return false;

      allPresets[pageUrl] = allPresets[pageUrl].map((p: QueryPreset) => ({
        ...p,
        isDefault: p.id === presetId,
      }));

      localStorage.setItem(STORAGE_KEY, JSON.stringify(allPresets));
      return true;
    } catch (error) {
      console.error("Failed to set default preset:", error);
      return false;
    }
  },

  // Get default preset for a page
  getDefaultPreset(pageUrl: string): QueryPreset | null {
    const presets = this.getPagePresets(pageUrl);
    return presets.find((p) => p.isDefault) || null;
  },
};
