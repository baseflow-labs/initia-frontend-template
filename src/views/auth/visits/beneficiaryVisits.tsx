import { faCircle } from "@fortawesome/free-solid-svg-icons";
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

const BeneficiariesVisitsView = () => {
  const { t } = useTranslation();

  const [visits, setVisits] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});

  const onSearch = ({ filters = {}, page = 1, capacity = 10 }) => {
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
    onSearch({ filters: {}, page: 1, capacity: 10 });
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

  return (
    <TablePage
      title={t("Auth.Visits.Visits")}
      filters={filters}
      // tableActions={[
      //   // {
      //   //   icon: faEdit,
      //   //   spread: true,
      //   //   label: t("Global.Form.Labels.Edit"),
      //   //   onClick: (data: string) => editData(data),
      //   // },
      //   {
      //     icon: faXmark,
      //     label: t("Auth.Visits.CancelVisit"),
      //     onClick: (data: string) => cancelVisit(data),
      //   },
      // ]}
      columns={columns}
      data={visits}
      onSearch={onSearch}
      onPageChange={(page, capacity) => {
        onSearch({ filters: currentFilters, page, capacity });
      }}
    />
  );
};

export default BeneficiariesVisitsView;
