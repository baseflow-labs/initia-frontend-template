import { useTranslation } from "react-i18next";

import unAcceptedBeneficiaryIcon from "../../assets/icons/unaccepted.svg";
import DashboardCard from "./dashboardCard";

const UnacceptedBeneficiary = () => {
  const { t } = useTranslation();

  return (
    <DashboardCard>
      <div className="d-flex">
        <img
          src={unAcceptedBeneficiaryIcon}
          height={70}
          alt="unaccepted-beneficiary-icon"
          className="me-3 my-auto"
        />

        <h5 className="my-auto">{t("Auth.Beneficiaries.UnacceptedNote")}</h5>
      </div>
    </DashboardCard>
  );
};

export default UnacceptedBeneficiary;
