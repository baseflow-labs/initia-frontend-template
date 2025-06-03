import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidApi from "../../../api/aids/aids";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";

const AidsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [aids, setAids] = useState([{}]);
  const [openModal, setOpenModal] = useState(false);
  const [selectOptions, setSelectOptions] = useState({
    beneficiaries: [{ id: "", fullName: "" }],
  });

  const getData = () => {
    AidApi.getAll()
      .then((res) => {
        setAids(
          (res as any).map(({ beneficiary = {}, ...rest }) => ({
            ...beneficiary,
            ...rest,
          })) as any
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData();

    BeneficiaryApi.getAll()
      .then((res) =>
        setSelectOptions((current) => ({
          ...current,
          beneficiaries: res as any,
        }))
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  const title = t("Auth.Aids.Title");

  const aidTypes = [
    {
      value: "A",
      label: "A",
    },
    {
      value: "B",
      label: "B",
    },
  ];

  const statuses = [
    {
      value: "New Member",
      label: t("Auth.MembershipRegistration.Statuses.NewMember"),
    },
    {
      value: "Incomplete",
      label: t("Auth.MembershipRegistration.Statuses.Incomplete"),
    },
    {
      value: "Need Help",
      label: t("Auth.MembershipRegistration.Statuses.NeedHelp"),
    },
    {
      value: "Rejected",
      label: t("Auth.MembershipRegistration.Statuses.Rejected"),
    },
    {
      value: "Accepted",
      label: t("Auth.MembershipRegistration.Statuses.Accepted"),
    },
    {
      value: "In Preview",
      label: t("Auth.MembershipRegistration.Statuses.InPreview"),
    },
  ];

  const filters = [
    {
      label: t("Auth.MembershipRegistration.Statuses.Status"),
      options: statuses,
    },
    {
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      options: selectOptions.beneficiaries.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
      })),
    },
    {
      label: t("Auth.Aids.AidType"),
      options: aidTypes,
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.Aids.AddAid"),
      onClick: () => setOpenModal(true),
    },
  ];

  const columns = [
    {
      type: "text",
      name: "fullName",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
    },
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
      name: "applicationDate",
      label: t("Global.Labels.ApplicationDate"),
    },
    {
      type: "date",
      name: "recaptionDate",
      label: t("Auth.Aids.RecaptionDate"),
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

  const grantAidInputs = () => [
    {
      type: "select",
      options: selectOptions.beneficiaries.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
      })),
      name: "beneficiary",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      required: true,
    },
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
      type: "textarea",
      name: "reason",
      label: t("Global.Form.Labels.Notes"),
      required: false,
    },
  ];

  return (
    <Fragment>
      <TablePage
        title={title}
        filters={filters}
        actionButtons={actionButtons}
        columns={columns}
        data={aids}
        onPageChange={(i = 0, x = 0) => console.log(i, x)}
        onSearch={(values) => console.log(values)}
      />

      <Modal
        title={t("Auth.Aids.AddAid")}
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
      >
        <Form
          inputs={grantAidInputs}
          submitText={t("Global.Form.Labels.SubmitApplication")}
          onFormSubmit={(e) => {
            AidApi.grant(e)
              .then((res) => {
                setOpenModal(false);
                getData();
                dispatch(
                  addNotification({
                    msg: t("Global.Form.SuccessMsg", {
                      action: t("Auth.Aids.AddAid"),
                      data: selectOptions.beneficiaries.find(
                        ({ id }) => id === e.beneficiary
                      )?.fullName,
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

export default AidsView;
