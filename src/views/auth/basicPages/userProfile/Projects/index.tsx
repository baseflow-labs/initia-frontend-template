import { useTranslation } from "react-i18next";

const UserProfileProjectsView = () => {
  const { t } = useTranslation();

  const projects = [
    { id: 1, leader: "Alice Stone", team: "React Developers", progress: 72, status: "Active" },
    { id: 2, leader: "John Doe", team: "UI Designers", progress: 45, status: "Pending" },
    { id: 3, leader: "Cecilia Payne", team: "Support Team", progress: 90, status: "Completed" },
  ];

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>{t("Auth.Profile.Projects.Leader", "Project Leader")}</th>
                <th>{t("Auth.Profile.Projects.Team", "Team")}</th>
                <th>{t("Auth.Profile.Projects.Progress", "Progress")}</th>
                <th>{t("Auth.Profile.Projects.Status", "Status")}</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>{p.leader}</td>
                  <td>{p.team}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress flex-grow-1" style={{ height: 6 }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: `${p.progress}%` }}
                          aria-valuenow={p.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <span className="small text-muted">{p.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={
                        "badge " +
                        (p.status === "Completed"
                          ? "bg-success-subtle text-success"
                          : p.status === "Pending"
                            ? "bg-warning-subtle text-dark"
                            : "bg-primary-subtle text-primary")
                      }
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfileProjectsView;
