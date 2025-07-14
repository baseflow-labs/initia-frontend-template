import { useTranslation } from "react-i18next";
import { APP_VERSION } from "../../documentation/version";

const CopyRightView = ({
  onLine,
  short,
}: {
  onLine?: boolean;
  short?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div className={"px-1" + (onLine ? " d-flex justify-content-between" : "")}>
      <small className="text-muted">{APP_VERSION}</small>
      {!onLine ? <br /> : ""}
      {!onLine ? (
        <small className="text-muted">
          {!short ? t("CopyRight.AllRightsReserved") + " ©" : ""}{" "}
          {new Date().getFullYear()}
          <br />
        </small>
      ) : (
        ""
      )}
      <small className="text-muted">
        {short ? "" : t("CopyRight.DoneBy")}{" "}
        <a
          href="https://www.shai.sa/ar/business"
          target="_blank"
          rel="noreferrer"
          className="text-muted"
        >
          {short ? t("CopyRight.ShaiShort") : t("CopyRight.ShaiFull")}
        </a>
      </small>
    </div>
  );
};

export default CopyRightView;
