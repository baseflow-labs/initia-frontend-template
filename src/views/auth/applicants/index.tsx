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
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/tablePage";
import { logout } from "../../../store/actions/auth";
import { addNotification } from "../../../store/actions/notifications";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";

const ApplicantsView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [beneficiaries, setBeneficiaries] = useState<
    { id: string; status: string; fullName: string }[]
  >([]);
  const [rejectModalOpen, setRejectModalOpen] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState({});

  const onSearch = ({ filters = {}, page = 1, capacity = 10 }) => {
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

        return res;
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    onSearch({ filters: {}, page: 1, capacity: 10 });
  }, []);

  const title = t("Auth.Beneficiaries.Applications");

  const nationalities = [
    {
      value: "Saudi",
      label: t("Auth.MembershipRegistration.Form.Nationality.Saudi"),
    },
    {
      value: "Non Saudi",
      label: t("Auth.MembershipRegistration.Form.Nationality.NonSaudi"),
    },
  ];

  const provinces = [
    {
      value: "Riyadh",
      label: t("Auth.MembershipRegistration.Form.Province.Riyadh"),
    },
    {
      value: "Makkah",
      label: t("Auth.MembershipRegistration.Form.Province.Makkah"),
    },
    {
      value: "Madinah",
      label: t("Auth.MembershipRegistration.Form.Province.Madinah"),
    },
    {
      value: "Eastern Province",
      label: t("Auth.MembershipRegistration.Form.Province.Eastern Province"),
    },
    {
      value: "Asir",
      label: t("Auth.MembershipRegistration.Form.Province.Asir"),
    },
    {
      value: "Tabuk",
      label: t("Auth.MembershipRegistration.Form.Province.Tabuk"),
    },
    {
      value: "Hail",
      label: t("Auth.MembershipRegistration.Form.Province.Hail"),
    },
    {
      value: "Northern Borders",
      label: t("Auth.MembershipRegistration.Form.Province.NorthernBorders"),
    },
    {
      value: "Jazan",
      label: t("Auth.MembershipRegistration.Form.Province.Jazan"),
    },
    {
      value: "Najran",
      label: t("Auth.MembershipRegistration.Form.Province.Najran"),
    },
    {
      value: "Al-Bahah",
      label: t("Auth.MembershipRegistration.Form.Province.AlBahah"),
    },
    {
      value: "Al-Jawf",
      label: t("Auth.MembershipRegistration.Form.Province.AlJawf"),
    },
    {
      value: "Al-Qassim",
      label: t("Auth.MembershipRegistration.Form.Province.AlQassim"),
    },
  ];

  const homeTypes = [
    {
      value: "Apartment",
      label: t("Auth.MembershipRegistration.Form.HomeType.Apartment"),
    },
    {
      value: "Villa",
      label: t("Auth.MembershipRegistration.Form.HomeType.Villa"),
    },
    {
      value: "Independent Home",
      label: t("Auth.MembershipRegistration.Form.HomeType.IndependentHome"),
    },
    {
      value: "Folk House",
      label: t("Auth.MembershipRegistration.Form.HomeType.FolkHouse"),
    },
    {
      value: "Room(s) in Shared House",
      label: t("Auth.MembershipRegistration.Form.HomeType.SharedHouse"),
    },
    {
      value: "Roof",
      label: t("Auth.MembershipRegistration.Form.HomeType.Roof"),
    },
    {
      value: "Caravan",
      label: t("Auth.MembershipRegistration.Form.HomeType.Caravan"),
    },
    {
      value: "Incomplete Building",
      label: t("Auth.MembershipRegistration.Form.HomeType.IncompleteBuilding"),
    },
    {
      value: "No Permanent Home",
      label: t("Auth.MembershipRegistration.Form.HomeType.NoPermanentHome"),
    },
  ];

  const statuses = [
    {
      value: "New Member",
      label: t("Auth.MembershipRegistration.Statuses.NewMember"),
    },
    {
      value: "Incomplete",
      label: t("Auth.MembershipRegistration.Statuses.Incomplete"),
    },
    {
      value: "Need Help",
      label: t("Auth.MembershipRegistration.Statuses.NeedHelp"),
    },
    {
      value: "Rejected",
      label: t("Auth.MembershipRegistration.Statuses.Rejected"),
    },
    {
      value: "Reviewed",
      label: t("Auth.MembershipRegistration.Statuses.Reviewed"),
    },
    {
      value: "Cancelled",
      label: t("Auth.MembershipRegistration.Statuses.Cancelled"),
    },
    {
      value: "In Preview",
      label: t("Auth.MembershipRegistration.Statuses.InPreview"),
    },
  ];

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
      options: [
        {
          value: "A",
          label: t("Auth.MembershipRegistration.Form.Category.A"),
        },
        {
          value: "B",
          label: t("Auth.MembershipRegistration.Form.Category.B"),
        },
        {
          value: "C",
          label: t("Auth.MembershipRegistration.Form.Category.C"),
        },
        {
          value: "D",
          label: t("Auth.MembershipRegistration.Form.Category.D"),
        },
        {
          value: "Uncategorized",
          label: t("Auth.MembershipRegistration.Form.Category.Uncategorized"),
        },
        {
          value: "Above Grading",
          label: t("Auth.MembershipRegistration.Form.Category.AboveGrading"),
        },
      ],
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

          onSearch({ filters: {}, page: 1, capacity: 10 });
        });
  };

  return (
    <Fragment>
      <TablePage
        title={title}
        filters={filters}
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
                    onSearch({ filters: {}, page: 1, capacity: 10 });
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
        onSearch={onSearch}
        onPageChange={(page, capacity) => {
          onSearch({ filters: currentFilters, page, capacity });
        }}
      />

      <Modal
        title={t("Auth.Beneficiaries.Profile.RejectApplication")}
        onClose={() => setRejectModalOpen(null)}
        isOpen={!!rejectModalOpen}
      >
        <Form
          inputs={() => [
            {
              label: t("Auth.Beneficiaries.Profile.ApplicationRejectReason"),
              name: "reason",
              type: "textarea",
              required: true,
              rows: 3,
            },
          ]}
          customButtons={
            <Button
              outline
              onClick={() => setRejectModalOpen(null)}
              className="w-50"
            >
              Back
            </Button>
          }
          submitText={t("Auth.Beneficiaries.Profile.RejectApplication")}
          onFormSubmit={(e) => {
            BeneficiaryApi.reject(rejectModalOpen || "", e)
              .then(() => {
                dispatch(
                  addNotification({
                    msg: t("Global.Form.SuccessMsg", {
                      action: t("Auth.Beneficiaries.Profile.RejectApplication"),
                      data: beneficiaries.find((b) => b.id === rejectModalOpen)
                        ?.fullName,
                    }),
                  })
                );
                onSearch({ filters: {}, page: 1, capacity: 10 });
                setRejectModalOpen(null);
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      </Modal>
    </Fragment>
  );
};

export default ApplicantsView;
