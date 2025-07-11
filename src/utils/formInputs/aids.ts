import { getYesNo } from "../optionDataLists/common";

export const getRequestAidInputs = (
  t: Function,
  aidTypes: { label: string; value: string }[]
) => [
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

export const getGrantAidInputs = (
  t: Function,
  aidTypes: { label: string; value: string }[],
  selectOptions: {
    beneficiaries: {
      id: string;
      fullName: string;
      status: { status: string };
    }[];
  }
) => [
  {
    type: "select",
    options: selectOptions.beneficiaries
      .filter(({ status }) => status.status === "Accepted")
      .map(({ id, fullName }) => ({
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
    name: "note",
    label: t("Global.Form.Labels.Notes"),
    required: false,
  },
];
