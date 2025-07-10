import { useEffect, useState } from "react";

import DynamicTable, { actionProps, TableProps } from "../../components/table";
import { apiCatchGlobalHandler } from "../../utils/function";
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
  onSearch: (values: any) => Promise<any>;
  tableActions?: (id?: string) => actionProps[];
}

const TablePage = ({
  title,
  filters,
  actionButtons,
  columns,
  data,
  onSearch,
  tableActions,
}: Props) => {
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    capacity: 10,
    count: 0,
    pagesCount: 1,
  });

  useEffect(() => {
    onSearch({
      filters: {},
      page: paginationMeta.page,
      capacity: paginationMeta.capacity,
    })
      .then((res: any) => {
        if (res?.extra) {
          setPaginationMeta({
            page: res.extra.page,
            capacity: res.extra.capacity,
            count: res.extra.count,
            pagesCount: res.extra.pagesCount,
          });
        }
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  return (
    <PageTemplate
      title={title}
      filters={filters}
      actionButtons={actionButtons}
      onSearch={(filters) => {
        const mergedFilters = filters || {};
        onSearch({
          filters: mergedFilters,
          page: 1,
          capacity: paginationMeta.capacity,
        })
          .then((res: any) => {
            if (res?.extra) {
              setPaginationMeta({
                page: res.extra.page,
                capacity: res.extra.capacity,
                count: res.extra.count,
                pagesCount: res.extra.pagesCount,
              });
            }
          })
          .catch(apiCatchGlobalHandler);
      }}
    >
      <DynamicTable
        columns={columns}
        data={data}
        onPageChange={(page, capacity) => {
          onSearch({ filters: {}, page, capacity })
            .then((res: any) => {
              if (res?.extra) {
                setPaginationMeta({
                  page: res.extra.page,
                  capacity: res.extra.capacity,
                  count: res.extra.count,
                  pagesCount: res.extra.pagesCount,
                });
              }
            })
            .catch(apiCatchGlobalHandler);
        }}
        actions={tableActions}
        size={paginationMeta.capacity}
        paginationMeta={paginationMeta}
      />
    </PageTemplate>
  );
};

export default TablePage;
