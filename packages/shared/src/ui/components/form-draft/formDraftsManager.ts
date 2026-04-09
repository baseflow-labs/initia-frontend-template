// Form draft auto-save utilities

export interface FormDraft {
  id: string;
  formUrl: string;
  values: Record<string, unknown>;
  savedAt: number;
  expiresAt: number;
}

const STORAGE_KEY = "formDrafts";
const DRAFT_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

export const formDraftsManager = {
  // Generate a unique form ID
  getFormId(formUrl: string, formName?: string): string {
    return `draft_${formName || formUrl}`;
  },

  // Get draft for a form
  getDraft(formUrl: string, formName?: string): FormDraft | null {
    try {
      const formId = this.getFormId(formUrl, formName);
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const draft = drafts[formId];

      if (!draft) return null;

      // Check if draft has expired
      if (draft.expiresAt && Date.now() > draft.expiresAt) {
        this.deleteDraft(formUrl, formName);
        return null;
      }

      return draft;
    } catch {
      return null;
    }
  },

  // Auto-save form values
  saveDraft(formUrl: string, values: Record<string, unknown>, formName?: string): FormDraft {
    const formId = this.getFormId(formUrl, formName);
    const draft: FormDraft = {
      id: formId,
      formUrl,
      values,
      savedAt: Date.now(),
      expiresAt: Date.now() + DRAFT_EXPIRY_TIME,
    };

    try {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      drafts[formId] = draft;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    } catch (error) {
      console.error("Failed to save form draft:", error);
    }

    return draft;
  },

  // Delete a draft after successful submission
  deleteDraft(formUrl: string, formName?: string): boolean {
    const formId = this.getFormId(formUrl, formName);

    try {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      delete drafts[formId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
      return true;
    } catch (error) {
      console.error("Failed to delete form draft:", error);
      return false;
    }
  },

  // Clear all expired drafts
  clearExpiredDrafts(): void {
    try {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const now = Date.now();
      const validDrafts: Record<string, FormDraft> = {};

      for (const [key, draft] of Object.entries(drafts)) {
        if (!(draft as FormDraft).expiresAt || now <= (draft as FormDraft).expiresAt) {
          validDrafts[key] = draft as FormDraft;
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(validDrafts));
    } catch (error) {
      console.error("Failed to clear expired drafts:", error);
    }
  },

  // Get all drafts (for management UI)
  getAllDrafts(): FormDraft[] {
    try {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return Object.values(drafts) as FormDraft[];
    } catch {
      return [];
    }
  },
};

// Hook for React components
export const useFormDraft = (formUrl: string, formName?: string) => {
  const getFormId = () => formDraftsManager.getFormId(formUrl, formName);
  const getDraft = () => formDraftsManager.getDraft(formUrl, formName);
  const saveDraft = (values: Record<string, unknown>) =>
    formDraftsManager.saveDraft(formUrl, values, formName);
  const deleteDraft = () => formDraftsManager.deleteDraft(formUrl, formName);

  return {
    getFormId,
    getDraft,
    saveDraft,
    deleteDraft,
  };
};
