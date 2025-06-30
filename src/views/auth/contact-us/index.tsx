import { useTranslation } from "react-i18next";
import Button from "../../../components/core/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../store/hooks";

const ContactUsPage = () => {
  const { t } = useTranslation();
  const { phoneNumber } = useAppSelector((state) => state.settings);

  return (
    <div
      className="border border-2 border-dark rounded-5 mx-auto p-5"
      style={{ maxWidth: "750px" }}
    >
      <div className="text-center">
        <h1 className="display-1">
          <FontAwesomeIcon icon={faLifeRing} />
        </h1>

        <h1 className="">{t("Auth.ContactUs.ContactNow")}</h1>

        <h4 className="mt-3 mb-5">{t("Auth.ContactUs.Contact")}</h4>

        <Button
          color="info"
          onClick={() => window.location.assign("tel:+966" + phoneNumber)}
        >
          {t("Auth.ContactUs.ContactUsNow")}
        </Button>
      </div>
    </div>
  );
};

export default ContactUsPage;
