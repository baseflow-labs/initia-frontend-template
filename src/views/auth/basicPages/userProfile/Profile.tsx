import { useTranslation } from "react-i18next";

const UserProfileTabView = () => {
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

  const connections = [
    { id: 1, name: "Cecilia Payne", connections: "45 Connections" },
    { id: 2, name: "Curtis Fletcher", connections: "1.32k Connections" },
    { id: 3, name: "Alice Stone", connections: "125 Connections" },
    { id: 4, name: "Darrell Barnes", connections: "456 Connections" },
    { id: 5, name: "Eugenia Moore", connections: "1.2k Connections" },
  ];

  const teams = [
    { id: 1, name: "React Developers", members: "72 Members", role: "Developer" },
    { id: 2, name: "Support Team", members: "122 Members", role: "Support" },
    { id: 3, name: "UI Designers", members: "7 Members", role: "Designer" },
    { id: 4, name: "Vue.js Developers", members: "289 Members", role: "Developer" },
    { id: 5, name: "Digital Marketing", members: "24 Members", role: "Marketing" },
  ];

  return (
    <div className="row">
      {/* Left column: About / Contacts / Teams */}
      <div className="col-xl-4 col-lg-5 mb-4">
        {/* About */}
        <div className="card shadow-sm border-0 mb-3">
          <div className="card-header bg-white border-0">
            <h5 className="card-title mb-0">
              {t("profile.sections.about", "About")}
            </h5>
          </div>
          <div className="card-body">
            <dl className="row mb-0">
              <dt className="col-5 text-muted small">
                {t("profile.fields.fullName", "Full Name")}
              </dt>
              <dd className="col-7 small mb-2">{user.about.fullName}</dd>

              <dt className="col-5 text-muted small">
                {t("profile.fields.status", "Status")}
              </dt>
              <dd className="col-7 small mb-2">{user.about.status}</dd>

              <dt className="col-5 text-muted small">
                {t("profile.fields.role", "Role")}
              </dt>
              <dd className="col-7 small mb-2">{user.about.role}</dd>

              <dt className="col-5 text-muted small">
                {t("profile.fields.country", "Country")}
              </dt>
              <dd className="col-7 small mb-2">{user.about.country}</dd>

              <dt className="col-5 text-muted small">
                {t("profile.fields.languages", "Languages")}
              </dt>
              <dd className="col-7 small mb-0">{user.about.languages}</dd>
            </dl>
          </div>
        </div>

        {/* Contacts */}
        <div className="card shadow-sm border-0 mb-3">
          <div className="card-header bg-white border-0">
            <h5 className="card-title mb-0">
              {t("profile.sections.contacts", "Contacts")}
            </h5>
          </div>
          <div className="card-body">
            <dl className="row mb-0">
              <dt className="col-5 text-muted small">
                {t("profile.fields.contact", "Contact")}
              </dt>
              <dd className="col-7 small mb-2">
                <a href={`tel:${user.contacts.phone}`} className="text-decoration-none">
                  {user.contacts.phone}
                </a>
              </dd>

              <dt className="col-5 text-muted small">Skype</dt>
              <dd className="col-7 small mb-2">{user.contacts.skype}</dd>

              <dt className="col-5 text-muted small">
                {t("profile.fields.email", "Email")}
              </dt>
              <dd className="col-7 small mb-0">
                <a
                  href={`mailto:${user.contacts.email}`}
                  className="text-decoration-none"
                >
                  {user.contacts.email}
                </a>
              </dd>
            </dl>
          </div>
        </div>

        {/* Teams (short) */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-0">
            <h5 className="card-title mb-0">
              {t("profile.sections.teamsShort", "Teams")}
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
      </div>

      {/* Right column: Overview / Timeline / Connections / Teams */}
      <div className="col-xl-8 col-lg-7 mb-4">
        {/* Overview */}
        <div className="card shadow-sm border-0 mb-3">
          <div className="card-header bg-white border-0">
            <h5 className="card-title mb-0">
              {t("profile.sections.overview", "Overview")}
            </h5>
          </div>
          <div className="card-body">
            <div className="row gy-3">
              <div className="col-md-4 col-6">
                <div className="border rounded-3 p-3 bg-light">
                  <div className="text-muted small mb-1">
                    {t("profile.stats.tasks", "Task Compiled")}
                  </div>
                  <div className="fw-semibold fs-5">{user.overviewStats.tasks}</div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="border rounded-3 p-3 bg-light">
                  <div className="text-muted small mb-1">
                    {t("profile.stats.projects", "Projects Compiled")}
                  </div>
                  <div className="fw-semibold fs-5">{user.overviewStats.projects}</div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="border rounded-3 p-3 bg-light">
                  <div className="text-muted small mb-1">
                    {t("profile.stats.connections", "Connections")}
                  </div>
                  <div className="fw-semibold fs-5">
                    {user.overviewStats.connections}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline, Connections, Teams (cards) */}
        <div className="row">
          {/* Timeline */}
          <div className="col-lg-6 mb-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  {t("profile.sections.timeline", "Activity Timeline")}
                </h5>
                <div className="btn-group btn-group-sm">
                  <button type="button" className="btn btn-outline-secondary">
                    {t("profile.actions.shareTimeline", "Share")}
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    {t("profile.actions.suggestEdits", "Suggest edits")}
                  </button>
                </div>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {timeline.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item px-0 border-0 border-bottom pb-3 mb-3"
                    >
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">{item.title}</h6>
                        <span className="text-muted small">{item.time}</span>
                      </div>
                      <p className="small text-muted mb-2">{item.body}</p>

                      {item.attachment && (
                        <div className="border rounded-3 p-2 bg-light small d-inline-flex align-items-center gap-2">
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
          </div>

          {/* Connections */}
          <div className="col-lg-6 mb-3">
            <div className="card shadow-sm border-0 h-100 mb-3">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  {t("profile.sections.connections", "Connections")}
                </h5>
                <div className="btn-group btn-group-sm">
                  <button type="button" className="btn btn-outline-secondary">
                    {t("profile.actions.shareConnections", "Share")}
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    {t("profile.actions.suggestEdits", "Suggest edits")}
                  </button>
                </div>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush mb-3">
                  {connections.map((c) => (
                    <li
                      key={c.id}
                      className="list-group-item px-0 border-0 border-bottom pb-3 mb-3 d-flex align-items-center"
                    >
                      <div
                        className="rounded-circle bg-secondary-subtle me-3"
                        style={{ width: 40, height: 40 }}
                      />
                      <div>
                        <div className="small fw-semibold">{c.name}</div>
                        <div className="small text-muted">{c.connections}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button type="button" className="btn btn-outline-secondary btn-sm w-100">
                  {t("profile.actions.viewAllConnections", "View all connections")}
                </button>
              </div>
            </div>

            {/* Teams */}
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  {t("profile.sections.teams", "Teams")}
                </h5>
                <div className="btn-group btn-group-sm">
                  <button type="button" className="btn btn-outline-secondary">
                    {t("profile.actions.shareTeams", "Share")}
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    {t("profile.actions.suggestEdits", "Suggest edits")}
                  </button>
                </div>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush mb-3">
                  {teams.map((team) => (
                    <li
                      key={team.id}
                      className="list-group-item px-0 border-0 border-bottom pb-3 mb-3 d-flex align-items-center"
                    >
                      <div
                        className="rounded-circle bg-secondary-subtle me-3"
                        style={{ width: 40, height: 40 }}
                      />
                      <div className="flex-grow-1">
                        <div className="small fw-semibold">{team.name}</div>
                        <div className="small text-muted">{team.members}</div>
                      </div>
                      <span className="badge bg-light text-muted border">
                        {team.role}
                      </span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="btn btn-outline-secondary btn-sm w-100">
                  {t("profile.actions.viewAllTeams", "View all teams")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileTabView;
