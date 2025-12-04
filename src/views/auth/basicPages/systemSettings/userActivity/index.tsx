import { useTranslation } from "react-i18next";
import DynamicTable from "../../../../../components/table";
import { inputs } from "./inputs";

const UserActivityView = () => {
  const { t } = useTranslation();

  return (
    <DynamicTable
      dataApiEndpoint="users"
      columns={inputs(t)}
        // extraActions={tableExtraActions}
        // searchProp={searchProp}
        // searchPlaceholder={searchPlaceholder}
        // includeCreate={includeCreate}
        // includeDelete={includeDelete}
        // includeUpdate={includeUpdate}
        // includeView={includeView}
    />
  );
};

export default UserActivityView;
