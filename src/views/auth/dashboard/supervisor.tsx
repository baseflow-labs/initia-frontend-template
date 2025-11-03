import { useTranslation } from "react-i18next";

import {
  faBox,
  faMapLocationDot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useState } from "react";

import * as OverviewApi from "../../../api/dashboard";
import profilePhotoPlaceholder from "../../../assets/images/profile-image-placeholder.png";
import DashboardCards from "../../../components/card/statisticCards";
import UsersCard from "../../../components/card/usersCard";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import { apiCatchGlobalHandler } from "../../../utils/function";

const DashboardSupervisorView = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<{
    beneficiaries: { all: number; applicants: number; accepted: number };
    visits: { all: number; toDo: number; done: number };
    aids: { all: number; granted: number; pending: number };
    researchers: {
      name: string;
      beneficiariesCount: number;
      visitsCount: number;
      aidsCount: number;
      reportsCount: number;
    }[];
  }>({
    beneficiaries: { all: 0, applicants: 0, accepted: 0 },
    visits: { all: 0, toDo: 0, done: 0 },
    aids: { all: 0, granted: 0, pending: 0 },
    researchers: [
      {
        name: "",
        beneficiariesCount: 0,
        visitsCount: 0,
        aidsCount: 0,
        reportsCount: 0,
      },
    ],
  });

  useLayoutEffect(() => {
    OverviewApi.forSupervisor()
      .then((res: any) => {
        setData(res.payload);
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const statistics = [
    {
      label: t("Auth.Dashboard.BeneficiariesCount"),
      count: data?.beneficiaries.all,
      details: [
        {
          label: t("Auth.Dashboard.ApplicantsCount"),
          count: data?.beneficiaries.applicants,
        },
        {
          label: t("Auth.Dashboard.AcceptedBeneficiariesCount"),
          count: data?.beneficiaries.accepted,
        },
      ],
      color: "success",
      tasks: {
        label: t("Auth.Dashboard.ApplicantsToReview"),
        count: data?.beneficiaries.applicants,
        route: "/beneficiary",
      },
      icon: faUsers,
    },
    {
      label: t("Auth.Dashboard.VisitsCount"),
      count: data?.visits.all,
      details: [
        {
          label: t("Auth.Dashboard.DoneVisitsCount"),
          count: data?.visits.done,
        },
        {
          label: t("Auth.Dashboard.ToDoVisitsCount"),
          count: data?.visits.toDo,
        },
      ],
      color: "info",
      tasks: {
        label: t("Auth.Dashboard.ScheduledVisitsCount"),
        count: data?.visits.toDo,
        route: "/visitSchedule",
      },
      icon: faMapLocationDot,
    },
    {
      label: t("Auth.Dashboard.AidsCount"),
      count: data?.aids.all,
      details: [
        {
          label: t("Auth.Dashboard.GrantedAidsCount"),
          count: data?.aids.granted,
        },
        {
          label: t("Auth.Dashboard.PendingAidsCount"),
          count: data?.aids.pending,
        },
      ],
      tasks: {
        label: t("Auth.Dashboard.ToReviewAidsCount"),
        count: data?.aids.pending,
        route: "/aid",
      },
      color: "warning",
      icon: faBox,
    },
  ];

  return (
    <PageTemplate title={t("Auth.Dashboard.Title")}>
      <DashboardCards statistics={statistics} />

      <UsersCard
        label={t("Auth.Dashboard.Researchers")}
        researchers={data.researchers.map((r) => ({
          ...r,
          photo: profilePhotoPlaceholder,
        }))}
      />
    </PageTemplate>
  );
};

export default DashboardSupervisorView;
