import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const NotificationsView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      This is to list notifications
    </Fragment>
  );
};

export default NotificationsView;
