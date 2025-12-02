import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import TablePage from "../../../../layouts/auth/pages/tablePage";

const UsersView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      This is to show messaging app
    </Fragment>
  );
};

export default UsersView;
