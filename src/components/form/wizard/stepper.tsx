import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react/jsx-runtime";
import BoxedPage from "@/layouts/auth/pages/boxedPage";

interface Props {
  currentStep: number;
  setCurrentStep: (current: any) => any;
  steps: {
    label: string;
    name: string;
    contents: React.ReactNode;
  }[];
}

const WizardFormStepper = ({ steps, currentStep, setCurrentStep }: Props) => {
  const onStepJump = (i = 0) => {
    i < currentStep ? setCurrentStep(i) : console.log("Can't Jump Forward");
  };

  return (
    <div className="bs-stepper">
      {currentStep === steps.length - 1 ? (
        ""
      ) : (
        <div className="bs-stepper-header w-100 overflow-x-auto" role="tablist">
          {steps
            .filter((_, i) => i !== steps.length - 1)
            .map(({ label, name }, i) => (
              <Fragment key={i}>
                <div className="step" data-target={`#step-${i + 1}`}>
                  <button
                    type="button"
                    className={`step-trigger ${
                      currentStep === i
                        ? "active"
                        : currentStep > i
                        ? "done"
                        : ""
                    }`}
                    role="tab"
                    disabled={i > currentStep}
                    id={`trigger-${i + 1}`}
                    aria-controls={`step-${i + 1}`}
                    onClick={() => onStepJump(i)}
                  >
                    <span className={`bs-stepper-circle`}>
                      {currentStep > i ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        i + 1
                      )}
                    </span>

                    <span className={`bs-stepper-label d-none d-lg-block`}>
                      {label}
                    </span>
                  </button>
                </div>

                {i !== steps.length - 2 && (
                  <div
                    className={`bs-stepper-line ${
                      currentStep >= i ? "active" : ""
                    }`}
                  />
                )}
              </Fragment>
            ))}
        </div>
      )}

      <span className="d-block d-lg-none text-primary text-center mt-4">
        {steps[currentStep]?.label}
      </span>

      <BoxedPage hideHeader>
        <Fragment>{steps[currentStep]?.contents}</Fragment>
      </BoxedPage>
    </div>
  );
};

export default WizardFormStepper;
