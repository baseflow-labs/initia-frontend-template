import { ActionButtonProps } from "@initia/shared/ui/components/button/actionButtons";
import { actionProps, TableProps } from "@initia/shared/ui/components/table";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";

import PageTemplate from "./pageTemplate";

interface Props extends TableProps {
  title: string;
  actionButtons?: ActionButtonProps[];
  dataApiEndpoint: string;
  includeCreate?: boolean;
  tableExtraActions?: (id?: string) => actionProps[];
  singleItem: string;
}

const TablePage = ({
  title,
  actionButtons,
  columns,
  dataApiEndpoint,
  tableExtraActions,
  includeCreate,
  includeView,
  includeUpdate,
  includeDelete,
  singleItem,
}: Props) => {
  return (
    <PageTemplate title={title} actionButtons={actionButtons}>
      <ApiDataTable
        dataApiEndpoint={dataApiEndpoint}
        inputs={columns}
        singleItem={singleItem}
        extraActions={tableExtraActions}
        includeCreate={includeCreate}
        includeDelete={includeDelete}
        includeUpdate={includeUpdate}
        includeView={includeView}
      />
    </PageTemplate>
  );
};

export default TablePage;
