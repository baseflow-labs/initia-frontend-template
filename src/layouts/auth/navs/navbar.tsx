import {
  faBars,
  faBell,
  faEnvelope,
  faGear,
  faInfo,
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

import * as NotificationApi from "../../../api/notifications";
import profilePhotoPlaceholder from "../../../assets/images/profile-image-placeholder.png";
// import LangButton from "../../../components/button/lang";
import Spinner from "../../../components/core/spinner";
import DropdownComp from "../../../components/dropdown";
import { logout } from "../../../store/actions/auth";
import { useAppSelector } from "../../../store/hooks";
import { apiCatchGlobalHandler } from "../../../utils/function";

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
  showNav,
}: {
  onSearch?: (e: string) => void;
  searchPlaceholder?: string;
  showNav?: Boolean;
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [notifications, setNotification] = useState<Notification[]>([]);
  const { loading } = useAppSelector((state) => state.loading);
  const { logo } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.auth);

  useLayoutEffect(() => {
    NotificationApi.get()
      .then((res: any) =>
        setNotification(
          res.payload?.sort((a: Notification, b: Notification) =>
            a.createdAt > b.createdAt ? -1 : 1
          )
        )
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search");

    onSearch && onSearch(String(search));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-4 mt-2 me-4 ms-0 ps-0 mb-3">
      <div className="row w-100 justify-content-between">
        {showNav && (
          <div className="col-6 col-lg-1 order-1">
            <img
              alt="logo"
              src={process.env.REACT_APP_STORAGE_DIRECTORY_URL + logo}
              height="40px"
            />
          </div>
        )}

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

          {showNav && (
            <div className="collapse navbar-collapse justify-content-center">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <span
                    className="nav-link active"
                    role="button"
                    onClick={() => navigate("/dashboard")}
                  >
                    {t("Auth.Dashboard.Main")}
                  </span>
                </li>

                <li className="nav-item">
                  <span
                    className="nav-link"
                    role="button"
                    onClick={() => navigate("/contact-us")}
                  >
                    {t("Auth.ContactUs.Title")}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="col-6 col-lg-2 pb-3 order-2 order-lg-2">
          <div className="d-flex align-items-end gap-3 pe-5 float-end">
            {loading.length > 0 ? (
              <small className="text-primary">
                <Spinner />
              </small>
            ) : (
              ""
            )}

            {/* <LangButton /> */}

            <DropdownComp
              button={
                <div className="position-relative">
                  <FontAwesomeIcon icon={faBell} className="text-secondary" />

                  <div
                    className={`position-absolute top-0 translate-middle badge rounded-circle bg-${
                      notifications.filter((n) => !n.isRead).length
                        ? "danger"
                        : "dark"
                    } py-1`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {notifications.filter((n) => !n.isRead).length}
                  </div>
                </div>
              }
              list={
                notifications.length
                  ? notifications.map(
                      (
                        { id, title, message, service, createdAt, isRead },
                        i
                      ) => ({
                        onClick: () => {
                          navigate("/" + service);
                          NotificationApi.markAsRead(id).catch(
                            apiCatchGlobalHandler
                          );
                        },
                        label: (
                          <div
                            className="row py-3"
                            style={{
                              minWidth: "25vw",
                              backgroundColor: isRead
                                ? "white"
                                : "rgba(0,0,0,0.15)",
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
                      })
                    )
                  : [{ label: t("Global.Labels.NoNotifications") }]
              }
              link={{text: 'All Notifications', route: "/notifications"}}
            />

            {/* <button className="btn btn-link position-relative">
            <FontAwesomeIcon icon={faEnvelope} className="text-secondary" />
          </button> */}

            <DropdownComp
              header={
                <div className="text-center border-bottom pb-2">
                  { user.name + " | " + t("Global.Labels.Roles." + user.role) }
                </div>
              }
              button={
                <img
                  src={profilePhotoPlaceholder}
                  alt="avatar"
                  className="rounded-circle"
                  width="30"
                  height="30"
                />
              }
              list={[
                {
                  onClick: () => navigate("/profile"),
                  label: 'Profile',
                  icon: faUser
                },
                {
                  onClick: () => navigate("/messaging"),
                  label: 'Messaging',
                  icon: faEnvelope
                },
                {
                  onClick: () => navigate("/settings"),
                  label: 'Settings',
                  icon: faGear
                },
                {
                  onClick: () => navigate("/support-center"),
                  label: 'Support Center',
                  icon: faInfo
                },
                {
                  onClick: () => dispatch(logout()),
                  label: t("Global.Labels.Logout"),
                  icon: faRightFromBracket
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
