import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const CopyRightView = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-between px-1">
      <small className="text-muted">V.1.0.0</small>
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
