import tempLogo from "@/assets/images/brand/logo.png";
import Button from "@/components/core/button";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const UserProfileHeaderView = () => {
  const { t } = useTranslation();

  const user = {
    name: "John Doe",
    role: "UX Designer",
    location: "Vatican City",
    status: "Connected",
    joinedAt: "Joined April 2021",
    avatarUrl: tempLogo,
    about: {
      fullName: "John Doe",
      status: "Active",
      role: "Developer",
      country: "USA",
      languages: "English",
    },
    contacts: {
      phone: "(123) 456-7890",
      skype: "john.doe",
      email: "john.doe@example.com",
    },
    teamsShort: [
      { name: "Backend Developer", members: 126 },
      { name: "React Developer", members: 98 },
    ],
    overviewStats: {
      tasks: "13.5k",
      projects: 146,
      connections: 897,
    },
  };

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
                    src={user.avatarUrl}
                    alt={user.name}
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
                    <h2 className="h4 mb-1">{user.name}</h2>
                    <p className="text-muted mb-1">{user.role}</p>
                    <p className="text-muted mb-2">
                      <span className="me-3">{user.location}</span>
                      <span>{user.joinedAt}</span>
                    </p>
                    <span className="badge bg-success-subtle text-success">{user.status}</span>
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
