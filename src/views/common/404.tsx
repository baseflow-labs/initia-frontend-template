import { useTranslation } from "react-i18next";

import Button from "@/components/core/button";

const FourZeroFourError = () => {
  const { t } = useTranslation();

  return (
    <div className="border border-3 border-dark rounded-5 mx-auto w-50 py-5">
      <div className="text-danger text-center">
        <h1 className="display-1">404</h1>

        <h4 className="mt-3 mb-5">{t("Global.Labels.WrongUrl")}</h4>

        <Button color="primary" route="back">
          {t("Global.Labels.Back")}
        </Button>
      </div>
    </div>
  );
};

export default FourZeroFourError;
