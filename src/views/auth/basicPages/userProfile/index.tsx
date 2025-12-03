import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

const UserProfileView = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"profile" | "teams" | "projects" | "connections">(
    "profile"
  );

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

  const projects = [
    { id: 1, leader: "Alice Stone", team: "React Developers", progress: 72, status: "Active" },
    { id: 2, leader: "John Doe", team: "UI Designers", progress: 45, status: "Pending" },
    { id: 3, leader: "Cecilia Payne", team: "Support Team", progress: 90, status: "Completed" },
  ];

  const renderProfileTab = () => (
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

  const renderTeamsTab = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          {t("profile.tabs.teams", "Teams")}
        </h5>
      </div>
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

  const renderProjectsTab = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          {t("profile.tabs.projects", "Projects")}
        </h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>{t("profile.projects.leader", "Project Leader")}</th>
                <th>{t("profile.projects.team", "Team")}</th>
                <th>{t("profile.projects.progress", "Progress")}</th>
                <th>{t("profile.projects.status", "Status")}</th>
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

  const renderConnectionsTab = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          {t("profile.tabs.connections", "Connections")}
        </h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {connections.map((c) => (
            <div key={c.id} className="col-md-6 col-lg-4">
              <div className="border rounded-3 p-3 h-100 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="rounded-circle bg-secondary-subtle me-3"
                    style={{ width: 40, height: 40 }}
                  />
                  <div>
                    <div className="small fw-semibold">{c.name}</div>
                    <div className="small text-muted">{c.connections}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm w-100 mt-2"
                >
                  {t("profile.actions.viewProfile", "View profile")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className="container-fluid min-vh-100 bg-light py-4">
        {/* Top profile card with cover & avatar */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm mb-4">
              {/* Cover */}
              <div className="position-relative">
                <div className="ratio ratio-21x9">
                  <img
                    src={user.coverUrl}
                    alt={t("profile.coverAlt", "Profile cover")}
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
                      <span className="badge bg-success-subtle text-success">
                        {user.status}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 d-flex justify-content-md-end justify-content-start mt-3 mt-md-0">
                    <div className="d-flex flex-wrap gap-2">
                      <button type="button" className="btn btn-outline-secondary btn-sm">
                        {t("profile.actions.shareProfile", "Share")}
                      </button>
                      <button type="button" className="btn btn-primary btn-sm">
                        {t("profile.actions.connect", "Connect")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="card-footer bg-white border-top-0 pt-0">
                <ul className="nav nav-tabs card-header-tabs border-0 px-3">
                  <li className="nav-item">
                    <button
                      type="button"
                      className={"nav-link " + (activeTab === "profile" ? "active" : "")}
                      onClick={() => setActiveTab("profile")}
                    >
                      {t("profile.tabs.profile", "Profile")}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={"nav-link " + (activeTab === "teams" ? "active" : "")}
                      onClick={() => setActiveTab("teams")}
                    >
                      {t("profile.tabs.teams", "Teams")}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={"nav-link " + (activeTab === "projects" ? "active" : "")}
                      onClick={() => setActiveTab("projects")}
                    >
                      {t("profile.tabs.projects", "Projects")}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={
                        "nav-link " + (activeTab === "connections" ? "active" : "")
                      }
                      onClick={() => setActiveTab("connections")}
                    >
                      {t("profile.tabs.connections", "Connections")}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="row">
          <div className="col-12">
            {activeTab === "profile" && renderProfileTab()}
            {activeTab === "teams" && renderTeamsTab()}
            {activeTab === "projects" && renderProjectsTab()}
            {activeTab === "connections" && renderConnectionsTab()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfileView;
