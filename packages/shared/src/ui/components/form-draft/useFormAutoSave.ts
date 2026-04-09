import { useEffect, useRef, useCallback, useState } from "react";

import { formDraftsManager } from "./formDraftsManager";

interface UseFormAutoSaveOptions {
  interval?: number; // auto-save interval in ms (default: 2000)
  onAutoSave?: () => void;
  onResume?: (values: Record<string, unknown>) => void;
  onDiscardDraft?: () => void;
}

/**
 * Hook for auto-saving form drafts
 * Usage:
 * const { hasDraft, resumeDraft, clearDraft, saveNow } = useFormAutoSave(
 *   formUrl,
 *   formValues,
 *   { interval: 2000 }
 * );
 */
export const useFormAutoSave = (
  formUrl: string,
  formValues: Record<string, unknown>,
  options: UseFormAutoSaveOptions = {}
) => {
  const { interval = 2000, onAutoSave, onResume, onDiscardDraft } = options;
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedValuesRef = useRef<Record<string, unknown>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [draftExists, setDraftExists] = useState(false);

  // Check if draft exists on mount
  useEffect(() => {
    formDraftsManager.clearExpiredDrafts();
    const draft = formDraftsManager.getDraft(formUrl);
    setDraftExists(!!draft);
  }, [formUrl]);

  // Setup auto-save
  useEffect(() => {
    // Check if form has changed
    const hasChanged = JSON.stringify(formValues) !== JSON.stringify(lastSavedValuesRef.current);

    if (hasChanged) {
      // Clear existing timer
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }

      // Set new timer
      autoSaveTimerRef.current = setTimeout(() => {
        setSaveStatus("saving");
        formDraftsManager.saveDraft(formUrl, formValues);
        lastSavedValuesRef.current = formValues;
        setDraftExists(true);

        setSaveStatus("saved");
        onAutoSave?.();

        // Reset status after a delay
        setTimeout(() => setSaveStatus("idle"), 3000);
      }, interval);
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [formValues, formUrl, interval, onAutoSave]);

  const resumeDraft = useCallback(() => {
    const draft = formDraftsManager.getDraft(formUrl);
    if (draft) {
      onResume?.(draft.values);
      return draft.values;
    }
    return null;
  }, [formUrl, onResume]);

  const clearDraft = useCallback(() => {
    formDraftsManager.deleteDraft(formUrl);
    setDraftExists(false);
    onDiscardDraft?.();
  }, [formUrl, onDiscardDraft]);

  const saveNow = useCallback(() => {
    setSaveStatus("saving");
    formDraftsManager.saveDraft(formUrl, formValues);
    lastSavedValuesRef.current = formValues;
    setSaveStatus("saved");
    setDraftExists(true);

    setTimeout(() => setSaveStatus("idle"), 2000);
  }, [formUrl, formValues]);

  return {
    hasDraft: draftExists,
    saveStatus,
    resumeDraft,
    clearDraft,
    saveNow,
  };
};

/**
 * Hook for preventing page navigation with unsaved draft
 */
export const useFormDraftWarning = (hasDraft: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasDraft) {
        e.preventDefault();
        e.returnValue = "You have unsaved form changes. Are you sure you want to leave?";
        return "You have unsaved form changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasDraft]);
};
