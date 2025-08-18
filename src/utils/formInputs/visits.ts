import { FormikProps } from "formik";

export const getVisitScheduleInputs = (
  t: Function,
  searchParams: any,
  selectOptions: {
    beneficiaries: {
      id: string;
      addresses: { id: string; address: string }[];
      fullName: string;
    }[];
  },
  formik: FormikProps<Record<string, any>>
) => [
  {
    type: "select",
    options: selectOptions.beneficiaries.map(({ id, fullName }) => ({
      value: id,
      label: fullName,
    })),
    defaultValue: searchParams.get("id") || "",
    name: "beneficiary",
    label: t("Auth.Beneficiaries.BeneficiaryName"),
    required: true,
  },
  {
    type: "select",
    options: selectOptions.beneficiaries
      .find((beneficiary) => beneficiary.id == formik?.values?.beneficiary)
      ?.addresses.map(({ id, address }) => ({
        value: id,
        label: address,
      })),
    name: "housing",
    label: t("Auth.MembershipRegistration.Address"),
    required: true,
  },
  {
    type: "time",
    name: "time",
    required: true,
  },
  {
    type: "date",
    name: "date",
    required: true,
  },
  {
    type: "radio",
    options: [
      {
        value: "No",
        label: t("Auth.Visits.Surprise.No"),
      },
      {
        value: "Yes",
        label: t("Auth.Visits.Surprise.Yes"),
      },
    ],
    name: "surprise",
    defaultValue: "No",
    label: t("Auth.Visits.Surprise.Title"),
    required: true,
  },
  {
    type: "textarea",
    name: "reason",
    label: t("Auth.Visits.VisitPurpose"),
    required: true,
  },
];
