import {
  faBox,
  faMapLocationDot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as OverviewApi from "../../../api/overview";
import MapCard from "../../../components/card/mapCard";
import DashboardCards from "../../../components/card/statisticCards";
import TasksCard from "../../../components/card/tasksCard";
import PageTemplate from "../../../layouts/auth/pageTemplate";
import { apiCatchGlobalHandler } from "../../../utils/function";

const DashboardResearcherView = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<{
    beneficiaries: { all: number; applicants: number; accepted: number };
    visits: { all: number; toDo: number; done: number };
    aids: { all: number; granted: number; pending: number };
    visitLocations: { latitude: number; longitude: number }[];
  }>({
    beneficiaries: { all: 0, applicants: 0, accepted: 0 },
    visits: { all: 0, toDo: 0, done: 0 },
    aids: { all: 0, granted: 0, pending: 0 },
    visitLocations: [{ latitude: 0, longitude: 0 }],
  });

  useLayoutEffect(() => {
    OverviewApi.forResearcher()
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

      <div className="row">
        <div className="col-xl-6">
          <TasksCard
            label={t("Auth.Dashboard.Tasks")}
            tasks={statistics.map(({ icon, color, tasks, ...rest }) => ({
              icon,
              color,
              label: tasks.label,
              count: tasks.count,
              route: tasks.route,
            }))}
          />
        </div>

        <div className="col-xl-6">
          {data.visitLocations.length > 1 && (
            <MapCard locations={data.visitLocations} />
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default DashboardResearcherView;
