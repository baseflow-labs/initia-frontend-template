import tempLogo from "@initia/shared/assets/images/brand/logo.png";
import Button from "@initia/shared/ui/components/core/button";
import * as UsersApi from "@initia/shared/api/users";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import type { UserProps } from "@initia/shared/types/auth";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const UserProfileHeaderView = () => {
  const { t } = useTranslation();
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
    return (
      <div className="text-center py-5">{t("Global.Loading", { defaultValue: "Loading..." })}</div>
    );
  }

  const joinedDate = user.createdAt
    ? `Joined ${new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}`
    : "Joined recently";

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="card rounded-2 border-0 shadow-sm mb-4">
            {/* Cover */}
            <div className="position-relative">
              <div className="ratio w-100 bg-primary" style={{ height: "25vh" }} />

              {/* Avatar */}
              <div className="position-absolute translate-middle-y ms-5">
                <div
                  className="border border-1 rounded-circle overflow-hidden"
                  style={{ width: 120, height: 120 }}
                >
                  <img
                    src={user.avatar || tempLogo}
                    alt={user.fullName || user.name || "User"}
                    className="img-fluid w-100 h-100 object-fit-cover bg-white"
                  />
                </div>
              </div>
            </div>

            {/* User header */}
            <div className="card-body pt-5 pb-3">
              <div className="row align-items-end pt-4">
                <div className="col-md-8 col-sm-12">
                  <div className="ps-md-5 ps-sm-0 ps-0 mt-4 mt-md-0">
                    <h2 className="h4 mb-1">{user.fullName || user.name || user.username}</h2>
                    <p className="text-muted mb-1">{user.jobTitle || "User"}</p>
                    <p className="text-muted mb-2">
                      <span className="me-3">
                        {user.location || user.country || "Location not set"}
                      </span>
                      <span>{joinedDate}</span>
                    </p>
                    <span
                      className={`badge ${user.status === "Active" ? "bg-success-subtle text-success" : "bg-secondary-subtle text-secondary"}`}
                    >
                      {user.status || "Active"}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 d-flex justify-content-md-end justify-content-start mt-3 mt-md-0">
                  <div className="d-flex flex-wrap gap-2">
                    <Button outline color="secondary" size="sm">
                      {t("Auth.Profile.ShareProfile", "Share")}
                    </Button>

                    <Button outline size="sm">
                      {t("Auth.Profile.Connect", "Connect")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfileHeaderView;
