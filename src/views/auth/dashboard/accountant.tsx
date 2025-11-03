import {
  faBoxOpen,
  faFile,
  faStopwatch,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as OverviewApi from "../../../api/dashboard";
import DashboardCards from "../../../components/card/statisticCards";
import TabsComp from "../../../components/tab";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import { apiCatchGlobalHandler } from "../../../utils/function";

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
      allSuspendedPrograms: number;
      suspendedCashPrograms: number;
      suspendedInKindPrograms: number;
    };
    programsPerCategory: {
      id: string;
      name: string;
      type: string;
      balance: number;
      programs: {
        aidCategory: { id: string; name: string };
        name: string;
        credit: number;
        sponsor: string;
        balance: number;
      }[];
    }[];
    categories: {
      id: string;
      name: string;
      type: string;
      balance: number;
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
      allSuspendedPrograms: 0,
      suspendedCashPrograms: 0,
      suspendedInKindPrograms: 0,
    },
    categories: [
      {
        id: "",
        name: "",
        type: "",
        balance: 0,
      },
    ],
    programsPerCategory: [
      {
        id: "",
        name: "",
        type: "",
        balance: 0,
        programs: [
          {
            aidCategory: { id: "", name: "" },
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
    {
      label: t("Auth.Dashboard.AllSuspendedProgramsCount"),
      count: data?.stats.allSuspendedPrograms,
      details: [
        {
          label: t("Auth.Dashboard.SuspendedCashProgramsCount"),
          count: data?.stats.suspendedCashPrograms,
        },
        {
          label: t("Auth.Dashboard.SuspendedInKindProgramsCount"),
          count: data?.stats.suspendedInKindPrograms,
        },
      ],
      color: "primary",
      icon: faStopwatch,
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
            body: <></>,
          })
        )}
      />
    </PageTemplate>
  );
};

export default DashboardAccountantView;
