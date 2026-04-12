import { useTranslation } from "react-i18next";
import type { UserProps } from "@initia/shared/types/auth";

interface UserProfileAboutViewProps {
  user: UserProps;
}

const UserProfileAboutView = ({ user }: UserProfileAboutViewProps) => {
  const { t } = useTranslation();

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-header bg-white border-0">
        <h5 className="card-title mb-0">{t("Auth.Profile.About", "About")}</h5>
      </div>

      <div className="card-body">
        <dl className="row mb-0">
          <dt className="col-5 text-muted small">{t("Auth.Profile.FullName", "Full Name")}</dt>

          <dd className="col-7 small mb-2">{user.fullName || user.name || "N/A"}</dd>

          <dt className="col-5 text-muted small">{t("Auth.Profile.Status", "Status")}</dt>

          <dd className="col-7 small mb-2">{user.status || "Active"}</dd>

          <dt className="col-5 text-muted small">{t("Auth.Profile.Role", "Role")}</dt>

          <dd className="col-7 small mb-2">{user.jobTitle || "N/A"}</dd>

          <dt className="col-5 text-muted small">{t("Auth.Profile.Country", "Country")}</dt>

          <dd className="col-7 small mb-2">{user.country || "N/A"}</dd>

          <dt className="col-5 text-muted small">{t("Auth.Profile.Languages", "Languages")}</dt>

          <dd className="col-7 small mb-0">{user.language || "N/A"}</dd>
        </dl>
      </div>
    </div>
  );
};

export default UserProfileAboutView;
