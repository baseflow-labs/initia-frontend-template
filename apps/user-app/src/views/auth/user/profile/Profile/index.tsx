import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as UsersApi from "@initia/shared/api/users";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import type { UserProps } from "@initia/shared/types/auth";

import UserProfileAboutView from "./About";
import UserProfileConnectionsView from "./Connections";
import UserProfileContactsView from "./Contacts";
import UserProfileOverviewView from "./Overview";
import UserProfileTeamsView from "./Teams";
import UserProfileTimelineView from "./Timeline";

const UserProfileTabView = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (userId) {
          const res = await UsersApi.getProfile(userId);
          setUser(res.payload);
        } else {
          const res = await UsersApi.getMe();
          setUser(res.payload);
        }
      } catch (error) {
        apiCatchGlobalHandler(error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [userId]);

  if (loading || !user) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="row">
      <div className="col-xl-4 col-lg-5 mb-4">
        <UserProfileAboutView user={user} />

        <UserProfileContactsView user={user} />

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
