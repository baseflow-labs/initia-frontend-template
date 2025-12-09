import { useTranslation } from "react-i18next";
import Button from "../../../../../../components/core/button";
import Form from "../../../../../../components/form";
import { dependencyBasedOrder, inputs } from "./inputs";
import { tableRelationsList, tablesList } from "../../../../../../api/demoData";

const SystemDataBulkInsertionView = () => {
  const { t } = useTranslation();

  const tablesOrder = dependencyBasedOrder(tablesList, tableRelationsList);

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
      {tablesList.sort((a, b) => tablesOrder.indexOf(a) - tablesOrder.indexOf(b)).map((table) => (
        <div key={table} className="col-md-6 mb-5">
          <h3 className="my-3">{table}</h3>

          <PerTableView />
        </div>
      ))}
    </div>
  );
};

export default SystemDataBulkInsertionView;
