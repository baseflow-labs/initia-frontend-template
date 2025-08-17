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
    fileSizeLimit: 2,
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

export const geAddAidProgramInputs = (
  t: Function,
  aidProgramTypes: { label: string; value: string }[]
) => [
  {
    type: "text",
    name: "name",
    label: t("Auth.AidPrograms.AidProgramName"),
    required: true,
  },
  {
    type: "select",
    options: aidProgramTypes,
    name: "type",
    label: t("Auth.AidPrograms.AidProgramType"),
    required: true,
  },
  {
    type: "text",
    name: "sponsor",
    label: t("Auth.AidPrograms.Sponsor"),
    required: true,
  },
  {
    type: "number",
    moneyUnit: true,
    step: 0.1,
    name: "credit",
    label: t("Auth.AidPrograms.TotalCredit"),
    required: true,
  },
];
