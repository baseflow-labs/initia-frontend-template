export const getAssignResearcherInputs = (
  t: Function,
  beneficiaries: {
    id: string;
    status: string;
    fullName: string;
    staff?: { id: string };
  }[],
  researchers: { id: string; status: string; fullName: string }[]
) => [
  {
    label: t("Auth.Beneficiaries.BeneficiaryName"),
    name: "beneficiary",
    type: "select",
    required: true,
    options: beneficiaries?.map(({ id, fullName }) => ({
      value: id,
      label: fullName,
    })),
  },
  {
    label: t("Auth.Researchers.ResearcherName"),
    name: "staff",
    type: "select",
    required: true,
    options: researchers.map(({ id, fullName }) => ({
      value: id,
      label: fullName,
    })),
  },
];

export const getApplicantsRejectionInputs = (t: Function) => [
  {
    label: t("Auth.Beneficiaries.Profile.ApplicationRejectReason"),
    name: "reason",
    type: "textarea",
    required: true,
    rows: 3,
  },
];

export const getApplicantsRegistrationInputs = (t: Function) => [
  {
    type: "text",
    name: "name",
    label: t("Public.Register.Labels.Name"),
    required: true,
  },
  {
    type: "phoneNumber",
    name: "username",
    label: t("Public.Register.Labels.PhoneNo"),
    required: true,
  },
  {
    type: "numberText",
    name: "idNumber",
    minLength: 10,
    maxLength: 10,
    label: t("Auth.MembershipRegistration.Form.IdNumber"),
    labelNote: t("Auth.MembershipRegistration.Form.IdNumberNote"),
    required: true,
  },
];

export const getRequestDataUpdateInputs = (t: Function) => [
  {
    name: "note",
    type: "textarea",
    label: t("Auth.Beneficiaries.Profile.UpdateNote"),
  },
];
