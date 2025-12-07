import { useTranslation } from "react-i18next";
import TabsComp from "../../../../../components/tab";
import SystemDataBulkInsertionView from "./dataInsertion";
import SystemDataProcessingView from "./dataProccessing";

const SystemDataInsertionView = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      id: 'dataInsertion',
      title: t("Auth.Settings.Admin.BulkDataInsertion.Title"),
      body: <SystemDataBulkInsertionView />
    },
    {
      id: 'dataProcessing',
      title: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Title"),
      body: <SystemDataProcessingView />
    }
  ]

  return (
    <TabsComp tabs={tabs} />
  );
};

export default SystemDataInsertionView;
