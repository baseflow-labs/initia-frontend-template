import {
  faCheck,
  faCheckSquare,
  faCircle,
  faXmark,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as VisitApi from "../../../api/visits/visits";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { viewDateFormat, viewDayFormat } from "../../../utils/consts";
import { getVisitStatuses } from "../../../utils/optionDataLists/visits";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../store/actions/notifications";

const BeneficiariesVisitsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [visits, setVisits] = useState([{ id: "", status: "", date: "" }]);
  const [currentFilters, setCurrentFilters] = useState({});
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
  }) => {
    setCurrentFilters(filters);

    return VisitApi.getAll({ filters, page, capacity })
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
  }, []);

  const statuses = getVisitStatuses(t);

  const filters = [
    {
      label: t("Auth.Visits.Statuses.Status"),
      options: statuses,
      name: "status",
    },
  ];

  const columns = [
    {
      type: "date",
      name: "date",
      timestampFormat: viewDayFormat,
      label: t("Auth.Visits.VisitDate"),
    },
    {
      type: "date",
      name: "date",
      timestampFormat: viewDateFormat,
      label: t("Auth.Visits.VisitDate"),
    },
    // {
    //   type: "time",
    //   name: "time",
    //   label: t("Auth.Visits.VisitTime"),
    // },
    {
      type: "text",
      name: "reason",
      label: t("Auth.Visits.VisitPurpose"),
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

  const acceptVisitStatus = (data: string, label: string) => {
    VisitApi.accept(data)
      .then(() => {
        getData({});
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Visits.AcceptVisit"),
              data: label,
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  const delayVisitStatus = (data: string, label: string) => {
    VisitApi.delay(data)
      .then(() => {
        getData({});
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Visits.DelayVisit"),
              data: label,
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <TablePage
      title={t("Auth.Visits.Visits")}
      filters={filters}
      tableActions={(id?: string) => {
        const row = visits.find((v) => v.id === id);

        return [
          {
            icon: faXmarkSquare,
            color: "danger",
            spread: true,
            disabled: !["Pending"].includes(row?.status || ""),
            disabledMsg: t("Auth.Visits.DelayedAlready"),
            label: t("Auth.Visits.DelayVisit"),
            onClick: (data: string) => delayVisitStatus(data, row?.date || ""),
          },
          {
            icon: faCheckSquare,
            color: "success",
            spread: true,
            disabled: !["Pending"].includes(row?.status || ""),
            disabledMsg: t("Auth.Visits.AcceptedAlready"),
            label: t("Auth.Visits.AcceptVisit"),
            onClick: (data: string) => acceptVisitStatus(data, row?.date || ""),
          },
        ];
      }}
      columns={columns}
      data={visits}
      paginationMeta={paginationMeta}
      onGetData={getData}
      onPageChange={(page, capacity) => {
        getData({ page, capacity });
      }}
    />
  );
};

export default BeneficiariesVisitsView;
