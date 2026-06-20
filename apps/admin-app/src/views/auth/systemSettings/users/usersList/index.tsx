import { useTranslation } from "react-i18next";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";

import { inputs } from "./inputs";

const UsersView = () => {
  const { t } = useTranslation();

  const roles = [
    { value: "admin" },
    { value: "public" },
    { value: "customer" },
    { value: "owner" },
    { value: "assistant" },
  ]; // This should ideally come from an API or a constants file, but hardcoding for now based on be/src/enums/userRole.enum.ts

  return (
    <ApiDataTable
      dataApiEndpoint="/user"
      inputs={inputs(t, roles)}
      singleItem={t("Auth.Settings.Admin.Users.User")}
      includeCreate
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default UsersView;
