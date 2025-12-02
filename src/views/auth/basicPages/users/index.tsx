import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import DemoLoginNote from "../../../../layouts/auth/demoLoginNote";
import TablePage from "../../../../layouts/auth/pages/tablePage";
import { inputs } from "./inputs";

const UsersView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <DemoLoginNote />

      <TablePage
        title={t("Auth.Users.Title")}
        // actionButtons={actionButtons}
        columns={inputs(t)}
        // searchProp="name"
        // searchPlaceholder={t("Auth.Users.SearchBarPlaceholder")}
        // tableExtraActions={(id?: string) => [
        //   {
        //     label: t("Common.Edit"),
        //     icon: faEdit
        //   },
        // ]}
        dataApiEndpoint="users"
      />
    </Fragment>
  );
};

export default UsersView;
