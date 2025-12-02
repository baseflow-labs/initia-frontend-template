import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const MessagingView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      This is to show messaging app
    </Fragment>
  );
};

export default MessagingView;
