import { useTranslation } from "react-i18next";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";
import { faqTableColumns } from "./inputs";

const FaqManagementView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/faq"
      inputs={faqTableColumns(t)}
      singleItem={t("Auth.SupportCenter.Admin.Faq.Item", "FAQ Item")}
      includeCreate
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default FaqManagementView;
