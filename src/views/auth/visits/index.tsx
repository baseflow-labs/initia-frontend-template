import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as VisitApi from "../../../api/profile/beneficiary";
import TablePage from "../../../layouts/auth/tablePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  statusColorRender,
  renderDataFromOptions,
} from "../../../utils/fucntions";
import Modal from "../../../components/modal";

const VisitsView = () => {
  const { t } = useTranslation();
  const [beneficiaries, setVisits] = useState([{}]);

  useLayoutEffect(() => {
    VisitApi.getAll().then((res) => {
      setVisits(
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

  const title = t("Auth.Visits.Title");

  const visitPurposes = [
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
      label: t("Auth.Visits.VisitPurpose"),
      options: visitPurposes,
    },
  ];

  const actionButtons = [{ label: t("Auth.Visits.AddVisit") }];

  const columns = [
    {
      type: "text",
      name: "fullName",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
    },
    {
      type: "date",
      name: "date",
      label: t("Auth.Visits.VisitDate"),
    },
    {
      type: "phoneNumber",
      name: "beneficiaryMobile",
      label: t("Global.Labels.PhoneNumber"),
    },
    {
      type: "custom",
      name: "city",
      label: t("Auth.MembershipRegistration.Address"),
      render: (row: any) => row.city + " - " + row.district,
    },
    {
      type: "select",
      options: visitPurposes,
      name: "type",
      label: t("Auth.Visits.VisitPurpose"),
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
      <Modal actions={<>h</>}>
        <h1>Hello</h1>
      </Modal>
    </Fragment>
  );
};

export default VisitsView;
