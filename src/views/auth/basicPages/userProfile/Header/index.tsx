import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import TempCover from "@/assets/images/public-bg.jpg";
import TempProfilePhoto from "@/assets/images/profile-image-placeholder.png";

const UserProfileHeaderView = () => {
  const { t } = useTranslation();

  const user = {
    name: "John Doe",
    role: "UX Designer",
    location: "Vatican City",
    status: "Connected",
    joinedAt: "Joined April 2021",
    avatarUrl: TempProfilePhoto,
    coverUrl: TempCover,
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
          <div className="card border-0 shadow-sm mb-4">
            {/* Cover */}
            <div className="position-relative">
              <div className="ratio w-100 bg-primary" style={{ height: "25vh" }}>
                <img
                  src={user.coverUrl}
                  alt="cover"
                  className="img-fluid rounded-top object-fit-cover"
                />
              </div>

              {/* Avatar */}
              <div className="position-absolute start-0 bottom-0 translate-middle-y ms-4">
                <div
                  className="border border-3 border-white rounded-circle overflow-hidden"
                  style={{ width: 120, height: 120 }}
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
              </div>
            </div>

            {/* User header */}
            <div className="card-body pt-4 pb-3">
              <div className="row align-items-end">
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
                    <button type="button" className="btn btn-outline-secondary btn-sm">
                      {t("Auth.Profile.ShareProfile", "Share")}
                    </button>
                    <button type="button" className="btn btn-primary btn-sm">
                      {t("Auth.Profile.Connect", "Connect")}
                    </button>
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
