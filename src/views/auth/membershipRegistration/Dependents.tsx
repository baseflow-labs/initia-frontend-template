import { faPerson, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikProps } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";

import * as DependentApi from "../../../api/profile/dependent";
import Button from "../../../components/core/button";
import Spinner from "../../../components/core/spinner";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { dataDateFormat } from "../../../utils/consts";
import { apiCatchGlobalHandler } from "../../../utils/fucntions";

interface Props {
  customButtons: React.ReactNode;
  initialValues: { fullName: string; idNumber: string }[];
  beneficiary: string;
  onFormSubmit: (values: any) => void;
}

const DependentsFormView = ({
  customButtons = <></>,
  initialValues = [],
  beneficiary,
  onFormSubmit,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dependents, setDependents] = useState(initialValues);
  const { loading } = useAppSelector((state) => state.loading);

  useEffect(() => setDependents(initialValues), [initialValues]);

  const remove = (i = 0) => {
    setDependents((current) => current.filter((_, y) => y != i));
  };

  const dependentsDataInputs = (formik: FormikProps<Record<string, any>>) => [
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

  return (
    <Fragment>
      {dependents.map((dependent: any, i: number) => (
        <div className="accordion-item mb-3" key={i}>
          <h2 className="accordion-header mb-3" id={"heading" + String(i)}>
            <div className="d-flex align-items-center justify-content-between ">
              <button
                className="btn btn-ghost p-3 w-100 text-start collapsed bg-info rounded-4 text-white"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + String(i)}
                aria-expanded="false"
                type="button"
                aria-controls={"collapse" + String(i)}
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faUser} className="me-2" />{" "}
                {dependent.fullName ||
                  t("Auth.MembershipRegistration.Form.Dependents.Dependant") +
                    " " +
                    (i + 1)}
              </button>

              <Button
                color="ghost"
                text="danger"
                size="sm"
                type="button"
                className="border border-1 rounded-4 py-3 ms-2"
                onClick={() => remove(i)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </h2>

          <div
            id={`collapse${i}`}
            className="accordion-collapse show"
            aria-labelledby={`heading${i}`}
          >
            <div className="accordion-body">
              <Form
                inputs={dependentsDataInputs}
                submitText={
                  t(
                    "Auth.MembershipRegistration.Form.Dependents.SaveDependent"
                  ) +
                  " " +
                  dependent.fullName
                }
                initialValues={dependent}
                onFormSubmit={(e) => {
                  DependentApi.createOrUpdate({
                    beneficiary,
                    ...e,
                  })
                    .then(() => {
                      dispatch(
                        addNotification({
                          msg: t(
                            "Auth.MembershipRegistration.Form.Dependents.DependentSaved",
                            { name: e.fullName }
                          ),
                        })
                      );
                      setDependents((current) =>
                        [...current, e].filter((data) => !data.idNumber)
                      );
                    })
                    .catch(apiCatchGlobalHandler);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        color="success"
        outline
        type="button"
        className="my-4"
        onClick={() =>
          setDependents((current) => [
            ...current,
            { fullName: "", idNumber: "" },
          ])
        }
      >
        {t("Auth.MembershipRegistration.Form.Dependents.AddNew")}{" "}
        <FontAwesomeIcon icon={faPerson} />
      </Button>

      {customButtons}

      <Button
        type="button"
        disabled={loading.length > 0}
        color="info"
        className={`w-${customButtons ? "50" : "100"} p-2`}
        onClick={() => onFormSubmit(dependents)}
      >
        {loading.length > 0 ? (
          <small>
            <Spinner />
          </small>
        ) : (
          <div className="my-auto">{t("Global.Form.Labels.SaveContinue")}</div>
        )}
      </Button>
    </Fragment>
  );
};

export default DependentsFormView;
