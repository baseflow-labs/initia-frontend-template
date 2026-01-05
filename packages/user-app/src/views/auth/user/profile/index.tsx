import TabsComp from "@initia/shared/ui/components/tab";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import UserProfileConnectionsView from "./Connections";
import UserProfileHeaderView from "./Header";
import UserProfileTabView from "./Profile";
import UserProfileProjectsView from "./Projects";
import UserProfileTeamsView from "./Teams";

const UserProfileView = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      id: "profile",
      title: t("Auth.Profile.Title", "Profile"),
      content: <UserProfileTabView />,
    },
    {
      id: "teams",
      title: t("Auth.Profile.Teams.Title", "Teams"),
      content: <UserProfileTeamsView />,
    },
    {
      id: "projects",
      title: t("Auth.Profile.Projects.Title", "Projects"),
      content: <UserProfileProjectsView />,
    },
    {
      id: "connections",
      title: t("Auth.Profile.Connections", "Connections"),
      content: <UserProfileConnectionsView />,
    },
  ];

  return (
    <Fragment>
      <UserProfileHeaderView />

      <TabsComp
        items={tabs.map((tab) => ({
          ...tab,
          content: (
            <div className="card mt-4">
              <div className="card-body p-5">{tab.content}</div>
            </div>
          ),
        }))}
      />
    </Fragment>
  );
};

export default UserProfileView;
