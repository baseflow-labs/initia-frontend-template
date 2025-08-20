import { FormikProps } from "formik";
import moment from "moment";

import absherLogo from "../../assets/images/partners/absher.svg";
import molimLogo from "../../assets/images/partners/molim.svg";
import tawakkalnaLogo from "../../assets/images/partners/Tawakkalna.svg";
import { InputSingleProps } from "../../components/form";
import { dataDateFormat } from "../consts";
import {
  banks,
  getAgeGroups,
  getBeneficiaryCategories,
  getDependentRelations,
  getDiseases,
  getEducationLevels,
  getGenders,
  getHealthStatuses,
  getHomeOwners,
  getHomeOwnerships,
  getHomeTypes,
  getNationalities,
  getOccupations,
  getProvinces,
  getSocialStatuses,
} from "../optionDataLists/beneficiaries";
import { getYesNo } from "../optionDataLists/common";

export const getBasicDataInputs = (
  t: Function,
  formik?: FormikProps<Record<string, any>>
): InputSingleProps[] => {
  const final: InputSingleProps[] = [
    {
      type: "text",
      name: "fileNo",
      label: t("Auth.MembershipRegistration.Form.FileNo"),
      required: true,
      excludeInForm: true,
    },
    {
      type: "select",
      options: getSocialStatuses(t),
      name: "socialStatus",
      label: t("Auth.MembershipRegistration.Form.SocialStatus.Title"),
      required: true,
    },
    {
      type: "text",
      name: "fullName",
      label: t("Auth.MembershipRegistration.Form.FullName"),
      required: true,
    },
    {
      type: "select",
      options: getNationalities(t),
      name: "nationality",
      label: t("Auth.MembershipRegistration.Form.Nationality.Title"),
      required: true,
    },
    {
      type: "date",
      name: "dob",
      min: moment().locale("en").subtract(125, "y").format(dataDateFormat),
      max: moment().locale("en").subtract(17, "y").format(dataDateFormat),
      label: t("Auth.MembershipRegistration.Form.Dob"),
      required: true,
    },
    {
      type: "date",
      name: "idExpiryDate",
      max: moment().locale("en").add(10, "y").format(dataDateFormat),
      label: t("Auth.MembershipRegistration.Form.IdExpiryDate"),
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
    {
      type: "select",
      name: "category",
      options: getBeneficiaryCategories(t),
      label: t("Auth.MembershipRegistration.Form.Category.Title"),
      required: true,
      excludeInForm: true,
    },
  ];

  const familyInputs = [
    {
      type: "file",
      fileSizeLimit: 2,
      name: "familyRecordPhoto",
      label: t("Auth.MembershipRegistration.Form.FamilyRecordPhoto"),
      required: true,
      halfCol: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "guardianIdPhoto",
      label: t("Auth.MembershipRegistration.Form.GuardianIdPhoto"),
      required: true,
      halfCol: true,
    },
  ];

  if (!formik || formik.values.socialStatus !== "Single") {
    familyInputs.forEach((i) => final.push(i));
  } else {
    final.push({
      type: "file",
      fileSizeLimit: 2,
      name: "guardianIdPhoto",
      label: t("Auth.MembershipRegistration.Form.IdPhoto"),
      required: true,
    });
  }

  const commonInputs = [
    {
      type: "radio",
      options: getGenders(t),
      name: "gender",
      label: t("Auth.MembershipRegistration.Form.Gender.Title"),
      required: true,
      halfCol: true,
    },
    {
      type: "radio",
      options: getHealthStatuses(t),
      name: "healthStatus",
      label: t("Auth.MembershipRegistration.Form.HealthStatus.Title"),
      required: true,
      halfCol: true,
    },
  ];

  commonInputs.forEach((i) => final.push(i));

  const sickInputs = [
    {
      type: "selectMany",
      options: getDiseases(t),
      placeholder: t("Auth.MembershipRegistration.Form.Diseases.None"),
      name: "diseases",
      label: t("Auth.MembershipRegistration.Form.Diseases.Title"),
      required: false,
    },
    {
      type: "radio",
      options: getYesNo(t),
      name: "incurableDisease",
      label: t("Auth.MembershipRegistration.Form.IncurableDisease"),
      required: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "healthStatementPhoto",
      label: t("Auth.MembershipRegistration.Form.HealthStatementPhoto"),
      required: true,
    },
  ];

  if (!formik || formik?.values?.healthStatus === "Sick") {
    sickInputs.forEach((i) => final.push(i));
  }

  return final;
};

export const getContactBankDataInputs = (t: Function): InputSingleProps[] => [
  {
    type: "phoneNumber",
    name: "beneficiaryMobile",
    label: t("Auth.MembershipRegistration.Form.BeneficiaryMobile"),
    required: true,
  },
  {
    type: "phoneNumber",
    name: "secondaryMobile",
    label: t("Auth.MembershipRegistration.Form.SecondaryMobile"),
    required: true,
  },
  // {
  //   type: "phoneNumber",
  //   name: "backupMobile",
  //   label: t("Auth.MembershipRegistration.Form.BackupMobile"),
  //   required: false,
  // },
  {
    type: "email",
    name: "email",
    label: t("Auth.MembershipRegistration.Form.Email"),
    required: false,
  },
  {
    type: "text",
    name: "bankAccountNumber",
    minLength: 24,
    maxLength: 24,
    label: t("Auth.MembershipRegistration.Form.BankAccountNumber"),
    // labelNote: t("Auth.MembershipRegistration.Form.BankAccountNumberNote"),
    required: true,
  },
  {
    type: "select",
    name: "bankName",
    options: banks(t).map(({ name, code }) => ({ value: code, label: name })),
    label: t("Auth.MembershipRegistration.Form.BankName.Title"),
    // labelNote: t("Auth.MembershipRegistration.Form.BankAccountNumberNote"),
    excludeInForm: true,
    required: true,
  },
  {
    type: "file",
    fileSizeLimit: 2,
    name: "ibanPhoto",
    label: t("Auth.MembershipRegistration.Form.IbanPhoto"),
    required: true,
    halfCol: true,
  },
];

export const getIncomeQualificationDataInputs = (
  t: Function,
  formik?: FormikProps<Record<string, any>>
): InputSingleProps[] => {
  const final: InputSingleProps[] = [
    {
      type: "select",
      options: getOccupations(t),
      name: "occupation",
      label: t("Auth.MembershipRegistration.Form.Occupation.Title"),
      required: true,
    },
    {
      type: "select",
      options: getEducationLevels(t),
      name: "educationLevel",
      label: t("Auth.MembershipRegistration.Form.EducationLevel.Title"),
      required: true,
    },
  ];

  const employeeInputs = [
    {
      type: "number",
      name: "salary",
      label: t("Auth.MembershipRegistration.Form.Salary"),
      min: 0,
      step: 0.1,
      moneyUnit: true,
      hasFile: true,
      required: true,
      halfCol: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "salaryFile",
      hideFile: true,
      required: true,
      halfCol: true,
    },
    {
      type: "number",
      name: "socialSecurity",
      label: t("Auth.MembershipRegistration.Form.SocialSecurity"),
      min: 0,
      step: 0.1,
      moneyUnit: true,
      hasFile: true,
      required: true,
      halfCol: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "socialSecurityFile",
      hideFile: true,
      required: true,
      halfCol: true,
    },
  ];

  if (!formik || formik?.values?.occupation?.includes("Employee")) {
    employeeInputs.forEach((i) => final.push(i));
  }

  const common = [
    {
      type: "number",
      name: "insurances",
      label: t("Auth.MembershipRegistration.Form.Insurances"),
      min: 0,
      step: 0.1,
      moneyUnit: true,
      hasFile: true,
      required: false,
      halfCol: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "insurancesFile",
      hideFile: true,
      required: false,
      halfCol: true,
    },
    {
      type: "number",
      name: "comprehensiveRehabilitation",
      label: t("Auth.MembershipRegistration.Form.ComprehensiveRehabilitation"),
      min: 0,
      step: 0.1,
      moneyUnit: true,
      hasFile: true,
      required: false,
      halfCol: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "comprehensiveRehabilitationFile",
      hideFile: true,
      required: false,
      halfCol: true,
    },
    {
      type: "number",
      name: "retirement",
      label: t("Auth.MembershipRegistration.Form.Retirement"),
      min: 0,
      step: 0.1,
      moneyUnit: true,
      hasFile: true,
      required: false,
      halfCol: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "retirementFile",
      hideFile: true,
      required: false,
      halfCol: true,
    },
  ];

  common.forEach((i) => final.push(i));

  return final;
};

export const getHousingDataInputs = (
  t: Function,
  formik?: FormikProps<Record<string, any>>
): InputSingleProps[] => {
  const final = [
    {
      type: "select",
      options: getProvinces(t),
      name: "province",
      label: t("Auth.MembershipRegistration.Form.Province.Title"),
      required: true,
    },
    {
      type: "text",
      name: "governorate",
      label: t("Auth.MembershipRegistration.Form.Governorate"),
      required: true,
    },
    {
      type: "text",
      name: "city",
      label: t("Auth.MembershipRegistration.Form.City"),
      required: true,
    },
    {
      type: "text",
      name: "district",
      label: t("Auth.MembershipRegistration.Form.District"),
      required: true,
    },
    {
      type: "select",
      options: getHomeTypes(t),
      name: "homeType",
      label: t("Auth.MembershipRegistration.Form.HomeType.Title"),
      required: true,
      halfCol: true,
    },
    {
      type: "text",
      name: "apartmentNo",
      label: t("Auth.MembershipRegistration.Form.ApartmentNo"),
      required: true,
      halfCol: true,
    },
    {
      type: "text",
      name: "nationalAddressNumber",
      maxLength: 8,
      label: t("Auth.MembershipRegistration.Form.NationalAddressNumber"),
      labelNote: t(
        "Auth.MembershipRegistration.Form.NationalAddressNumberNote"
      ),
      required: true,
      style: { textTransform: "uppercase" },
    },
    {
      type: "location",
      name: "homeLocation",
      label: t("Auth.MembershipRegistration.Form.HomeLocation"),
      required: true,
    },
    {
      type: "radio",
      options: getHomeOwnerships(t),
      name: "homeOwnership",
      label: t("Auth.MembershipRegistration.Form.HomeOwnership.Title"),
      required: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "homeDocumentPhoto",
      label: !formik
        ? t("Auth.MembershipRegistration.Form.RentalContractPhoto") +
          " / " +
          t("Auth.MembershipRegistration.Form.OwnershipDocumentPhoto")
        : formik?.values.homeOwnership === "Rental"
        ? t("Auth.MembershipRegistration.Form.RentalContractPhoto")
        : t("Auth.MembershipRegistration.Form.OwnershipDocumentPhoto"),
      required: true,
      halfCol: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "nationalAddressDocument",
      label: t("Auth.MembershipRegistration.Form.NationalAddressDocument"),
      required: true,
      halfCol: true,
    },
  ];

  const rentalInputs = [
    {
      type: "number",
      name: "rentalCharge",
      label: t("Auth.MembershipRegistration.Form.RentalCharge"),
      min: 0,
      step: 0.1,
      moneyUnit: true,
      required: true,
    },
  ];

  if (!formik || formik.values?.homeOwnership === "Rental") {
    rentalInputs.forEach((i) => final.push(i));
  }

  const ownerInputs = [
    {
      type: "select",
      options: getHomeOwners(t),
      name: "payee",
      label: t("Auth.MembershipRegistration.Form.Ownership.Title"),
      required: true,
    },
  ];

  if (!formik || formik.values?.homeOwnership === "Ownership") {
    ownerInputs.forEach((i) => final.push(i));
  }

  return final;
};

export const getDependantDataInputs = (
  t: Function,
  formik?: FormikProps<Record<string, any>>
): InputSingleProps[] => {
  const final: InputSingleProps[] = [
    {
      type: "text",
      name: "fullName",
      label: t("Auth.MembershipRegistration.Form.FullName"),
      required: true,
    },
    {
      type: "date",
      name: "dob",
      min: moment().locale("en").subtract(125, "y").format(dataDateFormat),
      max: moment().locale("en").format(dataDateFormat),
      label: t("Auth.MembershipRegistration.Form.Dob"),
      required: true,
    },
    {
      type: "date",
      name: "idExpiryDate",
      max: moment().locale("en").add(10, "y").format(dataDateFormat),
      label: t("Auth.MembershipRegistration.Form.IdExpiryDate"),
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
    {
      type: "radio",
      options: getGenders(t),
      name: "gender",
      label: t("Auth.MembershipRegistration.Form.Gender.Title"),
      required: true,
      halfCol: true,
    },
    {
      type: "phoneNumber",
      name: "mobile",
      label: t("Auth.MembershipRegistration.Form.DependentMobile"),
      labelNote: t("Auth.MembershipRegistration.Form.DependentMobileNote"),
      required: false,
    },
    {
      type: "select",
      options: getDependentRelations(t),
      name: "relation",
      label: t("Auth.MembershipRegistration.Form.Relation.Title"),
      required: true,
    },
    {
      type: "select",
      options: getAgeGroups(t),
      name: "ageGroup",
      label: t("Auth.MembershipRegistration.Form.AgeGroup.Title"),
      required: false,
      excludeInForm: true,
    },
    {
      type: "select",
      options: getEducationLevels(t),
      name: "educationLevel",
      label: t("Auth.MembershipRegistration.Form.EducationLevel.Title"),
      required: true,
    },
    {
      type: "select",
      options: getOccupations(t),
      name: "occupation",
      label: t("Auth.MembershipRegistration.Form.Occupation.Title"),
      required: true,
    },
  ];

  const studentInputs = [
    {
      type: "file",
      fileSizeLimit: 2,
      name: "studentDocument",
      label: t("Auth.MembershipRegistration.Form.StudentsDocument"),
      labelNote: t("Auth.MembershipRegistration.Form.StudentsDocumentNote"),
      required: true,
    },
  ];

  const employeeInputs = [
    {
      type: "number",
      name: "income",
      label: t("Auth.MembershipRegistration.Form.Income"),
      min: 0,
      step: 0.1,
      moneyUnit: true,
      hasFile: true,
      required: true,
      halfCol: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "incomeFile",
      hideFile: true,
      required: true,
      halfCol: true,
    },
  ];

  if (!formik || formik?.values?.occupation === "Student") {
    studentInputs.forEach((i) => final.push(i));
  }

  if (!formik || formik?.values?.occupation?.includes("Employee")) {
    employeeInputs.forEach((i) => final.push(i));
  }

  final.push({
    type: "radio",
    options: getHealthStatuses(t),
    name: "healthStatus",
    label: t("Auth.MembershipRegistration.Form.HealthStatus.Title"),
    required: true,
  });

  const sickInputs = [
    {
      type: "radio",
      options: getYesNo(t),
      name: "incurableDisease",
      label: t("Auth.MembershipRegistration.Form.IncurableDisease"),
      required: false,
    },
    {
      type: "selectMany",
      options: getDiseases(t),
      placeholder: t("Auth.MembershipRegistration.Form.Diseases.None"),
      name: "diseases",
      label: t("Auth.MembershipRegistration.Form.Diseases.Title"),
      required: false,
    },
  ];

  if (!formik || formik?.values?.healthStatus === "Sick") {
    sickInputs.forEach((i) => final.push(i));
  }

  return final;
};

export const getNationalRecordDataInputs = (
  t: Function
): InputSingleProps[] => [
  {
    type: "file",
    fileSizeLimit: 2,
    logo: absherLogo,
    name: "absherDocument",
    label: t("Auth.MembershipRegistration.Form.AbsherDocument"),
    required: true,
  },
  {
    type: "file",
    fileSizeLimit: 2,
    logo: tawakkalnaLogo,
    name: "tawakkalnaDocument",
    accept: ".png, .jpeg, .jpg, .pdf",
    label: t("Auth.MembershipRegistration.Form.TawakkalnaDocument"),
    required: true,
  },
  {
    type: "file",
    fileSizeLimit: 2,
    logo: molimLogo,
    name: "creditStatement",
    label: t("Auth.MembershipRegistration.Form.CreditStatement"),
    labelNote: t("Auth.MembershipRegistration.Form.CreditStatementNote"),
    required: true,
  },
];
