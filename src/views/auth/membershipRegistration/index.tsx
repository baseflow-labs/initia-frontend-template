import { faCheckCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikProps } from "formik";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { Fragment } from "react/jsx-runtime";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as ContactApi from "../../../api/profile/contact";
import * as HousingApi from "../../../api/profile/housing";
import * as IncomeApi from "../../../api/profile/income";
import * as NationalRecordApi from "../../../api/profile/nationalRecord";
import absherLogo from "../../../assets/images/partners/absher.svg";
import eduMinistryLogo from "../../../assets/images/partners/eduMinistry.svg";
import ejarLogo from "../../../assets/images/partners/ejar.svg";
import masrafLogo from "../../../assets/images/partners/Masraf.svg";
import ministryLogo from "../../../assets/images/partners/ministry.svg";
import molimLogo from "../../../assets/images/partners/molim.svg";
import tawakkalnaLogo from "../../../assets/images/partners/Tawakkalna.svg";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import WizardFormStepper from "../../../components/form/wizard/stepper";
import { addNotification } from "../../../store/actions/notifications";
import { dataDateFormat } from "../../../utils/consts";
import { apiCatchGlobalHandler } from "../../../utils/function";
import DependentsFormView from "./Dependents";

const MembershipRegistrationView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    beneficiary: { id: "", fullName: "" },
    contactsBank: {},
    status: { status: "" },
    housing: {},
    income: {},
    user: { id: "" },
    dependents: [{ fullName: "", idNumber: "" }],
    nationalRecord: {},
  });

  useLayoutEffect(() => {
    if (searchParams.get("id")) {
      BeneficiaryApi.getById(searchParams.get("id") || "")
        .then(
          ({
            contactsBank,
            dependents,
            housing,
            income,
            nationalRecord,
            user,
            status,
            ...beneficiary
          }: any) =>
            beneficiary?.id
              ? setFormData({
                  contactsBank,
                  dependents,
                  housing,
                  status,
                  income,
                  nationalRecord,
                  user,
                  beneficiary,
                })
              : ""
        )
        .catch(apiCatchGlobalHandler);
    } else {
      BeneficiaryApi.getByUserId()
        .then((res: any) => (res.beneficiary?.id ? setFormData(res) : ""))
        .catch(apiCatchGlobalHandler);
    }
  }, []);

  const onRequestHelp = () => {
    BeneficiaryApi.requestHelp(formData.beneficiary?.id)
      .then(() =>
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.MembershipRegistration.Form.HelpRequested"),
              data:
                formData.beneficiary.fullName ||
                t("Auth.Beneficiaries.Beneficiary"),
            }),
          })
        )
      )
      .catch(apiCatchGlobalHandler);
  };

  const onNextStep = (values = {}, service = "") => {
    window.scrollTo(0, 0);
    setFormData((current) => ({
      ...current,
      [service]: { ...(current as any)[service], ...values },
    }));
    setCurrentStep((current = 0) => current + 1);
  };

  const onPreviousStep = () => {
    setCurrentStep((current = 0) => current - 1);
  };

  const basicDataInputs = (formik: FormikProps<Record<string, any>>) => [
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
    ...(formik.values.healthStatus === "Sick"
      ? [
          {
            type: "selectMany",
            options: [
              {
                value: "Disability",
                label: t(
                  "Auth.MembershipRegistration.Form.Diseases.Disability"
                ),
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
                label: t(
                  "Auth.MembershipRegistration.Form.Diseases.ChronicDiseases"
                ),
              },
              {
                value: "Neurological Diseases",
                label: t(
                  "Auth.MembershipRegistration.Form.Diseases.NeurologicalDiseases"
                ),
              },
              {
                value: "Genetic Diseases",
                label: t(
                  "Auth.MembershipRegistration.Form.Diseases.GeneticDiseases"
                ),
              },
              {
                value: "Cancerous",
                label: t("Auth.MembershipRegistration.Form.Diseases.Cancerous"),
              },
              {
                value: "Chest Diseases",
                label: t(
                  "Auth.MembershipRegistration.Form.Diseases.ChestDiseases"
                ),
              },
              {
                value: "Liver Diseases",
                label: t(
                  "Auth.MembershipRegistration.Form.Diseases.LiverDiseases"
                ),
              },
              {
                value: "Skin Diseases",
                label: t(
                  "Auth.MembershipRegistration.Form.Diseases.SkinDiseases"
                ),
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
        ]
      : []),
  ];

  const contactDataInputs = () => [
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

  const qualificationDataInputs = () => [
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
      type: "title",
      name: "title1",
      defaultValue: t("Auth.MembershipRegistration.Form.IncomeResources"),
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

  const hostelDataInputs = (formik: FormikProps<Record<string, any>>) => [
    {
      type: "title",
      name: "title2",
      defaultValue: t("Auth.MembershipRegistration.Form.Address"),
    },
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
        formik.values.homeOwnership === "Rental"
          ? t("Auth.MembershipRegistration.Form.RentalContractPhoto")
          : t("Auth.MembershipRegistration.Form.OwnershipDocumentPhoto"),
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
    ...(formik.values.homeOwnership === "Rental"
      ? [
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
        ]
      : []),
  ];

  const attachmentInputs = () => [
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

  const HelpButton = () => {
    const alreadyRequested = formData.status?.status === "Need Help";

    return (
      <Button
        className="w-100 p-2 ps-1 mb-3 text-start border-0"
        color="ghost"
        type="button"
        disabled={alreadyRequested}
        onClick={() => onRequestHelp()}
      >
        <FontAwesomeIcon icon={faInfoCircle} />{" "}
        {alreadyRequested
          ? t("Auth.MembershipRegistration.Form.AlreadyRequested")
          : t("Auth.MembershipRegistration.Form.ClickForHelp")}
      </Button>
    );
  };

  const BackButton = () => (
    <Fragment>
      <HelpButton />

      <Button className="w-50 p-2" onClick={() => onPreviousStep()} outline>
        {t("Global.Form.Labels.Previous")}
      </Button>
    </Fragment>
  );

  const formSteps = [
    {
      label: t("Auth.MembershipRegistration.Form.BasicData"),
      name: "BasicData",
      contents: (
        <Form
          inputs={basicDataInputs}
          submitText={t("Global.Form.Labels.SaveContinue")}
          customButtons={<HelpButton />}
          initialValues={formData.beneficiary}
          onFormSubmit={(e) => {
            BeneficiaryApi.createOrUpdate({
              ...e,
              user: formData.user?.id,
            })
              .then((res) => {
                onNextStep({ ...e, ...res }, "beneficiary");
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      ),
    },
    {
      label: t("Auth.MembershipRegistration.Form.ContactData"),
      name: "ContactData",
      contents: (
        <Form
          inputs={contactDataInputs}
          submitText={t("Global.Form.Labels.SaveContinue")}
          customButtons={<BackButton />}
          initialValues={formData.contactsBank}
          onFormSubmit={(e) => {
            ContactApi.createOrUpdate({
              beneficiary: formData.beneficiary?.id,
              ...e,
            })
              .then(() => {
                onNextStep(e, "contactsBank");
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      ),
    },
    {
      label: t("Auth.MembershipRegistration.Form.QualificationData"),
      name: "QualificationData",
      contents: (
        <Form
          inputs={qualificationDataInputs}
          submitText={t("Global.Form.Labels.SaveContinue")}
          customButtons={<BackButton />}
          initialValues={formData.income}
          onFormSubmit={(e) => {
            IncomeApi.createOrUpdate({
              beneficiary: formData.beneficiary?.id,
              ...e,
            })
              .then(() => {
                onNextStep(e, "income");
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      ),
    },
    {
      label: t("Auth.MembershipRegistration.Form.HostelData"),
      name: "HostelData",
      contents: (
        <Form
          inputs={hostelDataInputs}
          submitText={t("Global.Form.Labels.SaveContinue")}
          customButtons={<BackButton />}
          initialValues={formData.housing}
          onFormSubmit={(e) => {
            HousingApi.createOrUpdate({
              beneficiary: formData.beneficiary?.id,
              ...e,
            })
              .then(() => {
                onNextStep(e, "housing");
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      ),
    },
    {
      label: t("Auth.MembershipRegistration.Form.DependentsData"),
      name: "DependentsData",
      contents: (
        <DependentsFormView
          customButtons={<BackButton />}
          initialValues={formData.dependents}
          onFormSubmit={(e) => onNextStep(e)}
          beneficiary={formData.beneficiary?.id}
        />
      ),
    },
    {
      label: t("Auth.MembershipRegistration.Form.Attachments"),
      name: "Attachments",
      contents: (
        <Form
          inputs={attachmentInputs}
          customButtons={<BackButton />}
          initialValues={formData.nationalRecord}
          onFormSubmit={(e) => {
            NationalRecordApi.createOrUpdate({
              beneficiary: formData.beneficiary?.id,
              ...e,
            })
              .then(() => {
                onNextStep(e, "nationalRecord");
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      ),
    },
    {
      label: "",
      name: "Success",
      contents: (
        <div className="text-center">
          <h2 className="display-4">
            <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
            <br />
            {t("Auth.MembershipRegistration.Form.Success.Title")}
          </h2>

          <h4 className="text-muted my-4">
            {t("Auth.MembershipRegistration.Form.Success.Text")}
          </h4>

          <Button color="info" onClick={() => navigate("/dashboard")}>
            {t("Auth.MembershipRegistration.Form.Success.Next")}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="px-1 mx-1 px-lg-5 mx-lg-5">
        <WizardFormStepper
          steps={formSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </Fragment>
  );
};

export default MembershipRegistrationView;
