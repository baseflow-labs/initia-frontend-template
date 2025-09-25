import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as BeneficiaryCategoryApi from "../../../api/profile/beneficiaryCategory";
import DemoLoginNote from "../../../layouts/auth/demoLoginNote";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { BeneficiaryCategory } from "../../../types/beneficiaries";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
} from "../../../utils/function";
import AddBeneficiaryCategories from "./addBeneficiaryCategory";
import { faEdit, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addNotification } from "../../../store/actions/notifications";
import { useDispatch } from "react-redux";

const BeneficiaryCategoriesView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState<BeneficiaryCategory | null>(null);
  const [beneficiaryCategories, setBeneficiaryCategories] = useState<
    BeneficiaryCategory[]
  >([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSearch, setCurrentSearch] = useState("");
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

    return BeneficiaryCategoryApi.getAll({
      filters,
      page,
      capacity,
      customFilters,
    })
      .then((res: any) => {
        setBeneficiaryCategories(res.payload);

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

  const columns = [
    {
      type: "text",
      name: "name",
      label: t("Auth.Beneficiaries.Profile.CategoryXName", { index: "" }),
    },
    {
      type: "number",
      name: "minIncome",
      label: t("Auth.Beneficiaries.Profile.CategoryXMinimum", { index: "" }),
    },
    {
      type: "number",
      name: "maxIncome",
      label: t("Auth.Beneficiaries.Profile.CategoryXMaximum", { index: "" }),
    },
  ];

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ page: 1, capacity: 10, search: e });
  };

  const actionButtons = [
    {
      label: t("Auth.BeneficiaryCategories.AddBeneficiaryCategory"),
      onClick: () =>
        setOpenModal({
          id: "",
          name: "",
          minIncome: 0,
          maxIncome: 0,
        }),
    },
  ];

  return (
    <Fragment>
      <DemoLoginNote />

      <TablePage
        title={t("Auth.BeneficiaryCategories.Title")}
        actionButtons={actionButtons}
        columns={columns}
        onSearch={onSearch}
        searchPlaceholder={t("Auth.BeneficiaryCategories.SearchBarPlaceholder")}
        data={beneficiaryCategories}
        paginationMeta={paginationMeta}
        tableActions={(id?: string) => [
          {
            icon: faEdit,
            label: t("Global.Form.Labels.Edit"),
            spread: true,
            onClick: (id: string) =>
              setOpenModal(
                beneficiaryCategories?.find((u) => u.id === id) || {
                  id: "",
                  name: "",
                  minIncome: 0,
                  maxIncome: 0,
                }
              ),
          },
          {
            icon: faTrash,
            label: t("Global.Form.Labels.Delete"),
            spread: true,
            onClick: (id: string) =>
              BeneficiaryCategoryApi.remove(id)
                .then(() => {
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t(
                          "Auth.BeneficiaryCategories.DeleteBeneficiaryCategory"
                        ),
                        data: id,
                      }),
                    })
                  );
                  getData({});
                })
                .catch(apiCatchGlobalHandler),
          },
        ]}
        onGetData={getData}
        onPageChange={(page, capacity) => {
          getData({
            page,
            capacity,
          });
        }}
      />

      <AddBeneficiaryCategories
        openModal={openModal}
        setOpenModal={setOpenModal}
        getData={getData}
      />
    </Fragment>
  );
};

export default BeneficiaryCategoriesView;
