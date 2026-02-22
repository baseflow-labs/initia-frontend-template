import DemoLoginNote from "@initia/shared/ui/layouts/auth/demoLoginNote";
import TablePage from "@initia/shared/ui/layouts/auth/pages/tablePage";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { getInputs } from "./inputs";

const TABLE_PLURAL_UPPER_NAMEView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <DemoLoginNote />

      <TablePage
        title={t("Auth.TABLE_PLURAL_UPPER_NAME.Title")}
        // actionButtons={actionButtons}
        columns={getInputs(t)}
        // searchProp="name"
        // searchPlaceholder={t("Auth.TABLE_PLURAL_UPPER_NAME.SearchBarPlaceholder")}
        // tableExtraActions={(id?: string) => [
        //   {
        //     label: t("Common.Edit"),
        //     icon: faEdit
        //   },
        // ]}
        dataApiEndpoint="TABLE_PLURAL_UPPER_NAME"
        singleItem={t("Auth.TABLE_PLURAL_UPPER_NAME.SINGLE_ITEM_NAME")}
      />
    </Fragment>
  );
};

export default TABLE_PLURAL_UPPER_NAMEView;
