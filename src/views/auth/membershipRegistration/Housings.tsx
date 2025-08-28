import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FormikErrors, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";

import * as HousingApi from "../../../api/profile/housing";
import Accordion from "../../../components/accordion";
import Button from "../../../components/core/button";
import Spinner from "../../../components/core/spinner";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { getHousingDataInputs } from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  customButtons: React.ReactNode;
  initialValues: { id: string; nationalAddressNumber: string }[];
  beneficiary: string;
  onFormSubmit: (values: any) => void;
  saveData: (values: any) => void;
}

const HousingsFormView = ({
  customButtons = <></>,
  initialValues = [{ id: "", nationalAddressNumber: "" }],
  beneficiary,
  onFormSubmit,
  saveData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading } = useAppSelector((state) => state.loading);

  const [housing, setHousing] = useState(initialValues);

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
      <Accordion
        data={housing.map((record, i) => ({
          header:
            t("Auth.MembershipRegistration.Form.Housing.Housing") +
            " " +
            (i + 1),
          body: (
            <Form
              inputs={housingDataInputs}
              submitText={
                t("Auth.MembershipRegistration.Form.Housing.SaveHousing") +
                " " +
                (record.nationalAddressNumber || i + 1)
              }
              customValidate={validateNationalAddressNumber}
              initialValues={record}
              onFormSubmit={(e, resetForm) => {
                HousingApi.createOrUpdate({
                  beneficiary,
                  ...e,
                })
                  .then(() => {
                    resetForm();
                    dispatch(
                      addNotification({
                        msg: t("Global.Form.SuccessMsg", {
                          action: t(
                            "Auth.MembershipRegistration.Form.Housing.HousingSaved"
                          ),
                          data: e.nationalAddressNumber,
                        }),
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
          ),
        }))}
        key="housing"
        icon={faHome}
        onAdd={() =>
          setHousing((current) => [
            ...current,
            { id: "", nationalAddressNumber: "" },
          ])
        }
        addText={t("Auth.MembershipRegistration.Form.Housing.AddNew")}
        onRemove={(i) => remove(i)}
      />

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
