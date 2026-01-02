import PageTemplate from "@/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import LandingPageManagementBuilder from "./builderClean";
import LandingPageManagementPreview from "./preview";

const LandingPageManagement = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("Auth.LandingPage.Title")}>
      <div className="row">
        <div className="col-md-6">
          <LandingPageManagementBuilder />
        </div>

        <div className="col-md-6">
          <LandingPageManagementPreview />
        </div>
      </div>
    </PageTemplate>
  );
};

export default LandingPageManagement;
