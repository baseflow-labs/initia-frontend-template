import { useTranslation } from "react-i18next";

const LangButton = () => {
  const { i18n } = useTranslation();

  return (
    <div
      className="my-auto fw-bold"
      role="button"
      onClick={() => i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")}
    >
      {i18n.language === "ar" ? "En" : "ع"}
    </div>
  );
};

export default LangButton;
