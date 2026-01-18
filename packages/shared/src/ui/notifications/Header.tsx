import { useTranslation } from "react-i18next";

import Button from "../../ui/components/core/button";

const NotificationsHeaderView = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) => {
  const { t } = useTranslation();

  const actions = [
    { key: "all", label: t("Auth.Notifications.Filters.All") },
    { key: "unread", label: t("Auth.Notifications.Filters.Unread") },
    { key: "important", label: t("Auth.Notifications.Filters.Important") },
  ];

  return (
    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
      <div className="btn-group">
        {actions.map((action, i) => (
          <Button
            size="sm"
            outline
            color="secondary"
            className={filter === action.key ? " active" : ""}
            onClick={() => setFilter(action.key)}
            key={i}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NotificationsHeaderView;
