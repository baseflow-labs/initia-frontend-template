import { faCircle, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as StaffApi from "../../../api/staff/researcher";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler, renderDataFromOptions, statusColorRender } from "../../../utils/function";

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

        return res;
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    onSearch({ filters: {}, page: 1, capacity: 10 });

    StaffApi.getAll({})
      .then((res: any) => {
        setResearchers(res.payload);
      })
      .catch(apiCatchGlobalHandler);
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
      value: "Researcher Assigned",
      label: t("Auth.MembershipRegistration.Statuses.ResearcherAssigned"),
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
        onSearch={onSearch}
        onPageChange={(page, capacity) => {
          onSearch({ filters: currentFilters, page, capacity });
        }}
      />

      <Modal
        title={t("Auth.Beneficiaries.Profile.AssignResearcher")}
        onClose={() => setAssignResearcherModalOpen(undefined)}
        isOpen={!!assignResearcherModalOpen}
      >
        {assignResearcherModalOpen && (
          <Form
            inputs={() => [
              {
                label: t("Auth.Beneficiaries.BeneficiaryName"),
                name: "beneficiary",
                type: "select",
                required: true,
                options: beneficiaries?.map(({ id, fullName }) => ({
                  value: id,
                  label: fullName,
                })),
              },
              {
                label: t("Auth.Researchers.ResearcherName"),
                name: "staff",
                type: "select",
                required: true,
                options: researchers.map(({ id, fullName }) => ({
                  value: id,
                  label: fullName,
                })),
              },
            ]}
            // customButtons={
            //   <Button
            //     outline
            //     onClick={() => setAssignResearcherModalOpen(null)}
            //     className="w-50"
            //   >
            //     Back
            //   </Button>
            // }
            initialValues={assignResearcherModalOpen}
            submitText={t("Auth.Researchers.Assign")}
            onFormSubmit={(e) => {
              BeneficiaryApi.assignResearcher(e.beneficiary || "", e)
                .then(() => {
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t(
                          "Auth.Beneficiaries.Profile.AssignResearcher",
                          {
                            researcher: researchers.find(
                              ({ id }) => e.researcher === id
                            )?.fullName,
                          }
                        ),
                        data: beneficiaries.find((b) => b.id === e.beneficiary)
                          ?.fullName,
                      }),
                    })
                  );
                  onSearch({ filters: {}, page: 1, capacity: 10 });
                  setAssignResearcherModalOpen(undefined);
                })
                .catch(apiCatchGlobalHandler);
            }}
          />
        )}
      </Modal>
    </Fragment>
  );
};

export default ApplicantsViewForSupervisor;
