import { faCircle, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import * as OverviewApi from "@/api/dashboard";
import * as UserApi from "@/api/users";
import tempLogo from "@/assets/images/brand/logo.png";
import DashboardCard from "@/components/card/dashboardCard";
import { Notification } from "@/layouts/auth/navs/navbar";
import PageTemplate from "@/layouts/auth/pages/pageTemplate";
import { useAppSelector } from "@/store/hooks";
import { viewDayDateFormat, viewTimeFormat } from "@/utils/consts";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "@/utils/function";

const DashboardView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { name, logo } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.auth);
  const [data, setData] = useState<{
    notifications?: Notification[];
    statuses?: { status: string; createdAt: string }[];
    status?: string;
  }>({});
  const [profile, setProfile] = useState<{ user: { fullName: string } }>({
    user: { fullName: "" },
  });

  useLayoutEffect(() => {
    OverviewApi.forUser()
      .then((res: any) =>
        setData({
          ...res.payload,
          notifications: res.payload.notifications?.sort(
            (a: Notification, b: Notification) =>
              a.createdAt > b.createdAt ? -1 : 1
          ),
        })
      )
      .catch(apiCatchGlobalHandler);

    UserApi.getByUserId()
      .then((res: any) =>
        setProfile({
          ...res.payload,
        })
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  const statuses = [
    { value: "Pending", label: t("Auth.Dashboard.Statuses.Pending") },
  ];

  const isUnacceptedUser = user.role === "user" && user.status !== "Accepted";

  return (
    <PageTemplate title={t("Auth.Dashboard.Title")}>
      <div className="row">
        <div className="col-lg-6">
          <DashboardCard>
            <div className="text-primary text-center py-5">
              <h1 className="mb-4">{t("Auth.Dashboard.Welcome")}</h1>

              <img src={logo || tempLogo} alt="logo" className="my-5 w-100" />

              <h4 className="display-4 mt-5 text-dark">{name}</h4>
            </div>
          </DashboardCard>
        </div>

        <div className="col-lg-6">
          <DashboardCard>
            <div className="row">
              <div className="col-12 mb-5">
                <h4>
                  {t("Auth.Dashboard.UserInfo")} {profile?.user?.fullName}
                </h4>
              </div>

              <div className="col-6">
                <h6 className="my-auto">
                  {t("Auth.Dashboard.UserMembershipStatus")}
                </h6>
              </div>

              <div className="col-6">
                <h3 className="my-auto">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`text-${statusColorRender(data.status)}`}
                  />{" "}
                  {renderDataFromOptions(data.status || "", statuses)}
                </h3>
              </div>

              {isUnacceptedUser && (
                <Fragment>
                  <div className="col-12 mt-5">
                    <h3 className="mb-4">
                      {t("Auth.Dashboard.ApplicationTimeline")}
                    </h3>

                    <ul className="timeline">
                      {data.statuses
                        ?.sort((a, b) => (b.createdAt < a.createdAt ? -1 : 1))
                        .map(({ status, createdAt }, i) => (
                          <li key={i}>
                            <div>
                              {moment(createdAt).format(
                                viewDayDateFormat + " @ " + viewTimeFormat
                              )}
                            </div>

                            <div className="mt-3">
                              {renderDataFromOptions(status || "", statuses)}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="col-12 mt-5">
                    {t("Auth.Dashboard.UnacceptedUserNote")}
                  </div>
                </Fragment>
              )}

              <div className="col-12">
                <h3 className="my-5">
                  {t("Auth.Dashboard.ImportantNotifications")}
                </h3>
              </div>

              <div
                className="col-12"
                style={{ maxHeight: "40vh", overflowY: "auto" }}
              >
                {data.notifications?.length
                  ? data.notifications.map(
                      ({ title, message, service, createdAt }, i) => (
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
                      )
                    )
                  : t("Global.Labels.NoNotifications")}
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DashboardView;
