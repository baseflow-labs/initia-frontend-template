import {
  faBell,
  faInfoCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as NotificationApi from "../../api/notifications";
import profilePhotoPlaceholder from "../../assets/images/profile-image-placeholder.png";
import { logout } from "../../store/actions/auth";
import { useAppSelector } from "../../store/hooks";
import { apiCatchGlobalHandler } from "../../utils/function";

export interface Notification {
  title: string;
  message: string;
  service: string;
  createdAt: string;
}

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logo } = useAppSelector((state) => state.settings);
  const [notifications, setNotification] = useState<Notification[]>([]);

  useLayoutEffect(() => {
    NotificationApi.get()
      .then((res: any) =>
        setNotification(
          res.sort((a: Notification, b: Notification) =>
            a.createdAt > b.createdAt ? -1 : 1
          )
        )
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-4 mt-2 me-4 ms-0 ps-0">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <form className="w-50">
            <div className="input-group w-100">
              <input
                className="form-control"
                type="text"
                placeholder={t("Global.Labels.Search")}
              />

              <span className="input-group-text bg-transparent border-0">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </form>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <button
              className="btn btn-link text-secondary"
              id="notificationsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faBell} className="text-secondary" />
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="notificationsDropdown"
            >
              {notifications.length ? (
                notifications.map(
                  ({ title, message, service, createdAt }, i) => (
                    <li key={i}>
                      <span
                        className="dropdown-item"
                        role="button"
                        onClick={() => navigate("/" + service)}
                      >
                        <div className="row">
                          <div className="col-md-2 my-auto text-warning">
                            <h3>
                              <FontAwesomeIcon icon={faInfoCircle} />
                            </h3>
                          </div>

                          <div className="col-md-10 ps-4">
                            <h6>{message}</h6>
                            <small>{moment(createdAt).fromNow()}</small>
                          </div>
                        </div>
                      </span>
                    </li>
                  )
                )
              ) : (
                <span className="p-1">لا يوجد اشعارات للعرض</span>
              )}
            </ul>
          </div>

          {/* <button className="btn btn-link position-relative">
            <FontAwesomeIcon icon={faEnvelope} className="text-secondary" />
          </button> */}

          <div className="dropdown">
            <button
              className="btn btn-link text-secondary"
              id="avatarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={
                  logo
                    ? (process.env.REACT_APP_STORAGE_DIRECTORY_URL ||
                        "https://pdt-bucket.s3.us-east-1.amazonaws.com") +
                      logo
                        .replaceAll("\\", "%5C")
                        .replaceAll("/", "%5C")
                        .replace("%5C", "/")
                    : profilePhotoPlaceholder
                }
                alt="avatar"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="avatarDropdown"
            >
              {/* <li>
                <hr className="dropdown-divider" />
              </li> */}
              <li>
                <span
                  className="dropdown-item"
                  role="button"
                  onClick={() => dispatch(logout())}
                >
                  {t("Global.Labels.Logout")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
