import * as NotificationApi from "@/api/notifications";
import tempLogo from "@/assets/images/brand/logo.png";
import LangButton from "@/components/button/lang";
import DropdownComp from "@/components/dropdown";
import { logout } from "@/store/actions/auth";
import { useAppSelector } from "@/store/hooks";
import { apiCatchGlobalHandler } from "@/utils/function";
import {
  faBars,
  faBell,
  faEnvelope,
  faGear,
  faInfoCircle,
  faMagnifyingGlass,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { FormEvent, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export interface Notification {
  id: string;
  title: string;
  message: string;
  service: string;
  important?: boolean;
  isRead?: boolean;
  createdAt: string;
}

const DashboardNavbar = ({
  onSearch,
  searchPlaceholder,
}: {
  onSearch?: (e: string) => void;
  searchPlaceholder?: string;
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [notifications, setNotification] = useState<Notification[]>([]);
  const { user } = useAppSelector((state) => state.auth);
  const { logo } = useAppSelector((state) => state.settings);

  useLayoutEffect(() => {
    NotificationApi.get()
      .then((res) => {
        const payload = "data" in res ? res.data.payload : res.payload;
        setNotification(
          payload?.sort((a: Notification, b: Notification) => (a.createdAt > b.createdAt ? -1 : 1))
        );
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search");

    if (onSearch) onSearch(String(search));
  };

  // const toggleTheme = () => {
  //   const current = document.documentElement.getAttribute("data-bs-theme");
  //   document.documentElement.setAttribute("data-bs-theme", current === "dark" ? "light" : "dark");
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-4 mt-2 me-4 ms-0 ps-0 mb-3">
      <div className="row w-100 justify-content-between">
        <div className="col-6 col-lg-1 d-block d-lg-none order-1 order-lg-3">
          <button
            className="btn btn-ghost"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNav"
            aria-controls="offcanvasNav"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <div className="col-12 col-lg-5 order-3 order-lg-1">
          {onSearch && (
            <form onSubmit={onSearchSubmit}>
              <div className="input-group w-100 ms-3">
                <input
                  name="search"
                  className="form-control"
                  type="text"
                  placeholder={searchPlaceholder || t("Global.Labels.Search")}
                />

                <button className="input-group-text bg-primary" type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="col-6 col-lg-2 pb-3 order-2 order-lg-2">
          <div className="d-flex align-items-end gap-3 pe-5 float-end">
            <DropdownComp
              button={
                <div className="position-relative">
                  <FontAwesomeIcon icon={faBell} className="text-primary" />

                  <div
                    className={`position-absolute top-0 translate-middle badge rounded-circle bg-${
                      notifications.filter((n) => !n.isRead).length ? "danger" : "dark"
                    } py-1`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {notifications.filter((n) => !n.isRead).length}
                  </div>
                </div>
              }
              list={
                notifications.length
                  ? notifications.map(({ id, message, service, createdAt, isRead }) => ({
                      onClick: () => {
                        navigate("/" + service);
                        NotificationApi.markAsRead(id).catch(apiCatchGlobalHandler);
                      },
                      label: (
                        <div
                          className="row py-3"
                          style={{
                            minWidth: "25vw",
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
                    }))
                  : [{ label: t("Auth.Notifications.NoNotifications") }]
              }
              link={{
                text: t("Auth.Notifications.AllNotifications"),
                route: "/notifications",
              }}
            />

            <button className="btn btn-link py-auto" onClick={() => navigate("/messaging")}>
              <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
            </button>

            <LangButton />

            {/* <button className="btn btn-link py-auto" onClick={() => toggleTheme()}>
              <FontAwesomeIcon icon={document.documentElement.getAttribute("data-bs-theme") === "dark" ? faMoon : faSun} className="text-secondary" />
            </button> */}

            <DropdownComp
              header={
                <div className="text-center border-bottom pb-2">
                  {user.name + " | " + t("Global.Labels.Roles." + user.role)}
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
    </nav>
  );
};

export default DashboardNavbar;
