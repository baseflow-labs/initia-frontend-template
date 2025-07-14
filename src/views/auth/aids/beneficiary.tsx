import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as AidApi from "../../../api/aids/aids";
import UnacceptedBeneficiary from "../../../components/card/unacceptedBeneficiary";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import TablePage from "../../../layouts/auth/pages/tablePage";
import { useAppSelector } from "../../../store/hooks";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import {
  getAidStatuses,
  getAidTypes,
} from "../../../utils/optionDataLists/aids";
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

  const getData = ({ filters = {}, page = 1, capacity = 10 }) => {
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
    getData({ filters: currentFilters, page: 1, capacity: 10 });
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
      label: t("Auth.Aids.AidType"),
      options: aidTypes,
      name: "type",
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.Aids.Beneficiary.RequestAid"),
      onClick: () => setOpenModal(true),
    },
  ];

  const columns = [
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
      name: "recaptionDate",
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
          getData({ filters: currentFilters, page, capacity });
        }}
      />

      <RequestAid
        onGetData={getData}
        currentFilters={currentFilters}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Fragment>
  );
};

export default AidsBeneficiaryView;
