import { useTranslation } from "react-i18next";

const RegisterView = () => {
  const { t } = useTranslation();

  return (
    <div className="text-success">
      <h1>{t("Public.Register.Title")}</h1>
    </div>
  );
};

export default RegisterView;
