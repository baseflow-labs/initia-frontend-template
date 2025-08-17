import { faBoxOpen, faFile, faTableList, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as OverviewApi from "../../../api/overview";
import ProgramCards from "../../../components/card/programCards";
import DashboardCards from "../../../components/card/statisticCards";
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
    };
    programs: {
      name: string;
      type: string;
      status: string;
      credit: number;
      spent: number;
      balance: number;
      sponsor: string;
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
    programs: [
      {
        name: "",
        type: "",
        status: "",
        credit: 0,
        spent: 0,
        balance: 0,
        sponsor: "",
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

      <h3 className="mt-4 mb-3">{t("Auth.AidPrograms.Programs")}</h3>
      <ProgramCards programs={data.programs} />
    </PageTemplate>
  );
};

export default DashboardAccountantView;
