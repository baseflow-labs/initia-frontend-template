import { InputSingleProps } from "../../components/form";
import {
  getBasicDataInputs,
  getContactBankDataInputs,
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

export const beneficiaryMapping: { [key: string]: string } = {
  beneficiary: "",
  contactsBank: "contactsBank",
  income: "income",
  housing: "housing",
  dependents: "dependents",
  nationalRecord: "staff",
};
