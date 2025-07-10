import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import * as OverviewApi from "../../../api/overview";
import { helpIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import profilePhotoPlaceholder from "../../../assets/images/profile-image-placeholder.png";
import DashboardCard from "../../../components/card/dashboardCard";
import { Notification } from "../../../layouts/auth/dashboardNavbar";
import { useAppSelector } from "../../../store/hooks";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";

const DashboardView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { name, logo } = useAppSelector((state) => state.settings);
  const [data, setData] = useState<{
    notifications?: Notification[];
    status?: string;
  }>({});

  useLayoutEffect(() => {
    OverviewApi.forBeneficiary()
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
  }, []);

  const statuses = [
    {
      value: "New Member",
      label: t("Auth.MembershipRegistration.Statuses.NewMember"),
    },
    {
      value: "Incomplete",
      label: t("Auth.MembershipRegistration.Statuses.Incomplete"),
    },
    {
      value: "Need Help",
      label: t("Auth.MembershipRegistration.Statuses.NeedHelp"),
    },
    {
      value: "Rejected",
      label: t("Auth.MembershipRegistration.Statuses.Rejected"),
    },
    {
      value: "Reviewed",
      label: t("Auth.MembershipRegistration.Statuses.Reviewed"),
    },
    {
      value: "Cancelled",
      label: t("Auth.MembershipRegistration.Statuses.Cancelled"),
    },
    {
      value: "Accepted",
      label: t("Auth.MembershipRegistration.Statuses.Accepted"),
    },
    {
      value: "In Preview",
      label: t("Auth.MembershipRegistration.Statuses.InPreview"),
    },
  ];

  return (
    <div className="row">
      <div className="col-lg-6">
        <DashboardCard>
          <div className="text-info text-center py-5">
            <h1 className="mb-4">{t("Auth.Dashboard.Welcome")}</h1>

            <img
              src={
                logo
                  ? (process.env.REACT_APP_STORAGE_DIRECTORY_URL ||
                      "https://pdt-bucket.s3.us-east-1.amazonaws.com") +
                    logo.replaceAll("\\", "/")
                  : profilePhotoPlaceholder
              }
              height={250}
              className="my-5"
            />

            <h4 className="display-4 mt-5 text-success">{name}</h4>
          </div>
        </DashboardCard>
      </div>

      <div className="col-lg-6">
        <DashboardCard>
          <h3 className="mb-5">{t("Auth.Dashboard.BeneficiaryInfo")}</h3>

          <div className="row">
            <div className="col-6">
              <h6 className="my-auto">
                {t("Auth.Dashboard.BeneficiaryMembershipStatus")}
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
                              <IconWrapperComp icon={helpIcon} />
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
  );
};

export default DashboardView;
