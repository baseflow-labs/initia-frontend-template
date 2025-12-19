import { useTranslation } from "react-i18next";

const UserProfileTimelineView = () => {
  const { t } = useTranslation();
  const timeline = [
    {
      id: 1,
      title: "12 Invoices have been paid",
      time: "12 min ago",
      body: "Invoices have been paid to the company",
      attachment: "invoices.pdf",
    },
    {
      id: 2,
      title: "Client Meeting",
      time: "45 min ago",
      body: "Project meeting with John @10:15am",
      person: {
        name: "Lester McCarthy",
        role: "CEO of Pixinvent",
      },
    },
    {
      id: 3,
      title: "Create a new project for client",
      time: "2 days ago",
      body: "6 team members in a project",
      teamCount: 6,
    },
  ];

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{t("Auth.Profile.Timeline", "Activity Timeline")}</h5>
        <div className="btn-group btn-group-sm">
          <button type="button" className="btn btn-outline-secondary">
            {t("Auth.Profile.ShareTimeline", "Share")}
          </button>
          <button type="button" className="btn btn-outline-secondary">
            {t("Auth.Profile.SuggestEdits", "Suggest edits")}
          </button>
        </div>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {timeline.map((item) => (
            <li key={item.id} className="list-group-item px-0 border-0 border-bottom pb-3 mb-3">
              <div className="d-flex justify-content-between">
                <h6 className="mb-1">{item.title}</h6>
                <span className="text-muted small">{item.time}</span>
              </div>
              <p className="small text-muted mb-2">{item.body}</p>

              {item.attachment && (
                <div className="border rounded-2 p-2 bg-light small d-inline-flex align-items-center gap-2">
                  <i className="bi bi-file-earmark-text" />
                  <span>{item.attachment}</span>
                </div>
              )}

              {item.person && (
                <div className="d-flex align-items-center mt-1 small">
                  <div
                    className="rounded-circle bg-secondary-subtle me-2"
                    style={{ width: 32, height: 32 }}
                  />
                  <div>
                    <div className="fw-semibold">{item.person.name}</div>
                    <div className="text-muted small">{item.person.role}</div>
                  </div>
                </div>
              )}

              {item.teamCount && (
                <div className="d-flex align-items-center mt-1 small text-muted">
                  <span className="me-2">
                    <i className="bi bi-people me-1" />
                    {item.teamCount} team members
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfileTimelineView;
