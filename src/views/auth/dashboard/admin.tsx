import * as OverviewApi from "@/api/dashboard";
import StatisticCards from "@/components/card/statisticCards";
import { Notification } from "@/layouts/auth/navs/navbar";
import { apiCatchGlobalHandler } from "@/utils/function";
import {
  faArrowRightToBracket,
  faInfo,
  faUserCheck,
  faUserMinus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const AdminDashboardView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<{
    notifications?: Notification[];
    statuses?: { status: string; createdAt: string }[];
    status?: string;
  }>({});

  useLayoutEffect(() => {
    OverviewApi.forUser()
      .then((res) =>
        setData({
          ...res.payload,
          notifications: res.payload.notifications?.sort((a: Notification, b: Notification) =>
            a.createdAt > b.createdAt ? -1 : 1
          ),
        })
      )
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

  return (
    <Fragment>
      <h3 className="mt-4 mt-lg-0">{t("Auth.Dashboard.Title")}</h3>

      <StatisticCards statistics={statsData} />

      <div className="row">
        <div className="col-lg-8 mb-4"></div>

        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="my-5">{t("Auth.Dashboard.ImportantNotifications")}</h3>

              <div style={{ maxHeight: "40vh", overflowY: "auto" }}>
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminDashboardView;
