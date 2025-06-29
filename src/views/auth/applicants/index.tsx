import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircle, faEdit, faSearch, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { GetDataProps } from "../../../api";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import TablePage from "../../../layouts/auth/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler, renderDataFromOptions, statusColorRender } from "../../../utils/function";

const ApplicantsView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [beneficiaries, setBeneficiaries] = useState<
    { id: string; status: string; fullName: string }[]
  >([]);

  const getData = (filters: GetDataProps) => {
    BeneficiaryApi.getAll(filters)
      .then((res) => {
        setBeneficiaries(
          (res as any)
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
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({});
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
      value: "Accepted",
      label: t("Auth.MembershipRegistration.Statuses.Accepted"),
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
      name: "status=>status",
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
    navigate(`/beneficiary/profile/?id=${data}`);
  };

  const reviewProfile = (data: string) => {
    navigate(`/beneficiary/review/?id=${data}`);
  };

  const scheduleVisit = (data: string) => {
    navigate(`/visitSchedule/?id=${data}`);
  };

  const deleteBeneficiary = (id: string) => {
    BeneficiaryApi.remove(id).then(() => {
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

  return (
    <TablePage
      title={title}
      filters={filters}
      // actionButtons={actionButtons}
      columns={columns}
      data={beneficiaries}
      tableActions={(id?: string) => {
        const row = beneficiaries.find((b) => b.id === id);

        const final: {
          label: string;
          icon: IconProp;
          spread?: boolean;
          onClick: (data: string) => void;
        }[] = [
          {
            icon: faUser,
            label: t("Auth.Beneficiaries.Profile.ProfileDetails"),
            onClick: (data: string) => viewProfile(data),
          },
        ];

        const allowDataCompletion = ["Incomplete", "Need Help"].includes(
          row?.status || ""
        );
        const allowDataReview = ["New Member"].includes(row?.status || "");

        if (allowDataCompletion) {
          final.push({
            icon: faEdit,
            label: t("Auth.Beneficiaries.Profile.ProfileCompletion"),
            onClick: (data: string) => completeProfile(data),
          });
        }

        if (allowDataReview) {
          final.push({
            icon: faSearch,
            label: t("Auth.Beneficiaries.Profile.ProfileReview"),
            onClick: (data: string) => reviewProfile(data),
          });
        }

        final.push({
          icon: faTrash,
          label: t("Auth.Beneficiaries.Profile.DeleteBeneficiary"),
          onClick: (data: string) => deleteBeneficiary(data),
        });

        return final;
      }}
      onPageChange={(i = 0, x = 0) => console.log(i, x)}
      onSearch={(values) => getData(values)}
    />
  );
};

export default ApplicantsView;
