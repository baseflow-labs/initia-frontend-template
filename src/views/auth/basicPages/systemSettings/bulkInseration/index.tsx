import { useTranslation } from "react-i18next";
import TabsComp from "../../../../../components/tab";
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

  return <TabsComp items={tabs} />;
};

export default SystemDataInsertionView;
