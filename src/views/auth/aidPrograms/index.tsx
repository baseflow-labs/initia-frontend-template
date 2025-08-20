import { faCheck, faCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidCategoriesApi from "../../../api/aids/aidCategories";
import * as AidProgramApi from "../../../api/aids/aidPrograms";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import {
  getAidProgramStatuses,
  getAidProgramTypes,
} from "../../../utils/optionDataLists/aids";
import AddAidProgram from "./createAidProgram";

const AidProgramsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);
  const [aidPrograms, setAidPrograms] = useState<
    { id: string; name: string; status: string }[]
  >([]);
  const [aidCategories, setAidCategories] = useState<
    { id: string; name: string; type: string; reapply: string }[]
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

    return AidProgramApi.getAll({ filters, page, capacity })
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

    AidCategoriesApi.getAll({})
      .then((res: any) => {
        setAidCategories(res.payload);
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const aidProgramTypes = getAidProgramTypes(t);

  const statuses = getAidProgramStatuses(t);

  const filters = [
    {
      label: t("Auth.AidPrograms.AidProgramType"),
      options: aidProgramTypes,
      name: "type",
    },
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

  const openLabel = t("Auth.AidPrograms.Statuses.Open");
  const closedLabel = t("Auth.AidPrograms.Statuses.Close");

  const updateStatus = (id: string, status: string) => {
    AidProgramApi.updateStatus(id, status)
      .then(() => {
        const aidProgram = aidPrograms.find(
          (aidProgram) => aidProgram.id === id
        );
        getData({});
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: status === "Opened" ? openLabel : closedLabel,
              data: aidPrograms.find(({ id }) => id === aidProgram?.id)?.name,
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ page: 1, capacity: 10, search: e });
  };

  return (
    <Fragment>
      <TablePage
        title={t("Auth.AidPrograms.Title")}
        filters={filters}
        onSearch={onSearch}
        searchPlaceholder="بحث بـ اسم المستفيد"
        actionButtons={actionButtons}
        tableActions={(id?: string) => {
          const aidProgram = aidPrograms.find((a) => a.id === id);

          const closed = aidProgram?.status === "Closed";
          const opened = aidProgram?.status === "Opened";

          return [
            {
              label: t("Auth.AidPrograms.Statuses.Close"),
              icon: faXmark,
              spread: false,
              onClick: (data: string) =>
                !closed
                  ? updateStatus(data, "Closed")
                  : dispatch(
                      addNotification({
                        msg: t("Auth.AidPrograms.CantCloseAlready"),
                      })
                    ),
            },
            {
              label: t("Auth.AidPrograms.Statuses.Open"),
              icon: faCheck,
              spread: false,
              onClick: (data: string) =>
                !opened
                  ? updateStatus(data, "Opened")
                  : dispatch(
                      addNotification({
                        msg: t("Auth.AidPrograms.CantOpenAlready"),
                      })
                    ),
            },
          ];
        }}
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
      />
    </Fragment>
  );
};

export default AidProgramsView;
