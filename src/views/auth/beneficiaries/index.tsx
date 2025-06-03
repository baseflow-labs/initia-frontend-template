import { faCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import TablePage from "../../../layouts/auth/tablePage";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/fucntions";
import { useNavigate } from "react-router";

const BeneficiariesView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState([{}]);

  useLayoutEffect(() => {
    BeneficiaryApi.getAll()
      .then((res) => {
        setBeneficiaries(
          (res as any).map(
            ({ contactsBank = {}, housing = {}, status = {}, ...rest }) => ({
              ...contactsBank,
              ...housing,
              ...status,
              ...rest,
            })
          ) as any
        );
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const title = t("Auth.Beneficiaries.Title");

  const nationalities = [
    {
      value: "Saudi",
      label: t("Auth.MembershipRegistration.Form.Nationality.Saudi"),
    },
    {
      value: "Non Saudi",
      label: t("Auth.MembershipRegistration.Form.Nationality.NonSaudi"),
    },
  ];

  const provinces = [
    {
      value: "Riyadh",
      label: t("Auth.MembershipRegistration.Form.Province.Riyadh"),
    },
    {
      value: "Makkah",
      label: t("Auth.MembershipRegistration.Form.Province.Makkah"),
    },
    {
      value: "Madinah",
      label: t("Auth.MembershipRegistration.Form.Province.Madinah"),
    },
    {
      value: "Eastern Province",
      label: t("Auth.MembershipRegistration.Form.Province.Eastern Province"),
    },
    {
      value: "Asir",
      label: t("Auth.MembershipRegistration.Form.Province.Asir"),
    },
    {
      value: "Tabuk",
      label: t("Auth.MembershipRegistration.Form.Province.Tabuk"),
    },
    {
      value: "Hail",
      label: t("Auth.MembershipRegistration.Form.Province.Hail"),
    },
    {
      value: "Northern Borders",
      label: t("Auth.MembershipRegistration.Form.Province.NorthernBorders"),
    },
    {
      value: "Jazan",
      label: t("Auth.MembershipRegistration.Form.Province.Jazan"),
    },
    {
      value: "Najran",
      label: t("Auth.MembershipRegistration.Form.Province.Najran"),
    },
    {
      value: "Al-Bahah",
      label: t("Auth.MembershipRegistration.Form.Province.AlBahah"),
    },
    {
      value: "Al-Jawf",
      label: t("Auth.MembershipRegistration.Form.Province.AlJawf"),
    },
    {
      value: "Al-Qassim",
      label: t("Auth.MembershipRegistration.Form.Province.AlQassim"),
    },
  ];

  const homeTypes = [
    {
      value: "Apartment",
      label: t("Auth.MembershipRegistration.Form.HomeType.Apartment"),
    },
    {
      value: "Villa",
      label: t("Auth.MembershipRegistration.Form.HomeType.Villa"),
    },
    {
      value: "Independent Home",
      label: t("Auth.MembershipRegistration.Form.HomeType.IndependentHome"),
    },
    {
      value: "Folk House",
      label: t("Auth.MembershipRegistration.Form.HomeType.FolkHouse"),
    },
    {
      value: "Room(s) in Shared House",
      label: t("Auth.MembershipRegistration.Form.HomeType.SharedHouse"),
    },
    {
      value: "Roof",
      label: t("Auth.MembershipRegistration.Form.HomeType.Roof"),
    },
    {
      value: "Caravan",
      label: t("Auth.MembershipRegistration.Form.HomeType.Caravan"),
    },
    {
      value: "Incomplete Building",
      label: t("Auth.MembershipRegistration.Form.HomeType.IncompleteBuilding"),
    },
    {
      value: "No Permanent Home",
      label: t("Auth.MembershipRegistration.Form.HomeType.NoPermanentHome"),
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
      label: t("Auth.MembershipRegistration.Form.Nationality.Title"),
      options: nationalities,
    },
    {
      label: t("Auth.MembershipRegistration.Form.Province.Title"),
      options: provinces,
    },
  ];

  const actionButtons = [
    { label: t("Auth.Beneficiaries.AddBeneficiary"), route: "/apply" },
  ];

  const columns = [
    {
      type: "text",
      name: "fullName",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
    },
    {
      type: "numberText",
      name: "idNumber",
      label: t("Auth.MembershipRegistration.Form.IdNumber"),
    },
    {
      type: "select",
      options: nationalities,
      name: "nationality",
      label: t("Auth.MembershipRegistration.Form.Nationality.Title"),
    },
    {
      type: "select",
      options: homeTypes,
      name: "homeType",
      label: t("Auth.MembershipRegistration.Form.HomeType.Title"),
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

  const viewProfile = (data: string | object) => {
    navigate(`/beneficiaries/profile/?id=${data}`);
  };

  return (
    <TablePage
      title={title}
      filters={filters}
      actionButtons={actionButtons}
      columns={columns}
      data={beneficiaries}
      tableActions={[
        {
          icon: faUser,
          label: t("Auth.Beneficiaries.Profile.ProfileDetails"),
          onClick: (data: string | object) => viewProfile(data),
        },
      ]}
      onPageChange={(i = 0, x = 0) => console.log(i, x)}
      onSearch={(values) => console.log(values)}
    />
  );
};

export default BeneficiariesView;
