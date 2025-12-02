import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const UserActivityView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      This is to show user activity
    </Fragment>
  );
};

export default UserActivityView;
