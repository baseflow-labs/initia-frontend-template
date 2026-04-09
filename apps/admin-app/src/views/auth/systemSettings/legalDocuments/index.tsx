import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import { inputs } from "./inputs";

const LegalDocumentsView = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("Auth.Settings.Admin.LegalDocuments.Title")}>
      <ApiDataTable
        dataApiEndpoint="/legalDocument"
        inputs={inputs(t)}
        singleItem={t("Auth.Settings.Admin.LegalDocuments.Item")}
        includeCreate
        includeView
      />
    </PageTemplate>
  );
};

export default LegalDocumentsView;
