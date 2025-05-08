import { useTranslation } from "react-i18next";
import "./i18next";

const App = () => {
  const { t } = useTranslation();

  return (
    <div className="text-success">
      <h1>{t("Home.Welcome")}</h1>
      <h1>{t("Home.Welcomes")}</h1>
    </div>
  );
};

export default App;
