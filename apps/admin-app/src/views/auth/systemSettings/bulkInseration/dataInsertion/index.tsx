import { useTranslation } from "react-i18next";
import Button from "@initia/shared/ui/components/core/button";
import Form from "@initia/shared/ui/components/form";
import {
  getGeneratorTablesMetadata,
  tableRelationsList,
  tablesList,
  type GeneratorTableMetadata,
} from "@initia/shared/api/demoData";
import { useEffect, useState } from "react";

import { dependencyBasedOrder, inputs } from "./inputs";

const SystemDataBulkInsertionView = () => {
  const { t } = useTranslation();
  const [tableNames, setTableNames] = useState<string[]>(tablesList);
  const [relations, setRelations] = useState<string[]>(tableRelationsList);
  const [tableMetaByName, setTableMetaByName] = useState<Record<string, GeneratorTableMetadata>>(
    {}
  );

  useEffect(() => {
    getGeneratorTablesMetadata()
      .then((res) => {
        const nextTableNames = res.payload?.tableNames || [];
        const nextRelations = res.payload?.relations || [];
        const nextTables = res.payload?.tables || [];

        if (nextTableNames.length) {
          setTableNames(nextTableNames);
        }

        if (nextRelations.length) {
          setRelations(nextRelations);
        }

        setTableMetaByName(
          nextTables.reduce<Record<string, GeneratorTableMetadata>>((acc, table) => {
            acc[table.tableName] = table;
            return acc;
          }, {})
        );
      })
      .catch(() => {
        setTableNames(tablesList);
        setRelations(tableRelationsList);
        setTableMetaByName({});
      });
  }, []);

  const tablesOrder = dependencyBasedOrder(tableNames, relations);

  const PerTableView = () => {
    return (
      <div className="row">
        <div className="col-md-6">
          <Button color="success" className="w-100">
            {t("Auth.Settings.Admin.BulkDataInsertion.DownloadTemplate")}
          </Button>
        </div>

        <div className="col-md-12 my-3">
          <Form inputs={inputs(t)} onFormSubmit={() => ""} />
        </div>

        <div className="col-md-6"></div>

        <div className="col-md-6">
          <Button color="warning" className="w-100">
            {t("Auth.Settings.Admin.BulkDataInsertion.DownloadAllData")}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="row">
      {tableNames
        .sort((a, b) => tablesOrder.indexOf(a) - tablesOrder.indexOf(b))
        .map((table) => (
          <div key={table} className="col-md-6 mb-5">
            <h3 className="my-3">{table}</h3>
            <p className="text-muted small mb-2">{tableMetaByName[table]?.endpoint || table}</p>

            <PerTableView />
          </div>
        ))}
    </div>
  );
};

export default SystemDataBulkInsertionView;
