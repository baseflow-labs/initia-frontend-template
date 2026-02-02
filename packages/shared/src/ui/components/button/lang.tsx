import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

import DropdownComp from "../dropdown";

const LangButton = () => {
  const { i18n } = useTranslation();

  const languages = (i18n.options.supportedLngs || [])
    .filter((lang = "") => lang !== "cimode")
    .map((lang = "") => ({
      label: lang === "ar" ? "العربية" : lang.toUpperCase(),
      onClick: () => i18n.changeLanguage(lang),
    }));

  return (
    <DropdownComp
      button={<FontAwesomeIcon icon={faLanguage} className="text-primary" />}
      list={languages}
    />
  );
};

export default LangButton;
