import { useTranslation } from "react-i18next";

const UserProfileTeamsView = () => {
  const { t } = useTranslation();
  const user = {
    name: "John Doe",
    role: "UX Designer",
    location: "Vatican City",
    status: "Connected",
    joinedAt: "Joined April 2021",
    avatarUrl: "https://via.placeholder.com/120x120.png?text=JD",
    coverUrl: "https://via.placeholder.com/1200x260.png?text=Profile+Cover",
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
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-0">
        <h5 className="card-title mb-0">
          {t("Auth.Profile.TeamsShort", "Teams")}
        </h5>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {user.teamsShort.map((team, idx) => (
            <li
              key={idx}
              className="list-group-item px-0 d-flex justify-content-between align-items-center border-0"
            >
              <span className="small">{team.name}</span>
              <span className="small text-muted">{team.members} Members</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfileTeamsView;
