import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import DemoLoginNote from "../../../../layouts/auth/demoLoginNote";
import TablePage from "../../../../layouts/auth/pages/tablePage";
import { inputs } from "./inputs";

const TABLE_PLURAL_UPPER_NAMEView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <DemoLoginNote />

      <TablePage
        title={t("Auth.TABLE_PLURAL_UPPER_NAME.Title")}
        // actionButtons={actionButtons}
        columns={inputs(t)}
        // searchProp="name"
        // searchPlaceholder={t("Auth.TABLE_PLURAL_UPPER_NAME.SearchBarPlaceholder")}
        // tableExtraActions={(id?: string) => [
        //   {
        //     label: t("Common.Edit"),
        //     icon: faEdit
        //   },
        // ]}
        dataApiEndpoint="TABLE_PLURAL_UPPER_NAME"
      />
    </Fragment>
  );
};

export default TABLE_PLURAL_UPPER_NAMEView;
