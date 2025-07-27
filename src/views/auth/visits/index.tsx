import {
  faCircle,
  faEdit,
  faNewspaper,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as VisitApi from "../../../api/visits/visits";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { viewDayDateFormat } from "../../../utils/consts";
import {
  apiCatchGlobalHandler,
  booleanColorRender,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import { getVisitStatuses } from "../../../utils/optionDataLists/visits";
import ScheduleVisit from "./scheduleVisit";

const VisitsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAppSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);

  const [selectOptions, setSelectOptions] = useState({
    beneficiaries: [{ id: "", fullName: "" }],
  });
  const [visits, setVisits] = useState<
    { id: string; visitReport: object; status: string }[]
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
        field: "beneficiary.fullName",
        filteredTerm: {
          dataType: "string",
          value: search,
        },
        filterOperator: "contains",
      });
    }

    return VisitApi.getAll({ filters, page, capacity, customFilters })
      .then((res: any) => {
        setVisits(
          res.payload.map(
            ({
              beneficiary = {
                contactsBank: {},
                housing: {},
                user: { username: "" },
              },
              ...rest
            }) => ({
              beneficiaryMobile: beneficiary.user.username,
              ...beneficiary.housing,
              ...beneficiary.contactsBank,
              ...beneficiary,
              ...rest,
            })
          ) as any
        );

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

    BeneficiaryApi.getAll({})
      .then((res: any) =>
        setSelectOptions((current) => ({
          ...current,
          beneficiaries: res.payload,
        }))
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  useEffect(() => {
    if (searchParams.get("id")) {
      setOpenModal(true);
    }
  }, [searchParams.get("id")]);

  const statuses = getVisitStatuses(t);

  const surprise = [
    {
      value: "No",
      label: t("Auth.Visits.Surprise.No"),
    },
    {
      value: "Yes",
      label: t("Auth.Visits.Surprise.Yes"),
    },
  ];

  const filters = [
    {
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      options: selectOptions.beneficiaries.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
      })),
      name: "beneficiary",
    },
    {
      label: t("Auth.Visits.Statuses.Status"),
      options: statuses,
      name: "status",
    },
  ];

  const columns = [
    {
      type: "text",
      name: "fullName",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
    },
    {
      type: "date",
      name: "date",
      timestampFormat: viewDayDateFormat,
      label: t("Auth.Visits.VisitDate"),
    },
    {
      type: "time",
      name: "time",
      label: t("Auth.Visits.VisitTime"),
    },
    {
      type: "phoneNumber",
      name: "beneficiaryMobile",
      label: t("Global.Labels.PhoneNumber"),
    },
    {
      type: "custom",
      name: "city",
      label: t("Auth.MembershipRegistration.Address"),
      render: (row: any) => row.city + " - " + row.district,
    },
    {
      type: "custom",
      render: (row: any) => (
        <Fragment>
          <FontAwesomeIcon
            icon={faCircle}
            className={`text-${booleanColorRender(row.surprise)}`}
          />{" "}
          {renderDataFromOptions(
            row.surprise ? "Yes" : "No",
            surprise.map(({ value, label }) => ({
              label,
              value: value,
            }))
          )}
          {}
        </Fragment>
      ),
      name: "surprise",
      label: t("Auth.Visits.Surprise.Title"),
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
      label: t("Auth.Visits.Statuses.Status"),
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.Visits.AddVisit"),
      onClick: () => setOpenModal(true),
    },
  ];

  const cancelVisit = (data: string) => {
    VisitApi.cancel(data)
      .then(() => {
        getData({});
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Visits.CancelVisit"),
              data: selectOptions.beneficiaries.find(({ id }) => id === data)
                ?.fullName,
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
        title={t("Auth.Visits.Title")}
        onSearch={onSearch}
        searchPlaceholder="بحث بـ اسم المستفيد"
        filters={filters}
        tableActions={(id?: string) => {
          const visit = visits.find((v) => v.id === id);

          const gotReport = !!visit?.visitReport;
          const cancelled = visit?.status === "Cancelled";

          const showReportsAdd = user.role === "researcher";

          const final = [
            {
              icon: faNewspaper,
              spread: true,
              label: t("Auth.Visits.Report.ViewReport"),
              onClick: (id: string) =>
                gotReport
                  ? navigate("/visitSchedule/report/details/?id=" + id)
                  : dispatch(
                      addNotification({
                        msg: showReportsAdd
                          ? t("Auth.Visits.Report.PleaseAddReportFirst")
                          : t("Auth.Visits.Report.NoReportToView"),
                        type: "err",
                      })
                    ),
            },
          ];

          if (showReportsAdd) {
            final.push({
              icon: faEdit,
              spread: true,
              label: t("Auth.Visits.Report.AddReport"),
              onClick: (id: string) =>
                gotReport
                  ? dispatch(
                      addNotification({
                        msg: t("Auth.Visits.Report.ReportAddedAlready"),
                        type: "err",
                      })
                    )
                  : user.role === "hod"
                  ? dispatch(
                      addNotification({
                        msg: t("Auth.Visits.Report.OnlyResearchersCouldAdd"),
                        type: "err",
                      })
                    )
                  : navigate("/visitSchedule/report?id=" + id),
            });
          }

          final.push({
            icon: faXmark,
            spread: false,
            label: t("Auth.Visits.CancelVisit"),
            onClick: (id: string) =>
              cancelled
                ? dispatch(
                    addNotification({
                      msg: t("Auth.Visits.VisitCancelledAlready"),
                    })
                  )
                : cancelVisit(id),
          });

          return final;
        }}
        actionButtons={user.role !== "hod" ? actionButtons : undefined}
        columns={columns}
        data={visits}
        onGetData={getData}
        paginationMeta={paginationMeta}
        onPageChange={(page, capacity) => {
          getData({
            page,
            capacity,
          });
        }}
      />

      <ScheduleVisit
        onGetData={getData}
        selectOptions={selectOptions}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Fragment>
  );
};

export default VisitsView;
