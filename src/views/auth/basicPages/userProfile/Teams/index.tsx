import { useTranslation } from "react-i18next";

const UserProfileTeamsView = () => {
  const { t } = useTranslation();

  const teams = [
    { id: 1, name: "React Developers", members: "72 Members", role: "Developer" },
    { id: 2, name: "Support Team", members: "122 Members", role: "Support" },
    { id: 3, name: "UI Designers", members: "7 Members", role: "Designer" },
    { id: 4, name: "Vue.js Developers", members: "289 Members", role: "Developer" },
    { id: 5, name: "Digital Marketing", members: "24 Members", role: "Marketing" },
  ];

  return (
     <div className="card shadow-sm border-0">
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li
              key={team.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-secondary-subtle me-3"
                  style={{ width: 40, height: 40 }}
                />

                <div>
                  <div className="small fw-semibold">{team.name}</div>
                  <div className="small text-muted">{team.members}</div>
                </div>
              </div>
              
              <span className="badge bg-light text-muted border">{team.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfileTeamsView;
