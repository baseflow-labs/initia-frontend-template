import { useTranslation } from "react-i18next";

import unAcceptedUserIcon from "../../assets/icons/unaccepted.svg";
import DashboardCard from "./dashboardCard";

const UnacceptedUser = () => {
  const { t } = useTranslation();

  return (
    <DashboardCard>
      <div className="d-flex">
        <img
          src={unAcceptedUserIcon}
          height={70}
          alt="unaccepted-user-icon"
          className="me-3 my-auto"
        />

        <h5 className="my-auto">{t("Auth.Users.UnacceptedNote")}</h5>
      </div>
    </DashboardCard>
  );
};

export default UnacceptedUser;
