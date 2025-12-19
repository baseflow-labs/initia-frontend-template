import { useTranslation } from "react-i18next";

const UserProfileOverviewView = () => {
  const { t } = useTranslation();
  const user = {
    name: "John Doe",
    role: "UX Designer",
    location: "Vatican City",
    status: "Connected",
    joinedAt: "Joined April 2021",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/168961512?s=400&u=4438fc74e073e1c13b9ef90fe68979667007e70d&v=4",
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
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-header bg-white border-0">
        <h5 className="card-title mb-0">{t("Auth.Profile.Overview", "Overview")}</h5>
      </div>
      <div className="card-body">
        <div className="row gy-3">
          <div className="col-md-4 col-6">
            <div className="border rounded-3 p-3 bg-light">
              <div className="text-muted small mb-1">
                {t("Auth.Profile.Stats.Tasks", "Task Compiled")}
              </div>
              <div className="fw-semibold fs-5">{user.overviewStats.tasks}</div>
            </div>
          </div>
          <div className="col-md-4 col-6">
            <div className="border rounded-3 p-3 bg-light">
              <div className="text-muted small mb-1">
                {t("Auth.Profile.Stats.Projects", "Projects Compiled")}
              </div>
              <div className="fw-semibold fs-5">{user.overviewStats.projects}</div>
            </div>
          </div>
          <div className="col-md-4 col-6">
            <div className="border rounded-3 p-3 bg-light">
              <div className="text-muted small mb-1">
                {t("Auth.Profile.Stats.Connections", "Connections")}
              </div>
              <div className="fw-semibold fs-5">{user.overviewStats.connections}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileOverviewView;
