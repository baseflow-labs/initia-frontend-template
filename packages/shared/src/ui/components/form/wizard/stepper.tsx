import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

import BoxedPage from "../../../layouts/auth/pages/boxedPage";

interface Props {
  currentStep: number;
  setCurrentStep: (current: number) => void;
  draftKey?: string;
  enableDraft?: boolean;
  steps: {
    label: string;
    name: string;
    contents: React.ReactNode;
  }[];
}

const WizardFormStepper = ({
  steps,
  currentStep,
  setCurrentStep,
  draftKey,
  enableDraft,
}: Props) => {
  const [hasDraft, setHasDraft] = useState(false);
  const finalDraftKey = draftKey ? `wizardDraft:${draftKey}` : undefined;

  useEffect(() => {
    if (!enableDraft || !finalDraftKey) return;
    const saved = localStorage.getItem(finalDraftKey);
    if (!saved) return;
    const parsed = Number(saved);
    if (!Number.isNaN(parsed) && parsed >= 0 && parsed < steps.length) {
      setCurrentStep(parsed);
      setHasDraft(true);
    }
  }, [enableDraft, finalDraftKey, setCurrentStep, steps.length]);

  useEffect(() => {
    if (!enableDraft || !finalDraftKey) return;
    localStorage.setItem(finalDraftKey, `${currentStep}`);
    setHasDraft(true);
  }, [enableDraft, finalDraftKey, currentStep]);

  const onStepJump = (i = 0) => {
    if (i < currentStep) {
      setCurrentStep(i);
    }
  };

  return (
    <div className="bs-stepper">
      {currentStep === steps.length - 1 ? (
        ""
      ) : (
        <div className="bs-stepper-header w-100 overflow-x-auto" role="tablist">
          {steps
            .filter((_, i) => i !== steps.length - 1)
            .map(({ label }, i) => (
              <Fragment key={i}>
                <div className="step" data-target={`#step-${i + 1}`}>
                  <button
                    type="button"
                    className={`step-trigger ${
                      currentStep === i ? "active" : currentStep > i ? "done" : ""
                    }`}
                    role="tab"
                    disabled={i > currentStep}
                    id={`trigger-${i + 1}`}
                    aria-controls={`step-${i + 1}`}
                    onClick={() => onStepJump(i)}
                  >
                    <span className={`bs-stepper-circle`}>
                      {currentStep > i ? <FontAwesomeIcon icon={faCheck} /> : i + 1}
                    </span>

                    <span className={`bs-stepper-label d-none d-lg-block`}>{label}</span>
                  </button>
                </div>

                {i !== steps.length - 2 && (
                  <div className={`bs-stepper-line ${currentStep >= i ? "active" : ""}`} />
                )}
              </Fragment>
            ))}
        </div>
      )}

      <span className="d-block d-lg-none text-primary text-center mt-4">
        {steps[currentStep]?.label}
      </span>

      {enableDraft && finalDraftKey && (
        <div className="d-flex justify-content-end gap-2 mb-3">
          {hasDraft && (
            <button
              type="button"
              className="btn btn-sm btn-outline-info"
              onClick={() => {
                const saved = localStorage.getItem(finalDraftKey);
                const parsed = Number(saved);
                if (!Number.isNaN(parsed) && parsed >= 0 && parsed < steps.length) {
                  setCurrentStep(parsed);
                }
              }}
            >
              Resume Draft
            </button>
          )}
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              localStorage.removeItem(finalDraftKey);
              setHasDraft(false);
              setCurrentStep(0);
            }}
          >
            Clear Draft
          </button>
        </div>
      )}

      <BoxedPage _hideHeader>
        <Fragment>{steps[currentStep]?.contents}</Fragment>
      </BoxedPage>
    </div>
  );
};

export default WizardFormStepper;
