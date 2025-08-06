import { FormikErrors, FormikProps } from "formik";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { Fragment } from "react/jsx-runtime";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as ContactApi from "../../../api/profile/contact";
import * as IncomeApi from "../../../api/profile/income";
import * as NationalRecordApi from "../../../api/profile/nationalRecord";
import { helpIcon, successIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import WizardFormStepper from "../../../components/form/wizard/stepper";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import { addNotification } from "../../../store/actions/notifications";
import {
  getBasicDataInputs,
  getContactBankDataInputs,
  getIncomeQualificationDataInputs,
  getNationalRecordDataInputs,
} from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { banks } from "../../../utils/optionDataLists/beneficiaries";
import DependentsFormView from "./Dependents";
import HousingsFormView from "./Housings";

const MembershipRegistrationView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [currentStep, setCurrentStep] = useState(3);

  const [formData, setFormData] = useState({
    beneficiary: { id: "", fullName: "" },
    contactsBank: {},
    status: { status: "" },
    housing: [{ nationalAddressNumber: "" }],
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
                  housing: [housing],
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
          res.payload.beneficiary?.id
            ? setFormData({ ...res.payload, housing: [res.payload.housing] })
            : ""
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

  const basicDataInputs = (formik?: FormikProps<Record<string, any>>) =>
    getBasicDataInputs(t, formik);

  const contactDataInputs = () => getContactBankDataInputs(t);

  const qualificationDataInputs = (formik?: FormikProps<Record<string, any>>) =>
    getIncomeQualificationDataInputs(t, formik);

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

  const validateBankAccountNumber = (values: Record<string, any>) => {
    const errors: FormikErrors<Record<string, any>> = {};
    const iban: string = values.bankAccountNumber?.trim()?.toUpperCase() || "";

    const allowedBankCodes = new Set(banks(t).map(({ code }) => code));

    if (!iban.startsWith("SA")) {
      errors.bankAccountNumber = "يجب أن يبدأ رقم الآيبان بـ SA";
    } else {
      const bankCode = iban.substring(4, 8);

      if (!allowedBankCodes.has(bankCode)) {
        errors.bankAccountNumber = "رقم الآيبان لا يتبع أي بنك سعودي";
      }
    }

    return errors;
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
          customValidate={validateBankAccountNumber}
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
        <HousingsFormView
          customButtons={<BackButton />}
          initialValues={formData.housing}
          saveData={(housing) => {
            setFormData((current) => ({
              ...current,
              housing,
            }));
          }}
          onFormSubmit={(housing) => {
            window.scrollTo(0, 0);
            setFormData((current) => ({
              ...current,
              housing,
            }));
            setCurrentStep((current = 0) => current + 1);
          }}
          beneficiary={formData.beneficiary?.id}
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
    <PageTemplate showNav>
      <div className="container-fluid px-0 mx-0 px-lg-5">
        <WizardFormStepper
          steps={formSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </PageTemplate>
  );
};

export default MembershipRegistrationView;
