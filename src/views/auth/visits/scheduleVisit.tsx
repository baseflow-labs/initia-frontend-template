import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import * as VisitApi from "../../../api/visits/visits";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { getVisitScheduleInputs } from "../../../utils/formInputs/visits";

interface Props {
  onGetData: (p: Object) => void;
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
  onGetData,
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

  const onModalClose = () => {
    setOpenModal(false);
    if (searchParams.get("id")) {
      navigate("/visitSchedule");
      window.location.reload();
    }
  };

  const onCrudSuccess = (e: { beneficiary: "" }, action = "") => {
    onModalClose();

    onGetData({});
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

  return (
    <Modal
      title={t("Auth.Visits.AddVisit")}
      onClose={onModalClose}
      isOpen={openModal}
    >
      {openModal && (
        <Form
          inputs={() => getVisitScheduleInputs(t, searchParams, selectOptions)}
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
