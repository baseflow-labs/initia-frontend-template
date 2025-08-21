import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidApi from "../../../api/aids/aids";
import * as AidCategoryApi from "../../../api/aids/aidCategories";
import Button from "../../../components/core/button";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { CategoryView } from "../dashboard/accountant";
import { useLayoutEffect, useState } from "react";
import { Aid, AidCategory, defaultAid } from "../../../types/aids";

interface Props {
  openModal: Aid;
  setOpenModal: (s: Aid) => void;
  onGetData: (p: Object) => void;
}

const AccountantApproveAid = ({
  openModal,
  setOpenModal,
  onGetData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [category, setCategory] = useState<AidCategory>();

  const approveLabel = t("Auth.Aids.Statuses.Approved");

  const onClose = () => {
    setOpenModal(defaultAid);
  };

  const onSubmit = () => {
    AidApi.updateStatus(openModal.id, "Approved")
      .then(() => {
        onGetData({});
        onClose();
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: approveLabel,
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
      <h5 className="mb-4">{openModal.fileNo}</h5>
      <h5>القيمة المطلوبة</h5>
      <h3>{openModal.value}</h3>

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
            category.aidPrograms.map(({ credit, ...rest }) => ({
              ...rest,
              credit,
              balance: credit,
            })) || []
          }
        />
      )}

      <Button className="w-100 mt-4" onClick={() => onSubmit()}>
        {t("Global.Form.Labels.Approve")}
      </Button>
    </Modal>
  );
};

export default AccountantApproveAid;
