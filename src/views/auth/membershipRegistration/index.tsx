import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

import absherLogo from "../../../assets/images/partners/absher.svg";
import eduMinistryLogo from "../../../assets/images/partners/eduMinistry.svg";
import ejarLogo from "../../../assets/images/partners/ejar.svg";
import masrafLogo from "../../../assets/images/partners/Masraf.svg";
import ministryLogo from "../../../assets/images/partners/ministry.svg";
import molimLogo from "../../../assets/images/partners/molim.svg";
import tawakkalnaLogo from "../../../assets/images/partners/Tawakkalna.svg";
import Form from "../../../components/form";

const MembershipRegistrationView = () => {
  const { t } = useTranslation();

  const inputs = [
    {
      type: "select",
      options: [{ value: "Single" }, { value: "Married" }],
      name: "socialStatus",
      label: t("Auth.MembershipRegistration.Form.SocialStatus"),
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
      options: [{ value: "Saudi" }, { value: "Jordan" }],
      name: "nationality",
      label: t("Auth.MembershipRegistration.Form.Nationality"),
      required: true,
    },
    {
      type: "date",
      name: "dob",
      label: t("Auth.MembershipRegistration.Form.Dob"),
      required: true,
    },
    {
      type: "date",
      name: "idExpiryDate",
      label: t("Auth.MembershipRegistration.Form.IdExpiryDate"),
      required: true,
    },
    {
      type: "numberText",
      name: "idNumber",
      label: t("Auth.MembershipRegistration.Form.IdNumber"),
      required: true,
    },
    {
      type: "file",
      name: "familyRecordPhoto",
      label: t("Auth.MembershipRegistration.Form.FamilyRecordPhoto"),
      required: true,
      half: true,
    },
    {
      type: "file",
      name: "guardianIdPhoto",
      label: t("Auth.MembershipRegistration.Form.GuardianIdPhoto"),
      required: true,
      half: true,
    },
    {
      type: "radio",
      options: [{ value: "Male" }, { value: "Female" }],
      name: "gender",
      label: t("Auth.MembershipRegistration.Form.Gender"),
      required: true,
      half: true,
    },
    {
      type: "radio",
      options: [{ value: "Healthy" }, { value: "Sick" }],
      name: "healthStatus",
      label: t("Auth.MembershipRegistration.Form.HealthStatus"),
      required: true,
      half: true,
    },
    {
      type: "selectMany",
      options: [{ value: "COVID" }, { value: "Flu" }],
      name: "diseases",
      label: t("Auth.MembershipRegistration.Form.Diseases"),
      required: true,
    },
    {
      type: "select",
      options: [{ value: "Yes" }, { value: "No" }],
      name: "incurableDisease",
      label: t("Auth.MembershipRegistration.Form.IncurableDisease"),
      required: true,
    },
    {
      type: "file",
      name: "healthStatementPhoto",
      label: t("Auth.MembershipRegistration.Form.HealthStatementPhoto"),
      required: true,
      half: true,
    },
    {
      type: "phoneNumber",
      name: "secondaryMobile",
      label: t("Auth.MembershipRegistration.Form.SecondaryMobile"),
      required: true,
    },
    {
      type: "phoneNumber",
      name: "beneficiaryMobile",
      label: t("Auth.MembershipRegistration.Form.BeneficiaryMobile"),
      required: true,
    },
    {
      type: "phoneNumber",
      name: "backupMobile",
      label: t("Auth.MembershipRegistration.Form.BackupMobile"),
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: t("Auth.MembershipRegistration.Form.Email"),
      required: true,
    },
    {
      type: "numberText",
      name: "bankAccountNumber",
      label: t("Auth.MembershipRegistration.Form.BankAccountNumber"),
      required: true,
    },
    {
      type: "file",
      name: "ibanPhoto",
      label: t("Auth.MembershipRegistration.Form.IbanPhoto"),
      required: true,
      half: true,
    },
    {
      type: "text",
      name: "occupation",
      label: t("Auth.MembershipRegistration.Form.Occupation"),
      required: true,
    },
    {
      type: "select",
      options: [{ value: "High School" }, { value: "Degree" }],
      name: "educationLevel",
      label: t("Auth.MembershipRegistration.Form.EducationLevel"),
      required: true,
    },
    {
      type: "number",
      name: "salary",
      label: t("Auth.MembershipRegistration.Form.Salary"),
      required: true,
      half: true,
    },
    {
      type: "file",
      name: "salaryFile",
      required: true,
      half: true,
    },
    {
      type: "number",
      name: "insurances",
      label: t("Auth.MembershipRegistration.Form.Insurances"),
      required: true,
      half: true,
    },
    {
      type: "file",
      name: "insurancesFile",
      required: true,
      half: true,
    },
    {
      type: "number",
      name: "comprehensiveRehabilitation",
      label: t("Auth.MembershipRegistration.Form.ComprehensiveRehabilitation"),
      required: true,
      half: true,
    },
    {
      type: "file",
      name: "comprehensiveRehabilitationFile",
      required: true,
      half: true,
    },
    {
      type: "number",
      name: "retirement",
      label: t("Auth.MembershipRegistration.Form.Retirement"),
      required: true,
      half: true,
    },
    {
      type: "file",
      name: "retirementFile",
      required: true,
      half: true,
    },
    {
      type: "number",
      name: "socialSecurity",
      label: t("Auth.MembershipRegistration.Form.SocialSecurity"),
      required: true,
      half: true,
    },
    {
      type: "file",
      name: "socialSecurityFile",
      required: true,
      half: true,
    },
    {
      type: "text",
      name: "city",
      label: t("Auth.MembershipRegistration.Form.City"),
      required: true,
    },
    {
      type: "select",
      options: [{ value: "Makkah" }, { value: "Madinah" }],
      name: "governorate",
      label: t("Auth.MembershipRegistration.Form.Governorate"),
      required: true,
    },
    {
      type: "text",
      name: "district",
      label: t("Auth.MembershipRegistration.Form.District"),
      required: true,
    },
    {
      type: "radio",
      options: [{ value: "Rent" }, { value: "Ownership" }],
      name: "homeOwnership",
      label: t("Auth.MembershipRegistration.Form.HomeOwnership"),
      required: true,
    },
    {
      type: "file",
      name: "rentalContractPhoto",
      label: t("Auth.MembershipRegistration.Form.RentalContractPhoto"),
      required: true,
      half: true,
    },
    {
      type: "file",
      name: "nationalAddressDocument",
      label: t("Auth.MembershipRegistration.Form.NationalAddressDocument"),
      required: true,
      half: true,
    },
    {
      type: "location",
      name: "homeLocation",
      label: t("Auth.MembershipRegistration.Form.HomeLocation"),
      required: true,
    },
    {
      type: "select",
      options: [{ value: "Apartment" }, { value: "Independent Home" }],
      name: "homeType",
      label: t("Auth.MembershipRegistration.Form.HomeType"),
      required: true,
      half: true,
    },
    {
      type: "text",
      name: "apartmentNo",
      label: t("Auth.MembershipRegistration.Form.ApartmentNo"),
      required: true,
      half: true,
    },
    {
      type: "number",
      name: "rentalCharge",
      label: t("Auth.MembershipRegistration.Form.RentalCharge"),
      required: true,
    },
    {
      type: "select",
      options: [{ value: "Monthly" }, { value: "Yearly" }],
      name: "paymentFrequency",
      label: t("Auth.MembershipRegistration.Form.PaymentFrequency"),
      required: true,
    },
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
      required: true,
    },
    {
      type: "file",
      logo: eduMinistryLogo,
      name: "studentsDocument",
      label: t("Auth.MembershipRegistration.Form.StudentsDocument"),
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
      required: true,
    },
  ];

  return (
    <Fragment>
      <Form inputs={inputs} />
    </Fragment>
  );
};

export default MembershipRegistrationView;
