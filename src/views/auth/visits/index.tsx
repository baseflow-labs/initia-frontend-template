import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useNavigate, useSearchParams } from "react-router";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as VisitApi from "../../../api/visits/visits";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/fucntions";
import { dataDateFormat, viewDayDateFormat } from "../../../utils/consts";

const VisitsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [openModal, setOpenModal] = useState(false);
  const [selectOptions, setSelectOptions] = useState({
    beneficiaries: [{ id: "", fullName: "" }],
  });
  const [beneficiaries, setVisits] = useState([{}]);

  useLayoutEffect(() => {
    VisitApi.getAll()
      .then((res) => {
        setVisits(
          (res as any).map(
            ({ beneficiary = { contactsBank: {}, housing: {} }, ...rest }) => ({
              ...beneficiary.housing,
              ...beneficiary.contactsBank,
              ...beneficiary,
              ...rest,
            })
          ) as any
        );
      })
      .catch(apiCatchGlobalHandler);

    BeneficiaryApi.getAll()
      .then((res) =>
        setSelectOptions((current) => ({
          ...current,
          beneficiaries: res as any,
        }))
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  useEffect(() => {
    if (searchParams.get("id")) {
      setOpenModal(true);
    }
  }, [searchParams.get("id")]);

  const title = t("Auth.Visits.Title");

  const visitPurposes = [
    {
      value: "A",
      label: "A",
    },
    {
      value: "B",
      label: "B",
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
    },
  ];

  const aidTypes = [
    {
      value: "A",
      label: "A",
    },
    {
      value: "B",
      label: "B",
    },
  ];

  const columns = [
    {
      type: "text",
      name: "fullName",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
    },
    {
      type: "date",
      name: "date",
      dateFormat: viewDayDateFormat,
      label: t("Auth.Visits.VisitDate"),
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

  const actionButtons = [
    {
      label: t("Auth.Visits.Report.AddReport"),
      route: "/report",
      outline: true,
    },
    {
      label: t("Auth.Visits.AddVisit"),
      onClick: () => setOpenModal(true),
    },
  ];

  const scheduleVisitInputs = () => [
    {
      type: "select",
      options: selectOptions.beneficiaries.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
      })),
      defaultValue: searchParams.get("id") || "",
      name: "beneficiary",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      required: true,
    },
    {
      type: "time",
      name: "time",
      required: true,
    },
    {
      type: "date",
      name: "date",
      required: true,
    },
    {
      type: "textarea",
      name: "reason",
      label: t("Auth.Visits.VisitPurpose"),
      required: true,
    },
  ];

  const onModalClose = () => {
    setOpenModal(false);
    if (searchParams.get("id")) {
      navigate("/visits");
      window.location.reload();
    }
  };

  return (
    <Fragment>
      <TablePage
        title={title}
        filters={filters}
        actionButtons={actionButtons}
        columns={columns}
        data={beneficiaries}
        onPageChange={(i = 0, x = 0) => console.log(i, x)}
        onSearch={(values) => console.log(values)}
      />

      <Modal
        title={t("Auth.Visits.AddVisit")}
        onClose={onModalClose}
        isOpen={openModal}
      >
        <Form
          inputs={scheduleVisitInputs}
          submitText={t("Global.Form.Labels.Confirm")}
          onFormSubmit={(e) => {
            VisitApi.create(e)
              .then((res) => {
                onModalClose();
                dispatch(
                  addNotification({
                    msg: t("Global.Form.SuccessMsg", {
                      action: t("Auth.Visits.AddVisit"),
                      data: selectOptions.beneficiaries.find(
                        ({ id }) => id === e.beneficiary
                      )?.fullName,
                    }),
                  })
                );
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      </Modal>
    </Fragment>
  );
};

export default VisitsView;
