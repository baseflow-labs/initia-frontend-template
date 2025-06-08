import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react/jsx-runtime";

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
    <Fragment>
      <div className="bs-stepper">
        {currentStep === steps.length - 1 ? (
          ""
        ) : (
          <div className="bs-stepper-header w-100" role="tablist">
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

                      <span className="bs-stepper-label">{label}</span>
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

        <div className="bs-stepper-content border border-gray rounded-5 p-5 mt-5">
          {steps[currentStep]?.contents}
        </div>
      </div>
    </Fragment>
  );
};

export default WizardFormStepper;
