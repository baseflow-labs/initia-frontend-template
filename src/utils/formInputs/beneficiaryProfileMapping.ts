import { InputSingleProps } from "../../components/form";
import {
  getBasicDataInputs,
  getContactBankDataInputs,
  getDebtsDataInputs,
  getDependantDataInputs,
  getHousingDataInputs,
  getIncomeQualificationDataInputs,
  getNationalRecordDataInputs,
} from "./beneficiaryProfile";

export function inputsData(t: Function): {
  [key: string]: InputSingleProps[];
} {
  return {
    beneficiary: getBasicDataInputs(t),

    contactsBank: getContactBankDataInputs(t),

    income: getIncomeQualificationDataInputs(t),

    debts: getDebtsDataInputs(t),

    housing: getHousingDataInputs(t),

    dependents: getDependantDataInputs(t),

    nationalRecord: getNationalRecordDataInputs(t),
  };
}

export const beneficiaryTabs = (t: (value: string) => string) => [
  {
    id: "beneficiary",
    name: "beneficiary",
    title: t("Auth.MembershipRegistration.Form.BasicData"),
  },
  {
    id: "contactsBank",
    name: "contactsBank",
    title: t("Auth.MembershipRegistration.Form.ContactData"),
  },
  {
    id: "income",
    name: "income",
    title: t("Auth.MembershipRegistration.Form.QualificationData"),
  },
  {
    id: "debts",
    name: "debts",
    title: t("Auth.Beneficiaries.Profile.DebtsData"),
  },
  {
    id: "housing",
    name: "housing",
    title: t("Auth.MembershipRegistration.Form.HostelData"),
  },
  {
    id: "dependents",
    name: "dependents",
    title: t("Auth.MembershipRegistration.Form.DependentsData"),
  },
  {
    id: "nationalRecord",
    name: "nationalRecord",
    title: t("Auth.MembershipRegistration.Form.Attachments"),
  },
];
