import UserProfileAboutView from "./About";
import UserProfileConnectionsView from "./Connections";
import UserProfileContactsView from "./Contacts";
import UserProfileOverviewView from "./Overview";
import UserProfileTeamsView from "./Teams";
import UserProfileTimelineView from "./Timeline";

const UserProfileTabView = () => {
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-5 mb-4">
        <UserProfileAboutView />

       <UserProfileContactsView />

        <UserProfileTeamsView />
      </div>

      <div className="col-xl-8 col-lg-7 mb-4">
        <UserProfileOverviewView />

        <div className="row">
          <UserProfileTimelineView />

          <UserProfileConnectionsView />
        </div>
      </div>
    </div>
  );
};

export default UserProfileTabView;
