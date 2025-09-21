import {
  faCheckSquare,
  faCircle,
  faEdit,
  faHome,
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
import DemoLoginNote from "../../../layouts/auth/demoLoginNote";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
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
import RegisterApplicant from "./registerApplicant";
import RejectApplicant from "./rejectApplicant";

const ApplicantsView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [beneficiaries, setBeneficiaries] = useState<
    { id: string; status: string; fileNo: string; fullName: string }[]
  >([]);
  const [rejectModalOpen, setRejectModalOpen] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSearch, setCurrentSearch] = useState("");
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    capacity: 10,
    count: 0,
    pagesCount: 1,
  });

  const { user } = useAppSelector((state) => state.auth);
  const isResearcher = user.role === "researcher";
  const isHod = user.role === "hod";
  const isCeo = user.role === "ceo";
  const isResearcherOrHodOrCeo = isResearcher || isHod || isCeo;

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
                housing = [{}],
                status = {},
                ...rest
              }) => ({
                ...contactsBank,
                housing,
                ...status,
                ...rest,
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
  }, []);

  const nationalities = getNationalities(t);

  const provinces = getProvinces(t);

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
      onClick: () => setOpenRegisterModal(true),
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
      : BeneficiaryApi.remove(id)
          .then(() => {
            dispatch(
              addNotification({
                msg: t("Global.Form.SuccessMsg", {
                  action: t("Auth.Beneficiaries.Profile.DeleteBeneficiary"),
                  data: beneficiaries.find((b) => b.id === id)?.fileNo,
                }),
              })
            );

            getData({});
          })
          .catch(apiCatchGlobalHandler);
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
        onSearch={onSearch}
        searchPlaceholder={t("Auth.Beneficiaries.SearchBarPlaceholder")}
        actionButtons={actionButtons}
        columns={
          isResearcherOrHodOrCeo
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
        data={beneficiaries}
        paginationMeta={paginationMeta}
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
                            ?.fileNo,
                        }),
                      })
                    );
                    getData({});
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
            page,
            capacity,
          });
        }}
      />

      <RegisterApplicant
        openModal={openRegisterModal}
        setOpenModal={setOpenRegisterModal}
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
