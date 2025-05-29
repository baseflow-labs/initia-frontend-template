import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as VisitApi from "../../../api/profile/beneficiary";
import TablePage from "../../../components/tablePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  statusColorRender,
  renderDataFromOptions,
} from "../../../utils/fucntions";

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
      value: "Saudi",
      label: t("Auth.Visits.Nationality.Saudi"),
    },
    {
      value: "Non Saudi",
      label: t("Auth.Visits.Nationality.NonSaudi"),
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
    <TablePage
      title={title}
      filters={filters}
      actionButtons={actionButtons}
      columns={columns}
      data={beneficiaries}
      onSearch={(values) => console.log(values)}
    />
  );
};

export default VisitsView;
