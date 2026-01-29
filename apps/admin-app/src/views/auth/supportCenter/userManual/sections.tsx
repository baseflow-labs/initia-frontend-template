import { useTranslation } from "react-i18next";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";
import { sectionTableColumns } from "./inputs";

const ManualSectionsView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/user-manual/sections"
      inputs={sectionTableColumns(t)}
      singleItem={t("Auth.SupportCenter.Admin.UserManual.Section", "Section")}
      includeCreate
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default ManualSectionsView;
