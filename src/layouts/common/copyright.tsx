import { useTranslation } from "react-i18next";

import Logo from "../../assets/images/brand/logo-full.png";
import LogoOnly from "../../assets/images/brand/logo-only.png";
import { APP_VERSION } from "../../documentation/version";

const CopyRightView = ({
  oneLine,
  short,
}: {
  oneLine?: boolean;
  short?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={"px-1" + (oneLine ? " d-flex justify-content-between" : "")}
    >
      {oneLine ? (
        <small>{t("CopyRight.AppName")}</small>
      ) : (
        <a href="https://mustaheq.org" target="_blank" rel="noreferrer">
          <img src={short ? LogoOnly : Logo} height="45" alt="Logo" />
        </a>
      )}

      {oneLine ? (
        ""
      ) : !short ? (
        <div className="mt-3">
          <small className="text-muted">
            {t("CopyRight.AllRightsReserved", {
              year: new Date().getFullYear(),
            })}{" "}
            <a
              href="https://www.shai.sa/ar/business"
              target="_blank"
              rel="noreferrer"
              className="text-muted"
            >
              {t("CopyRight.ShaiShort")}
            </a>
          </small>
        </div>
      ) : (
        ""
      )}

      {oneLine && (
        <div>
          <small className="text-muted">V.{APP_VERSION}</small>
        </div>
      )}
    </div>
  );
};

export default CopyRightView;
