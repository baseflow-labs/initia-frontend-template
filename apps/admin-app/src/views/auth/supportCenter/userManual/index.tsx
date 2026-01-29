import TabsComp from "@initia/shared/ui/components/tab";
import { useTranslation } from "react-i18next";

import ManualSectionsView from "./sections";
import ManualSubsectionsView from "./subsections";
import ManualContentsView from "./contents";

const UserManualManagementView = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      id: "sections",
      title: t("Auth.SupportCenter.Admin.UserManual.Tabs.Sections", "Sections"),
      content: <ManualSectionsView />,
    },
    {
      id: "subsections",
      title: t("Auth.SupportCenter.Admin.UserManual.Tabs.Subsections", "Subsections"),
      content: <ManualSubsectionsView />,
    },
    {
      id: "contents",
      title: t("Auth.SupportCenter.Admin.UserManual.Tabs.Contents", "Contents"),
      content: <ManualContentsView />,
    },
  ];

  return (
    <TabsComp
      items={tabs.map((tab) => ({
        ...tab,
        content: <div className="mt-4">{tab.content}</div>,
      }))}
    />
  );
};

export default UserManualManagementView;
