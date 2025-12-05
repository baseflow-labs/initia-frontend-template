import { useTranslation } from "react-i18next";
import DynamicTable from "../../../../../../components/table";
import { inputs } from "./inputs";

const UserRolesView = () => {
  const { t } = useTranslation();

  return (    
    <DynamicTable
      dataApiEndpoint="users"
      columns={inputs(t)}
    />
  );
};

export default UserRolesView;
