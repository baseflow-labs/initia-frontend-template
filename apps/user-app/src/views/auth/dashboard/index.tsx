import { faCircle, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as OverviewApi from "@initia/shared/api/dashboard";
import * as UserApi from "@initia/shared/api/users";
import tempLogo from "@initia/shared/assets/images/brand/logo.png";
import DashboardCard from "@initia/shared/ui/components/card/dashboardCard";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { viewDayDateFormat, viewTimeFormat } from "@initia/shared/utils/consts";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "@initia/shared/utils/function";
import moment from "moment";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type { Notification } from "@initia/shared/types/notifications";

import { useAppSelector } from "../../../store/hooks";

const DashboardView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { name, logoFull } = useAppSelector((state) => state.settings);
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
      .then((res) =>
        setData({
          ...res.payload,
          notifications: res.payload.notifications?.sort((a: Notification, b: Notification) =>
            a.createdAt > b.createdAt ? -1 : 1
          ),
        })
      )
      .catch(apiCatchGlobalHandler);

    UserApi.getByUserId()
      .then((res) =>
        setProfile({
          ...res.payload,
        })
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  const statuses = [{ value: "Pending", label: t("Auth.Dashboard.Statuses.Pending") }];

  const isUnacceptedUser = user.role === "user" && user.status !== "Accepted";
  const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <PageTemplate title={t("Auth.Dashboard.Title")}>
      <div className="row">
        <div className="col-lg-4">
          <DashboardCard>
            <h5 className="mb-3">Account Info</h5>
            <div className="mb-2">
              <small className="text-muted d-block">Email</small>
              <div>{user.email || "-"}</div>
            </div>
            <div className="mb-2">
              <small className="text-muted d-block">Role</small>
              <div>{user.role || "-"}</div>
            </div>
            <div>
              <small className="text-muted d-block">Status</small>
              <div>{user.status || "-"}</div>
            </div>
          </DashboardCard>
        </div>

        <div className="col-lg-4">
          <DashboardCard>
            <h5 className="mb-3">Calendar</h5>
            <div className="row g-1 text-center">
              {currentMonthDays.map((day) => (
                <div className="col-2" key={day}>
                  <small className="d-inline-block rounded border px-2 py-1">{day}</small>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="col-lg-4">
          <DashboardCard>
            <div className="text-primary text-center py-5">
              <h1 className="mb-4">{t("Auth.Dashboard.Welcome.Title")}</h1>

              <img src={logoFull || tempLogo} alt="logo" className="my-5 w-100" />

              <h4 className="display-4 mt-5 text-dark">{name}</h4>
            </div>
          </DashboardCard>
        </div>

        <div className="col-lg-12 mt-4">
          <DashboardCard>
            <div className="row">
              <div className="col-12 mb-5">
                <h4>
                  {t("Auth.Dashboard.UserInfo")} {profile?.user?.fullName}
                </h4>
              </div>

              <div className="col-6">
                <h6 className="my-auto">{t("Auth.Dashboard.UserMembershipStatus")}</h6>
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
                    <h3 className="mb-4">{t("Auth.Dashboard.ApplicationTimeline")}</h3>

                    <ul className="timeline">
                      {data.statuses
                        ?.sort((a, b) => (b.createdAt < a.createdAt ? -1 : 1))
                        .map(({ status, createdAt }, i) => (
                          <li key={i}>
                            <div>
                              {moment(createdAt).format(viewDayDateFormat + " @ " + viewTimeFormat)}
                            </div>

                            <div className="mt-3">
                              {renderDataFromOptions(status || "", statuses)}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="col-12 mt-5">{t("Auth.Dashboard.UnacceptedUserNote")}</div>
                </Fragment>
              )}

              <div className="col-12">
                <h3 className="my-5">{t("Auth.Dashboard.ImportantNotifications")}</h3>
              </div>

              <div className="col-12" style={{ maxHeight: "40vh", overflowY: "auto" }}>
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
          </DashboardCard>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DashboardView;
