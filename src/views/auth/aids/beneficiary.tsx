import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as AidCategoriesApi from "../../../api/aids/aidCategories";
import * as AidProgramsApi from "../../../api/aids/aidPrograms";
import * as AidApi from "../../../api/aids/aids";
import UnacceptedBeneficiary from "../../../components/card/unacceptedBeneficiary";
import { MoneyUnit } from "../../../components/table";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { useAppSelector } from "../../../store/hooks";
import { AidCategory, AidProgram } from "../../../types/aids";
import {
  apiCatchGlobalHandler,
  pluralLabelResolve,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import { getAidStatuses } from "../../../utils/optionDataLists/aids";
import RequestAid from "./requestAid";

const AidsBeneficiaryView = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [aids, setAids] = useState([]);
  const { user } = useAppSelector((state) => state.auth);
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    capacity: 10,
    count: 0,
    pagesCount: 1,
  });
  const [selectOptions, setSelectOptions] = useState<{
    aidCategories: AidCategory[];
    aidPrograms: AidProgram[];
  }>({
    aidCategories: [],
    aidPrograms: [],
  });

  const getData = ({
    filters = currentFilters,
    page = paginationMeta.page,
    capacity = paginationMeta.capacity,
  }) => {
    setCurrentFilters(filters);

    return AidApi.getAll({ filters, page, capacity })
      .then((res: any) => {
        setAids(
          res.payload.map(({ beneficiary = {}, status = {}, ...rest }) => ({
            ...beneficiary,
            ...status,
            ...rest,
          })) as any
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
    AidCategoriesApi.getAll({ capacity: 999 })
      .then((res: any) =>
        setSelectOptions((current) => ({
          ...current,
          aidCategories: res.payload.filter(
            ({ aidPrograms = [] }) =>
              aidPrograms?.filter(
                (p: { status: string }) => p.status === "Opened"
              )?.length
          ),
        }))
      )
      .catch(apiCatchGlobalHandler);

    AidProgramsApi.getAll({ capacity: 999 })
      .then((res: any) =>
        setSelectOptions((current) => ({
          ...current,
          aidPrograms: res.payload.filter(
            ({ status = "" }) => status === "Opened"
          ),
        }))
      )
      .catch(apiCatchGlobalHandler);

    getData({});
  }, []);

  const statuses = getAidStatuses(t);

  const filters = [
    {
      label: t("Auth.MembershipRegistration.Statuses.Status"),
      options: statuses,
      name: "aidStatuses=>status",
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.Aids.Beneficiary.RequestAid"),
      onClick: () => setOpenModal(true),
    },
  ];

  const processStatusForBeneficiary = (status: string) => {
    switch (status) {
      case "Recommended":
      case "Seconded":
      case "Pending":
        return "Pending";
      default:
        return status;
    }
  };

  const columns = [
    {
      type: "custom",
      name: "name",
      label: t("Auth.Aids.AidName"),
      render: (row: any) =>
        selectOptions.aidCategories.find(
          (cat) => cat.id === row.aidProgram.aidCategory
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
            (cat) => cat.id === row.aidProgram.aidCategory
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
      name: "recaptionDate",
      label: t("Auth.Aids.RecaptionDate"),
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
          {renderDataFromOptions(
            processStatusForBeneficiary(row.status),
            statuses
          )}
        </Fragment>
      ),
      name: "status",
      label: t("Auth.MembershipRegistration.Statuses.Status"),
    },
  ];

  const isUnacceptedBeneficiary =
    user.role === "beneficiary" && user.status !== "Accepted";

  if (isUnacceptedBeneficiary) {
    return (
      <PageTemplate>
        <UnacceptedBeneficiary />
      </PageTemplate>
    );
  }

  return (
    <Fragment>
      <TablePage
        title={t("Auth.Aids.Beneficiary.Title")}
        filters={filters}
        actionButtons={actionButtons}
        columns={columns}
        data={aids}
        onGetData={getData}
        paginationMeta={paginationMeta}
        onPageChange={(page, capacity) => {
          getData({ page, capacity });
        }}
      />

      <RequestAid
        onGetData={getData}
        currentFilters={currentFilters}
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectOptions={selectOptions}
      />
    </Fragment>
  );
};

export default AidsBeneficiaryView;
