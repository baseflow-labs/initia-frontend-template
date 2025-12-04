import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BackToSupportCenterButton = () => {
  const { t, i18n } = useTranslation();

  return (
    <Link
      to="/support-center"
      className="text-white text-decoration-none d-inline-block mb-3"
    >
      <FontAwesomeIcon icon={i18n.language === "ar" ? faArrowRight : faArrowLeft} className="me-2" />
      {t("Global.Labels.Back")}
    </Link>
  );
};

export default BackToSupportCenterButton;
