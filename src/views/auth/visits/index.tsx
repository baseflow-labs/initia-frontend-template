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
import { getVisitStatuses } from "../../../utils/optionDataLists/visits";
import {
  apiCatchGlobalHandler,
  booleanColorRender,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
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

  const getData = ({ filters = {}, page = 1, capacity = 10 }) => {
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

        return res;
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({ filters: {}, page: 1, capacity: 10 });

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
        getData({ filters: {}, page: 1, capacity: 10 });
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

  return (
    <Fragment>
      <TablePage
        title={t("Auth.Visits.Title")}
        filters={filters}
        tableActions={(id?: string) => {
          const visit = visits.find((v) => v.id === id);

          const final = [];

          const gotReport = !!visit?.visitReport;
          const cancelled = visit?.status === "Cancelled";

          if (gotReport) {
            final.push({
              icon: faNewspaper,
              spread: true,
              label: t("Auth.Visits.Report.ViewReport"),
              onClick: (id: string) =>
                navigate("/visitSchedule/report/details/?id=" + id),
            });
          } else {
            if (user.role !== "hod") {
              final.push({
                icon: faEdit,
                spread: true,
                label: t("Auth.Visits.Report.AddReport"),
                onClick: (id: string) =>
                  navigate("/visitSchedule/report?id=" + id),
              });
            }

            if (!cancelled) {
              final.push({
                icon: faXmark,
                label: t("Auth.Visits.CancelVisit"),
                onClick: (id: string) => cancelVisit(id),
              });
            }
          }

          return final;
        }}
        actionButtons={user.role !== "hod" ? actionButtons : undefined}
        columns={columns}
        data={visits}
        onGetData={getData}
        onPageChange={(page, capacity) => {
          getData({ filters: currentFilters, page, capacity });
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
