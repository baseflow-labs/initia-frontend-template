import { useTranslation } from "react-i18next";

import profilePhotoPlaceholder from "../../../assets/images/profile-image-placeholder.png";
import { useAppSelector } from "../../../store/hooks";

const DashboardView = () => {
  const { t } = useTranslation();
  const { name, logo } = useAppSelector((state) => state.settings);

  return (
    <div className="text-info text-center">
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

      <h4 className="display-4 mt-5">{name}</h4>
    </div>
  );
};

export default DashboardView;
