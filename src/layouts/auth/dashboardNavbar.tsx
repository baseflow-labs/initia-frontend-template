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
import DropdownComp from "../../components/dropdown";

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

        <div className="d-flex align-items-center gap-3 pe-5">
          <DropdownComp
            button={
              <FontAwesomeIcon icon={faBell} className="text-secondary" />
            }
            list={
              notifications.length
                ? notifications.map(
                    ({ title, message, service, createdAt }, i) => ({
                      route: "/" + service,
                      label: (
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

export default DashboardNavbar;
