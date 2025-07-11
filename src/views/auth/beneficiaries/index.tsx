import {
  faCalendarDays,
  faUser,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import TablePage from "../../../layouts/auth/pages/tablePage";
import {
  getBeneficiaryCategories,
  getHomeTypes,
  getNationalities,
  getProvinces,
} from "../../../utils/optionDataLists/beneficiaries";
import { apiCatchGlobalHandler } from "../../../utils/function";
import CancelMembership from "./cancelMembership";

const BeneficiariesView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [cancelModalOpen, setCancelModalOpen] = useState<string | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<
    { id: string; status: string; fullName: string }[]
  >([]);
  const [currentFilters, setCurrentFilters] = useState({});

  const getData = ({ filters = {}, page = 1, capacity = 10 }) => {
    setCurrentFilters(filters);

    return BeneficiaryApi.getAll({
      filters: { ...filters, "membershipStatuses.status": "Accepted" } as any,
      page,
      capacity,
    })
      .then((res: any) => {
        setBeneficiaries(
          res.payload.map(
            ({ contactsBank = {}, housing = {}, status = {}, ...rest }) => ({
              ...contactsBank,
              ...housing,
              ...status,
              ...rest,
            })
          )
        );

        return res;
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({ filters: {}, page: 1, capacity: 10 });
  }, []);

  const nationalities = getNationalities(t);

  const provinces = getProvinces(t);

  const homeTypes = getHomeTypes(t);

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
      name: "fullName",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
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
      type: "select",
      options: homeTypes,
      name: "homeType",
      label: t("Auth.MembershipRegistration.Form.HomeType.Title"),
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
    console.log({ e });
  };

  return (
    <Fragment>
      <TablePage
        title={t("Auth.Beneficiaries.Title")}
        filters={filters}
        // actionButtons={actionButtons}
        columns={columns}
        onSearch={onSearch}
        searchPlaceholder="بحث بـ اسم المستفيد أو رقم الهاتف أو رقم الهوية"
        data={beneficiaries}
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
          getData({ filters: currentFilters, page, capacity });
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
