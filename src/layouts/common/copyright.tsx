import { useTranslation } from "react-i18next";

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
      <small className="text-muted">V.1.0.0</small>
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
          className="text-muted"
        >
          {short ? t("CopyRight.ShaiShort") : t("CopyRight.ShaiFull")}
        </a>
      </small>
    </div>
  );
};

export default CopyRightView;
