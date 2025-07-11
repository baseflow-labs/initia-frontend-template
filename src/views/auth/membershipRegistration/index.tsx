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
import { helpIcon, successIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import WizardFormStepper from "../../../components/form/wizard/stepper";
import { addNotification } from "../../../store/actions/notifications";
import { dataDateFormat } from "../../../utils/consts";
import {
  getContactBankDataInputs,
  getIncomeQualificationDataInputs,
  getNationalRecordDataInputs,
} from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";
import {
  getDiseases,
  getGenders,
  getHealthStatuses,
  getHomeOwnerships,
  getHomeRentalPayees,
  getHomeTypes,
  getNationalities,
  getProvinces,
  getSocialStatuses,
} from "../../../utils/optionDataLists/beneficiaries";
import { getYesNo } from "../../../utils/optionDataLists/common";
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
        .then((res: any) =>
          res.payload.beneficiary?.id ? setFormData(res.payload) : ""
        )
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

  const basicDataInputs = (formik?: FormikProps<Record<string, any>>) => [
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
      type: "file",
      name: "familyRecordPhoto",
      label: t("Auth.MembershipRegistration.Form.FamilyRecordPhoto"),
      required: false,
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
    ...(formik?.values.healthStatus === "Sick"
      ? [
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
        ]
      : []),
  ];

  const contactDataInputs = () => getContactBankDataInputs(t);

  const qualificationDataInputs = () => getIncomeQualificationDataInputs(t);

  const hostelDataInputs = (formik?: FormikProps<Record<string, any>>) => [
    {
      type: "title",
      name: "title2",
      defaultValue: t("Auth.MembershipRegistration.Form.Address"),
    },
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
        formik?.values.homeOwnership === "Rental"
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
    ...(formik?.values.homeOwnership === "Rental"
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
            options: getHomeRentalPayees(t),
            name: "payee",
            label: t("Auth.MembershipRegistration.Form.Payee.Title"),
            required: true,
          },
        ]
      : []),
  ];

  const attachmentInputs = () => getNationalRecordDataInputs(t);

  const HelpButton = () => {
    const alreadyRequested = formData.status?.status === "Need Help";

    return (
      <div className="w-100">
        <Button
          className="w-fit p-2 ps-1 mb-3 text-start border-0"
          color="ghost"
          type="button"
          disabled={alreadyRequested}
          onClick={() => onRequestHelp()}
        >
          <IconWrapperComp icon={helpIcon} />{" "}
          {alreadyRequested
            ? t("Auth.MembershipRegistration.Form.AlreadyRequested")
            : t("Auth.MembershipRegistration.Form.ClickForHelp")}
        </Button>
      </div>
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

  const cleanData = (inputs: { name: string }[], values: object) => {
    const data = Object.keys(values)
      .filter((key) => inputs.find(({ name }) => name === key))
      .reduce(
        (final, key) => ({ ...final, [key]: (values as any)[key] }),
        {}
      ) as any;

    return data;
  };

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
            const final = cleanData(basicDataInputs(), e);

            BeneficiaryApi.createOrUpdate({
              ...final,
              user: formData.user?.id,
            })
              .then((res: any) => {
                onNextStep({ ...e, ...res.payload }, "beneficiary");
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
            const final = cleanData(contactDataInputs(), e);

            ContactApi.createOrUpdate({
              ...final,
              beneficiary: formData.beneficiary?.id,
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
            const final = cleanData(qualificationDataInputs(), e);

            IncomeApi.createOrUpdate({
              ...final,
              beneficiary: formData.beneficiary?.id,
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
            const final = cleanData(hostelDataInputs(), e);

            HousingApi.createOrUpdate({
              ...final,
              beneficiary: formData.beneficiary?.id,
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
          saveData={(dependents) => {
            setFormData((current) => ({
              ...current,
              dependents,
            }));
          }}
          onFormSubmit={(dependents) => {
            window.scrollTo(0, 0);
            setFormData((current) => ({
              ...current,
              dependents,
            }));
            setCurrentStep((current = 0) => current + 1);
          }}
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
            const final = cleanData(attachmentInputs(), e);

            NationalRecordApi.createOrUpdate({
              ...final,
              beneficiary: formData.beneficiary?.id,
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
          <h2 className="display-5 mb-3">
            <IconWrapperComp
              icon={successIcon}
              className="text-success"
              height={100}
            />

            <div className="mt-4">
              {t("Auth.MembershipRegistration.Form.Success.Title")}
            </div>
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
    <div className="container-fluid px-0 mx-0 px-lg-5">
      <WizardFormStepper
        steps={formSteps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

export default MembershipRegistrationView;
