import {
  faCheckSquare,
  faCircle,
  faEdit,
  faSearch,
  faTrash,
  faUser,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { logout } from "../../../store/actions/auth";
import { addNotification } from "../../../store/actions/notifications";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import {
  getBeneficiaryCategories,
  getBeneficiaryStatuses,
  getHomeTypes,
  getNationalities,
  getProvinces,
} from "../../../utils/optionDataLists/beneficiaries";
import RejectApplicant from "./rejectApplicant";

const ApplicantsView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [beneficiaries, setBeneficiaries] = useState<
    { id: string; status: string; fullName: string }[]
  >([]);
  const [rejectModalOpen, setRejectModalOpen] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSearch, setCurrentSearch] = useState("");

  const getData = ({ filters = {}, page = 1, capacity = 10, search = "" }) => {
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
              ({ contactsBank = {}, housing = {}, status = {}, ...rest }) => ({
                ...contactsBank,
                ...housing,
                ...status,
                ...rest,
              })
            )
            .filter(({ status = "" }) => status !== "Accepted") as any
        );

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
    getData({
      filters: currentFilters,
      page: 1,
      capacity: 10,
      search: currentSearch,
    });
  }, []);

  const nationalities = getNationalities(t);

  const provinces = getProvinces(t);

  const homeTypes = getHomeTypes(t);

  const statuses = getBeneficiaryStatuses(t);

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

  const completeProfile = (data: string) => {
    navigate(`/apply/?id=${data}`);
  };

  const viewProfile = (data: string) => {
    navigate(`/profile/?id=${data}`);
  };

  const reviewProfile = (data: string) => {
    navigate(`/review/?id=${data}`);
  };

  const actionButtons = [
    {
      label: t("Auth.Beneficiaries.AddBeneficiary"),
      onClick: () => dispatch(logout("/register")),
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

          getData({
            filters: currentFilters,
            page: 1,
            capacity: 10,
            search: currentSearch,
          });
        });
  };

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ filters: currentFilters, page: 1, capacity: 10, search: e });
  };

  return (
    <Fragment>
      <TablePage
        title={t("Auth.Beneficiaries.Applications")}
        filters={filters}
        onSearch={onSearch}
        searchPlaceholder="بحث بـ اسم المستفيد"
        actionButtons={actionButtons}
        columns={columns}
        data={beneficiaries}
        tableActions={(id?: string) => {
          const row = beneficiaries.find((b) => b.id === id);

          return [
            {
              icon: faUser,
              label: t("Auth.Beneficiaries.Profile.ProfileDetails"),
              onClick: (data: string) => viewProfile(data),
            },
            {
              icon: faEdit,
              disabled: !["Incomplete", "Need Help"].includes(
                row?.status || ""
              ),
              disabledMsg: t(
                "Auth.Beneficiaries.Profile.ProfileCompletionDisabledMsg"
              ),
              label: t("Auth.Beneficiaries.Profile.ProfileCompletion"),
              onClick: (data: string) => completeProfile(data),
            },
            {
              icon: faSearch,
              disabled: ![
                "New Member",
                "In Preview",
                "Cancelled",
                "Reviewed",
              ].includes(row?.status || ""),
              disabledMsg: t(
                "Auth.Beneficiaries.Profile.ProfileReviewDisabledMsg"
              ),
              label: t("Auth.Beneficiaries.Profile.ProfileReview"),
              onClick: (data: string) => reviewProfile(data),
            },
            {
              icon: faXmarkSquare,
              color: "danger",
              spread: true,
              disabled: ["Cancelled", "Rejected"].includes(row?.status || ""),
              disabledMsg: t(
                "Auth.Beneficiaries.Profile.RejectApplicationDisabledMsg"
              ),
              label: t("Auth.Beneficiaries.Profile.RejectApplication"),
              onClick: (data: string) => setRejectModalOpen(data),
            },
            {
              icon: faCheckSquare,
              color: "success",
              spread: true,
              disabled: !["Reviewed", "Cancelled", "Rejected"].includes(
                row?.status || ""
              ),
              disabledMsg: t(
                "Auth.Beneficiaries.Profile.AcceptApplicationDisabledMsg"
              ),
              label: t("Auth.Beneficiaries.Profile.AcceptApplication"),
              onClick: (data: string) =>
                BeneficiaryApi.accept(data)
                  .then(() => {
                    dispatch(
                      addNotification({
                        msg: t("Global.Form.SuccessMsg", {
                          action: t(
                            "Auth.Beneficiaries.Profile.AcceptApplication"
                          ),
                          data: beneficiaries.find((b) => b.id === data)
                            ?.fullName,
                        }),
                      })
                    );
                    getData({
                      filters: currentFilters,
                      page: 1,
                      capacity: 10,
                      search: currentSearch,
                    });
                    setRejectModalOpen(null);
                  })
                  .catch(apiCatchGlobalHandler),
            },
            {
              icon: faTrash,
              label: t("Auth.Beneficiaries.Profile.DeleteApplication"),
              onClick: (data: string) => deleteBeneficiary(data),
            },
          ];
        }}
        onGetData={getData}
        onPageChange={(page, capacity) => {
          getData({
            filters: currentFilters,
            page,
            capacity,
            search: currentSearch,
          });
        }}
      />

      <RejectApplicant
        beneficiaries={beneficiaries}
        onGetData={getData}
        openModal={rejectModalOpen}
        setOpenModal={setRejectModalOpen}
      />
    </Fragment>
  );
};

export default ApplicantsView;
