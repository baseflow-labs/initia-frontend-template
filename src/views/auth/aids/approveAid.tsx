import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidCategoryApi from "../../../api/aids/aidCategories";
import * as AidApi from "../../../api/aids/aids";
import Button from "../../../components/core/button";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { Aid, AidCategory, defaultAid } from "../../../types/aids";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { CategoryView } from "../dashboard/accountant";
import { useAppSelector } from "../../../store/hooks";
import Form from "../../../components/form";
import { AidUnit } from "../../../components/card/programCards";

interface Props {
  openModal: Aid;
  setOpenModal: (s: Aid) => void;
  onGetData: (p: Object) => void;
}

const ApproveAid = ({ openModal, setOpenModal, onGetData }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [category, setCategory] = useState<AidCategory>();

  const approveLabel = t("Auth.Aids.Statuses.Approved");

  const onClose = () => {
    setOpenModal(defaultAid);
  };

  const isAccountant = user.role === "accountant";
  const isResearcher = user.role === "researcher";

  const onSubmit = (value?: number) => {
    AidApi.updateStatus(
      openModal.id,
      isAccountant ? "Approved" : isResearcher ? "Recommended" : "Seconded",
      "",
      "",
      value
    )
      .then(() => {
        onGetData({});
        onClose();
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: "تحديث حالة الطلب إلى" + approveLabel,
              data: "المستفيد",
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    if (openModal.id) {
      AidCategoryApi.getAllOfProgram(openModal.aidProgram.id)
        .then((res: any) => setCategory(res.payload))
        .catch(apiCatchGlobalHandler);
    }
  }, [openModal.id]);

  return (
    <Modal
      title={t("Auth.Aids.ApproveAid")}
      onClose={() => onClose()}
      className="modal-lg"
      isOpen={!!openModal.id}
    >
      <h5 className="mb-4">{openModal.value}</h5>
      <h5>القيمة المطلوبة</h5>
      <h3>
        {openModal.value}{" "}
        <AidUnit t={t} type={category?.type || ""} amount={0} />
      </h3>

      {category && (
        <CategoryView
          t={t}
          id={category.id}
          name={category.name}
          type={category.type}
          balance={category.aidPrograms.reduce(
            (final, { credit }) => (final += parseFloat(String(credit))),
            0
          )}
          programs={
            isAccountant
              ? category.aidPrograms.map(({ credit, ...rest }) => ({
                  ...rest,
                  credit,
                  balance: credit,
                })) || []
              : []
          }
        />
      )}

      {isResearcher ? (
        <Form
          inputs={() => [
            {
              label: t("Auth.Aids.AidValue"),
              name: "value",
              type: "number",
              moneyUnit: category?.type === "Cash",
            },
          ]}
          submitText={t("Global.Form.Labels.Approve")}
          initialValues={{ value: openModal.value }}
          onFormSubmit={(e) => onSubmit(e.value)}
        />
      ) : (
        <Button className="w-100 mt-4" onClick={() => onSubmit()}>
          {t("Global.Form.Labels.Approve")}
        </Button>
      )}
    </Modal>
  );
};

export default ApproveAid;
