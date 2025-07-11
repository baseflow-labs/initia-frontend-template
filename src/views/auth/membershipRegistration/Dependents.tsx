import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";

import * as DependentApi from "../../../api/profile/dependent";
import {
  deleteIcon,
  dependantIcon,
  dependantWhiteIcon,
} from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import Button from "../../../components/core/button";
import Spinner from "../../../components/core/spinner";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { getDependantDataInputs } from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  customButtons: React.ReactNode;
  initialValues: { fullName: string; idNumber: string }[];
  beneficiary: string;
  onFormSubmit: (values: any) => void;
  saveData: (values: any) => void;
}

const DependentsFormView = ({
  customButtons = <></>,
  initialValues = [],
  beneficiary,
  onFormSubmit,
  saveData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading } = useAppSelector((state) => state.loading);

  const [dependents, setDependents] = useState(initialValues);
  const [activeCollapse, setActiveCollapse] = useState<number>(
    initialValues.length
  );

  useEffect(() => setDependents(initialValues), [initialValues]);

  const remove = (i = 0) => {
    setDependents((current) => current.filter((_, y) => y !== i));
  };

  const dependentsDataInputs = () => getDependantDataInputs(t);

  return (
    <Fragment>
      {dependents.map((dependent: any, i: number) => (
        <div className="accordion-item my-4" key={i}>
          <h2 className="accordion-header mb-3" id={"heading" + String(i)}>
            <div className="d-flex align-items-center justify-content-between ">
              <button
                className="btn btn-ghost p-3 w-100 text-start collapsed bg-info rounded-4 text-white"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + String(i)}
                aria-expanded="false"
                type="button"
                aria-controls={"collapse" + String(i)}
                onClick={() => {
                  setActiveCollapse(
                    activeCollapse === i ? dependent.length : i
                  );
                }}
              >
                <IconWrapperComp icon={dependantWhiteIcon} className="me-2" />{" "}
                {dependent.fullName ||
                  t("Auth.MembershipRegistration.Form.Dependents.Dependant") +
                    " " +
                    (i + 1)}
              </button>

              <Button
                color="ghost"
                text="danger"
                size="sm"
                type="button"
                className="border border-1 rounded-4 py-3 ms-2 px-3"
                onClick={() => remove(i)}
              >
                <IconWrapperComp icon={deleteIcon} />
              </Button>
            </div>
          </h2>

          <div
            id={`collapse${i}`}
            className={`accordion-collapse collapse ${
              activeCollapse === i ? "show" : ""
            }`}
            aria-labelledby={`heading${i}`}
          >
            <div className="accordion-body">
              <Form
                inputs={dependentsDataInputs}
                submitText={
                  t(
                    "Auth.MembershipRegistration.Form.Dependents.SaveDependent"
                  ) +
                  " " +
                  dependent.fullName
                }
                initialValues={dependent}
                onFormSubmit={(e) => {
                  DependentApi.createOrUpdate({
                    beneficiary,
                    ...e,
                  })
                    .then(() => {
                      setActiveCollapse(dependents.length);

                      dispatch(
                        addNotification({
                          msg: t(
                            "Auth.MembershipRegistration.Form.Dependents.DependentSaved",
                            { name: e.fullName }
                          ),
                        })
                      );

                      const data = [...dependents, e]
                        .filter((d) => d.idNumber)
                        .reverse()
                        .reduce(
                          (final, data) =>
                            final.find((f: any) => f.idNumber === data.idNumber)
                              ? final
                              : [...final, data],
                          []
                        )
                        .reverse();

                      setDependents(data);
                      saveData(data);
                    })
                    .catch(apiCatchGlobalHandler);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        color="success"
        outline
        type="button"
        className="my-4"
        onClick={() => {
          setActiveCollapse(dependents.length);
          setDependents((current) => [
            ...current,
            { fullName: "", idNumber: "" },
          ]);
        }}
      >
        {t("Auth.MembershipRegistration.Form.Dependents.AddNew")}{" "}
        <IconWrapperComp icon={dependantIcon} />
      </Button>

      {customButtons}

      <Button
        type="button"
        disabled={loading.length > 0}
        color="info"
        className={`w-${customButtons ? "50" : "100"} p-2`}
        onClick={() => onFormSubmit(dependents)}
      >
        {loading.length > 0 ? (
          <small>
            <Spinner />
          </small>
        ) : (
          <div className="my-auto">{t("Global.Form.Labels.SaveContinue")}</div>
        )}
      </Button>
    </Fragment>
  );
};

export default DependentsFormView;
