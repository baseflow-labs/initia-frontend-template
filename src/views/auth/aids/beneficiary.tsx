import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidApi from "../../../api/aids/aids";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import {
  getAidStatuses,
  getAidTypes,
  getYesNo,
} from "../../../utils/dataOptions";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";

const AidsBeneficiaryView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [aids, setAids] = useState([]);

  const onSearch = ({ filters = {}, page = 1, capacity = 10 }) => {
    setCurrentFilters(filters);

    return AidApi.getAll({ filters, page, capacity })
      .then((res: any) => {
        setAids(
          res.payload.map(({ beneficiary = {}, status = {}, ...rest }) => ({
            ...beneficiary,
            ...status,
            ...rest,
          })) as any
        );

        return res;
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    onSearch({ filters: currentFilters, page: 1, capacity: 10 });
  }, []);

  const aidTypes = getAidTypes(t);

  const statuses = getAidStatuses(t);

  const filters = [
    {
      label: t("Auth.MembershipRegistration.Statuses.Status"),
      options: statuses,
      name: "aidStatuses=>status",
    },
    {
      label: t("Auth.Aids.AidType"),
      options: aidTypes,
      name: "type",
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.Aids.Beneficiary.RequestAid"),
      onClick: () => setOpenModal(true),
    },
  ];

  const columns = [
    {
      type: "text",
      name: "name",
      label: t("Auth.Aids.AidName"),
    },
    {
      type: "select",
      options: aidTypes,
      name: "type",
      label: t("Auth.Aids.AidType"),
    },
    {
      type: "date",
      name: "createdAt",
      label: t("Global.Labels.ApplicationDate"),
    },
    {
      type: "date",
      name: "recaptionDate",
      label: t("Auth.Aids.RecaptionDate"),
    },
    {
      type: "file",
      name: "document",
      label: t("Global.Form.Labels.SupportingDocument"),
      required: false,
      halfCol: true,
    },
    {
      type: "textarea",
      name: "note",
      label: t("Auth.Aids.AidPurpose"),
      required: true,
    },
    {
      type: "custom",
      render: (row: any) => (
        <Fragment>
          <FontAwesomeIcon
            icon={faCircle}
            className={`text-${statusColorRender(row.status)}`}
          />{" "}
          {renderDataFromOptions(row.status, statuses)}
        </Fragment>
      ),
      name: "status",
      label: t("Auth.MembershipRegistration.Statuses.Status"),
    },
  ];

  const requestAidInputs = () => [
    {
      type: "select",
      options: aidTypes,
      name: "type",
      label: t("Auth.Aids.AidType"),
      required: true,
    },
    {
      type: "text",
      name: "name",
      label: t("Auth.Aids.AidName"),
      required: true,
    },
    {
      type: "select",
      options: getYesNo(t),
      name: "urgent",
      label: t("Auth.Aids.Beneficiary.Urgent?"),
      required: true,
      halfCol: true,
    },
    {
      type: "file",
      name: "document",
      label: t("Global.Form.Labels.SupportingDocument"),
      required: false,
      halfCol: true,
    },
    {
      type: "textarea",
      name: "note",
      label: t("Auth.Aids.AidPurpose"),
      required: true,
    },
  ];

  return (
    <Fragment>
      <TablePage
        title={t("Auth.Aids.Beneficiary.Title")}
        filters={filters}
        actionButtons={actionButtons}
        columns={columns}
        data={aids}
        onSearch={onSearch}
        onPageChange={(page, capacity) => {
          onSearch({ filters: currentFilters, page, capacity });
        }}
      />

      <Modal
        title={t("Auth.Aids.Beneficiary.RequestAid")}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Form
          inputs={requestAidInputs}
          submitText={t("Global.Form.Labels.SubmitApplication")}
          onFormSubmit={(e) => {
            AidApi.create(e)
              .then(() => {
                setOpenModal(false);
                onSearch({ filters: currentFilters, page: 1, capacity: 10 });
                dispatch(
                  addNotification({
                    msg: t("Global.Form.SuccessMsg", {
                      action: t("Auth.Aids.Beneficiary.RequestAid"),
                      data: e.name,
                    }),
                  })
                );
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      </Modal>
    </Fragment>
  );
};

export default AidsBeneficiaryView;
