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
import DynamicTable, { dataRender, MoneyUnit } from "../../../components/table";
import TooltipComp from "../../../components/tooltip";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import { useAppSelector } from "../../../store/hooks";
import { Dependent, Housing } from "../../../types/beneficiaries";
import { exportDataToMultipleSheetsExcel } from "../../../utils/filesExport";
import {
  getBasicDataInputs,
  getCategoryDetailsInputs,
  getCategoryInputs,
  getContactBankDataInputs,
  getDependantDataInputs,
  getHousingDataInputs,
  getIncomeQualificationDataInputs,
  getNationalRecordDataInputs,
} from "../../../utils/formInputs/beneficiaryProfile";
import {
  apiCatchGlobalHandler,
  pluralLabelResolve,
  renderDataFromOptions,
} from "../../../utils/function";
import {
  getBeneficiaryCategories,
  getDependentRelations,
} from "../../../utils/optionDataLists/beneficiaries";

const BeneficiaryProfileView = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { user } = useAppSelector((state) => state.auth);

  const isResearcher = user.role === "researcher";
  const isHod = user.role === "hod";
  const isCeo = user.role === "ceo";
  const isResearcherOrHodOrCeo = isResearcher || isHod || isCeo;

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
    {
      title: t("Auth.Beneficiaries.Profile.CategoriesList"),
      data: beneficiary?.categories?.reduce(
        (final: any, current: any, idx: number) => {
          const withIndex = Object.keys(current).reduce(
            (acc: any, key: string) => {
              const value = current[key];
              const finalValue =
                typeof value === "number" ? (value < 0 ? 0 : value) : value;
              acc[`${key}_${idx}`] = finalValue;
              return acc;
            },
            {}
          );
          return { ...final, ...withIndex };
        },
        {}
      ),
      map: beneficiary?.categories?.reduce(
        (finalInputs: any[], _cur: any, idx: number) => {
          const indexed = getCategoryInputs(t).map((input) => ({
            ...input,
            name: `${input.name}_${idx}`,
            label: t(input.label || "", {
              index: t("Global.Labels.Order." + (idx + 1)),
            }),
          }));
          return [...finalInputs, ...indexed];
        },
        []
      ),
    },
    {
      title: t("Auth.Beneficiaries.Profile.CategorizationDetails"),
      data: beneficiary?.categoryDetails,
      map: getCategoryDetailsInputs(t),
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
            .filter(
              ({ name = "", type = "" }) =>
                (data as any)[name || "id"] && type !== "file"
            )
            .reduce(
              (
                final = {},
                prop = { label: "", name: "", type: "", options: [] }
              ) => {
                return {
                  ...final,
                  [prop.label || ""]: dataRender({
                    row: data,
                    data: (data as any)[prop.name || "id"],
                    type: processTypesForExport(prop.type || ""),
                    options: prop.options || [],
                    name: prop.name,
                    withoutWrap: true,
                  }),
                };
              },
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
          .filter(
            ({ name = "", type }) =>
              (dependent as any)[name || "id"] && type !== "file"
          )
          .reduce(
            (
              final = {},
              prop = { label: "", name: "", type: "", options: [] }
            ) => ({
              ...final,
              [prop.label || ""]: dataRender({
                row: dependent,
                data: (dependent as any)[prop.name || "id"],
                type: processTypesForExport(prop.type || ""),
                options: prop.options || [],
                name: prop.name,
                withoutWrap: true,
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

    if (beneficiary?.housing?.length) {
      const housingSheetData = beneficiary.housing.map((house: any) =>
        getHousingDataInputs(t)
          .filter(
            ({ name = "", type }) =>
              (house as any)[name || "id"] && type !== "file"
          )
          .reduce(
            (
              final = {},
              prop = { label: "", name: "", type: "", options: [] }
            ) => ({
              ...final,
              [prop.label || ""]: dataRender({
                row: house,
                data: (house as any)[prop.name || "id"],
                type: processTypesForExport(prop.type || ""),
                options: prop.options || [],
                name: prop.name,
                withoutWrap: true,
              }),
            }),
            {}
          )
      );

      sheets.push({
        label: t("Auth.MembershipRegistration.Form.Housing.Housing").slice(
          0,
          29
        ),
        data: housingSheetData,
      });
    }

    const fileName = (beneficiary?.beneficiary?.fullName || "Export") + ".xlsx";

    exportDataToMultipleSheetsExcel(
      fileName.replace(/[/\\?%*:|"<>]/g, "_"),
      sheets
    );
  };

  const oldAidColumns = [
    {
      type: "custom",
      name: "name",
      label: t("Auth.Aids.AidName"),
      render: (row: any) => row.aidProgram?.aidCategory?.name,
    },
    {
      type: "custom",
      name: "value",
      label: t("Auth.Aids.AidValue"),
      render: (row: any) => (
        <>
          {row.value}{" "}
          {row.aidCategories?.type === "Cash" ? (
            <MoneyUnit />
          ) : (
            pluralLabelResolve(t, row.value, "Auth.Aids.AidPiece")
          )}
        </>
      ),
    },
    {
      type: "date",
      name: "createdAt",
      label: t("Global.Labels.ApplicationDate"),
    },
    {
      type: "date",
      name: "collectionDate",
      label: t("Auth.Aids.RecaptionDate"),
    },
  ];

  return (
    <PageTemplate>
      <div className="row w-100 mx-auto">
        <div className="col-6 col-md-9 d-flex">
          <h2>
            {isResearcherOrHodOrCeo
              ? beneficiary?.beneficiary?.fullName
              : beneficiary?.beneficiary?.fileNo}{" "}
          </h2>

          {isResearcherOrHodOrCeo && (
            <small className="bg-opacity-info p-2 rounded-4 text-sm ms-2 my-auto text-info">
              {beneficiary?.beneficiary?.fileNo}
            </small>
          )}
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
                details: Object.values(
                  beneficiary?.dependents
                    ?.map((d: Dependent) => d.relation)
                    .filter(Boolean)
                    .reduce(
                      (
                        acc: Record<string, { label: string; count: number }>,
                        relation: string
                      ) => {
                        const label = renderDataFromOptions(
                          relation,
                          getDependentRelations(t)
                        );

                        acc[label] = acc[label]
                          ? { label, count: acc[label].count + 1 }
                          : { label, count: 1 };

                        return acc;
                      },
                      {}
                    ) || {}
                ),
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
                details: Object.values(
                  beneficiary?.housing
                    .map((h: Housing) => h.category)
                    .filter(Boolean)
                    .reduce(
                      (
                        acc: Record<string, { label: string; count: number }>,
                        data: string
                      ) => {
                        const label = renderDataFromOptions(
                          data,
                          getBeneficiaryCategories(t)
                        );

                        if (acc[label]) {
                          acc[label].count += 1;
                        } else {
                          acc[label] = { label, count: 1 };
                        }

                        return acc;
                      },
                      {}
                    ) || {}
                ),
              },
              {
                label: t("Auth.Beneficiaries.FamilyIncomeTotal"),
                count: income,
                unit: <MoneyUnit big />,
                color: "info",
                icon: faChartSimple,
                details: [
                  {
                    label: t("Auth.Beneficiaries.GuardianIncomeTotal"),
                    unit: <MoneyUnit />,
                    count: [
                      beneficiary?.income?.salary,
                      beneficiary?.income?.socialSecurity,
                      beneficiary?.income?.insurances,
                      beneficiary?.income?.comprehensiveRehabilitation,
                      beneficiary?.income?.retirement,
                    ]?.reduce(
                      (final: number, d: number) =>
                        (final += parseFloat(String(d) || "0")),
                      0
                    ),
                  },
                  {
                    label: t("Auth.Beneficiaries.DependentsIncomeTotal"),
                    unit: <MoneyUnit />,
                    count: beneficiary?.dependents?.reduce(
                      (final: number, d: Dependent) =>
                        (final += parseFloat(String(d.income) || "0")),
                      0
                    ),
                  },
                ],
              },
            ]}
          />
        </div>

        {isResearcherOrHodOrCeo
          ? [
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
                        ?.filter(
                          ({ hideFile = false, type = "" }) =>
                            !hideFile && type !== "title"
                        )
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
            ))
          : ""}

        <div className="col my-3 px-2">
          <div className="border border-1 p-3">
            <h5 className="mt-4 mb-2">{t("Auth.Aids.OldAids")}</h5>

            <DynamicTable
              columns={oldAidColumns}
              data={beneficiary?.aids || []}
              fitHeight
              noPagination
              onPageChange={() => ""}
            />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default BeneficiaryProfileView;
