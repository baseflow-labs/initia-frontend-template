import { useTranslation } from "react-i18next";
import Button from "../../../../../../components/core/button";
import Form from "../../../../../../components/form";
import { inputs } from "./inputs";

const SystemDataBulkInsertionView = () => {
  const { t } = useTranslation();

  const tables = [
    { value: 'users' },
    { value: 'products' },
    { value: 'orders' },
  ];

  const PerTableView = () => {
    return (
      <div className="row">
        <div className="col-md-6">
          <Button color="success" className="w-100">{t("Auth.Settings.Admin.BulkDataInsertion.DownloadTemplate")}</Button>
        </div>
        
        <div className="col-md-12 my-3">
          <Form
            inputs={inputs(t)}
            onFormSubmit={() => ''}
          />
        </div>
        
        <div className="col-md-6">
        </div>
        
        <div className="col-md-6">
          <Button color="warning" className="w-100">{t("Auth.Settings.Admin.BulkDataInsertion.DownloadAllData")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {tables.map((table) => (
        <div key={table.value} className="col-md-6 mb-5">
          <h3 className="my-3">{table.value}</h3>

          <PerTableView />
        </div>
      ))}
    </div>
  );
};

export default SystemDataBulkInsertionView;
