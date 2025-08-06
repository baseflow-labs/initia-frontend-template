import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikErrors, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";

import * as HousingApi from "../../../api/profile/housing";
import { deleteIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import Button from "../../../components/core/button";
import Spinner from "../../../components/core/spinner";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { getHousingDataInputs } from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  customButtons: React.ReactNode;
  initialValues: object[];
  beneficiary: string;
  onFormSubmit: (values: any) => void;
  saveData: (values: any) => void;
}

const HousingsFormView = ({
  customButtons = <></>,
  initialValues = [{ nationalAddressNumber: "" }],
  beneficiary,
  onFormSubmit,
  saveData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading } = useAppSelector((state) => state.loading);

  const [housing, setHousing] = useState(initialValues);
  const [activeCollapse, setActiveCollapse] = useState<number>(
    initialValues.length
  );

  useEffect(() => setHousing(initialValues), [initialValues]);

  const remove = (i = 0) => {
    setHousing((current) => current.filter((_, y) => y !== i));
  };

  const housingDataInputs = (formik: FormikProps<Record<string, any>>) =>
    getHousingDataInputs(t, formik);

  const validateNationalAddressNumber = (values: Record<string, any>) => {
    const errors: FormikErrors<Record<string, any>> = {};
    const addressCode: string =
      values.nationalAddressNumber?.trim().toUpperCase() || "";

    const regex = /^[A-Z]{4}[0-9]{4}$/;

    if (!regex.test(addressCode)) {
      errors.nationalAddressNumber = t(
        "Global.Form.Errors.InvalidNationalAddressNumber"
      );
    }

    return errors;
  };

  return (
    <Fragment>
      {housing?.map((housing: any, i: number) => (
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
                  setActiveCollapse(activeCollapse === i ? housing.length : i);
                }}
              >
                <FontAwesomeIcon icon={faHome} className="me-2" />{" "}
                {t("Auth.MembershipRegistration.Form.Housing.Housing") +
                  " " +
                  (housing.nationalAddressNumber || i + 1)}
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
                inputs={housingDataInputs}
                submitText={
                  t("Auth.MembershipRegistration.Form.Housing.SaveHousing") +
                  " " +
                  (housing.nationalAddressNumber || i + 1)
                }
                customValidate={validateNationalAddressNumber}
                initialValues={housing}
                onFormSubmit={(e) => {
                  HousingApi.createOrUpdate({
                    beneficiary,
                    ...e,
                  })
                    .then(() => {
                      setActiveCollapse(housing.length);

                      dispatch(
                        addNotification({
                          msg: t(
                            "Auth.MembershipRegistration.Form.Housing.HousingSaved",
                            { name: e.nationalAddressNumber }
                          ),
                        })
                      );

                      const data = [...housing, e]
                        .filter((d) => d.nationalAddressNumber)
                        .reverse()
                        .reduce(
                          (final, data) =>
                            final.find(
                              (f: any) =>
                                f.nationalAddressNumber ===
                                data.nationalAddressNumber
                            )
                              ? final
                              : [...final, data],
                          []
                        )
                        .reverse();

                      setHousing(data);
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
          setActiveCollapse(housing.length);
          setHousing((current) => [...current, { nationalAddressNumber: "" }]);
        }}
      >
        {t("Auth.MembershipRegistration.Form.Housing.AddNew")}{" "}
        <FontAwesomeIcon icon={faHome} />
      </Button>

      {customButtons}

      <Button
        type="button"
        disabled={loading.length > 0}
        color="info"
        className={`w-${customButtons ? "50" : "100"} p-2`}
        onClick={() => onFormSubmit(housing)}
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

export default HousingsFormView;
