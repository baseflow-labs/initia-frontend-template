import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import LandingPageManagementBuilder from "./builder";
import LandingPageManagementPreview from "./preview";

const LandingPageManagement = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("Auth.LandingPage.Title")}>
      <div className="row">
        <div className="col-md-4">
          <LandingPageManagementBuilder />
        </div>

        <div className="col-md-8">
          <LandingPageManagementPreview />
        </div>
      </div>
    </PageTemplate>
  );
};

export default LandingPageManagement;
