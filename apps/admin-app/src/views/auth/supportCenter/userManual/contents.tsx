import { useTranslation } from "react-i18next";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";

import { contentTableColumns } from "./inputs";

const ManualContentsView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/user-manual/contents"
      inputs={contentTableColumns(t)}
      singleItem={t("Auth.SupportCenter.Admin.UserManual.Content", "Content")}
      includeCreate
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default ManualContentsView;
