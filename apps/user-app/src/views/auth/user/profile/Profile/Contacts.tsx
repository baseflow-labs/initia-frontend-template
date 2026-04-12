import { useTranslation } from "react-i18next";
import type { UserProps } from "@initia/shared/types/auth";

interface UserProfileContactsViewProps {
  user: UserProps;
}

const UserProfileContactsView = ({ user }: UserProfileContactsViewProps) => {
  const { t } = useTranslation();

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-header bg-white border-0">
        <h5 className="card-title mb-0">{t("Auth.Profile.Contacts", "Contacts")}</h5>
      </div>

      <div className="card-body">
        <dl className="row mb-0">
          <dt className="col-5 text-muted small">{t("Auth.Profile.Contact", "Contact")}</dt>

          <dd className="col-7 small mb-2">
            {user.phone ? (
              <a href={`tel:${user.phone}`} className="text-decoration-none">
                {user.phone}
              </a>
            ) : (
              "N/A"
            )}
          </dd>

          <dt className="col-5 text-muted small">{t("Auth.Profile.Email", "Email")}</dt>

          <dd className="col-7 small mb-0">
            {user.email ? (
              <a href={`mailto:${user.email}`} className="text-decoration-none">
                {user.email}
              </a>
            ) : (
              "N/A"
            )}
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default UserProfileContactsView;
