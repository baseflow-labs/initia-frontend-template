import TabsComp from "@initia/shared/ui/components/tab";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import SystemDataBulkInsertionView from "./dataInsertion";
import SystemDataProcessingView from "./dataProccessing";

const SystemDataInsertionView = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      id: "dataInsertion",
      title: t("Auth.Settings.Admin.BulkDataInsertion.Title"),
      content: <SystemDataBulkInsertionView />,
    },
    {
      id: "dataProcessing",
      title: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Title"),
      content: <SystemDataProcessingView />,
    },
  ];

  return (
    <PageTemplate title={t("Auth.Settings.Admin.BulkDataInsertion.Title")}>
      <TabsComp items={tabs} />
    </PageTemplate>
  );
};

export default SystemDataInsertionView;
