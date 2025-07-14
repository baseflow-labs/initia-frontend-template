import moment from "moment";
import absherLogo from "../../assets/images/partners/absher.svg";
import eduMinistryLogo from "../../assets/images/partners/eduMinistry.svg";
import ejarLogo from "../../assets/images/partners/ejar.svg";
import masrafLogo from "../../assets/images/partners/Masraf.svg";
import ministryLogo from "../../assets/images/partners/ministry.svg";
import molimLogo from "../../assets/images/partners/molim.svg";
import tawakkalnaLogo from "../../assets/images/partners/Tawakkalna.svg";
import { InputSingleProps } from "../../components/form";
import { dataDateFormat } from "../consts";
import {
  getAgeGroups,
  getBeneficiaryCategories,
  getDependentRelations,
  getDiseases,
  getEducationLevels,
  getGenders,
  getHealthStatuses,
  getHomeOwnerships,
  getHomeRentalPayees,
  getHomeTypes,
  getNationalities,
  getOccupations,
  getProvinces,
  getSocialStatuses,
} from "../optionDataLists/beneficiaries";
import { getYesNo } from "../optionDataLists/common";

export const getBasicDataInputs = (t: Function): InputSingleProps[] => [
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
  },
  {
    type: "file",
    name: "familyRecordPhoto",
    label: t("Auth.MembershipRegistration.Form.FamilyRecordPhoto"),
    required: true,
    halfCol: true,
  },
  {
    type: "file",
    name: "guardianIdPhoto",
    label: t("Auth.MembershipRegistration.Form.GuardianIdPhoto"),
    required: true,
    halfCol: true,
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
    type: "radio",
    options: getHealthStatuses(t),
    name: "healthStatus",
    label: t("Auth.MembershipRegistration.Form.HealthStatus.Title"),
    required: true,
    halfCol: true,
  },
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
    name: "healthStatementPhoto",
    label: t("Auth.MembershipRegistration.Form.HealthStatementPhoto"),
    required: true,
  },
];

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
    required: false,
  },
  {
    type: "phoneNumber",
    name: "backupMobile",
    label: t("Auth.MembershipRegistration.Form.BackupMobile"),
    required: false,
  },
  {
    type: "email",
    name: "email",
    label: t("Auth.MembershipRegistration.Form.Email"),
    required: false,
  },
  {
    type: "numberText",
    name: "bankAccountNumber",
    label: t("Auth.MembershipRegistration.Form.BankAccountNumber"),
    labelNote: t("Auth.MembershipRegistration.Form.BankAccountNumberNote"),
    required: false,
  },
  {
    type: "file",
    name: "ibanPhoto",
    label: t("Auth.MembershipRegistration.Form.IbanPhoto"),
    required: false,
    halfCol: true,
  },
];

export const getIncomeQualificationDataInputs = (
  t: Function
): InputSingleProps[] => [
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
  {
    type: "number",
    name: "salary",
    label: t("Auth.MembershipRegistration.Form.Salary"),
    min: 0,
    step: 0.1,
    required: false,
    halfCol: true,
  },
  {
    type: "file",
    name: "salaryFile",
    required: false,
    halfCol: true,
  },
  {
    type: "number",
    name: "insurances",
    label: t("Auth.MembershipRegistration.Form.Insurances"),
    min: 0,
    step: 0.1,
    required: false,
    halfCol: true,
  },
  {
    type: "file",
    name: "insurancesFile",
    required: false,
    halfCol: true,
  },
  {
    type: "number",
    name: "comprehensiveRehabilitation",
    label: t("Auth.MembershipRegistration.Form.ComprehensiveRehabilitation"),
    min: 0,
    step: 0.1,
    required: false,
    halfCol: true,
  },
  {
    type: "file",
    name: "comprehensiveRehabilitationFile",
    required: false,
    halfCol: true,
  },
  {
    type: "number",
    name: "retirement",
    label: t("Auth.MembershipRegistration.Form.Retirement"),
    min: 0,
    step: 0.1,
    required: false,
    halfCol: true,
  },
  {
    type: "file",
    name: "retirementFile",
    required: false,
    halfCol: true,
  },
  {
    type: "number",
    name: "socialSecurity",
    label: t("Auth.MembershipRegistration.Form.SocialSecurity"),
    min: 0,
    step: 0.1,
    required: false,
    halfCol: true,
  },
  {
    type: "file",
    name: "socialSecurityFile",
    required: false,
    halfCol: true,
  },
];

export const getHousingDataInputs = (t: Function): InputSingleProps[] => [
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
    name: "homeDocumentPhoto",
    label:
      t("Auth.MembershipRegistration.Form.RentalContractPhoto") +
      " / " +
      t("Auth.MembershipRegistration.Form.OwnershipDocumentPhoto"),
    required: true,
    halfCol: true,
  },
  {
    type: "file",
    name: "nationalAddressDocument",
    label: t("Auth.MembershipRegistration.Form.NationalAddressDocument"),
    required: true,
    halfCol: true,
  },
  {
    type: "number",
    name: "rentalCharge",
    label: t("Auth.MembershipRegistration.Form.RentalCharge"),
    min: 0,
    step: 0.1,
    required: true,
  },
  {
    type: "select",
    options: getHomeRentalPayees(t),
    name: "payee",
    label: t("Auth.MembershipRegistration.Form.Payee.Title"),
    required: true,
  },
];

export const getDependantDataInputs = (t: Function): InputSingleProps[] => [
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
    required: true,
  },
  {
    type: "radio",
    options: getHealthStatuses(t),
    name: "healthStatus",
    label: t("Auth.MembershipRegistration.Form.HealthStatus.Title"),
    required: true,
  },
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
    required: false,
  },
];

export const getNationalRecordDataInputs = (
  t: Function
): InputSingleProps[] => [
  {
    type: "file",
    logo: absherLogo,
    name: "absherDocument",
    label: t("Auth.MembershipRegistration.Form.AbsherDocument"),
    required: true,
  },
  {
    type: "file",
    logo: tawakkalnaLogo,
    name: "tawakkalnaDocument",
    label: t("Auth.MembershipRegistration.Form.TawakkalnaDocument"),
    required: true,
  },
  {
    type: "file",
    logo: ministryLogo,
    name: "incomeDocument",
    label: t("Auth.MembershipRegistration.Form.IncomeDocument"),
    labelNote: t("Auth.MembershipRegistration.Form.IncomeDocumentNote"),
    required: true,
  },
  {
    type: "file",
    logo: eduMinistryLogo,
    name: "studentsDocument",
    label: t("Auth.MembershipRegistration.Form.StudentsDocument"),
    labelNote: t("Auth.MembershipRegistration.Form.StudentsDocumentNote"),
    required: true,
  },
  {
    type: "file",
    logo: ejarLogo,
    name: "rentalDocument",
    label: t("Auth.MembershipRegistration.Form.RentalDocument"),
    required: true,
  },
  {
    type: "file",
    logo: masrafLogo,
    name: "masrefDocument",
    label: t("Auth.MembershipRegistration.Form.MasrefDocument"),
    required: true,
  },
  {
    type: "file",
    logo: molimLogo,
    name: "creditStatement",
    label: t("Auth.MembershipRegistration.Form.CreditStatement"),
    labelNote: t("Auth.MembershipRegistration.Form.CreditStatementNote"),
    required: true,
  },
];
