import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as AidApi from "../../../api/profile/beneficiary";
import TablePage from "../../../components/tablePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  statusColorRender,
  renderDataFromOptions,
} from "../../../utils/fucntions";

const AidsView = () => {
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
      label: t("Auth.Aids.AidType"),
      options: aidTypes,
    },
  ];

  const actionButtons = [{ label: t("Auth.Aids.AddAid") }];

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

  return (
    <TablePage
      title={title}
      filters={filters}
      actionButtons={actionButtons}
      columns={columns}
      data={beneficiaries}
      onPageChange={(i = 0, x = 0) => console.log(i, x)}
      onSearch={(values) => console.log(values)}
    />
  );
};

export default AidsView;
