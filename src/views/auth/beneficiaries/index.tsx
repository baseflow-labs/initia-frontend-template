import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import TablePage from "../../../components/tablePage";

const BeneficiariesView = () => {
  const { t } = useTranslation();
  const [beneficiaries, setBeneficiaries] = useState([{}]);

  useLayoutEffect(() => {
    BeneficiaryApi.getAll().then((res) => {
      setBeneficiaries(
        (res as any).map(({ contactsBank = {}, housing = {}, ...rest }) => ({
          ...contactsBank,
          ...housing,
          ...rest,
        })) as any
      );
    });
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

  const filters = [
    {
      label: t("Auth.MembershipRegistration.Form.Nationality.Title"),
      options: nationalities,
    },
    {
      label: t("Auth.MembershipRegistration.Form.Province.Title"),
      options: provinces,
    },
  ];

  const actionButtons = [{ label: t("Auth.Beneficiaries.AddBeneficiary") }];

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
      type: "phoneNumber",
      name: "beneficiaryMobile",
      label: t("Global.Labels.PhoneNumber"),
    },
    {
      type: "select",
      options: nationalities,
      name: "nationality",
      label: t("Auth.MembershipRegistration.Form.Nationality.Title"),
    },
    {
      type: "select",
      options: provinces,
      name: "province",
      label: t("Auth.MembershipRegistration.Form.Province.Title"),
    },
    {
      type: "text",
      name: "governorate",
      label: t("Auth.MembershipRegistration.Form.Governorate"),
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

export default BeneficiariesView;
