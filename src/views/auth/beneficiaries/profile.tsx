import {
  faChartSimple,
  faFileExcel,
  faHome,
  faRing,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import { riyalIcon } from "../../../assets/icons/icons";
import StatisticCards from "../../../components/card/statisticCards";
import Button from "../../../components/core/button";
import { InputSingleProps } from "../../../components/form";
import { dataRender } from "../../../components/table";
import TooltipComp from "../../../components/tooltip";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import { useAppSelector } from "../../../store/hooks";
import { exportDataToMultipleSheetsExcel } from "../../../utils/filesExport";
import {
  getBasicDataInputs,
  getContactBankDataInputs,
  getDependantDataInputs,
  getHousingDataInputs,
  getIncomeQualificationDataInputs,
  getNationalRecordDataInputs,
} from "../../../utils/formInputs/beneficiaryProfile";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
} from "../../../utils/function";
import { getBeneficiaryCategories } from "../../../utils/optionDataLists/beneficiaries";

const BeneficiaryProfileView = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { user } = useAppSelector((state) => state.auth);

  const [beneficiary, setBeneficiary] = useState<any>();
  const [income, setIncome] = useState<number>(0);

  useEffect(() => {
    if (searchParams.get("id")) {
      BeneficiaryApi.getById(searchParams.get("id") || "")
        .then((res: any) => {
          setBeneficiary(res.payload);

          const record = res.payload?.income;

          setIncome(
            [
              record.salary,
              record.socialSecurity,
              record.insurances,
              record.comprehensiveRehabilitation,
              record.retirement,
            ].reduce(
              (final: number, current: string) =>
                (final += parseFloat(current)),
              0
            )
          );
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
      data: beneficiary?.beneficiary,
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

    const fileName = (beneficiary?.beneficiary?.fullName || "Export") + ".xlsx";

    exportDataToMultipleSheetsExcel(
      fileName.replace(/[/\\?%*:|"<>]/g, "_"),
      sheets
    );
  };

  return (
    <PageTemplate>
      <div className="row w-100 mx-auto">
        <div className="col-6 col-md-9 d-flex">
          <h2>
            {user.role === "researcher"
              ? beneficiary?.beneficiary?.fullName
              : beneficiary?.beneficiary?.fileNo}{" "}
          </h2>

          {user.role === "researcher" && (
            <small className="bg-opacity-info p-2 rounded-4 text-sm ms-2 my-auto text-info">
              {beneficiary?.beneficiary?.fileNo}
            </small>
          )}

          <small className="bg-opacity-info p-2 rounded-4 text-sm ms-2 my-auto text-info">
            {renderDataFromOptions(
              beneficiary?.beneficiary?.category,
              getBeneficiaryCategories(t)
            )}
          </small>
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

        <div className="col-12">
          <StatisticCards
            statistics={[
              {
                label: t("Auth.Beneficiaries.DependentsCount"),
                count: dependentCards.length,
                color: "success",
                icon: faUsers,
              },
              {
                label: t("Auth.Beneficiaries.WivesCount"),
                count: beneficiary?.dependents.filter(
                  ({ relation = "" }) => relation === "Spouse"
                )?.length,
                color: "primary",
                icon: faRing,
              },
              {
                label: t("Auth.Beneficiaries.HousesCount"),
                count: housingCards.length,
                color: "warning",
                icon: faHome,
              },
              {
                label: t("Auth.Beneficiaries.IncomeTotal"),
                count: income,
                unit: <img src={riyalIcon} />,
                color: "info",
                icon: faChartSimple,
              },
            ]}
          />
        </div>

        {[
          ...commonCards1,
          ...housingCards,
          ...dependentCards,
          ...commonCards2,
        ]?.map(({ title, data, map }, i) => (
          <div className="col-md-6 my-3" key={i}>
            <table className="table rounded-4 table-bordered">
              <tbody>
                <tr className="table-secondary">
                  <th colSpan={2}>
                    <h5>{title}</h5>
                  </th>
                </tr>

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
                    ?.filter(({ hideFile = false }) => !hideFile)
                    .map((prop: InputSingleProps, y = 0) => (
                      <tr key={y}>
                        <td
                          className="pb-3 text-break"
                          style={{
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            maxWidth: "125px",
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
                            hasFile: prop.hasFile,
                            money: prop.moneyUnit,
                          })}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default BeneficiaryProfileView;
