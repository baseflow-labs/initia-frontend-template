import { FormikProps } from "formik";

import { AidCategory, AidProgram } from "../../types/aids";
import {
  getAidCategoryReapplyPeriods,
  getAidCategoryTypes,
  getAidProgramStatuses,
} from "../optionDataLists/aids";
import { getYesNo } from "../optionDataLists/common";
import { pluralLabelResolve, renderDataFromOptions } from "../function";

export const getRequestAidInputs = (
  t: Function,
  selectOptions: any,
  formik: FormikProps<Record<string, any>>
) => {
  const pickedProgram = formik?.values?.aidCategory;
  const type = pickedProgram
    ? selectOptions?.aidCategories.find(({ id = "" }) => id === pickedProgram)
        ?.type
    : "";

  return [
    {
      type: "select",
      options: selectOptions?.aidCategories
        .filter(
          ({ aidPrograms = [] }) =>
            aidPrograms?.filter(
              (p: { status: string }) => p.status === "Opened"
            )?.length
        )
        .map(({ id = "", name = "" }) => ({
          label: name,
          value: id,
        })),
      name: "aidCategory",
      label: t("Auth.Aids.AidType"),
      required: true,
    },
    {
      type: "number",
      moneyUnit: type === "Cash",
      step: type === "Cash" ? 0.1 : 1,
      postfixText: type === "Cash" ? undefined : t("Auth.Aids.AidPiece_other"),
      name: "value",
      label:
        type === "Cash" ? t("Auth.Aids.AidValue") : t("Auth.Aids.AidQuantity"),
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
};

export const getGrantAidInputs = (
  t: Function,
  selectOptions: {
    beneficiaries: {
      id: string;
      fullName: string;
      status: { status: string };
    }[];
    aidPrograms: AidProgram[];
    aidCategories: AidCategory[];
  },
  formik: FormikProps<Record<string, any>>
) => {
  const pickedProgram = formik?.values?.aidProgram;
  const type = pickedProgram
    ? selectOptions?.aidPrograms.find(({ id = "" }) => id === pickedProgram)
        ?.aidCategory.type
    : "";

  return [
    {
      type: "select",
      options: selectOptions?.aidCategories.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
      name: "aidCategory",
      label: t("Auth.AidCategories.AidCategory"),
      required: true,
    },
    {
      type: "select",
      options: selectOptions?.aidPrograms
        .filter((a) => a.aidCategory.id === formik.values.aidCategory)
        .map(({ id, name, credit, aidCategory }) => ({
          label:
            name +
            " | " +
            renderDataFromOptions(type || "", getAidCategoryTypes(t)) +
            " | " +
            credit +
            " " +
            (type === "Cash"
              ? "ريال"
              : pluralLabelResolve(t, credit, "Auth.Aids.AidPiece")),
          value: id,
        })),
      name: "aidProgram",
      label: t("Auth.AidPrograms.AidProgramName"),
      required: true,
    },
    {
      type: "multipleEntries",
      name: "beneficiaries",
      label: t("Auth.Aids.Beneficiary.Title"),
      inputs: [
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
          type: "number",
          moneyUnit: type === "Cash",
          step: type === "Cash" ? 0.1 : 1,
          postfixText:
            type === "Cash" ? undefined : t("Auth.Aids.AidPiece_other"),
          name: "value",
          label:
            type === "Cash"
              ? t("Auth.Aids.AidValue")
              : t("Auth.Aids.AidQuantity"),
          required: true,
        },
        {
          type: "textarea",
          name: "note",
          label: t("Global.Form.Labels.Notes"),
          required: false,
          rows: 1,
        },
      ],
      required: true,
    },
  ];
};

export const geAddAidProgramInputs = (
  t: Function,
  aidCategories: AidCategory[],
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
      options: aidCategories.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
      name: "aidCategory",
      label: t("Auth.AidCategories.AidCategory"),
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

  const pickedCategoryType = aidCategories.find(
    ({ id }) => id === formik?.values.aidCategory
  )?.type;

  const conditionalInputs =
    pickedCategoryType === "Cash"
      ? [...common1Inputs, ...cashInputs, ...common2Inputs]
      : [...common1Inputs, ...inKindInputs, ...common2Inputs];

  return formik ? conditionalInputs : allInputs;
};

export const geAddAidCategoryInputs = (t: Function) => [
  {
    type: "text",
    name: "name",
    label: t("Auth.AidCategories.AidCategoryName"),
    required: true,
  },
  {
    type: "radio",
    row: false,
    options: getAidCategoryTypes(t),
    name: "type",
    label: t("Auth.AidCategories.AidCategoryType"),
    required: true,
  },
  {
    type: "radio",
    row: false,
    options: getAidCategoryReapplyPeriods(t),
    name: "reapply",
    label: t("Auth.AidCategories.ReapplyPeriods.Title"),
    required: true,
  },
];
