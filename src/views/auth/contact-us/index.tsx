import { useTranslation } from "react-i18next";
import Button from "../../../components/core/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";

const ContactUsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="border border-3 border-dark rounded-5 mx-auto w-50 py-5">
      <div className="text-center">
        <h1 className="display-1">
          <FontAwesomeIcon icon={faLifeRing} />
        </h1>

        <h1 className="">{t("Auth.ContactUs.ContactNow")}</h1>

        <h4 className="mt-3 mb-5">{t("Auth.ContactUs.Contact")}</h4>

        <Button color="info" route="/">
          {t("Auth.ContactUs.ContactUsNow")}
        </Button>
      </div>
    </div>
  );
};

export default ContactUsPage;
