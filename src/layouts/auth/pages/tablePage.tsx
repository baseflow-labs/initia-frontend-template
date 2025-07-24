import { ActionButtonProps } from "../../../components/button/actionButtons";
import DynamicTable, {
  actionProps,
  TableProps,
} from "../../../components/table";
import PageTemplate from "./pageTemplate";

interface Props extends TableProps {
  title: string;
  filters?: {
    name: string;
    label: string;
    options: { value: string; label?: string }[];
    multi?: boolean;
  }[];
  actionButtons?: ActionButtonProps[];
  onGetData: (values: any) => Promise<any>;
  tableActions?: (id?: string) => actionProps[];
  onSearch?: (e: string) => void;
  searchPlaceholder?: string;
  paginationMeta: {
    page: number;
    capacity: number;
    count: number;
    pagesCount: number;
  };
}

const TablePage = ({
  title,
  filters,
  actionButtons,
  columns,
  data,
  onGetData,
  tableActions,
  paginationMeta,
  onSearch,
  searchPlaceholder,
}: Props) => {
  return (
    <PageTemplate
      title={title}
      filters={filters}
      actionButtons={actionButtons}
      onSearch={onSearch}
      searchPlaceholder={searchPlaceholder}
      onGetData={(filters) => {
        const mergedFilters = filters || {};
        onGetData({
          filters: mergedFilters,
          page: 1,
          capacity: paginationMeta.capacity,
        });
      }}
    >
      <DynamicTable
        columns={columns}
        data={data}
        onPageChange={(page, capacity) => {
          onGetData({ filters: {}, page, capacity });
        }}
        actions={tableActions}
        size={paginationMeta.capacity}
        paginationMeta={paginationMeta}
      />
    </PageTemplate>
  );
};

export default TablePage;
