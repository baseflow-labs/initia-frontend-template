import { faCalendarDays, faUser, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

const BeneficiariesView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cancelModalOpen, setCancelModalOpen] = useState<string | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<
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
  }, []);

  const title = t("Auth.Beneficiaries.Title");

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

  return (
    <Fragment>
      <TablePage
        title={title}
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
    </Fragment>
  );
};

export default BeneficiariesView;
