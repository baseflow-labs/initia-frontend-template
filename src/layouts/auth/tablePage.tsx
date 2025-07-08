import DynamicTable, { actionProps, TableProps } from "../../components/table";
import PageTemplate from "./pageTemplate";

interface Props extends TableProps {
  title: string;
  filters?: {
    name: string;
    label: string;
    options: { value: string; label?: string }[];
    multi?: boolean;
  }[];
  actionButtons?: { label: string }[];
  onSearch: (values: {}) => void;
  tableActions?: (id?: string) => actionProps[];
}

const TablePage = ({
  title,
  filters,
  actionButtons,
  columns,
  data,
  onPageChange,
  onSearch,
  tableActions,
}: Props) => {
  return (
    <PageTemplate
      title={title}
      filters={filters}
      actionButtons={actionButtons}
      onSearch={onSearch}
    >
      <DynamicTable
        columns={columns}
        data={data}
        onPageChange={onPageChange}
        actions={tableActions}
      />
    </PageTemplate>
  );
};

export default TablePage;
