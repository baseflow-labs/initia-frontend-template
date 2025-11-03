import { ActionButtonProps } from "../../../components/button/actionButtons";
import DynamicTable, {
  actionProps,
  TableProps,
} from "../../../components/table";
import PageTemplate from "./pageTemplate";

interface Props extends TableProps {
  title: string;
  actionButtons?: ActionButtonProps[];
  tableExtraActions?: (id?: string) => actionProps[];
}

const TablePage = ({
  title,
  actionButtons,
  columns,
  dataApiEndpoint,
  tableExtraActions,
  searchProp,
  searchPlaceholder,
  includeCreate,
  includeView,
  includeUpdate,
  includeDelete,
}: Props) => {
  return (
    <PageTemplate title={title} actionButtons={actionButtons}>
      <DynamicTable
        dataApiEndpoint={dataApiEndpoint}
        columns={columns}
        extraActions={tableExtraActions}
        searchProp={searchProp}
        searchPlaceholder={searchPlaceholder}
        includeCreate={includeCreate}
        includeDelete={includeDelete}
        includeUpdate={includeUpdate}
        includeView={includeView}
      />
    </PageTemplate>
  );
};

export default TablePage;
