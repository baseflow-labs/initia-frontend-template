import { faCheck, faCircle, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { GetDataProps } from "../../../api";
import * as AidApi from "../../../api/aids/aids";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";

const AidsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const [aids, setAids] = useState<
    { id: string; beneficiaryId: string; status: string }[]
  >([]);
  const [selectOptions, setSelectOptions] = useState({
    beneficiaries: [{ id: "", fullName: "", status: { status: "" } }],
  });

  const getData = (filters: GetDataProps) => {
    AidApi.getAll(filters)
      .then((res) => {
        setAids(
          (res as any).map(
            ({ beneficiary = { id: "" }, status = {}, ...rest }) => ({
              ...beneficiary,
              beneficiaryId: beneficiary.id,
              ...status,
              ...rest,
            })
          ) as any
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({});

    BeneficiaryApi.getAll({})
      .then((res) =>
        setSelectOptions((current) => ({
          ...current,
          beneficiaries: res as any,
        }))
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  const title = t("Auth.Aids.Title");

  const aidTypes = [
    {
      value: "Cash",
      label: t("Auth.Aids.Cash"),
    },
    {
      value: "In-Kind",
      label: t("Auth.Aids.In-Kind"),
    },
  ];

  const statuses = [
    {
      value: "Pending",
      label: t("Auth.Aids.Statuses.Pending"),
    },
    {
      value: "Granted",
      label: t("Auth.Aids.Statuses.Granted"),
    },
    {
      value: "Rejected",
      label: t("Auth.MembershipRegistration.Statuses.Rejected"),
    },
  ];

  const filters = [
    {
      label: t("Auth.MembershipRegistration.Statuses.Status"),
      options: statuses,
      name: "status=>status",
    },
    {
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      options: selectOptions.beneficiaries.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
      })),
      name: "beneficiary",
    },
    {
      label: t("Auth.Aids.AidType"),
      options: aidTypes,
      name: "type",
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.Aids.AddAid"),
      onClick: () => setOpenModal(true),
    },
  ];

  const columns = [
    {
      type: "text",
      name: "fullName",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
    },
    {
      type: "text",
      name: "name",
      label: t("Auth.Aids.AidName"),
    },
    {
      type: "select",
      options: aidTypes,
      name: "type",
      label: t("Auth.Aids.AidType"),
    },
    {
      type: "date",
      name: "createdAt",
      label: t("Global.Labels.ApplicationDate"),
    },
    {
      type: "date",
      name: "collectionDate",
      label: t("Auth.Aids.RecaptionDate"),
    },
    {
      type: "file",
      name: "document",
      label: t("Global.Form.Labels.SupportingDocument"),
      required: false,
      halfCol: true,
    },
    {
      type: "textarea",
      name: "note",
      label: t("Auth.Aids.AidPurpose"),
      required: true,
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

  const grantAidInputs = () => [
    {
      type: "select",
      options: selectOptions.beneficiaries
        .filter(({ status }) => status.status === "Accepted")
        .map(({ id, fullName }) => ({
          value: id,
          label: fullName,
        })),
      name: "beneficiary",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      required: true,
    },
    {
      type: "select",
      options: aidTypes,
      name: "type",
      label: t("Auth.Aids.AidType"),
      required: true,
    },
    {
      type: "text",
      name: "name",
      label: t("Auth.Aids.AidName"),
      required: true,
    },
    {
      type: "textarea",
      name: "note",
      label: t("Global.Form.Labels.Notes"),
      required: false,
    },
  ];

  const grantLabel = t("Auth.Aids.Statuses.Grant");
  const rejectLabel = t("Auth.Aids.Statuses.Reject");

  const updateStatus = (id: string, status: string) => {
    AidApi.updateStatus(id, status)
      .then(() => {
        const aid = aids.find((aid) => aid.id === id);
        getData({});
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: status === "Granted" ? grantLabel : rejectLabel,
              data: selectOptions.beneficiaries.find(
                ({ id }) => id === aid?.beneficiaryId
              )?.fullName,
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <Fragment>
      <TablePage
        title={title}
        filters={filters}
        actionButtons={actionButtons}
        tableActions={(id?: string) => {
          const aid = aids.find((a) => a.id === id);

          const granted = aid?.status === "Granted";
          const rejected = aid?.status === "Rejected";

          const final = [];

          if (!granted && !rejected) {
            final.push({
              label: t("Auth.Aids.Statuses.Grant"),
              icon: faCheck,
              onClick: (data: string) => updateStatus(data, "Granted"),
            });
          }

          final.push({
            label: t("Auth.Aids.FilterByThisBeneficiary"),
            icon: faFilter,
            spread: true,
            onClick: (data: string) =>
              getData({ filters: { beneficiary: data } }),
          });

          return final;
        }}
        columns={columns}
        data={aids}
        onPageChange={(i = 0, x = 0) => console.log(i, x)}
        onSearch={(values) => getData(values)}
      />

      <Modal
        title={t("Auth.Aids.AddAid")}
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
      >
        <Form
          inputs={grantAidInputs}
          submitText={t("Global.Form.Labels.SubmitApplication")}
          onFormSubmit={(e) => {
            AidApi.grant(e)
              .then((res) => {
                setOpenModal(false);
                getData({});
                dispatch(
                  addNotification({
                    msg: t("Global.Form.SuccessMsg", {
                      action: t("Auth.Aids.AddAid"),
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

export default AidsView;
