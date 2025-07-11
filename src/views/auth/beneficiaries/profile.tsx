import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import * as XLSX from "xlsx";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Button from "../../../components/core/button";
import { InputSingleProps } from "../../../components/form";
import { dataRender } from "../../../components/table";
import { dataDateFormat } from "../../../utils/consts";
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
} from "../../../utils/optionDataLists/beneficiaries";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { getYesNo } from "../../../utils/optionDataLists/common";

const BeneficiaryProfileView = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [beneficiary, setBeneficiary] = useState<any>();

  useEffect(() => {
    if (searchParams.get("id")) {
      BeneficiaryApi.getById(searchParams.get("id") || "")
        .then((res: any) => {
          setBeneficiary(res.payload);
        })
        .catch(apiCatchGlobalHandler);
    } else {
      BeneficiaryApi.getByUserId()
        .then((res: any) => {
          setBeneficiary(res.payload);
        })
        .catch(apiCatchGlobalHandler);
    }
  }, []);

  const basicDataInputs: InputSingleProps[] = [
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

  const hostelDataInputs: InputSingleProps[] = [
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

  const commonCards1 = [
    {
      title: t("Auth.MembershipRegistration.Form.BasicData"),
      data: beneficiary?.beneficiary || beneficiary,
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
  ];

  const dependentCards =
    beneficiary?.dependents?.map((dependent: any) => ({
      title: t("Auth.MembershipRegistration.Form.DependantData", {
        name: dependent.fullName,
      }),
      data: dependent,
      map: dependentsDataInputs,
    })) || [];

  const commonCards2 = [
    {
      title: t("Auth.MembershipRegistration.Form.Attachments"),
      data: beneficiary?.nationalRecord,
      map: attachmentInputs,
    },
  ];

  // const downloadProfileAsFile = (type: string) => {
  //   BeneficiaryApi.downloadProfile(searchParams.get("id") || "", type)
  //     .then((res: any) => downloadFile({ response: res.payload , type }))
  //     .catch(apiCatchGlobalHandler);
  // };

  const processTypesForExport = (type: string) => {
    switch (type) {
      case "phoneNumber":
      case "file":
      case "location":
      case "image":
      case "stars":
        return "text";
      default:
        return type;
    }
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    [...commonCards1, ...commonCards2]
      .filter(({ data }) => data)
      .forEach(({ title, data, map }) => {
        const worksheet = XLSX.utils.json_to_sheet([
          map
            .filter(({ name = "" }) => (data as any)[name || "id"])
            .reduce(
              (
                final = [{}],
                prop = { label: "", name: "", type: "", options: [] }
              ) => ({
                ...final,
                [prop.label || ""]: dataRender({
                  data: (data as any)[prop.name || "id"],
                  type: processTypesForExport(prop.type || ""),
                  options: prop.options || [],
                }),
              }),
              {}
            ),
        ]);

        XLSX.utils.book_append_sheet(workbook, worksheet, title.slice(0, 29));
      });

    const worksheet = XLSX.utils.json_to_sheet(
      beneficiary?.dependents.map((dependent: any) =>
        dependentsDataInputs
          .filter(({ name = "" }) => (dependent as any)[name || "id"])
          .reduce(
            (
              final = [{}],
              prop = { label: "", name: "", type: "", options: [] }
            ) => ({
              ...final,
              [prop.label || ""]: dataRender({
                data: (dependent as any)[prop.name || "id"],
                type: processTypesForExport(prop.type || ""),
                options: prop.options || [],
              }),
            }),
            {}
          )
      )
    );

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      t("Auth.MembershipRegistration.Form.DependentsData").slice(0, 29)
    );
    XLSX.writeFile(
      workbook,
      (beneficiary?.fullName || beneficiary?.beneficiary?.fullName) + ".xlsx"
    );
  };

  return (
    <div className="row w-100 mx-auto">
      <div className="col-6 col-md-9">
        <h2>{beneficiary?.fullName || beneficiary?.beneficiary?.fullName}</h2>
      </div>

      <div className="col-6 col-md-3">
        {/* <Button
          className="float-end me-1"
          outline
          onClick={() => downloadProfileAsFile("pdf")}
        >
          <FontAwesomeIcon icon={faFilePdf} />
        </Button> */}

        <Button
          outline
          color="success"
          className="float-end"
          onClick={() => exportToExcel()}
        >
          <FontAwesomeIcon icon={faFileExcel} />
        </Button>
      </div>

      {[...commonCards1, ...dependentCards, ...commonCards2]?.map(
        ({ title, data, map }, i) => (
          <div className="col-md-6 my-5" key={i}>
            <h4 className="mb-4">{title}</h4>

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
                        ?.map((prop: InputSingleProps, y = 0) => (
                          <tr key={y}>
                            <td
                              className="pb-3 text-break"
                              style={{
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                maxWidth: "200px",
                              }}
                            >
                              {prop.label}
                            </td>

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
        )
      )}
    </div>
  );
};

export default BeneficiaryProfileView;
