import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as NotificationApi from "../../api/notifications";
import {
  helpIcon,
  menuBarsIcon,
  notificationsIcon,
} from "../../assets/icons/icons";
import IconWrapperComp from "../../assets/icons/wrapper";
import profilePhotoPlaceholder from "../../assets/images/profile-image-placeholder.png";
import DropdownComp from "../../components/dropdown";
import { logout } from "../../store/actions/auth";
import { useAppSelector } from "../../store/hooks";
import { apiCatchGlobalHandler } from "../../utils/function";
import { Notification } from "./dashboardNavbar";
import appLogo from "../../assets/images/brand/logo-only.png";

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
        <div className="my-auto d-block d-lg-none">
          <button
            className="btn btn-ghost"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNav"
            aria-controls="offcanvasNav"
          >
            <IconWrapperComp icon={menuBarsIcon} />
          </button>
        </div>

        <div className="my-auto d-none d-lg-block">
          <img alt="logo" src={appLogo} height="40px" />
        </div>

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
          <DropdownComp
            button={
              <IconWrapperComp
                icon={notificationsIcon}
                className="text-secondary"
              />
            }
            list={
              notifications.length
                ? notifications.map(
                    ({ title, message, service, createdAt }, i) => ({
                      route: "/" + service,
                      label: (
                        <div className="row">
                          <div className="col-lg-2 my-auto text-warning">
                            <h3>
                              <IconWrapperComp icon={helpIcon} />
                            </h3>
                          </div>

                          <div className="col-lg-10 ps-4">
                            <h6>{message}</h6>
                            <small>{moment(createdAt).fromNow()}</small>
                          </div>
                        </div>
                      ),
                    })
                  )
                : [{ label: "لا يوجد إشعارات" }]
            }
          />

          {/* <button className="btn btn-link position-relative">
            <FontAwesomeIcon icon={faEnvelope} className="text-secondary" />
          </button> */}

          <DropdownComp
            button={
              <img
                src={
                  logo
                    ? (process.env.REACT_APP_STORAGE_DIRECTORY_URL ||
                        "https://pdt-bucket.s3.us-east-1.amazonaws.com") +
                      logo.replaceAll("\\", "/")
                    : profilePhotoPlaceholder
                }
                alt="avatar"
                className="rounded-circle"
                width="30"
                height="30"
              />
            }
            list={[
              {
                onClick: () => dispatch(logout()),
                label: t("Global.Labels.Logout"),
              },
            ]}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
