import { faUser, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as StaffApi from "../../../api/staff/researcher";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import {
  getBeneficiaryCategories,
  getHomeTypes,
  getNationalities,
  getProvinces,
} from "../../../utils/dataOptions";
import { apiCatchGlobalHandler } from "../../../utils/function";

const BeneficiariesViewForSupervisor = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cancelModalOpen, setCancelModalOpen] = useState<string | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<
    { id: string; status: string; fullName: string; staff: { id: string } }[]
  >([]);
  const [assignResearcherModalOpen, setAssignResearcherModalOpen] = useState<
    { beneficiary: string; staff: string } | undefined
  >(undefined);
  const [researchers, setResearchers] = useState<
    { id: string; status: string; fullName: string }[]
  >([]);
  const [currentFilters, setCurrentFilters] = useState({});

  const onSearch = ({ filters = {}, page = 1, capacity = 10 }) => {
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
    onSearch({ filters: {}, page: 1, capacity: 10 });

    StaffApi.getAll({})
      .then((res: any) => {
        setResearchers(res.payload);
      })
      .catch(apiCatchGlobalHandler);
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

  return (
    <Fragment>
      <TablePage
        title={t("Auth.Beneficiaries.Title")}
        filters={filters}
        // actionButtons={actionButtons}
        columns={columns}
        data={beneficiaries}
        tableActions={(id?: string) => [
          {
            icon: faUser,
            label: t("Auth.Beneficiaries.Profile.ProfileDetails"),
            onClick: (data: string) => viewProfile(data),
          },
          {
            icon: faUser,
            label: t("Auth.Beneficiaries.Profile.AssignResearcher"),
            onClick: (data: string) =>
              setAssignResearcherModalOpen({
                beneficiary: data,
                staff:
                  beneficiaries.find((b) => b.id === data)?.staff?.id || "",
              }),
          },
          {
            icon: faUserMinus,
            label: t("Auth.Beneficiaries.Profile.CancelMembership"),
            onClick: (data: string) => setCancelModalOpen(data),
          },
        ]}
        onSearch={onSearch}
        onPageChange={(page, capacity) => {
          onSearch({ filters: currentFilters, page, capacity });
        }}
      />

      <Modal
        title={t("Auth.Beneficiaries.Profile.CancelMembership")}
        onClose={() => setCancelModalOpen(null)}
        isOpen={!!cancelModalOpen}
      >
        <Form
          inputs={() => [
            {
              label: t("Auth.Beneficiaries.Profile.CancelMembershipReason"),
              name: "reason",
              type: "textarea",
              required: true,
              belowComp: (
                <div>
                  <small className="text-info">
                    {t("Auth.Beneficiaries.Profile.CancelMembershipNote")}
                  </small>
                </div>
              ),
              rows: 3,
            },
          ]}
          customButtons={
            <Button
              outline
              onClick={() => setCancelModalOpen(null)}
              className="w-50"
            >
              Back
            </Button>
          }
          submitText={t("Auth.Beneficiaries.Profile.CancelMembership")}
          onFormSubmit={(e) => {
            BeneficiaryApi.cancel(cancelModalOpen || "", e)
              .then(() => {
                dispatch(
                  addNotification({
                    msg: t("Global.Form.SuccessMsg", {
                      action: t("Auth.Beneficiaries.Profile.CancelMembership"),
                      data: beneficiaries.find((b) => b.id === cancelModalOpen)
                        ?.fullName,
                    }),
                  })
                );
                onSearch({ filters: {}, page: 1, capacity: 10 });
                setCancelModalOpen(null);
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      </Modal>

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

export default BeneficiariesViewForSupervisor;
