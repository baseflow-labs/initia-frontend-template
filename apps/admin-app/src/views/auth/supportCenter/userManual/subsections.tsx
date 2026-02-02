import { useTranslation } from "react-i18next";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";

import { subsectionTableColumns } from "./inputs";

const ManualSubsectionsView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/user-manual/subsections"
      inputs={subsectionTableColumns(t)}
      singleItem={t("Auth.SupportCenter.Admin.UserManual.Subsection", "Subsection")}
      includeCreate
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default ManualSubsectionsView;
