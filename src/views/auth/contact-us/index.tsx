import { useTranslation } from "react-i18next";

import { contactUsIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import Button from "../../../components/core/button";
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
          <IconWrapperComp height={120} icon={contactUsIcon} />
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
