import moment from "moment";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as DataReviewApi from "../../../api/profile/dataReview";
import * as DataUpdateApi from "../../../api/profile/dataUpdate";
import Form, { InputSingleProps } from "../../../components/form";
import { dataRender } from "../../../components/table";
import ColumnsPage from "../../../layouts/auth/columnsPage";
import { dataDateFormat } from "../../../utils/consts";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../store/actions/notifications";

const BeneficiaryOwnProfile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [beneficiary, setBeneficiary] = useState<any>();
  const [dataReviews, setDataReviews] =
    useState<
      { id: string; table: string; property: string; row?: {}; note?: string }[]
    >();

  const callData = () => {
    BeneficiaryApi.getByUserId()
      .then((res: any) => {
        setBeneficiary(res);

        DataReviewApi.getNonUpdatedDataReview(res.beneficiary.id)
          .then((res) => setDataReviews(res as any))
          .catch(apiCatchGlobalHandler);
      })

      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    callData();
  }, []);

  const basicDataInputs: InputSingleProps[] = [
    {
      type: "select",
      options: [
        {
          value: "Single",
          label: t("Auth.MembershipRegistration.Form.SocialStatus.Single"),
        },
        {
          value: "Married",
          label: t("Auth.MembershipRegistration.Form.SocialStatus.Married"),
        },
        {
          value: "Divorced",
          label: t("Auth.MembershipRegistration.Form.SocialStatus.Divorced"),
        },
        {
          value: "Widower",
          label: t("Auth.MembershipRegistration.Form.SocialStatus.Widower"),
        },
      ],
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
      options: [
        {
          value: "Saudi",
          label: t("Auth.MembershipRegistration.Form.Nationality.Saudi"),
        },
        {
          value: "Non Saudi",
          label: t("Auth.MembershipRegistration.Form.Nationality.NonSaudi"),
        },
      ],
      name: "nationality",
      label: t("Auth.MembershipRegistration.Form.Nationality.Title"),
      required: true,
    },
    {
      type: "date",
      name: "dob",
      min: moment().subtract(125, "y").format(dataDateFormat),
      max: moment().subtract(17, "y").format(dataDateFormat),
      label: t("Auth.MembershipRegistration.Form.Dob"),
      required: true,
    },
    {
      type: "date",
      name: "idExpiryDate",
      max: moment().add(10, "y").format(dataDateFormat),
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
      options: [
        {
          value: "Male",
          label: t("Auth.MembershipRegistration.Form.Gender.Male"),
        },
        {
          value: "Female",
          label: t("Auth.MembershipRegistration.Form.Gender.Female"),
        },
      ],
      name: "gender",
      label: t("Auth.MembershipRegistration.Form.Gender.Title"),
      required: true,
      halfCol: true,
    },
    {
      type: "radio",
      options: [
        {
          value: "Healthy",
          label: t("Auth.MembershipRegistration.Form.HealthStatus.Healthy"),
        },
        {
          value: "Sick",
          label: t("Auth.MembershipRegistration.Form.HealthStatus.Sick"),
        },
      ],
      name: "healthStatus",
      label: t("Auth.MembershipRegistration.Form.HealthStatus.Title"),
      required: true,
      halfCol: true,
    },
    {
      type: "selectMany",
      options: [
        {
          value: "Disability",
          label: t("Auth.MembershipRegistration.Form.Diseases.Disability"),
        },
        {
          value: "Hearing Impairment",
          label: t(
            "Auth.MembershipRegistration.Form.Diseases.HearingImpairment"
          ),
        },
        {
          value: "Visual Impairment",
          label: t(
            "Auth.MembershipRegistration.Form.Diseases.VisualImpairment"
          ),
        },
        {
          value: "Mental Disability",
          label: t(
            "Auth.MembershipRegistration.Form.Diseases.MentalDisability"
          ),
        },
        {
          value: "Chronic Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.ChronicDiseases"),
        },
        {
          value: "Neurological Diseases",
          label: t(
            "Auth.MembershipRegistration.Form.Diseases.NeurologicalDiseases"
          ),
        },
        {
          value: "Genetic Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.GeneticDiseases"),
        },
        {
          value: "Cancerous",
          label: t("Auth.MembershipRegistration.Form.Diseases.Cancerous"),
        },
        {
          value: "Chest Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.ChestDiseases"),
        },
        {
          value: "Liver Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.LiverDiseases"),
        },
        {
          value: "Skin Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.SkinDiseases"),
        },
      ],
      placeholder: t("Auth.MembershipRegistration.Form.Diseases.None"),
      name: "diseases",
      label: t("Auth.MembershipRegistration.Form.Diseases.Title"),
      required: false,
    },
    {
      type: "radio",
      options: [
        { value: "Yes", label: t("Global.Form.Labels.Yes") },
        { value: "No", label: t("Global.Form.Labels.No") },
      ],
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

  const contactDataInputs: InputSingleProps[] = [
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

  const qualificationDataInputs: InputSingleProps[] = [
    {
      type: "select",
      options: [
        {
          value: "Government Employee",
          label: t(
            "Auth.MembershipRegistration.Form.Occupation.GovernmentEmployee"
          ),
        },
        {
          value: "Private-Sector Employee",
          label: t(
            "Auth.MembershipRegistration.Form.Occupation.PrivateSectorEmployee"
          ),
        },
        {
          value: "Per-Day Worker",
          label: t("Auth.MembershipRegistration.Form.Occupation.PerDayWorker"),
        },
        {
          value: "No Fixed",
          label: t("Auth.MembershipRegistration.Form.Occupation.NoFixed"),
        },
        {
          value: "Looking For Job",
          label: t("Auth.MembershipRegistration.Form.Occupation.LookingForJob"),
        },
        {
          value: "Retiree",
          label: t("Auth.MembershipRegistration.Form.Occupation.Retiree"),
        },
        {
          value: "Student",
          label: t("Auth.MembershipRegistration.Form.Occupation.Student"),
        },
        {
          value: "Housewife",
          label: t("Auth.MembershipRegistration.Form.Occupation.Housewife"),
        },
        {
          value: "Unemployed",
          label: t("Auth.MembershipRegistration.Form.Occupation.Unemployed"),
        },
        {
          value: "Unable To Work",
          label: t("Auth.MembershipRegistration.Form.Occupation.UnableToWork"),
        },
      ],
      name: "occupation",
      label: t("Auth.MembershipRegistration.Form.Occupation.Title"),
      required: true,
    },
    {
      type: "select",
      options: [
        {
          value: "Illiterate",
          label: t(
            "Auth.MembershipRegistration.Form.EducationLevel.Illiterate"
          ),
        },
        {
          value: "Literate",
          label: t("Auth.MembershipRegistration.Form.EducationLevel.Literate"),
        },
        {
          value: "Primary School",
          label: t(
            "Auth.MembershipRegistration.Form.EducationLevel.PrimarySchool"
          ),
        },
        {
          value: "Intermediate School",
          label: t(
            "Auth.MembershipRegistration.Form.EducationLevel.IntermediateSchool"
          ),
        },
        {
          value: "High School",
          label: t(
            "Auth.MembershipRegistration.Form.EducationLevel.HighSchool"
          ),
        },
        {
          value: "Diploma",
          label: t("Auth.MembershipRegistration.Form.EducationLevel.Diploma"),
        },
        {
          value: "Degree",
          label: t("Auth.MembershipRegistration.Form.EducationLevel.Degree"),
        },
        {
          value: "Higher Diploma",
          label: t(
            "Auth.MembershipRegistration.Form.EducationLevel.HigherDiploma"
          ),
        },
        {
          value: "Master",
          label: t("Auth.MembershipRegistration.Form.EducationLevel.Master"),
        },
        {
          value: "Phd",
          label: t("Auth.MembershipRegistration.Form.EducationLevel.Phd"),
        },
      ],
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

  const hostelDataInputs: InputSingleProps[] = [
    {
      type: "select",
      options: [
        {
          value: "Riyadh",
          label: t("Auth.MembershipRegistration.Form.Province.Riyadh"),
        },
        {
          value: "Makkah",
          label: t("Auth.MembershipRegistration.Form.Province.Makkah"),
        },
        {
          value: "Madinah",
          label: t("Auth.MembershipRegistration.Form.Province.Madinah"),
        },
        {
          value: "Eastern Province",
          label: t(
            "Auth.MembershipRegistration.Form.Province.Eastern Province"
          ),
        },
        {
          value: "Asir",
          label: t("Auth.MembershipRegistration.Form.Province.Asir"),
        },
        {
          value: "Tabuk",
          label: t("Auth.MembershipRegistration.Form.Province.Tabuk"),
        },
        {
          value: "Hail",
          label: t("Auth.MembershipRegistration.Form.Province.Hail"),
        },
        {
          value: "Northern Borders",
          label: t("Auth.MembershipRegistration.Form.Province.NorthernBorders"),
        },
        {
          value: "Jazan",
          label: t("Auth.MembershipRegistration.Form.Province.Jazan"),
        },
        {
          value: "Najran",
          label: t("Auth.MembershipRegistration.Form.Province.Najran"),
        },
        {
          value: "Al-Bahah",
          label: t("Auth.MembershipRegistration.Form.Province.AlBahah"),
        },
        {
          value: "Al-Jawf",
          label: t("Auth.MembershipRegistration.Form.Province.AlJawf"),
        },
        {
          value: "Al-Qassim",
          label: t("Auth.MembershipRegistration.Form.Province.AlQassim"),
        },
      ],
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
      options: [
        {
          value: "Apartment",
          label: t("Auth.MembershipRegistration.Form.HomeType.Apartment"),
        },
        {
          value: "Villa",
          label: t("Auth.MembershipRegistration.Form.HomeType.Villa"),
        },
        {
          value: "Independent Home",
          label: t("Auth.MembershipRegistration.Form.HomeType.IndependentHome"),
        },
        {
          value: "Folk House",
          label: t("Auth.MembershipRegistration.Form.HomeType.FolkHouse"),
        },
        {
          value: "Room(s) in Shared House",
          label: t("Auth.MembershipRegistration.Form.HomeType.SharedHouse"),
        },
        {
          value: "Roof",
          label: t("Auth.MembershipRegistration.Form.HomeType.Roof"),
        },
        {
          value: "Caravan",
          label: t("Auth.MembershipRegistration.Form.HomeType.Caravan"),
        },
        {
          value: "Incomplete Building",
          label: t(
            "Auth.MembershipRegistration.Form.HomeType.IncompleteBuilding"
          ),
        },
        {
          value: "No Permanent Home",
          label: t("Auth.MembershipRegistration.Form.HomeType.NoPermanentHome"),
        },
      ],
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
      options: [
        {
          value: "Rental",
          label: t("Auth.MembershipRegistration.Form.HomeOwnership.Rental"),
        },
        {
          value: "Ownership",
          label: t("Auth.MembershipRegistration.Form.HomeOwnership.Ownership"),
        },
      ],
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
      options: [
        {
          value: "Self",
          label: t("Auth.MembershipRegistration.Form.Payee.Self"),
        },
        {
          value: "Relative",
          label: t("Auth.MembershipRegistration.Form.Payee.Relative"),
        },
        {
          value: "Society",
          label: t("Auth.MembershipRegistration.Form.Payee.Society"),
        },
        {
          value: "Government",
          label: t("Auth.MembershipRegistration.Form.Payee.Government"),
        },
        {
          value: "Installment",
          label: t("Auth.MembershipRegistration.Form.Payee.Installment"),
        },
        {
          value: "Free",
          label: t("Auth.MembershipRegistration.Form.Payee.Free"),
        },
      ],
      name: "payee",
      label: t("Auth.MembershipRegistration.Form.Payee.Title"),
      required: true,
    },
  ];

  const dependentsDataInputs: InputSingleProps[] = [
    {
      type: "text",
      name: "fullName",
      label: t("Auth.MembershipRegistration.Form.FullName"),
      required: true,
    },
    {
      type: "date",
      name: "dob",
      min: moment().subtract(125, "y").format(dataDateFormat),
      max: moment().format(dataDateFormat),
      label: t("Auth.MembershipRegistration.Form.Dob"),
      required: true,
    },
    {
      type: "date",
      name: "idExpiryDate",
      max: moment().add(10, "y").format(dataDateFormat),
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
      options: [
        {
          value: "Male",
          label: t("Auth.MembershipRegistration.Form.Gender.Male"),
        },
        {
          value: "Female",
          label: t("Auth.MembershipRegistration.Form.Gender.Female"),
        },
      ],
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
      options: [
        {
          value: "Spouse",
          label: t("Auth.MembershipRegistration.Form.Relation.Spouse"),
        },
        {
          value: "Parent",
          label: t("Auth.MembershipRegistration.Form.Relation.Parent"),
        },
        {
          value: "Child",
          label: t("Auth.MembershipRegistration.Form.Relation.Child"),
        },
        {
          value: "Sibling",
          label: t("Auth.MembershipRegistration.Form.Relation.Sibling"),
        },
        {
          value: "Grandparent",
          label: t("Auth.MembershipRegistration.Form.Relation.Grandparent"),
        },
        {
          value: "Grandchild",
          label: t("Auth.MembershipRegistration.Form.Relation.Grandchild"),
        },
        {
          value: "Paternal Uncle / Aunt",
          label: t(
            "Auth.MembershipRegistration.Form.Relation.PaternalUncleAunt"
          ),
        },
        {
          value: "Maternal Uncle / Aunt",
          label: t(
            "Auth.MembershipRegistration.Form.Relation.MaternalUncleAunt"
          ),
        },
        {
          value: "InLow",
          label: t("Auth.MembershipRegistration.Form.Relation.InLow"),
        },
        {
          value: "None",
          label: t("Auth.MembershipRegistration.Form.Relation.None"),
        },
      ],
      name: "relation",
      label: t("Auth.MembershipRegistration.Form.Relation.Title"),
      required: true,
    },
    {
      type: "select",
      options: [
        {
          value: "Below 5",
          label: t("Auth.MembershipRegistration.Form.AgeGroup.BelowFive"),
        },
        {
          value: "5 - 12",
          label: t("Auth.MembershipRegistration.Form.AgeGroup.FiveToTwelve"),
        },
        {
          value: "12 - 18",
          label: t(
            "Auth.MembershipRegistration.Form.AgeGroup.TwelveToEighteen"
          ),
        },
        {
          value: "18 - 30",
          label: t(
            "Auth.MembershipRegistration.Form.AgeGroup.EighteenToThirty"
          ),
        },
        {
          value: "30 - 45",
          label: t(
            "Auth.MembershipRegistration.Form.AgeGroup.ThirtyToFortyFive"
          ),
        },
        {
          value: "45 - 60",
          label: t(
            "Auth.MembershipRegistration.Form.AgeGroup.FortyFiveToSixty"
          ),
        },
        {
          value: "Above 60",
          label: t("Auth.MembershipRegistration.Form.AgeGroup.AboveSixty"),
        },
      ],
      name: "ageGroup",
      label: t("Auth.MembershipRegistration.Form.AgeGroup.Title"),
      required: true,
    },
    {
      type: "radio",
      options: [
        {
          value: "Healthy",
          label: t("Auth.MembershipRegistration.Form.HealthStatus.Healthy"),
        },
        {
          value: "Sick",
          label: t("Auth.MembershipRegistration.Form.HealthStatus.Sick"),
        },
      ],
      name: "healthStatus",
      label: t("Auth.MembershipRegistration.Form.HealthStatus.Title"),
      required: true,
    },
    {
      type: "selectMany",
      options: [
        {
          value: "Disability",
          label: t("Auth.MembershipRegistration.Form.Diseases.Disability"),
        },
        {
          value: "Hearing Impairment",
          label: t(
            "Auth.MembershipRegistration.Form.Diseases.HearingImpairment"
          ),
        },
        {
          value: "Visual Impairment",
          label: t(
            "Auth.MembershipRegistration.Form.Diseases.VisualImpairment"
          ),
        },
        {
          value: "Mental Disability",
          label: t(
            "Auth.MembershipRegistration.Form.Diseases.MentalDisability"
          ),
        },
        {
          value: "Chronic Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.ChronicDiseases"),
        },
        {
          value: "Neurological Diseases",
          label: t(
            "Auth.MembershipRegistration.Form.Diseases.NeurologicalDiseases"
          ),
        },
        {
          value: "Genetic Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.GeneticDiseases"),
        },
        {
          value: "Cancerous",
          label: t("Auth.MembershipRegistration.Form.Diseases.Cancerous"),
        },
        {
          value: "Chest Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.ChestDiseases"),
        },
        {
          value: "Liver Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.LiverDiseases"),
        },
        {
          value: "Skin Diseases",
          label: t("Auth.MembershipRegistration.Form.Diseases.SkinDiseases"),
        },
      ],
      placeholder: t("Auth.MembershipRegistration.Form.Diseases.None"),
      name: "diseases",
      label: t("Auth.MembershipRegistration.Form.Diseases.Title"),
      required: false,
    },
    {
      type: "radio",
      options: [
        { value: "Yes", label: t("Global.Form.Labels.Yes") },
        { value: "No", label: t("Global.Form.Labels.No") },
      ],
      name: "incurableDisease",
      label: t("Auth.MembershipRegistration.Form.IncurableDisease"),
      required: false,
    },
  ];

  const attachmentInputs: InputSingleProps[] = [
    {
      type: "file",
      name: "absherDocument",
      label: t("Auth.MembershipRegistration.Form.AbsherDocument"),
      required: true,
    },
    {
      type: "file",
      name: "tawakkalnaDocument",
      label: t("Auth.MembershipRegistration.Form.TawakkalnaDocument"),
      required: true,
    },
    {
      type: "file",
      name: "incomeDocument",
      label: t("Auth.MembershipRegistration.Form.IncomeDocument"),
      labelNote: t("Auth.MembershipRegistration.Form.IncomeDocumentNote"),
      required: true,
    },
    {
      type: "file",
      name: "studentsDocument",
      label: t("Auth.MembershipRegistration.Form.StudentsDocument"),
      labelNote: t("Auth.MembershipRegistration.Form.StudentsDocumentNote"),
      required: true,
    },
    {
      type: "file",
      name: "rentalDocument",
      label: t("Auth.MembershipRegistration.Form.RentalDocument"),
      required: true,
    },
    {
      type: "file",
      name: "masrefDocument",
      label: t("Auth.MembershipRegistration.Form.MasrefDocument"),
      required: true,
    },
    {
      type: "file",
      name: "creditStatement",
      label: t("Auth.MembershipRegistration.Form.CreditStatement"),
      labelNote: t("Auth.MembershipRegistration.Form.CreditStatementNote"),
      required: true,
    },
  ];

  const cards = [
    {
      title: t("Auth.MembershipRegistration.Form.BasicData"),
      data: beneficiary?.beneficiary,
      map: basicDataInputs,
    },
    {
      title: t("Auth.MembershipRegistration.Form.ContactData"),
      data: beneficiary?.contactsBank,
      map: contactDataInputs,
    },
    {
      title: t("Auth.MembershipRegistration.Form.QualificationData"),
      data: beneficiary?.income,
      map: qualificationDataInputs,
    },
    {
      title: t("Auth.MembershipRegistration.Form.HostelData"),
      data: beneficiary?.housing,
      map: hostelDataInputs,
    },
    ...(beneficiary?.dependents?.map((dependent: any) => ({
      title: t("Auth.MembershipRegistration.Form.DependantData", {
        name: dependent.fullName,
      }),
      data: dependent,
      map: dependentsDataInputs,
    })) || []),
    {
      title: t("Auth.MembershipRegistration.Form.Attachments"),
      data: beneficiary?.nationalRecord,
      map: attachmentInputs,
    },
  ];

  const mapping = [
    {
      table: "beneficiary",
      inputs: basicDataInputs,
      data: beneficiary?.beneficiary,
    },
    {
      table: "income",
      inputs: qualificationDataInputs,
      data: beneficiary?.income,
    },
    {
      table: "contactsBank",
      inputs: contactDataInputs,
      data: beneficiary?.contactsBank,
    },
    {
      table: "housing",
      inputs: hostelDataInputs,
      data: beneficiary?.housing,
    },
    // {
    //   table: "dependant",
    //   inputs: dependentsDataInputs,
    //   data: beneficiary?.dependents
    // },
    {
      table: "nationalRecord",
      inputs: attachmentInputs,
      data: beneficiary?.nationalRecord,
    },
  ];

  const onDataUpdate = (data = {}) => {
    DataUpdateApi.create(data)
      .then((res) => {
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Global.Form.Labels.Update"),
              data: t("Auth.Beneficiary.Profile.YourProfile"),
            }),
          })
        );
        callData();
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <ColumnsPage>
      <Fragment>
        <div className="col-md-12 mb-4">
          <h3>{t("Auth.Beneficiary.Profile.Title")}</h3>
        </div>

        <div className="col-md-12 mb-4 row">
          <h5 className="mb-4">
            {t("Auth.Beneficiary.Profile.PleaseUpdateFollowingData")}
          </h5>

          {dataReviews?.map(({ id, table, property, row, note }, i) => {
            const requestTable = mapping.find(
              ({ table: mapTable }) => mapTable === table
            );

            const requestProperty = requestTable?.inputs.find(
              ({ name }) => name === property
            );

            const currentData = requestTable?.data[property];

            return (
              <div className="col-md-6" key={i}>
                <div className="card h-100 rounded-4">
                  <div className="card-body p-5">
                    {requestProperty && (
                      <Form
                        inputs={() =>
                          [requestProperty].map(({ halfCol, ...rest }) => ({
                            ...rest,
                            defaultValue: currentData,
                            required: true,
                          }))
                        }
                        onFormSubmit={(values) =>
                          onDataUpdate({
                            data: values[property],
                            dataReview: id,
                          })
                        }
                        submitText={t("Global.Form.Labels.SaveData")}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-12 mt-5">
          <h5>{t("Auth.Beneficiary.Profile.CurrentData")}</h5>
        </div>

        {cards.map(({ title, data, map }, i) => (
          <div className="col-md-6 my-5" key={i}>
            <h4 className="my-4">{title}</h4>

            <div className="card h-100 rounded-4">
              <div className="card-body">
                <table className="table table-borderless">
                  <tbody>
                    {data &&
                      map
                        // .reduce(
                        //   (
                        //     final: {
                        //       prop1: InputSingleProps;
                        //       prop2?: InputSingleProps;
                        //     }[],
                        //     current,
                        //     i
                        //   ) => {
                        //     if (i % 2 === 0) {
                        //       final.push({
                        //         prop1: current,
                        //         prop2: map[i + 1] || null,
                        //       });
                        //     }

                        //     return final;
                        //   },
                        //   []
                        // )
                        .map((prop: InputSingleProps, y = 0) => (
                          <tr key={y}>
                            <td className="pb-3">{prop.label}</td>

                            <td className="pb-3">
                              {dataRender({
                                data: (data as any)[prop.name || "id"],
                                type: prop.type,
                                options: prop.options || [],
                              })}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    </ColumnsPage>
  );
};

export default BeneficiaryOwnProfile;
