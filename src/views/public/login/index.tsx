import { useTranslation } from "react-i18next";

const LoginView = () => {
  const { t } = useTranslation();

  return (
    <div className="text-success">
      <h1>{t("Public.Login.Welcome")}</h1>
    </div>
  );
};

export default LoginView;
