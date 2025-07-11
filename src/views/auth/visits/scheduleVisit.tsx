import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import * as VisitApi from "../../../api/visits/visits";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  onSearch: (p: Object) => void;
  openModal: boolean;
  setOpenModal: (s: boolean) => void;
  selectOptions: {
    beneficiaries: {
      id: string;
      fullName: string;
    }[];
  };
}

const ScheduleVisit = ({
  onSearch,
  selectOptions,
  openModal,
  setOpenModal,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("id")) {
      setOpenModal(true);
    }
  }, [searchParams.get("id")]);

  const surprise = [
    {
      value: "No",
      label: t("Auth.Visits.Surprise.No"),
    },
    {
      value: "Yes",
      label: t("Auth.Visits.Surprise.Yes"),
    },
  ];

  const onModalClose = () => {
    setOpenModal(false);
    if (searchParams.get("id")) {
      navigate("/visitSchedule");
      window.location.reload();
    }
  };

  const onCrudSuccess = (e: { beneficiary: "" }, action = "") => {
    onModalClose();

    onSearch({ filters: {}, page: 1, capacity: 10 });
    dispatch(
      addNotification({
        msg: t("Global.Form.SuccessMsg", {
          action,
          data: selectOptions.beneficiaries.find(
            ({ id }) => id === e.beneficiary
          )?.fullName,
        }),
      })
    );
  };

  const inputs = () => [
    {
      type: "select",
      options: selectOptions.beneficiaries.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
      })),
      defaultValue: searchParams.get("id") || "",
      name: "beneficiary",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      required: true,
    },
    {
      type: "time",
      name: "time",
      required: true,
    },
    {
      type: "date",
      name: "date",
      required: true,
    },
    {
      type: "radio",
      options: surprise,
      name: "surprise",
      defaultValue: "No",
      label: t("Auth.Visits.Surprise.Title"),
      required: true,
    },
    {
      type: "textarea",
      name: "reason",
      label: t("Auth.Visits.VisitPurpose"),
      required: true,
    },
  ];

  return (
    <Modal
      title={t("Auth.Visits.AddVisit")}
      onClose={onModalClose}
      isOpen={openModal}
    >
      {openModal && (
        <Form
          inputs={inputs}
          submitText={t("Global.Form.Labels.Confirm")}
          initialValues={{ beneficiary: searchParams.get("id") }}
          onFormSubmit={(e) => {
            e.id
              ? VisitApi.update(e)
                  .then(() => {
                    onCrudSuccess(e, t("Auth.Visits.EditVisit"));
                  })
                  .catch(apiCatchGlobalHandler)
              : VisitApi.create(e)
                  .then(() => {
                    onCrudSuccess(e, t("Auth.Visits.AddVisit"));
                  })
                  .catch(apiCatchGlobalHandler);
          }}
        />
      )}
    </Modal>
  );
};

export default ScheduleVisit;
