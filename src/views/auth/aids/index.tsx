import { faCheck, faCircle, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidApi from "../../../api/aids/aids";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import {
  getAidStatuses,
  getAidTypes,
} from "../../../utils/optionDataLists/aids";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import SendAid from "./sendAid";

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
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSearch, setCurrentSearch] = useState("");
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    capacity: 10,
    count: 0,
    pagesCount: 1,
  });

  const getData = ({ filters = {}, page = 1, capacity = 10, search = "" }) => {
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
    getData({
      filters: currentFilters,
      page: 1,
      capacity: 10,
      search: currentSearch,
    });

    BeneficiaryApi.getAll({})
      .then((res: any) =>
        setSelectOptions((current) => ({
          ...current,
          beneficiaries: res.payload,
        }))
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  const aidTypes = getAidTypes(t);

  const statuses = getAidStatuses(t);

  const filters = [
    {
      label: t("Auth.MembershipRegistration.Statuses.Status"),
      options: statuses,
      name: "aidStatuses=>status",
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

  const grantLabel = t("Auth.Aids.Statuses.Grant");
  const rejectLabel = t("Auth.Aids.Statuses.Reject");

  const updateStatus = (id: string, status: string) => {
    AidApi.updateStatus(id, status)
      .then(() => {
        const aid = aids.find((aid) => aid.id === id);
        getData({
          filters: currentFilters,
          page: 1,
          capacity: 10,
          search: currentSearch,
        });
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

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ filters: currentFilters, page: 1, capacity: 10, search: e });
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
            onClick: (data: string) => {
              const beneficiary = aids.find(
                (a) => a.id === data
              )?.beneficiaryId;

              setCurrentFilters({ beneficiary });
              getData({ filters: { beneficiary }, search: currentSearch });
            },
          });

          return final;
        }}
        columns={columns}
        data={aids}
        onGetData={getData}
        paginationMeta={paginationMeta}
        onPageChange={(page, capacity) => {
          getData({
            filters: currentFilters,
            page,
            capacity,
            search: currentSearch,
          });
        }}
      />

      <SendAid
        onGetData={getData}
        currentFilters={currentFilters}
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectOptions={selectOptions}
      />
    </Fragment>
  );
};

export default AidsView;
