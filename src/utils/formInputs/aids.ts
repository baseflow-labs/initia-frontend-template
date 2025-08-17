import { FormikProps } from "formik";
import {
  getAidProgramStatuses,
  getAidProgramTypes,
} from "../optionDataLists/aids";
import { getYesNo } from "../optionDataLists/common";

export const getRequestAidInputs = (t: Function, selectOptions: any) => [
  {
    type: "select",
    options: selectOptions?.aidPrograms.map(({ id = "", name = "" }) => ({
      label: name,
      value: id,
    })),
    name: "aidProgram",
    label: t("Auth.Aids.AidType"),
    required: true,
  },
  {
    type: "number",
    moneyUnit: true,
    step: 0.1,
    name: "value",
    label: t("Auth.Aids.AidValue"),
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
    aidPrograms: { id: string; name: string; status: string }[];
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
    options: selectOptions?.aidPrograms.map(({ id, name }) => ({
      label: name,
      value: id,
    })),
    name: "aidProgram",
    label: t("Auth.Aids.AidType"),
    required: true,
  },
  {
    type: "number",
    moneyUnit: true,
    step: 0.1,
    name: "value",
    label: t("Auth.Aids.AidValue"),
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
  formik?: FormikProps<Record<string, any>>
) => {
  const common1Inputs = [
    {
      type: "text",
      name: "name",
      label: t("Auth.AidPrograms.AidProgramName"),
      required: true,
    },
    {
      type: "select",
      options: getAidProgramTypes(t),
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
  ];

  const cashInputs = [
    {
      type: "number",
      moneyUnit: true,
      step: 0.1,
      name: "credit",
      label: t("Auth.AidPrograms.TotalCredit"),
      required: true,
    },
  ];

  const inKindInputs = [
    {
      type: "number",
      name: "credit",
      label: t("Auth.AidPrograms.TotalQuantity"),
      required: true,
    },
  ];

  const common2Inputs = [
    {
      type: "select",
      name: "status",
      defaultValue: "Opened",
      options: getAidProgramStatuses(t),
      label: t("Auth.AidPrograms.Statuses.Title"),
      required: true,
    },
  ];

  const allInputs = [...common1Inputs, ...cashInputs, ...common2Inputs];

  const conditionalInputs =
    formik?.values.type === "Cash"
      ? [...common1Inputs, ...cashInputs, ...common2Inputs]
      : [...common1Inputs, ...inKindInputs, ...common2Inputs];

  return formik ? conditionalInputs : allInputs;
};
