import { useTranslation } from "react-i18next";

import DashboardCard from "./dashboardCard";

interface Props {
  label: string;
  researchers: {
    name: string;
    photo: string;
    usersCount: number;
    visitsCount: number;
    aidsCount: number;
    reportsCount: number;
  }[];
}

const UsersCard = ({ label, researchers }: Props) => {
  const { t } = useTranslation();

  return (
    <DashboardCard max="40vh">
      <h3 className="mb-4">
        {label} {researchers.length}
      </h3>

      <table className="table table-responsive align-middle">
        <thead>
          <tr>
            <th className="fw-bold">{t("Auth.Dashboard.ResearcherInfo")}</th>

            <th className="fw-bold">{t("Auth.Dashboard.VisitsCount")}</th>

            <th className="fw-bold">{t("Auth.Dashboard.AidsCount")}</th>

            {/* <th className="fw-bold">{t("Auth.Dashboard.ReportsCount")}</th> */}
          </tr>
        </thead>

        <tbody>
          {researchers.map(({ name, photo, usersCount, visitsCount, aidsCount }, i) => (
            <tr className={i === researchers.length - 1 ? "border-white" : ""} key={i}>
              <td>
                <div className="d-flex py-2">
                  <div>
                    <img src={photo} height={60} className="me-3 rounded-2" alt="userPhoto" />
                  </div>

                  <div>
                    <h5>{name}</h5>

                    <div className="text-secondary">
                      {usersCount} {t("Auth.Users.Title")}
                    </div>
                  </div>
                </div>
              </td>

              <td>{visitsCount}</td>

              <td>{aidsCount}</td>

              {/* <td>{reportsCount}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardCard>
  );
};

export default UsersCard;
