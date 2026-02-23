import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import DemoLoginNote from "@initia/shared/ui/layouts/auth/demoLoginNote";
import TablePage from "@initia/shared/ui/layouts/auth/pages/tablePage";

import { getInputs } from "./inputs";

const TablePluralLowerNameView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <DemoLoginNote />

      <TablePage
        title={t("UserServices.TABLE_PLURAL_UPPER_NAME.Title")}
        columns={getInputs(t)}
        dataApiEndpoint="TABLE_PLURAL_UPPER_NAME"
        singleItem={t("UserServices.TABLE_PLURAL_UPPER_NAME.SingleItem")}
      />
    </Fragment>
  );
};

export default TablePluralLowerNameView;
