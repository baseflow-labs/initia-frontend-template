import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as AidApi from "../../../api/profile/beneficiary";
import ActionButtons from "../../../components/button/actionButtons";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/tablePage";
import {
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/fucntions";

const AidsBeneficiaryView = () => {
  const { t } = useTranslation();
  const [beneficiaries, setAids] = useState([{}]);

  useLayoutEffect(() => {
    AidApi.getAll().then((res) => {
      setAids(
        (res as any).map(
          ({ contactsBank = {}, housing = {}, status = {}, ...rest }) => ({
            ...contactsBank,
            ...housing,
            ...status,
            ...rest,
          })
        ) as any
      );
    });
  }, []);

  const title = t("Auth.Aids.Beneficiary.Title");

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
      label: t("Auth.Aids.AidType"),
      options: aidTypes,
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.Aids.Beneficiary.RequestAid"),
      modal: "modal",
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
      name: "applicationDate",
      label: t("Global.Labels.ApplicationDate"),
    },
    {
      type: "date",
      name: "recaptionDate",
      label: t("Auth.Aids.RecaptionDate"),
    },
    {
      type: "date",
      name: "recaptionDate",
      label: t("Auth.Aids.Beneficiary.RequestDetails"),
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
      options: [
        { value: "Yes", label: t("Global.Form.Labels.Yes") },
        { value: "No", label: t("Global.Form.Labels.No") },
      ],
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
      name: "reason",
      label: t("Auth.Aids.AidPurpose"),
      required: true,
    },
  ];

  return (
    <Fragment>
      <TablePage
        title={title}
        filters={filters}
        actionButtons={actionButtons}
        columns={columns}
        data={beneficiaries}
        onPageChange={(i = 0, x = 0) => console.log(i, x)}
        onSearch={(values) => console.log(values)}
      />

      <Modal title={t("Auth.Aids.Beneficiary.RequestAid")}>
        <Form
          inputs={requestAidInputs}
          submitText={t("Global.Form.Labels.SubmitApplication")}
          onFormSubmit={(e) => {
            AidApi.create(e).then((res) => {
              console.log("Success");
            });
          }}
        />
      </Modal>
    </Fragment>
  );
};

export default AidsBeneficiaryView;
