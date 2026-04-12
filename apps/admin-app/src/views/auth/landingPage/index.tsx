import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import LandingPageManagementBuilder from "./builder";
import LandingPageManagementPreview from "./preview";
import type { LandingPage } from "@/api/landingContent";

const LandingPageManagement = () => {
  const { t } = useTranslation();
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);

  return (
    <PageTemplate title={t("Auth.LandingPage.Title")}>
      <div className="row g-3">
        <div className="col-xl-4 col-lg-5">
          <LandingPageManagementBuilder onPageSelect={setSelectedPage} />
        </div>

        <div className="col-xl-8 col-lg-7">
          <LandingPageManagementPreview
            slug={selectedPage?.slug ?? null}
            locale={selectedPage?.locale ?? "en"}
          />
        </div>
      </div>
    </PageTemplate>
  );
};

export default LandingPageManagement;
