import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as AidCategoryApi from "../../../api/aids/aidCategories";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { apiCatchGlobalHandler } from "../../../utils/function";
import {
  getAidCategoryReapplyPeriods,
  getAidCategoryTypes,
} from "../../../utils/optionDataLists/aids";
import AddAidCategory from "./createAidCategory";

const AidCategoriesView = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);
  const [aidCategories, setAidCategories] = useState<
    { id: string; name: string; type: string }[]
  >([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSearch, setCurrentSearch] = useState("");
  const [crudData, setCrudData] = useState<{
    id: string;
    name: string;
    type: string;
  }>({ id: "", name: "", type: "" });
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    capacity: 10,
    count: 0,
    pagesCount: 1,
  });

  const getData = ({
    filters = currentFilters,
    page = paginationMeta.page,
    capacity = paginationMeta.capacity,
    search = currentSearch,
  }) => {
    setCurrentFilters(filters);

    const customFilters = [];

    if (search) {
      customFilters.push({
        field: "name",
        filteredTerm: {
          dataType: "string",
          value: search,
        },
        filterOperator: "contains",
      });
    }

    return AidCategoryApi.getAll({ filters, page, capacity, customFilters })
      .then((res: any) => {
        setAidCategories(res.payload);

        if (res.extra) {
          setPaginationMeta({
            page: res.extra.page,
            capacity: res.extra.capacity,
            count: res.extra.count,
            pagesCount: res.extra.pagesCount,
          });
        }

        return res;
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({});
  }, []);

  const aidCategoryTypes = getAidCategoryTypes(t);
  const aidCategoryReapplyPeriods = getAidCategoryReapplyPeriods(t);

  const filters = [
    {
      label: t("Auth.AidCategories.AidCategoryType"),
      options: aidCategoryTypes,
      name: "type",
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.AidCategories.AddAidCategory"),
      onClick: () => setOpenModal(true),
    },
  ];

  const columns = [
    {
      type: "text",
      name: "name",
      label: t("Auth.AidCategories.AidCategoryName"),
    },
    {
      type: "radio",
      options: aidCategoryTypes,
      name: "type",
      label: t("Auth.AidCategories.AidCategoryType"),
    },
    {
      type: "radio",
      options: aidCategoryReapplyPeriods,
      name: "reapply",
      label: t("Auth.AidCategories.ReapplyPeriods.Title"),
    },
  ];

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ page: 1, capacity: 10, search: e });
  };

  const update = (row: string) => {
    setOpenModal(true);
    setCrudData(
      aidCategories.find(({ id }) => id === row) || {
        id: "",
        name: "",
        type: "",
      }
    );
  };

  return (
    <Fragment>
      <TablePage
        title={t("Auth.AidCategories.Title")}
        filters={filters}
        onSearch={onSearch}
        searchPlaceholder="بحث بـ اسم التصنيف"
        actionButtons={actionButtons}
        tableActions={(id?: string) => [
          {
            label: t("Global.Form.Labels.Edit"),
            icon: faEdit,
            spread: true,
            onClick: (data: string) => update(data),
          },
        ]}
        columns={columns}
        data={aidCategories}
        onGetData={getData}
        paginationMeta={paginationMeta}
        onPageChange={(page, capacity) => {
          getData({
            page,
            capacity,
          });
        }}
      />

      <AddAidCategory
        onGetData={getData}
        openModal={openModal}
        setOpenModal={setOpenModal}
        crudData={crudData}
      />
    </Fragment>
  );
};

export default AidCategoriesView;
