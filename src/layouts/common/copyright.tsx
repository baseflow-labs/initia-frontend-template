import { useTranslation } from "react-i18next";

const CopyRightView = ({ onLine }: { onLine?: boolean }) => {
  const { t } = useTranslation();

  return (
    <div className={"px-1" + (onLine ? " d-flex justify-content-between" : "")}>
      <small className="text-muted">V.1.0.0</small>
      {!onLine ? <br /> : ""}
      <small className="text-muted">
        {t("CopyRight.DoneBy")}{" "}
        <a
          href="https://www.shai.sa/ar/business"
          target="_blank"
          className="text-muted"
        >
          {t("CopyRight.Shai")}
        </a>
      </small>
    </div>
  );
};

export default CopyRightView;
