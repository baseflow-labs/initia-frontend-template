import {
  faCircle,
  faEdit,
  faNewspaper,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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
import { viewDayDateFormat } from "../../../utils/consts";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";

const VisitsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [openModal, setOpenModal] = useState(false);
  const [crudData, setCrudData] = useState({});
  const [selectOptions, setSelectOptions] = useState({
    beneficiaries: [{ id: "", fullName: "" }],
  });
  const [visits, setVisits] = useState([{}]);

  const getData = () => {
    VisitApi.getAll()
      .then((res) => {
        setVisits(
          (res as any).map(
            ({
              beneficiary = {
                contactsBank: {},
                housing: {},
                user: { username: "" },
              },
              ...rest
            }) => ({
              beneficiaryMobile: beneficiary.user.username,
              ...beneficiary.housing,
              ...beneficiary.contactsBank,
              ...beneficiary,
              ...rest,
            })
          ) as any
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData();

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

  const statuses = [
    {
      value: "Pending",
      label: t("Auth.Visits.Statuses.Pending"),
    },
    {
      value: "Done",
      label: t("Auth.Visits.Statuses.Done"),
    },
    {
      value: "Cancelled",
      label: t("Auth.Visits.Statuses.Cancelled"),
    },
  ];

  const filters = [
    {
      label: t("Auth.Visits.Statuses.Status"),
      options: statuses,
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
      timestampFormat: viewDayDateFormat,
      label: t("Auth.Visits.VisitDate"),
    },
    {
      type: "time",
      name: "time",
      label: t("Auth.Visits.VisitTime"),
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
      label: t("Auth.Visits.Statuses.Status"),
    },
  ];

  const actionButtons = [
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
    setCrudData({});
    if (searchParams.get("id")) {
      navigate("/visitSchedule");
      window.location.reload();
    }
  };

  const cancelVisit = (data: string) => {
    VisitApi.cancel(data)
      .then((res) => {
        getData();
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Visits.CancelVisit"),
              data: selectOptions.beneficiaries.find(({ id }) => id === data)
                ?.fullName,
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  const onCrudSuccess = (e: { beneficiary: "" }, action = "") => {
    onModalClose();
    getData();
    dispatch(
      addNotification({
        msg: t("Global.Form.SuccessMsg", {
          action,
          data: selectOptions.beneficiaries.find(
            ({ id }) => id === e.beneficiary
          )?.fullName,
        }),
      })
    );
  };

  return (
    <Fragment>
      <TablePage
        title={title}
        filters={filters}
        tableActions={[
          // {
          //   icon: faEdit,
          //   spread: true,
          //   label: t("Global.Form.Labels.Edit"),
          //   onClick: (data: string) => editData(data),
          // },
          {
            icon: faEdit,
            spread: true,
            label: t("Auth.Visits.Report.AddReport"),
            onClick: (data: string) =>
              navigate("/visitSchedule/report?id=" + data),
          },
          {
            icon: faNewspaper,
            spread: true,
            label: t("Auth.Visits.Report.ViewReport"),
            onClick: (data: string) =>
              navigate("/visitSchedule/report/details/?id=" + data),
          },
          {
            icon: faXmark,
            label: t("Auth.Visits.CancelVisit"),
            onClick: (data: string) => cancelVisit(data),
          },
        ]}
        actionButtons={actionButtons}
        columns={columns}
        data={visits}
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
          initialValues={crudData}
          onFormSubmit={(e) => {
            e.id
              ? VisitApi.update(e)
                  .then((res) => {
                    onCrudSuccess(e, t("Auth.Visits.EditVisit"));
                  })
                  .catch(apiCatchGlobalHandler)
              : VisitApi.create(e)
                  .then((res) => {
                    onCrudSuccess(e, t("Auth.Visits.AddVisit"));
                  })
                  .catch(apiCatchGlobalHandler);
          }}
        />
      </Modal>
    </Fragment>
  );
};

export default VisitsView;
