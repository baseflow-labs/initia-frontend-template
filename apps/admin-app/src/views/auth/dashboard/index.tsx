import {
  faArrowRightToBracket,
  faCheckCircle,
  faDatabase,
  faFloppyDisk,
  faHeart,
  faInfo,
  faMemory,
  faShip,
  faTimesCircle,
  faUserCheck,
  faUserMinus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SystemHealthApi from "@initia/shared/api/dashboard/systemHealth";
import * as NotificationApi from "@initia/shared/api/notifications";
import type { Notification } from "@initia/shared/types/notifications";
import DashboardCard from "@initia/shared/ui/components/card/dashboardCard";
import StatisticCards from "@initia/shared/ui/components/card/statisticCards";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import moment from "moment";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../store/hooks";

interface HealthInfo {
  status: string;
  load?: number;
  cores?: number;
  threshold?: number;
}

interface HealthData {
  cpu: HealthInfo;
  disk: HealthInfo;
  database: HealthInfo;
  google: HealthInfo;
  memory_Heap: HealthInfo;
  memory_rss: HealthInfo;
}

const DashboardView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logoFull } = useAppSelector((state) => state.settings);
  const [data, setData] = useState<{
    notifications?: Notification[];
    health: HealthData;
  }>({
    health: {
      cpu: { status: "unknown" },
      disk: { status: "unknown" },
      database: { status: "unknown" },
      google: { status: "unknown" },
      memory_Heap: { status: "unknown" },
      memory_rss: { status: "unknown" },
    },
  });

  useLayoutEffect(() => {
    SystemHealthApi.get()
      .then((res) => {
        setData((current) => ({
          ...current,
          health: res.payload.info as HealthData,
        }));
      })
      .catch(apiCatchGlobalHandler);

    NotificationApi.get()
      .then((res) => {
        setData((current) => ({
          ...current,
          notifications:
            res.payload
              ?.filter((a: Notification) => !a.isRead && a.important)
              .sort((a: Notification, b: Notification) => (a.createdAt > b.createdAt ? -1 : 1)) ||
            [],
        }));
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const dummyData = {
    sessions: {
      total: 100031,
    },
    users: {
      active: 5032,
      pending: 512,
      total: 12034,
    },
  };

  const statsData = [
    {
      label: t("Auth.Dashboard.Admin.Stats.Sessions"),
      count: dummyData.sessions.total,
      color: "info",
      icon: faArrowRightToBracket,
      unit: t("Auth.Dashboard.Admin.Stats.SessionsUnit"),
    },
    {
      label: t("Auth.Dashboard.Admin.Stats.TotalUsers"),
      count: dummyData.users.total,
      color: "primary",
      icon: faUsers,
      unit: t("Auth.Dashboard.Admin.Stats.UsersUnit"),
    },
    {
      label: t("Auth.Dashboard.Admin.Stats.ActiveUsers"),
      count: dummyData.users.active,
      color: "success",
      icon: faUserCheck,
      unit: t("Auth.Dashboard.Admin.Stats.UsersUnit"),
    },
    {
      label: t("Auth.Dashboard.Admin.Stats.PendingUsers"),
      count: dummyData.users.pending,
      color: "warning",
      icon: faUserMinus,
      unit: t("Auth.Dashboard.Admin.Stats.UsersUnit"),
    },
  ];

  const healthData = [
    {
      label: t("Auth.Dashboard.Admin.SystemHealth.Overall"),
      status: data.health.google?.status,
      icon: faHeart,
    },
    {
      label: t("Auth.Dashboard.Admin.SystemHealth.Database"),
      status: data.health.database?.status,
      icon: faDatabase,
    },
    {
      label: t("Auth.Dashboard.Admin.SystemHealth.Memory"),
      status: data.health.memory_Heap?.status,
      icon: faMemory,
    },
    {
      label: t("Auth.Dashboard.Admin.SystemHealth.Disk"),
      status: data.health.disk?.status,
      icon: faFloppyDisk,
    },
    {
      label: t("Auth.Dashboard.Admin.SystemHealth.Cpu"),
      status: data.health.cpu?.status,
      icon: faShip,
    },
  ];

  return (
    <Fragment>
      <h3 className="mt-4 mt-lg-0">{t("Auth.Dashboard.Title")}</h3>

      <StatisticCards statistics={statsData} />

      <div className="row">
        <div className="col-lg-5 mb-4">
          <DashboardCard title={t("Auth.Dashboard.Welcome.Title")} className="h-100">
            {t("Auth.Dashboard.Welcome.Message", { name: t("CopyRight.AppName") })}

            <img
              src={logoFull || "@initia/shared/assets/images/brand/logo-full.png"}
              alt="Welcome"
              className="img-fluid mt-5"
            />
          </DashboardCard>
        </div>

        <div className="col-lg-4 mb-4">
          <DashboardCard title={t("Auth.Dashboard.ImportantNotifications")} className="h-100">
            <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
              {data.notifications?.length
                ? data.notifications.map(({ message, service, createdAt }, i) => (
                    <div
                      className="card mb-3 p-3 w-100"
                      role="button"
                      onClick={() => navigate("/" + service)}
                      key={i}
                    >
                      <div className="row">
                        <div className="col-1 col-lg-2 col-lg-1 my-auto text-warning">
                          <h3>
                            <FontAwesomeIcon icon={faInfo} />
                          </h3>
                        </div>

                        <div className="col-11 col-lg-10 col-lg-11 ps-4 text-break text-wrap">
                          <h6 className="w-100">{message}</h6>
                          <small>{moment(createdAt).fromNow()}</small>
                        </div>
                      </div>
                    </div>
                  ))
                : t("Global.Labels.NoNotifications")}
            </div>
          </DashboardCard>
        </div>

        <div className="col-lg-3 mb-4">
          <DashboardCard title={t("Auth.Dashboard.Admin.SystemHealth.Title")} className="h-100">
            {healthData.map((row, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <h6>
                  <FontAwesomeIcon
                    icon={row.status === "up" ? faCheckCircle : faTimesCircle}
                    className={`fa-2x me-2 mb-0 text-${row.status === "up" ? "success" : "danger"}`}
                  />
                </h6>

                <div>
                  <h6 className="mb-0">{row.label}</h6>

                  <small>{row.status}</small>
                </div>
              </div>
            ))}
          </DashboardCard>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardView;
