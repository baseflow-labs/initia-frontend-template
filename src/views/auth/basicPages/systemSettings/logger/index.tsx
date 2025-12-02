import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const SystemLoggerView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      This is to show db logger
    </Fragment>
  );
};

export default SystemLoggerView;
