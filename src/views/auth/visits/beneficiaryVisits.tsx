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
import { viewDateFormat, viewDayFormat } from "../../../utils/consts";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";

const BeneficiariesVisitsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [openModal, setOpenModal] = useState(false);
  const [crudData, setCrudData] = useState({});
  const [selectOptions, setSelectOptions] = useState({
    beneficiaries: [{ id: "", fullName: "" }],
  });
  const [visits, setVisits] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});

  const onSearch = ({ filters = {}, page = 1, capacity = 10 }) => {
    setCurrentFilters(filters);

    return VisitApi.getAll(filters, page, capacity)
      .then((res: any) => {
        setVisits(
          res.payload.map(
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

        return res;
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    onSearch({ filters: {}, page: 1, capacity: 10 });

    BeneficiaryApi.getAll({})
      .then((res: any) =>
        setSelectOptions((current) => ({
          ...current,
          beneficiaries: res.payload,
        }))
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  useEffect(() => {
    if (searchParams.get("id")) {
      setOpenModal(true);
    }
  }, [searchParams.get("id")]);

  const title = t("Auth.Visits.Visits");

  const statuses = [
    {
      value: "Pending",
      label: t("Auth.Visits.Statuses.Pending"),
    },
    {
      value: "Approved",
      label: t("Auth.Visits.Statuses.Approved"),
    },
    {
      value: "Delayed",
      label: t("Auth.Visits.Statuses.Delayed"),
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
      name: "status",
    },
  ];

  const columns = [
    {
      type: "date",
      name: "date",
      timestampFormat: viewDayFormat,
      label: t("Auth.Visits.VisitDate"),
    },
    {
      type: "date",
      name: "date",
      timestampFormat: viewDateFormat,
      label: t("Auth.Visits.VisitDate"),
    },
    // {
    //   type: "time",
    //   name: "time",
    //   label: t("Auth.Visits.VisitTime"),
    // },
    {
      type: "text",
      name: "reason",
      label: t("Auth.Visits.VisitPurpose"),
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

  const onCrudSuccess = (e: { beneficiary: "" }, action = "") => {
    onModalClose();
    onSearch({ filters: {}, page: 1, capacity: 10 });
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
        // tableActions={[
        //   // {
        //   //   icon: faEdit,
        //   //   spread: true,
        //   //   label: t("Global.Form.Labels.Edit"),
        //   //   onClick: (data: string) => editData(data),
        //   // },
        //   {
        //     icon: faXmark,
        //     label: t("Auth.Visits.CancelVisit"),
        //     onClick: (data: string) => cancelVisit(data),
        //   },
        // ]}
        columns={columns}
        data={visits}
        onSearch={onSearch}
        onPageChange={(page, capacity) => {
          onSearch({ filters: currentFilters, page, capacity });
        }}
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
                  .then(() => {
                    onCrudSuccess(e, t("Auth.Visits.EditVisit"));
                  })
                  .catch(apiCatchGlobalHandler)
              : VisitApi.create(e)
                  .then(() => {
                    onCrudSuccess(e, t("Auth.Visits.AddVisit"));
                  })
                  .catch(apiCatchGlobalHandler);
          }}
        />
      </Modal>
    </Fragment>
  );
};

export default BeneficiariesVisitsView;
