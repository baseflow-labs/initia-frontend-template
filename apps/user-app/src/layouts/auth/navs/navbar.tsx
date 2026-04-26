import * as NotificationApi from "@initia/shared/api/notifications";
import type { Notification as AppNotification } from "@initia/shared/types/notifications";
import tempLogo from "@initia/shared/assets/images/brand/logo.png";
import {
  connectNotificationsSocket,
  onNotificationReceived,
  onNotificationReconnect,
} from "@initia/shared/socket/notifications";
import LangButton from "@initia/shared/ui/components/button/lang";
import Button from "@initia/shared/ui/components/core/button";
import DropdownComp from "@initia/shared/ui/components/dropdown";
import TopbarSearch, { TopbarSearchOption } from "@initia/shared/ui/components/search/topbarSearch";
import { getCookie } from "@initia/shared/utils/cookieStorage";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import {
  faBars,
  faBell,
  faEnvelope,
  faGear,
  faInfoCircle,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { useAppSelector } from "../../../store/hooks";
import { logout } from "../../../store/actions/auth";

const DashboardNavbar = ({
  searchOptions,
  onSearchSelect,
  searchPlaceholder,
}: {
  searchOptions?: TopbarSearchOption[];
  onSearchSelect?: (option: TopbarSearchOption) => void;
  searchPlaceholder?: string;
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [notifications, setNotification] = useState<AppNotification[]>([]);
  const { user } = useAppSelector((state) => state.auth);
  const { logo } = useAppSelector((state) => state.settings);

  useEffect(() => {
    NotificationApi.getUnreadTop(3)
      .then((res) => {
        setNotification(res.payload || []);
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const accessToken = getCookie("accessToken");
    if (!accessToken || ["null", "undefined", ""].includes(accessToken)) return;

    connectNotificationsSocket(accessToken);

    const offNew = onNotificationReceived((notification) => {
      setNotification((prev) => {
        if (notification.isRead) return prev;
        if (prev.some((n) => n.id === notification.id)) return prev;

        return [notification, ...prev]
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          .slice(0, 3);
      });
    });

    const offReconnect = onNotificationReconnect(() => {
      NotificationApi.getUnreadTop(3)
        .then((res) => setNotification(res.payload || []))
        .catch(apiCatchGlobalHandler);
    });

    return () => {
      offNew();
      offReconnect();
    };
  }, [user?.id]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  // const toggleTheme = () => {
  //   const current = document.documentElement.getAttribute("data-bs-theme");
  //   document.documentElement.setAttribute("data-bs-theme", current === "dark" ? "light" : "dark");
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-sticky sticky-top py-4 mt-2 ps-0">
      <div className="w-100 border border-1 bg-white rounded-2 px-3">
        <div className="row justify-content-between">
          <div className="col-6 col-lg-1 d-block d-lg-none order-1 order-lg-3">
            <Button
              color="ghost"
              className="my-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNav"
              aria-controls="offcanvasNav"
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </div>

          <div className="col-12 col-lg-6 order-3 order-lg-1">
            {searchOptions?.length && onSearchSelect && (
              <div className="py-2 pe-lg-3">
                <TopbarSearch
                  options={searchOptions}
                  onSelect={onSearchSelect}
                  placeholder={searchPlaceholder}
                />
              </div>
            )}
          </div>

          <div className="col-6 col-lg-2 py-2 order-2 order-lg-2">
            <div className="d-flex justify-content-end align-items-center gap-3 px-2">
              <DropdownComp
                button={
                  <div className="position-relative">
                    <FontAwesomeIcon icon={faBell} className="text-primary" />

                    <div
                      className={`position-absolute top-0 translate-middle badge rounded-circle bg-${
                        unreadCount ? "danger" : "dark"
                      } py-1`}
                      style={{ fontSize: "0.75rem" }}
                    >
                      {unreadCount}
                    </div>
                  </div>
                }
                list={
                  notifications.length
                    ? notifications.map((n) => {
                        const { message, service, createdAt, isRead } = n;

                        return {
                          onClick: () => {
                            navigate("/" + service);
                            NotificationApi.markAsRead(n).catch(apiCatchGlobalHandler);
                            setNotification((prev) => prev.filter((i) => i.id !== n.id));
                          },
                          label: (
                            <div
                              className="row py-3"
                              style={{
                                minWidth: "auto",
                                width: "clamp(250px, 80vw, 450px)",
                                backgroundColor: isRead ? "white" : "rgba(0,0,0,0.15)",
                              }}
                            >
                              <div className="d-none d-md-block col-md-2 col-lg-1 my-auto text-warning">
                                <h3>
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                </h3>
                              </div>

                              <div className="col-md-10 col-lg-11 ps-4 text-break text-wrap">
                                <h6 className="w-100">{message}</h6>
                                <small>{moment(createdAt).fromNow()}</small>
                              </div>
                            </div>
                          ),
                        };
                      })
                    : [{ label: t("Auth.Notifications.NoNotifications") }]
                }
                link={{
                  text: t("Auth.Notifications.AllNotifications"),
                  route: "/notifications",
                }}
              />

              <Button color="link" className="py-auto" onClick={() => navigate("/messaging")}>
                <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
              </Button>

              <LangButton />

              {/* <Button className="btn btn-link py-auto" onClick={() => toggleTheme()}>
              <FontAwesomeIcon icon={document.documentElement.getAttribute("data-bs-theme") === "dark" ? faMoon : faSun} className="text-secondary" />
            </Button> */}

              <DropdownComp
                header={
                  <div className="border-bottom pb-2 px-3 justify-content-between d-flex align-items-end">
                    {user.name?.split(" ")[0]}
                    <small>{t("Global.Labels.Roles." + user.role)}</small>
                  </div>
                }
                button={
                  <img
                    src={logo || tempLogo}
                    alt="avatar"
                    className="rounded-circle"
                    width="30"
                    height="30"
                  />
                }
                list={[
                  {
                    onClick: () => navigate("/profile"),
                    label: t("Auth.Profile.Title"),
                    icon: faUser,
                  },
                  {
                    onClick: () => navigate("/settings"),
                    label: t("Auth.Settings.User.Title"),
                    icon: faGear,
                  },
                  {
                    onClick: () => navigate("/support-center"),
                    label: t("Auth.SupportCenter.Title"),
                    icon: faInfoCircle,
                  },
                  {
                    onClick: () => dispatch(logout()),
                    label: t("Global.Labels.Logout"),
                    icon: faRightFromBracket,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
