import { faBell, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as NotificationApi from "../../api/notifications";
import Logo from "../../assets/images/brand/logo-full.png";
import profilePhotoPlaceholder from "../../assets/images/profile-image-placeholder.png";
import { logout } from "../../store/actions/auth";
import { useAppSelector } from "../../store/hooks";
import { apiCatchGlobalHandler } from "../../utils/function";
import { Notification } from "./dashboardNavbar";

const Navbar = () => {
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
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-4">
      <div className="container-fluid">
        <span
          className="navbar-brand"
          onClick={() => navigate("/dashboard")}
          role="button"
        >
          <img src={Logo} style={{ height: "50px" }} />
        </span>

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
                    ? "https://pdt-bucket.s3.us-east-1.amazonaws.com" + logo
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

export default Navbar;
