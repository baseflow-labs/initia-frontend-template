import { useTranslation } from "react-i18next";

const AuthFooter = () => {
  const { t } = useTranslation();

  const links = [
    {
      label: t("Public.TermsConditions.Title"),
      url: "http://www.google.com/terms-of-service",
    },
    {
      label: t("Public.PrivacyPolicy.Title"),
      url: "http://www.google.com/privacy-policy",
    },
    {
      label: t("Auth.SupportCenter.ContactUs.Title"),
      url: "http://www.google.com/contact-us",
    },
  ];

  return (
    <footer className="footer mt-5 w-100 px-5">
      <hr className="mt-2" />

      <div className="d-flex justify-content-between">
        <div className="text-start pt-1">
          {t("CopyRight.AllRightsReserved", { year: new Date().getFullYear() })}{" "}
          {t("CopyRight.AppName")}
        </div>

        <div className="text-end pt-1">
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

export default AuthFooter;
