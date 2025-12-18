import { useTranslation } from "react-i18next";

const UserProfileAboutView = () => {
  const { t } = useTranslation();
  const user = {
    name: "John Doe",
    role: "UX Designer",
    location: "Vatican City",
    status: "Connected",
    joinedAt: "Joined April 2021",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/168961512?s=400&u=201ce6952acb24b8f56b8cdf746e7dba28d7fc95&v=4",
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
        <h5 className="card-title mb-0">{t("Auth.Profile.About", "About")}</h5>
      </div>

      <div className="card-body">
        <dl className="row mb-0">
          <dt className="col-5 text-muted small">{t("Auth.Profile.FullName", "Full Name")}</dt>

          <dd className="col-7 small mb-2">{user.about.fullName}</dd>

          <dt className="col-5 text-muted small">{t("Auth.Profile.Status", "Status")}</dt>

          <dd className="col-7 small mb-2">{user.about.status}</dd>

          <dt className="col-5 text-muted small">{t("Auth.Profile.Role", "Role")}</dt>

          <dd className="col-7 small mb-2">{user.about.role}</dd>

          <dt className="col-5 text-muted small">{t("Auth.Profile.Country", "Country")}</dt>

          <dd className="col-7 small mb-2">{user.about.country}</dd>

          <dt className="col-5 text-muted small">{t("Auth.Profile.Languages", "Languages")}</dt>

          <dd className="col-7 small mb-0">{user.about.languages}</dd>
        </dl>
      </div>
    </div>
  );
};

export default UserProfileAboutView;
