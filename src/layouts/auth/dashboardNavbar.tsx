import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as NotificationApi from "../../api/notifications";
import {
  helpIcon,
  menuBarsIcon,
  notificationsIcon,
  searchIcon,
} from "../../assets/icons/icons";
import IconWrapperComp from "../../assets/icons/wrapper";
import profilePhotoPlaceholder from "../../assets/images/profile-image-placeholder.png";
import DropdownComp from "../../components/dropdown";
import { logout } from "../../store/actions/auth";
import { useAppSelector } from "../../store/hooks";
import { apiCatchGlobalHandler } from "../../utils/function";

export interface Notification {
  title: string;
  message: string;
  service: string;
  important?: boolean;
  createdAt: string;
}

const DashboardNavbar = () => {
  const dispatch = useDispatch();
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
      <div className="row w-100 justify-content-between">
        <div className="col-6 col-lg-1 d-block d-lg-none order-1 order-lg-3">
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

        <form className="col-12 col-lg-6 order-3 order-lg-1">
          <div className="input-group w-100 ms-3">
            <input
              className="form-control"
              type="text"
              placeholder={t("Global.Labels.Search")}
            />

            <span className="input-group-text bg-info">
              <IconWrapperComp icon={searchIcon} />
            </span>
          </div>
        </form>

        <div className="col-6 col-lg-1 pb-3 order-2 order-lg-2">
          <div className="d-flex align-items-end gap-3 pe-5 float-end">
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
                          <div className="row" style={{ minWidth: "25vw" }}>
                            <div className="d-none d-md-block col-md-2 col-lg-1 my-auto text-warning">
                              <h3>
                                <IconWrapperComp icon={helpIcon} />
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
      </div>
    </nav>
  );
};

export default DashboardNavbar;
