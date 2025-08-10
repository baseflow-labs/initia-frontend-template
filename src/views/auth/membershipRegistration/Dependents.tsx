import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";

import * as DependentApi from "../../../api/profile/dependent";
import Accordion from "../../../components/accordion";
import Button from "../../../components/core/button";
import Spinner from "../../../components/core/spinner";
import Form from "../../../components/form";
import TabsComp from "../../../components/tab";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { getDependantDataInputs } from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  customButtons: React.ReactNode;
  initialValues: { housing: string; fullName: string; idNumber: string }[];
  houses: { id: string; nationalAddressNumber: string }[];
  beneficiary: string;
  onFormSubmit: (values: any) => void;
  saveData: (values: any) => void;
}

const DependentsFormView = ({
  customButtons = <></>,
  initialValues = [],
  houses = [],
  beneficiary,
  onFormSubmit,
  saveData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading } = useAppSelector((state) => state.loading);

  const [dependents, setDependents] = useState(initialValues);

  useEffect(() => setDependents(initialValues), [initialValues]);

  const remove = (y = 0, housingId = "") => {
    const row = dependents
      .map((dependent, originalIdx) => ({ ...dependent, originalIdx }))
      .filter(({ housing }) => housing === housingId)
      .find((_, i) => i === y);

    setDependents((current) =>
      current.filter((_, x) => x !== row?.originalIdx)
    );
  };

  const dependentsDataInputs = (formik: FormikProps<Record<string, any>>) =>
    getDependantDataInputs(t, formik);

  return (
    <Fragment>
      <TabsComp
        tabs={houses.map(({ id: housingId, nationalAddressNumber }, i) => ({
          id: nationalAddressNumber,
          title: nationalAddressNumber,
          body: (
            <Accordion
              data={dependents
                .filter(({ housing }) => housing === housingId)
                .map((dependent, i) => ({
                  header:
                    dependent.fullName ||
                    t("Auth.MembershipRegistration.Form.Dependents.Dependant") +
                      " " +
                      (i + 1),
                  body: (
                    <Form
                      inputs={dependentsDataInputs}
                      submitText={
                        t(
                          "Auth.MembershipRegistration.Form.Dependents.SaveDependent"
                        ) +
                        " " +
                        (dependent.fullName || i + 1)
                      }
                      initialValues={dependent}
                      onFormSubmit={(e) => {
                        DependentApi.createOrUpdate({
                          beneficiary,
                          ...e,
                        })
                          .then(() => {
                            dispatch(
                              addNotification({
                                msg: t("Global.Form.SuccessMsg", {
                                  action: t(
                                    "Auth.MembershipRegistration.Form.Dependents.SaveDependent"
                                  ),
                                  data: e.fullName,
                                }),
                              })
                            );

                            const data = [...dependents, e]
                              .filter((d) => d.idNumber)
                              .reverse()
                              .reduce(
                                (final, data) =>
                                  final.find(
                                    (f: any) => f.idNumber === data.idNumber
                                  )
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
                  ),
                }))}
              key="dependents"
              icon={faUser}
              onAdd={() =>
                setDependents((current) => [
                  ...current,
                  { fullName: "", idNumber: "", housing: housingId },
                ])
              }
              addText={t("Auth.MembershipRegistration.Form.Dependents.AddNew")}
              onRemove={(y) => remove(y, housingId)}
            />
          ),
        }))}
      />

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
