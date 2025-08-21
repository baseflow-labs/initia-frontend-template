import {
  faCheck,
  faCircle,
  faHandHoldingDollar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidProgramApi from "../../../api/aids/aidPrograms";
import * as AidApi from "../../../api/aids/aids";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import { MoneyUnit } from "../../../components/table";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { dataDateFormat } from "../../../utils/consts";
import {
  apiCatchGlobalHandler,
  pluralLabelResolve,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import { getAidStatuses } from "../../../utils/optionDataLists/aids";
import AccountantApproveAid from "./accountantApproveAid";
import AccountantRejectAid from "./accountantRejectAid";
import SendAid from "./sendAid";

export interface AidProgramProps {
  id: string;
  name: string;
}

export const defaultAidProgram: AidProgramProps = {
  id: "",
  name: "",
};

export interface AidProps {
  id: string;
  beneficiaryId: string;
  status: string;
  fileNo: string;
  value: number;
  category: string;
  aidProgram: AidProgramProps;
}

export const defaultAid: AidProps = {
  id: "",
  beneficiaryId: "",
  status: "",
  fileNo: "",
  value: 0,
  category: "",
  aidProgram: defaultAidProgram,
};

const AidsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);
  const [openAccountantApproveModal, setOpenAccountantApproveModal] =
    useState<AidProps>(defaultAid);
  const [openAccountantRejectModal, setOpenAccountantRejectModal] = useState<
    boolean | string
  >(false);

  const [aids, setAids] = useState<AidProps[]>([]);
  const [selectOptions, setSelectOptions] = useState({
    beneficiaries: [{ id: "", fullName: "", status: { status: "" } }],
    aidPrograms: [{ id: "", name: "", type: "", status: "" }],
  });
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSearch, setCurrentSearch] = useState("");
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    capacity: 10,
    count: 0,
    pagesCount: 1,
  });

  const getData = ({
    filters = currentFilters,
    page = paginationMeta.page,
    capacity = paginationMeta.capacity,
    search = currentSearch,
  }) => {
    setCurrentFilters(filters);
    const customFilters = [];

    if (search) {
      customFilters.push({
        field: "beneficiary.fullName",
        filteredTerm: {
          dataType: "string",
          value: search,
        },
        filterOperator: "contains",
      });
    }

    return AidApi.getAll({ filters, page, capacity, customFilters })
      .then((res: any) => {
        setAids(
          res.payload.map(
            ({ beneficiary = { id: "" }, status = {}, ...rest }) => ({
              ...beneficiary,
              beneficiaryId: beneficiary.id,
              ...status,
              ...rest,
            })
          )
        );

        if (res.extra) {
          setPaginationMeta({
            page: res.extra.page,
            capacity: res.extra.capacity,
            count: res.extra.count,
            pagesCount: res.extra.pagesCount,
          });
        }

        return res;
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({});

    BeneficiaryApi.getAll({ capacity: 999 })
      .then((res: any) =>
        setSelectOptions((current) => ({
          ...current,
          beneficiaries: res.payload,
        }))
      )
      .catch(apiCatchGlobalHandler);

    AidProgramApi.getAll({ capacity: 999 })
      .then((res: any) =>
        setSelectOptions((current) => ({
          ...current,
          aidPrograms: res.payload.filter(
            ({ status = "" }) => status === "Opened"
          ),
        }))
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  const statuses = getAidStatuses(t);

  const filters = [
    {
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      options: selectOptions.beneficiaries
        .filter(({ status }) => status.status === "Accepted")
        .map(({ id, fullName }) => ({
          value: id,
          label: fullName,
        })),
      name: "beneficiary",
    },
    {
      label: t("Auth.AidPrograms.Title"),
      options: selectOptions.aidPrograms.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
      name: "type",
    },
    {
      label: t("Auth.MembershipRegistration.Statuses.Status"),
      options: statuses,
      name: "aidStatuses=>status",
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
      name: "fileNo",
      label: t("Auth.MembershipRegistration.Form.FileNo"),
    },
    {
      type: "custom",
      name: "name",
      label: t("Auth.Aids.AidName"),
      render: (row: any) => row.aidProgram.name,
    },
    {
      type: "date",
      name: "createdAt",
      label: t("Global.Labels.ApplicationDate"),
    },
    {
      type: "custom",
      name: "value",
      label: t("Auth.Aids.AidValue"),
      render: (row: any) => (
        <>
          {row.value}{" "}
          {row.aidProgram.type === "Cash" ? (
            <MoneyUnit />
          ) : (
            pluralLabelResolve(t, row.value, "Auth.Aids.AidPiece")
          )}
        </>
      ),
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

  const grant = (id: string) => {
    AidApi.updateStatus(
      id,
      "Granted",
      undefined,
      moment().locale("en").format(dataDateFormat)
    )
      .then(() => {
        const aid = aids.find((aid) => aid.id === id);
        getData({});
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Aids.Statuses.Grant"),
              data: selectOptions.beneficiaries.find(
                ({ id }) => id === aid?.beneficiaryId
              )?.fullName,
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ page: 1, capacity: 10, search: e });
  };

  const openResponseModal = (data: string, response: string) => {
    const row = aids.find(({ id }) => id === data);

    if (response === "approve") {
      setOpenAccountantApproveModal(row || defaultAid);
      return;
    }

    setOpenAccountantRejectModal(row?.id || "");
  };

  return (
    <Fragment>
      <TablePage
        title={t("Auth.Aids.Title")}
        filters={filters}
        onSearch={onSearch}
        searchPlaceholder="بحث بـ اسم المستفيد"
        actionButtons={actionButtons}
        tableActions={(id?: string) => {
          const aid = aids.find((a) => a.id === id);

          const approved = aid?.status === "Approved";
          const granted = aid?.status === "Granted";
          const rejected = aid?.status === "Rejected";

          return [
            {
              label: t("Auth.Aids.Statuses.Approve"),
              icon: faCheck,
              spread: false,
              onClick: (data: string) =>
                !approved && !granted
                  ? openResponseModal(data, "approve")
                  : dispatch(
                      addNotification({
                        msg: t("Auth.Aids.CantApproveAlready"),
                      })
                    ),
            },
            {
              label: t("Auth.Aids.Statuses.Reject"),
              icon: faXmark,
              spread: false,
              onClick: (data: string) =>
                !rejected && !granted
                  ? openResponseModal(data, "reject")
                  : dispatch(
                      addNotification({
                        msg: t("Auth.Aids.CantRejectAlready"),
                      })
                    ),
            },
            {
              label: t("Auth.Aids.Statuses.Grant"),
              icon: faHandHoldingDollar,
              spread: false,
              onClick: (data: string) =>
                !granted && approved
                  ? grant(data)
                  : dispatch(
                      addNotification({
                        msg: !approved
                          ? t("Auth.Aids.CantGrantNonApproved")
                          : t("Auth.Aids.CantGrantAlready"),
                        type: !approved ? "err" : undefined,
                      })
                    ),
            },
          ];
        }}
        columns={
          user.role === "researcher"
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
        data={aids}
        onGetData={getData}
        paginationMeta={paginationMeta}
        onPageChange={(page, capacity) => {
          getData({
            page,
            capacity,
          });
        }}
      />

      <SendAid
        currentFilters={currentFilters}
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectOptions={selectOptions}
        onGetData={getData}
      />

      <AccountantApproveAid
        openModal={openAccountantApproveModal}
        setOpenModal={setOpenAccountantApproveModal}
        onGetData={getData}
      />

      <AccountantRejectAid
        openModal={openAccountantRejectModal}
        setOpenModal={setOpenAccountantRejectModal}
        onGetData={getData}
      />
    </Fragment>
  );
};

export default AidsView;
