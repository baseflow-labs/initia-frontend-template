import TablePage from "../../../../layouts/auth/pages/tablePage";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const UsersView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      This is to show user activity
    </Fragment>
  );
};

export default UsersView;
