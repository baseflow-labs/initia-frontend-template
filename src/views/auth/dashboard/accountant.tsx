import {
  faBoxOpen,
  faFile,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as OverviewApi from "../../../api/overview";
import DashboardCards from "../../../components/card/statisticCards";
import TabsComp from "../../../components/tab";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
} from "../../../utils/function";
import ProgramCards, { AidUnit } from "../../../components/card/programCards";
import { getAidCategoryTypes } from "../../../utils/optionDataLists/aids";

const DashboardAccountantView = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<{
    stats: {
      allPrograms: number;
      allCashPrograms: number;
      allInKindPrograms: number;
      allOpenedPrograms: number;
      openedCashPrograms: number;
      openedInKindPrograms: number;
      allClosedPrograms: number;
      closedCashPrograms: number;
      closedInKindPrograms: number;
    };
    programsPerCategory: {
      id: string;
      name: string;
      type: string;
      balance: number;
      programs: {
        name: string;
        credit: number;
        sponsor: string;
        balance: number;
      }[];
    }[];
  }>({
    stats: {
      allPrograms: 0,
      allCashPrograms: 0,
      allInKindPrograms: 0,
      allOpenedPrograms: 0,
      openedCashPrograms: 0,
      openedInKindPrograms: 0,
      allClosedPrograms: 0,
      closedCashPrograms: 0,
      closedInKindPrograms: 0,
    },
    programsPerCategory: [
      {
        id: "",
        name: "",
        type: "",
        balance: 0,
        programs: [
          {
            name: "",
            credit: 0,
            sponsor: "",
            balance: 0,
          },
        ],
      },
    ],
  });

  useLayoutEffect(() => {
    OverviewApi.forAccountant()
      .then((res: any) => {
        setData(res.payload);
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const statistics = [
    {
      label: t("Auth.Dashboard.AllProgramsCount"),
      count: data?.stats.allPrograms,
      details: [
        {
          label: t("Auth.Dashboard.AllCashProgramsCount"),
          count: data?.stats.allCashPrograms,
        },
        {
          label: t("Auth.Dashboard.AllInKindProgramsCount"),
          count: data?.stats.allInKindPrograms,
        },
      ],
      color: "success",
      icon: faTableList,
    },
    {
      label: t("Auth.Dashboard.AllOpenedProgramsCount"),
      count: data?.stats.allOpenedPrograms,
      details: [
        {
          label: t("Auth.Dashboard.OpenedCashProgramsCount"),
          count: data?.stats.openedCashPrograms,
        },
        {
          label: t("Auth.Dashboard.OpenedInKindProgramsCount"),
          count: data?.stats.openedInKindPrograms,
        },
      ],
      color: "info",
      icon: faBoxOpen,
    },
    {
      label: t("Auth.Dashboard.AllClosedProgramsCount"),
      count: data?.stats.allClosedPrograms,
      details: [
        {
          label: t("Auth.Dashboard.ClosedCashProgramsCount"),
          count: data?.stats.closedCashPrograms,
        },
        {
          label: t("Auth.Dashboard.ClosedInKindProgramsCount"),
          count: data?.stats.closedInKindPrograms,
        },
      ],
      color: "warning",
      icon: faFile,
    },
  ];

  return (
    <PageTemplate title={t("Auth.Dashboard.Title")}>
      <DashboardCards statistics={statistics} />

      <h3 className="mt-4 mb-3">{t("Auth.AidCategories.Title")}</h3>

      <TabsComp
        tabs={data.programsPerCategory.map(
          ({ id, name, balance, type, programs }) => ({
            id,
            title: name,
            body: (
              <div className="mt-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="mb-3">{name}</h3>

                    <h1>
                      {balance}{" "}
                      {id !== "0" && (
                        <AidUnit t={t} big type={type} amount={balance} />
                      )}
                    </h1>
                  </div>

                  {id !== "0" && (
                    <h4>
                      <div className="badge bg-success p-3 px-4 rounded-pill">
                        {renderDataFromOptions(type, getAidCategoryTypes(t))}
                      </div>
                    </h4>
                  )}
                </div>

                <ProgramCards
                  programs={programs
                    .sort((a, b) => (a.balance > b.balance ? -1 : 1))
                    .map((program) => ({ ...program, type }))}
                />
              </div>
            ),
          })
        )}
      />
    </PageTemplate>
  );
};

export default DashboardAccountantView;
