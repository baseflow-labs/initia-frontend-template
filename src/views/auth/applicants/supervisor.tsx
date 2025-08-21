import { faCircle, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as StaffApi from "../../../api/staff/researcher";
import DemoLoginNote from "../../../layouts/auth/demoLoginNote";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import {
  getBeneficiaryCategories,
  getBeneficiaryStatuses,
  getNationalities,
  getProvinces,
} from "../../../utils/optionDataLists/beneficiaries";
import AssignResearcher from "./assignResearcher";

const ApplicantsViewForSupervisor = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [beneficiaries, setBeneficiaries] = useState<
    {
      id: string;
      status: string;
      fullName: string;
      staff?: { id: string };
    }[]
  >([]);
  const [researchers, setResearchers] = useState<
    { id: string; status: string; fullName: string }[]
  >([]);
  const [assignResearcherModalOpen, setAssignResearcherModalOpen] = useState<
    { beneficiary: string; staff: string } | undefined
  >(undefined);
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

    const customFilters = [
      {
        field: "membershipStatuses.status",
        filteredTerm: {
          dataType: "string",
          value: "Accepted",
        },
        filterOperator: "stringNotEquals",
      },
    ];

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

    return BeneficiaryApi.getAll({ filters, page, capacity, customFilters })
      .then((res: any) => {
        setBeneficiaries(
          res.payload
            .map(
              ({
                contactsBank = {},
                housing = {},
                status: originalStatus = { status: "" },
                ...rest
              }) => ({
                ...contactsBank,
                ...housing,
                ...rest,
                researcher: rest.staff?.fullName,
                status: rest.staff
                  ? "Researcher Assigned"
                  : originalStatus.status,
              })
            )
            .filter(({ status = "" }) => status !== "Accepted") as any
        );

        if (res.extra) {
          setPaginationMeta({
            page: res.extra.page,
            capacity: res.extra.capacity,
            count: res.extra.count,
            pagesCount: res.extra.pagesCount,
          });
        }

        return {
          ...res,
          payload: res.payload.filter(
            ({ status = { status: "" } }) => status.status !== "Accepted"
          ) as any,
        };
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({});

    StaffApi.getAll({ capacity: 999 })
      .then((res: any) => {
        setResearchers(res.payload);
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const nationalities = getNationalities(t);

  const statuses = getBeneficiaryStatuses(t);

  const provinces = getProvinces(t);

  const filters = [
    {
      label: t("Auth.MembershipRegistration.Statuses.Status"),
      options: statuses,
      name: "membershipStatuses=>status",
    },
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
    // {
    //   type: "select",
    //   options: homeTypes,
    //   name: "homeType",
    //   label: t("Auth.MembershipRegistration.Form.HomeType.Title"),
    // },
    {
      type: "phoneNumber",
      name: "beneficiaryMobile",
      label: t("Global.Labels.PhoneNumber"),
    },
    // {
    //   type: "custom",
    //   name: "city",
    //   label: t("Auth.MembershipRegistration.Address"),
    //   render: (row: any) => row.city + " - " + row.district,
    // },
    {
      type: "select",
      options: getBeneficiaryCategories(t),
      name: "category",
      label: t("Auth.MembershipRegistration.Form.Category.Title"),
    },
    {
      type: "text",
      name: "researcher",
      label: t("Auth.Researchers.ResearcherName"),
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
      label: t("Auth.MembershipRegistration.Statuses.Status"),
    },
  ];

  const viewProfile = (data: string) => {
    navigate(`/profile/?id=${data}`);
  };

  const actionButtons = [
    {
      label: t("Auth.Beneficiaries.Profile.AssignResearcher"),
      onClick: () =>
        setAssignResearcherModalOpen({ beneficiary: "", staff: "" }),
    },
  ];

  const deleteBeneficiary = (id: string) => {
    process.env.REACT_APP_ENVIRONMENT === "staging"
      ? dispatch(
          addNotification({
            type: "err",
            msg: t("Global.Form.Labels.UnAvailableForDemoMode"),
          })
        )
      : BeneficiaryApi.remove(id).then(() => {
          dispatch(
            addNotification({
              msg: t("Global.Form.SuccessMsg", {
                action: t("Auth.Beneficiaries.Profile.DeleteBeneficiary"),
                data: beneficiaries.find((b) => b.id === id)?.fullName,
              }),
            })
          );

          getData({});
        });
  };

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ page: 1, capacity: 10, search: e });
  };

  return (
    <Fragment>
      <DemoLoginNote />

      <TablePage
        title={t("Auth.Beneficiaries.Applications")}
        filters={filters}
        actionButtons={actionButtons}
        columns={columns}
        data={beneficiaries}
        onSearch={onSearch}
        paginationMeta={paginationMeta}
        searchPlaceholder="بحث بـ اسم المستفيد"
        tableActions={() => [
          {
            icon: faUser,
            spread: true,
            label: t("Auth.Beneficiaries.Profile.AssignResearcher"),
            onClick: (data: string) =>
              setAssignResearcherModalOpen({
                beneficiary: data,
                staff:
                  beneficiaries.find((b) => b.id === data)?.staff?.id || "",
              }),
          },
          {
            icon: faUser,
            label: t("Auth.Beneficiaries.Profile.ProfileDetails"),
            onClick: (data: string) => viewProfile(data),
          },
          {
            icon: faTrash,
            label: t("Auth.Beneficiaries.Profile.DeleteApplication"),
            onClick: (data: string) => deleteBeneficiary(data),
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

      <AssignResearcher
        beneficiaries={beneficiaries}
        researchers={researchers}
        onGetData={getData}
        openModal={assignResearcherModalOpen}
        setOpenModal={setAssignResearcherModalOpen}
      />
    </Fragment>
  );
};

export default ApplicantsViewForSupervisor;
