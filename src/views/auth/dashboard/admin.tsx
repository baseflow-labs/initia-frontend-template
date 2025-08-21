import { useTranslation } from "react-i18next";

import profilePhotoPlaceholder from "../../../assets/images/profile-image-placeholder.png";
import DashboardCard from "../../../components/card/dashboardCard";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import { useAppSelector } from "../../../store/hooks";

const DashboardAdminView = () => {
  const { t } = useTranslation();
  const { name, logo } = useAppSelector((state) => state.settings);

  return (
    <PageTemplate title={t("Auth.Dashboard.Title")}>
      <DashboardCard>
        <div className="text-info text-center py-5">
          <h1 className="mb-4">{t("Auth.Dashboard.Welcome")}</h1>

          <img
            src={
              logo
                ? (process.env.REACT_APP_STORAGE_DIRECTORY_URL ||
                    "https://pdt-bucket.s3.us-east-1.amazonaws.com") + logo
                : profilePhotoPlaceholder
            }
            alt="logo"
            className="my-5 w-100"
          />

          <h4 className="display-4 mt-5 text-success">{name}</h4>
        </div>
      </DashboardCard>
    </PageTemplate>
  );
};

export default DashboardAdminView;
