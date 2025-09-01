import { faCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// import { useDispatch } from "react-redux";

import * as AidCategoriesApi from "../../../api/aids/aidCategories";
import * as AidProgramApi from "../../../api/aids/aidPrograms";
import TablePage from "../../../layouts/auth/pages/tablePage";
// import { AidCategory, AidProgram, defaultAidProgram } from "../../../store/actions/notifications";
import {
  AidCategory,
  AidProgram,
  defaultAidProgram,
} from "../../../types/aids";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import { getAidProgramStatuses } from "../../../utils/optionDataLists/aids";
import AddAidProgram from "./createAidProgram";

const AidProgramsView = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [aidPrograms, setAidPrograms] = useState<AidProgram[]>([]);
  const [crudData, setCrudData] = useState<AidProgram>(defaultAidProgram);
  const [aidCategories, setAidCategories] = useState<AidCategory[]>([]);
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

    return AidProgramApi.getAll({ filters, page, capacity, customFilters })
      .then((res: any) => {
        setAidPrograms(res.payload);

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

    AidCategoriesApi.getAll({ capacity: 999 })
      .then((res: any) => {
        setAidCategories(res.payload);
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const statuses = getAidProgramStatuses(t);

  const filters = [
    {
      label: t("Auth.MembershipRegistration.Statuses.Status"),
      options: statuses,
      name: "status",
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.AidPrograms.AddAidProgram"),
      onClick: () => setOpenModal(true),
    },
  ];

  const columns = [
    {
      type: "text",
      name: "name",
      label: t("Auth.AidPrograms.AidProgramName"),
    },
    {
      type: "custom",
      name: "aidCategory",
      label: t("Auth.AidCategories.AidCategory"),
      render: (row: any) => row.aidCategory?.name,
    },
    {
      type: "text",
      name: "sponsor",
      label: t("Auth.AidPrograms.Sponsor"),
    },
    {
      type: "number",
      name: "credit",
      label: t("Auth.AidPrograms.TotalCredit"),
    },
    {
      type: "text",
      name: "balance",
      label: t("Auth.AidPrograms.RemainingCredit"),
    },
    {
      type: "custom",
      render: (row: any) => (
        <Fragment>
          <FontAwesomeIcon
            icon={faCircle}
            className={`text-${statusColorRender(row.status)}`}
          />{" "}
          {renderDataFromOptions(row.status, statuses)}
        </Fragment>
      ),
      name: "status",
      label: t("Auth.AidPrograms.Statuses.Title"),
    },
  ];

  // const openLabel = t("Auth.AidPrograms.Statuses.Open");
  // const closedLabel = t("Auth.AidPrograms.Statuses.Close");

  // const updateStatus = (id: string, status: string) => {
  //   AidProgramApi.updateStatus(id, status)

  //     .then(() => {
  //       const aidProgram = aidPrograms.find(
  //         (aidProgram) => aidProgram.id === id
  //       );
  //       getData({});
  //       dispatch(
  //         addNotification({
  //           msg: t("Global.Form.SuccessMsg", {
  //             action: status === "Opened" ? openLabel : closedLabel,
  //             data: aidPrograms.find(({ id }) => id === aidProgram?.id)?.name,
  //           }),
  //         })
  //       );
  //     })
  //     .catch(apiCatchGlobalHandler);
  // };

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ page: 1, capacity: 10, search: e });
  };

  const update = (rowId: string) => {
    setOpenModal(true);
    const row = aidPrograms.find(({ id }) => id === rowId);

    if (row) {
      setCrudData(row);
    }
  };

  return (
    <Fragment>
      <TablePage
        title={t("Auth.AidPrograms.Title")}
        filters={filters}
        onSearch={onSearch}
        searchPlaceholder={t("Auth.AidPrograms.SearchBarPlaceholder")}
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
        data={aidPrograms}
        onGetData={getData}
        paginationMeta={paginationMeta}
        onPageChange={(page, capacity) => {
          getData({
            page,
            capacity,
          });
        }}
      />

      <AddAidProgram
        onGetData={getData}
        openModal={openModal}
        setOpenModal={setOpenModal}
        aidCategories={aidCategories}
        crudData={crudData}
      />
    </Fragment>
  );
};

export default AidProgramsView;
