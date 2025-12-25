import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const NotificationsHeaderView = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
      <div className="btn-group">
        <button type="button" className="btn btn-sm btn-outline-secondary active">
          {t("Auth.Notifications.Filters.All")}
        </button>

        <button type="button" className="btn btn-sm btn-outline-secondary">
          {t("Auth.Notifications.Filters.Unread")}
        </button>

        <button type="button" className="btn btn-sm btn-outline-secondary">
          {t("Auth.Notifications.Filters.Important")}
        </button>
      </div>

      <div className="input-group input-group-sm" style={{ maxWidth: 260 }}>
        <span className="input-group-text bg-light border-end-0">
          <FontAwesomeIcon icon={faSearch} />
        </span>

        <input
          type="text"
          className="form-control border-start-0"
          placeholder={t("Auth.Notifications.SearchPlaceholder")}
        />
      </div>
    </div>
  );
};

export default NotificationsHeaderView;
