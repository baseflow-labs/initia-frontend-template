import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import Button from "../../../components/core/button";

interface Props {
  steps: {
    label: string;
    name: string;
    contents: React.ReactNode;
  }[];
}

const WizardFormStepper = ({ steps }: Props) => {
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);

  const onNextStep = () => setCurrentStep((current) => current + 1);
  const onPreviousStep = () => setCurrentStep((current) => current - 1);

  const onStepJump = (i = 0) => {
    i < currentStep ? setCurrentStep(i) : console.log("Can't Jump Forward");
  };

  return (
    <Fragment>
      <div className="bs-stepper">
        <div className="bs-stepper-header w-100" role="tablist">
          {steps.map(({ label, name }, i) => (
            <Fragment key={i}>
              <div className="step" data-target={`#step-${i + 1}`}>
                <button
                  type="button"
                  className="step-trigger"
                  role="tab"
                  disabled={i > currentStep}
                  id={`trigger-${i + 1}`}
                  aria-controls={`step-${i + 1}`}
                  onClick={() => onStepJump(i)}
                >
                  <span
                    className={`bs-stepper-circle ${
                      currentStep === i
                        ? "active"
                        : currentStep > i
                        ? "done"
                        : ""
                    }`}
                  >
                    {currentStep > i ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      i + 1
                    )}
                  </span>

                  <span className="bs-stepper-label">{label}</span>
                </button>
              </div>

              <div
                className={`bs-stepper-line ${
                  currentStep >= i ? "active" : ""
                }`}
              />
            </Fragment>
          ))}
        </div>

        <div className="bs-stepper-content">{steps[currentStep]?.contents}</div>

        <div className="text-center">
          <Button
            disabled={currentStep === 0}
            onClick={() => onPreviousStep()}
            outline
          >
            {t("Global.Labels.Previous")}
          </Button>

          <Button className="ms-4" onClick={() => onNextStep()}>
            {t("Global.Labels.SaveContinue")}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default WizardFormStepper;
