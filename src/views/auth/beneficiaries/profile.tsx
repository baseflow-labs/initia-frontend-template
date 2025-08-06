import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Button from "../../../components/core/button";
import { InputSingleProps } from "../../../components/form";
import { dataRender } from "../../../components/table";
import TooltipComp from "../../../components/tooltip";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import { exportDataToMultipleSheetsExcel } from "../../../utils/filesExport";
import {
  getBasicDataInputs,
  getContactBankDataInputs,
  getDependantDataInputs,
  getHousingDataInputs,
  getIncomeQualificationDataInputs,
  getNationalRecordDataInputs,
} from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";

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

  const commonCards1 = [
    {
      title: t("Auth.MembershipRegistration.Form.BasicData"),
      data: beneficiary?.beneficiary || beneficiary,
      map: getBasicDataInputs(t),
    },
    {
      title: t("Auth.MembershipRegistration.Form.ContactData"),
      data: beneficiary?.contactsBank,
      map: getContactBankDataInputs(t),
    },
    {
      title: t("Auth.MembershipRegistration.Form.QualificationData"),
      data: beneficiary?.income,
      map: getIncomeQualificationDataInputs(t),
    },
  ];

  const housingCards =
    beneficiary?.housing?.map((house: any) => ({
      title:
        t("Auth.MembershipRegistration.Form.HostelData") +
        " " +
        house.nationalAddressNumber,
      data: house,
      map: getHousingDataInputs(t),
    })) || [];

  const dependentCards =
    beneficiary?.dependents?.map((dependent: any) => ({
      title: t("Auth.MembershipRegistration.Form.DependantData", {
        name: dependent.fullName,
      }),
      data: dependent,
      map: getDependantDataInputs(t),
    })) || [];

  const commonCards2 = [
    {
      title: t("Auth.MembershipRegistration.Form.Attachments"),
      data: beneficiary?.nationalRecord,
      map: getNationalRecordDataInputs(t),
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
    const sheets: { label: string; data: object[] }[] = [];

    [...commonCards1, ...commonCards2]
      .filter(({ data }) => data)
      .forEach(({ title, data, map }) => {
        const processedData = [
          map
            .filter(({ name = "" }) => (data as any)[name || "id"])
            .reduce(
              (
                final = {},
                prop = { label: "", name: "", type: "", options: [] }
              ) => ({
                ...final,
                [prop.label || ""]: dataRender({
                  data: (data as any)[prop.name || "id"],
                  type: processTypesForExport(prop.type || ""),
                  options: prop.options || [],
                  name: prop.name,
                }),
              }),
              {}
            ),
        ];

        sheets.push({
          label: title.slice(0, 29),
          data: processedData,
        });
      });

    if (beneficiary?.dependents?.length) {
      const dependentsSheetData = beneficiary.dependents.map((dependent: any) =>
        getDependantDataInputs(t)
          .filter(({ name = "" }) => (dependent as any)[name || "id"])
          .reduce(
            (
              final = {},
              prop = { label: "", name: "", type: "", options: [] }
            ) => ({
              ...final,
              [prop.label || ""]: dataRender({
                data: (dependent as any)[prop.name || "id"],
                type: processTypesForExport(prop.type || ""),
                options: prop.options || [],
                name: prop.name,
              }),
            }),
            {}
          )
      );

      sheets.push({
        label: t("Auth.MembershipRegistration.Form.DependentsData").slice(
          0,
          29
        ),
        data: dependentsSheetData,
      });
    }

    const fileName =
      (beneficiary?.fullName ||
        beneficiary?.beneficiary?.fullName ||
        "Export") + ".xlsx";

    exportDataToMultipleSheetsExcel(
      fileName.replace(/[/\\?%*:|"<>]/g, "_"),
      sheets
    );
  };

  return (
    <PageTemplate>
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
            <TooltipComp label={t("Global.Labels.DownloadAsExcel")}>
              <FontAwesomeIcon icon={faFileExcel} />
            </TooltipComp>
          </Button>
        </div>

        {[
          ...commonCards1,
          ...housingCards,
          ...dependentCards,
          ...commonCards2,
        ]?.map(({ title, data, map }, i) => (
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
                                row: data,
                                data: (data as any)[prop.name || "id"],
                                type: prop.type,
                                options: prop.options || [],
                                name: prop.name,
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
      </div>
    </PageTemplate>
  );
};

export default BeneficiaryProfileView;
