import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";

import * as DebtsApi from "../../../api/profile/debts";
import Accordion from "../../../components/accordion";
import Button from "../../../components/core/button";
import Spinner from "../../../components/core/spinner";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { getDebtsDataInputs } from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  customButtons: React.ReactNode;
  initialValues: { id: string; lastPaymentDate: string; value: number }[];
  beneficiary: string;
  onFormSubmit: (values: any) => void;
  saveData: (values: any) => void;
}

const DebtsFormView = ({
  customButtons = <></>,
  initialValues = [{ id: "", lastPaymentDate: "", value: 0 }],
  beneficiary,
  onFormSubmit,
  saveData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading } = useAppSelector((state) => state.loading);

  const [debts, setDebts] = useState(initialValues);

  useEffect(() => setDebts(initialValues), [initialValues]);

  const remove = (i = 0) => {
    setDebts((current) => current.filter((_, y) => y !== i));
  };

  const debtsDataInputs = (formik: FormikProps<Record<string, any>>) =>
    getDebtsDataInputs(t);

  return (
    <Fragment>
      <Accordion
        data={debts.map((record, i) => ({
          header:
            t("Auth.MembershipRegistration.Form.Debts.Debt") + " " + (i + 1),
          body: (
            <Form
              inputs={debtsDataInputs}
              submitText={
                t("Auth.MembershipRegistration.Form.Debts.SaveDebt") +
                " " +
                (i + 1)
              }
              initialValues={record.id ? record : undefined}
              onFormSubmit={(e, resetForm) => {
                DebtsApi[e.id ? "update" : "create"]({
                  beneficiary,
                  ...e,
                })
                  .then((res: any) => {
                    const updated = !!res.payload.newRecord;

                    const row = {
                      ...e,
                      ...(res.payload.newRecord || res.payload),
                    };

                    dispatch(
                      addNotification({
                        msg: t("Global.Form.SuccessMsg", {
                          action: t(
                            "Auth.MembershipRegistration.Form.Debts.DebtsSaved"
                          ),
                          data: e.lastPaymentDate,
                        }),
                      })
                    );

                    const newArray = [...debts, row].filter(
                      (d) => d.lastPaymentDate
                    );

                    const data = updated
                      ? debts.map((h) =>
                          h.lastPaymentDate === row.lastPaymentDate ? row : h
                        )
                      : newArray;

                    setDebts(data);
                    saveData(data);
                  })
                  .catch(apiCatchGlobalHandler);
              }}
            />
          ),
        }))}
        key="debts"
        icon={faMoneyBill}
        onAdd={() =>
          setDebts((current) => [
            ...current,
            { id: "", lastPaymentDate: "", value: 0 },
          ])
        }
        addText={t("Auth.MembershipRegistration.Form.Debts.AddNew")}
        onRemove={(i) => remove(i)}
      />

      {customButtons}

      <Button
        type="button"
        disabled={loading.length > 0}
        color="info"
        className={`w-${customButtons ? "50" : "100"} p-2`}
        onClick={() => onFormSubmit(debts)}
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

export default DebtsFormView;
