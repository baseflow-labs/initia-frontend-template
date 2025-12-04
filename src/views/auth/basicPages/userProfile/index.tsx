import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import UserProfileHeaderView from "./Header";
import TabsComp from "../../../../components/tab";
import UserProfileTabView from "./Profile";
import UserProfileTeamsView from "./Teams";
import UserProfileProjectsView from "./Projects";
import UserProfileConnectionsView from "./Connections";

const UserProfileView = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      id: "profile",
      title: t("Auth.Profile.Title", "Profile"),
      body: <UserProfileTabView />
    },
    {
      id: "teams",
      title: t("Auth.Profile.Teams.Title", "Teams"),
      body: <UserProfileTeamsView />
    },
    {
      id: "projects",
      title: t("Auth.Profile.Projects.Title", "Projects"),
      body: <UserProfileProjectsView />
    },
    {
      id: "connections",
      title: t("Auth.Profile.Connections", "Connections"),
      body: <UserProfileConnectionsView />
    },
  ]

  return (
    <Fragment>
     <UserProfileHeaderView/>

     <TabsComp 
      tabs={tabs.map(tab => 
        ({
          ...tab,
          body: (
            <div className="card mt-4">
              <div className="card-body p-5">
                {tab.body}
              </div>
            </div>
          )
        }))}
    />
    </Fragment>
  );
};

export default UserProfileView;
