import CancelMembership from "./cancelMembership";
import {
  faCalendarDays,
  faFileExcel,
  faHome,
  faUser,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import DemoLoginNote from "../../../layouts/auth/demoLoginNote";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { exportDataToSingleSheetExcel } from "../../../utils/filesExport";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
} from "../../../utils/function";
import {
  getBeneficiaryCategories,
  getGenders,
  getNationalities,
  getProvinces,
} from "../../../utils/optionDataLists/beneficiaries";
import { downloadNationalReport } from "./excelExport";
import { useAppSelector } from "../../../store/hooks";

const BeneficiariesView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [cancelModalOpen, setCancelModalOpen] = useState<string | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<
    { id: string; status: string; fileNo: string; fullName: string }[]
  >([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSearch, setCurrentSearch] = useState("");
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    capacity: 10,
    count: 0,
    pagesCount: 1,
  });

  const { user } = useAppSelector((state) => state.auth);
  const isResearcher = user.role === "researcher";
  const isHod = user.role === "hod";
  const isResearcherOrHod = isResearcher || isHod;

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
        field: "fullName",
        filteredTerm: {
          dataType: "string",
          value: search,
        },
        filterOperator: "contains",
      });
    }

    return BeneficiaryApi.getAll({
      filters: { ...filters, "membershipStatuses.status": "Accepted" } as any,
      page,
      capacity,
      customFilters,
    })
      .then((res: any) => {
        setBeneficiaries(
          res.payload.map(
            ({ contactsBank = {}, housing = [{}], status = {}, ...rest }) => ({
              ...contactsBank,
              housing,
              ...status,
              ...rest,
            })
          )
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

  const nationalities = getNationalities(t);

  const provinces = getProvinces(t);

  const filters = [
    {
      label: t("Auth.MembershipRegistration.Form.Nationality.Title"),
      options: nationalities,
      name: "nationality",
    },
    {
      label: t("Auth.MembershipRegistration.Form.Province.Title"),
      options: provinces,
      name: "housing=>province",
    },
  ];

  const columns = [
    {
      type: "text",
      name: "fileNo",
      label: t("Auth.MembershipRegistration.Form.FileNo"),
    },
    {
      type: "numberText",
      name: "idNumber",
      label: t("Auth.MembershipRegistration.Form.IdNumber"),
    },
    {
      type: "select",
      options: nationalities,
      name: "nationality",
      label: t("Auth.MembershipRegistration.Form.Nationality.Title"),
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
      render: (row: any) =>
        row.housing.map((house: any, i: number) => (
          <div key={i}>
            <FontAwesomeIcon className="text-info" icon={faHome} />{" "}
            {house.city + " - " + house.district}
          </div>
        )),
    },
    {
      type: "select",
      options: getBeneficiaryCategories(t),
      name: "category",
      label: t("Auth.MembershipRegistration.Form.Category.Title"),
    },
    // {
    //   type: "custom",
    //   render: (row: any) => (
    //     <Fragment>
    //       <FontAwesomeIcon
    //         icon={faCircle}
    //         className={`text-${statusColorRender(row.status)}`}
    //       />{" "}
    //       {renderDataFromOptions(row.status, statuses)}
    //     </Fragment>
    //   ),
    //   name: "status",
    //   label: t("Auth.MembershipRegistration.Statuses.Status"),
    // },
  ];

  const viewProfile = (data: string) => {
    navigate(`/profile/?id=${data}`);
  };

  const scheduleVisit = (data: string) => {
    navigate(`/visitSchedule/?id=${data}`);
  };

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ page: 1, capacity: 10, search: e });
  };

  const actionButtons = [
    {
      tooltip: t("Auth.Beneficiaries.DownloadByNationalCenterForm"),
      label: <FontAwesomeIcon icon={faFileExcel} />,
      color: "success",
      outline: true,
      onClick: () => downloadNationalReport(t, beneficiaries),
    },
  ];

  return (
    <Fragment>
      <DemoLoginNote />

      <TablePage
        title={t("Auth.Beneficiaries.Title")}
        filters={filters}
        actionButtons={actionButtons}
        columns={
          isResearcherOrHod
            ? [
                {
                  type: "text",
                  name: "fullName",
                  label: t("Auth.Beneficiaries.BeneficiaryName"),
                },
                ...columns,
              ]
            : columns
        }
        onSearch={onSearch}
        searchPlaceholder={t("Auth.Beneficiaries.SearchBarPlaceholder")}
        data={beneficiaries}
        paginationMeta={paginationMeta}
        tableActions={(id?: string) => [
          {
            icon: faUser,
            label: t("Auth.Beneficiaries.Profile.ProfileDetails"),
            onClick: (data: string) => viewProfile(data),
          },
          {
            icon: faCalendarDays,
            spread: true,
            label: t("Auth.Visits.AddVisit"),
            onClick: (data: string) => scheduleVisit(data),
          },
          {
            icon: faUserMinus,
            label: t("Auth.Beneficiaries.Profile.CancelMembership"),
            onClick: (data: string) => setCancelModalOpen(data),
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

      <CancelMembership
        beneficiaries={beneficiaries}
        modelOpen={cancelModalOpen}
        setModalOpen={setCancelModalOpen}
        onGetData={getData}
      />
    </Fragment>
  );
};

export default BeneficiariesView;
