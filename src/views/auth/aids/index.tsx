import {
  faCheck,
  faCircle,
  faEye,
  faHandHoldingDollar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidCategoryApi from "../../../api/aids/aidCategories";
import * as AidProgramApi from "../../../api/aids/aidPrograms";
import * as AidApi from "../../../api/aids/aids";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import { actionProps, MoneyUnit } from "../../../components/table";
import TooltipComp from "../../../components/tooltip";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { Aid, AidCategory, AidProgram, defaultAid } from "../../../types/aids";
import { Beneficiary } from "../../../types/beneficiaries";
import { dataDateFormat } from "../../../utils/consts";
import {
  apiCatchGlobalHandler,
  pluralLabelResolve,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import { getAidStatuses } from "../../../utils/optionDataLists/aids";
import ApproveAid from "./approveAid";
import RejectAid from "./rejectAid";
import SendAid from "./sendAid";
import ViewAidDetails from "./viewDetails";

const AidsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState<string>("");
  const [openApproveModal, setOpenApproveModal] = useState<Aid>(defaultAid);
  const [openRejectModal, setOpenRejectModal] = useState<boolean | string>(
    false
  );

  const [aids, setAids] = useState<Aid[]>([]);
  const [selectOptions, setSelectOptions] = useState<{
    beneficiaries: Beneficiary[];
    aidCategories: AidCategory[];
    aidPrograms: AidProgram[];
  }>({
    beneficiaries: [],
    aidPrograms: [],
    aidCategories: [],
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
              status,
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
          aidPrograms: res.payload,
        }))
      )
      .catch(apiCatchGlobalHandler);

    AidCategoryApi.getAll({ capacity: 999 })
      .then((res: any) =>
        setSelectOptions((current) => ({
          ...current,
          aidCategories: res.payload,
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
      type: "custom",
      name: "name",
      label: t("Auth.Aids.AidName"),
      render: (row: any) =>
        selectOptions.aidCategories.find(
          (cat) => cat.id === row.aidProgram.aidCategoryId
        )?.name,
    },
    {
      type: "custom",
      name: "value",
      label: t("Auth.Aids.AidValue"),
      render: (row: any) => (
        <>
          {row.value}{" "}
          {selectOptions.aidCategories.find(
            (cat) => cat.id === row.aidProgram.aidCategoryId
          )?.type === "Cash" ? (
            <MoneyUnit />
          ) : (
            pluralLabelResolve(t, row.value, "Auth.Aids.AidPiece")
          )}
        </>
      ),
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
      type: "custom",
      render: (row: any) => (
        <Fragment>
          <TooltipComp label={row.status.note}>
            <FontAwesomeIcon
              icon={faCircle}
              className={`text-${statusColorRender(row.status.status)}`}
            />{" "}
            {renderDataFromOptions(row.status.status, statuses)}{" "}
          </TooltipComp>
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
              )?.fileNo,
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
      setOpenApproveModal(row || defaultAid);
      return;
    }

    setOpenRejectModal(row?.id || "");
  };

  return (
    <Fragment>
      <TablePage
        title={t("Auth.Aids.Title")}
        filters={filters}
        onSearch={onSearch}
        searchPlaceholder={t("Auth.Aids.SearchBarPlaceholder")}
        actionButtons={user.role === "researcher" ? actionButtons : undefined}
        tableActions={(id?: string) => {
          const aid = aids.find((a) => a.id === id);

          const status = aid?.status?.status;

          const isRecommended = status === "RecommendedByResearcher";
          const isSeconded = status === "SecondedByHod";
          const isAllowed = status === "AllowedByCeo";
          const isApproved = status === "ApprovedByAccountant";

          const isGranted = status === "Granted";
          const isPending = status === "Pending";

          const isResearcher = user.role === "researcher";
          const isHod = user.role === "hod";
          const isCeo = user.role === "ceo";
          const isAccountant = user.role === "accountant";

          const allowResponse =
            (isResearcher && isPending) ||
            (isHod && isRecommended) ||
            (isCeo && isSeconded) ||
            (isAccountant && isAllowed);

          const allowGrant = isResearcher && isApproved;

          const errorStatus = t("Auth.Aids.Statuses.CantButIfStatus", {
            status: isResearcher
              ? t("Auth.Aids.Statuses.Pending")
              : isHod
              ? t("Auth.Aids.Statuses.Recommended")
              : isCeo
              ? t("Auth.Aids.Statuses.Seconded")
              : isAccountant
              ? t("Auth.Aids.Statuses.Allowed")
              : "",
          });

          const final: actionProps[] = [
            {
              label: t("Auth.Aids.ViewAidDetails"),
              icon: faEye,
              spread: false,
              onClick: (data: string) => setOpenDetailsModal(data),
            },
            {
              label: t("Auth.Aids.Statuses.Approve"),
              icon: faCheck,
              spread: false,
              onClick: (data: string) =>
                allowResponse
                  ? openResponseModal(data, "approve")
                  : dispatch(
                      addNotification({
                        msg: t("Auth.Aids.CantApprove", {
                          message: errorStatus,
                        }),
                        type: "err",
                      })
                    ),
            },
            {
              label: t("Auth.Aids.Statuses.Reject"),
              icon: faXmark,
              spread: false,
              onClick: (data: string) =>
                allowResponse
                  ? openResponseModal(data, "reject")
                  : dispatch(
                      addNotification({
                        msg: t("Auth.Aids.CantReject", {
                          message: errorStatus,
                        }),
                        type: "err",
                      })
                    ),
            },
          ];

          if (isResearcher) {
            final.push({
              label: t("Auth.Aids.Statuses.Grant"),
              icon: faHandHoldingDollar,
              spread: false,
              onClick: (data: string) =>
                allowGrant
                  ? grant(data)
                  : dispatch(
                      addNotification({
                        msg: isGranted
                          ? t("Auth.Aids.CantGrantAlready")
                          : !isApproved
                          ? t("Auth.Aids.CantGrantNonApproved")
                          : "",
                        type: !isApproved && !isGranted ? "err" : undefined,
                      })
                    ),
            });
          }

          return final;
        }}
        columns={[
          user.role === "researcher"
            ? {
                type: "text",
                name: "fullName",
                label: t("Auth.Beneficiaries.BeneficiaryName"),
              }
            : {
                type: "text",
                name: "fileNo",
                label: t("Auth.MembershipRegistration.Form.FileNo"),
              },
          ...columns,
        ]}
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

      <ViewAidDetails
        openModal={openDetailsModal}
        setOpenModal={setOpenDetailsModal}
      />

      <SendAid
        currentFilters={currentFilters}
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectOptions={selectOptions}
        onGetData={getData}
      />

      <ApproveAid
        openModal={openApproveModal}
        setOpenModal={setOpenApproveModal}
        onGetData={getData}
      />

      <RejectAid
        openModal={openRejectModal}
        setOpenModal={setOpenRejectModal}
        onGetData={getData}
      />
    </Fragment>
  );
};

export default AidsView;
