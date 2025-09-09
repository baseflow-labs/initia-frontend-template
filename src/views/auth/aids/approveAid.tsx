import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidCategoryApi from "../../../api/aids/aidCategories";
import * as AidApi from "../../../api/aids/aids";
import { AidUnit } from "../../../components/card/programCards";
import RenderCategory from "../../../components/category";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { Aid, AidCategory, defaultAid } from "../../../types/aids";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { CategoryProgramPicker, CategoryView } from "./selectProgram";

interface Props {
  openModal: any;
  setOpenModal: (s: Aid) => void;
  onGetData: (p: Object) => void;
}

const ApproveAid = ({ openModal, setOpenModal, onGetData }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [category, setCategory] = useState<AidCategory>();
  const [selectedProgram, setSelectedProgram] = useState<string>("");

  const onClose = () => {
    setOpenModal(defaultAid);
  };

  const recommend = "RecommendedByResearcher";
  const second = "SecondedByHod";
  const allow = "AllowedByCeo";
  const approve = "ApprovedByAccountant";

  const isResearcher = user.role === "researcher";
  const isHod = user.role === "hod";
  const isCeo = user.role === "ceo";
  const isAccountant = user.role === "accountant";

  const onSubmit = (value?: number) => {
    AidApi.updateStatus(
      openModal.id,
      isResearcher
        ? recommend
        : isHod
        ? second
        : isCeo
        ? allow
        : isAccountant
        ? approve
        : "",
      "",
      "",
      value,
      isAccountant ? selectedProgram : undefined
    )
      .then(() => {
        onGetData({});
        onClose();
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action:
                t("Auth.Aids.StatusUpdated") +
                " " +
                t("Auth.Aids.Statuses.Approved"),
              data: t("Auth.Beneficiaries.Beneficiary"),
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
      <h5 className="mb-4">
        <b className="fw-bold">{openModal.fileNo}</b>

        <span>
          <RenderCategory data={openModal.category} />
        </span>
      </h5>

      <h5>{t("Auth.Aids.RequiredValue")}</h5>

      <h3>
        {openModal.value}{" "}
        <AidUnit t={t} type={category?.type || ""} amount={0} />
      </h3>

      {category &&
        (isAccountant ? (
          <CategoryProgramPicker
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
            onPick={(programId: string) => setSelectedProgram(programId)}
          />
        ) : (
          <CategoryView
            t={t}
            id={category.id}
            name={category.name}
            type={category.type}
            balance={category.aidPrograms.reduce(
              (final, { credit }) => (final += parseFloat(String(credit))),
              0
            )}
            programs={[]}
          />
        ))}

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
