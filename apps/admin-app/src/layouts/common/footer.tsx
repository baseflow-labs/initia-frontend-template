import { useTranslation } from "react-i18next";
import configs from "@initia/shared/config/configs";

import CopyRightView from "./copyright";

const CommonFooter = () => {
  const { t } = useTranslation();

  const links = [
    {
      label: t("Public.LandingPage.Title"),
      url: configs.externalLinks.landingPage,
    },
    {
      label: t("Public.TermsConditions.Title"),
      url: configs.externalLinks.termsOfService,
    },
    {
      label: t("Public.PrivacyPolicy.Title"),
      url: configs.externalLinks.privacyPolicy,
    },
  ];

  return (
    <footer className="footer mt-2 bottom-0 w-100 px-5 mx-0">
      <hr className="mt-2" />

      <div className="row">
        <div className="col-12 col-md-4 text-center text-md-start pt-1">
          {t("CopyRight.AllRightsReserved", { year: new Date().getFullYear() })}{" "}
          {t("CopyRight.AppName")}
        </div>

        <div className="col-12 col-md-4 text-center text-md-start pt-1">
          <CopyRightView />
        </div>

        <div className="col-12 col-md-4 text-center text-md-end pt-1">
          <ul className="list-inline mb-0">
            {links.map(({ label, url }, i) => (
              <li className="list-inline-item mx-2" key={i}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default CommonFooter;
