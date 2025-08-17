import {
  faCheck,
  faCircle,
  faFilter,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidProgramApi from "../../../api/aids/aidPrograms";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import {
  getAidProgramStatuses,
  getAidProgramTypes,
} from "../../../utils/optionDataLists/aids";
import SendAidProgram from "./sendAidProgram";

const AidProgramsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);
  const [aidPrograms, setAidPrograms] = useState<
    { id: string; beneficiaryId: string; status: string }[]
  >([]);
  const [selectOptions, setSelectOptions] = useState({
    beneficiaries: [{ id: "", fullName: "", status: { status: "" } }],
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

    return AidProgramApi.getAll({ filters, page, capacity, customFilters })
      .then((res: any) => {
        setAidPrograms(
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
  }, []);

  const aidProgramTypes = getAidProgramTypes(t);

  const statuses = getAidProgramStatuses(t);

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
      label: t("Auth.AidPrograms.AidProgramType"),
      options: aidProgramTypes,
      name: "type",
    },
    {
      label: t("Auth.MembershipRegistration.Statuses.Status"),
      options: statuses,
      name: "aidProgramStatuses=>status",
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.AidPrograms.AddAidProgram"),
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
      type: "text",
      name: "name",
      label: t("Auth.AidPrograms.AidProgramName"),
    },
    {
      type: "select",
      options: aidProgramTypes,
      name: "type",
      label: t("Auth.AidPrograms.AidProgramType"),
    },
    {
      type: "date",
      name: "createdAt",
      label: t("Global.Labels.ApplicationDate"),
    },
    {
      type: "date",
      name: "collectionDate",
      label: t("Auth.AidPrograms.RecaptionDate"),
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
      label: t("Auth.AidPrograms.AidProgramPurpose"),
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

  const grantLabel = t("Auth.AidPrograms.Statuses.Grant");
  const rejectLabel = t("Auth.AidPrograms.Statuses.Reject");

  const updateStatus = (id: string, status: string) => {
    AidProgramApi.updateStatus(id, status)
      .then(() => {
        const aidProgram = aidPrograms.find(
          (aidProgram) => aidProgram.id === id
        );
        getData({});
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: status === "Granted" ? grantLabel : rejectLabel,
              data: selectOptions.beneficiaries.find(
                ({ id }) => id === aidProgram?.beneficiaryId
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

  return (
    <Fragment>
      <TablePage
        title={t("Auth.AidPrograms.Title")}
        filters={filters}
        onSearch={onSearch}
        searchPlaceholder="بحث بـ اسم المستفيد"
        actionButtons={actionButtons}
        tableActions={(id?: string) => {
          const aidProgram = aidPrograms.find((a) => a.id === id);

          const granted = aidProgram?.status === "Granted";
          const rejected = aidProgram?.status === "Rejected";

          return [
            {
              label: t("Auth.AidPrograms.Statuses.Grant"),
              icon: faCheck,
              spread: false,
              onClick: (data: string) =>
                !granted
                  ? updateStatus(data, "Granted")
                  : dispatch(
                      addNotification({
                        msg: t("Auth.AidPrograms.CantGrantAlready"),
                      })
                    ),
            },
            {
              label: t("Auth.AidPrograms.Statuses.Reject"),
              icon: faXmark,
              spread: false,
              onClick: (data: string) =>
                !rejected
                  ? updateStatus(data, "Rejected")
                  : dispatch(
                      addNotification({
                        msg: t("Auth.AidPrograms.CantRejectAlready"),
                      })
                    ),
            },
            {
              label: t("Auth.AidPrograms.FilterByThisBeneficiary"),
              icon: faFilter,
              spread: true,
              onClick: (data: string) => {
                const beneficiary = aidPrograms.find(
                  (a) => a.id === data
                )?.beneficiaryId;

                setCurrentFilters({ beneficiary });
                getData({ filters: { beneficiary } });
              },
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
        data={aidPrograms}
        onGetData={getData}
        paginationMeta={paginationMeta}
        onPageChange={(page, capacity) => {
          getData({
            page,
            capacity,
          });
        }}
      />

      <SendAidProgram
        onGetData={getData}
        currentFilters={currentFilters}
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectOptions={selectOptions}
      />
    </Fragment>
  );
};

export default AidProgramsView;
