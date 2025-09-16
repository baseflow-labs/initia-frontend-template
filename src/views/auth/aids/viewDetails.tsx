import { faHome, faRing, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as AidApi from "../../../api/aids/aids";
import StatisticCards from "../../../components/card/statisticCards";
import RenderCategory from "../../../components/category";
import Button from "../../../components/core/button";
import Modal from "../../../components/modal";
import DynamicTable, { dataRender, MoneyUnit } from "../../../components/table";
import { useAppSelector } from "../../../store/hooks";
import {
  apiCatchGlobalHandler,
  pluralLabelResolve,
} from "../../../utils/function";
import { CategoryView } from "./selectProgram";

interface Props {
  openModal: string;
  setOpenModal: (s: string) => void;
}

const ViewAidDetails = ({ openModal, setOpenModal }: Props) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  const [data, setData] = useState<any>({});

  const isResearcher = user.role === "researcher";

  useEffect(() => {
    if (openModal) {
      AidApi.getDetails(openModal)
        .then((res: any) => setData(res.payload))
        .catch(apiCatchGlobalHandler);
    }
  }, [openModal]);

  const onClose = () => {
    setOpenModal("");
  };

  const columns = [
    {
      type: "custom",
      name: "name",
      label: t("Auth.Aids.AidName"),
      render: (row: any) => row.aidProgram?.aidCategory?.name,
    },
    {
      type: "custom",
      name: "value",
      label: t("Auth.Aids.AidValue"),
      render: (row: any) => (
        <>
          {row.value}{" "}
          {row.aidCategories?.type === "Cash" ? (
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
  ];

  return (
    <Modal
      title={t("Auth.Aids.ViewAidDetails")}
      onClose={() => onClose()}
      className="modal-lg"
      isOpen={!!openModal}
    >
      {data.id && (
        <Fragment>
          <h5 className="mb-4">
            <b className="fw-bold">
              {isResearcher
                ? data.beneficiary?.fullName
                : data.beneficiary?.fileNo}
            </b>{" "}
          </h5>

          <h5>
            <span className="me-2">{t("Auth.Beneficiaries.IncomeTotal")}</span>
            <b className="fw-bold text-success">
              {data.incomeTotal}
              <MoneyUnit />
            </b>
          </h5>

          <StatisticCards
            statistics={[
              {
                label: t("Auth.Beneficiaries.DependentsCount"),
                count: data.dependentsCount,
                color: "success",
                icon: faUsers,
              },
              {
                label: t("Auth.Beneficiaries.WivesCount"),
                count: data.wivesCount,
                color: "primary",
                icon: faRing,
              },
              {
                label: t("Auth.Beneficiaries.HousesCount"),
                count: data.housesCount,
                color: "warning",
                icon: faHome,
              },
            ]}
          />

          <h5 className="my-4 d-flex justify-content-between">
            {t("Auth.Aids.AidDetails")}
            <div>
              <span className="text-success">
                {dataRender({
                  row: data,
                  data: data.document,
                  type: "file",
                  name: "document",
                })}
              </span>{" "}
              {t("Global.Form.Labels.SupportingDocument")}
            </div>
          </h5>

          {/* <pre style={{ direction: "ltr" }}>
            {JSON.stringify(data, null, 2)}{" "}
          </pre> */}

          <CategoryView
            t={t}
            id={data.aidProgram?.aidCategory?.id}
            name={data.aidProgram?.aidCategory?.name}
            type={data.aidProgram?.aidCategory?.type}
            balance={data.value}
            programs={[]}
          />

          <h5 className="mt-4 mb-2">{t("Auth.Aids.OldAids")}</h5>

          <DynamicTable
            columns={columns}
            data={data?.oldAids}
            fitHeight
            noPagination
            onPageChange={() => ""}
          />

          <h5 className="my-4">{t("Auth.Aids.AidPurpose")}</h5>

          <textarea
            className="form-control w-100 mb-5 border border-info bg-white text-info"
            value={data.note}
            disabled
          />
        </Fragment>
      )}

      <Button className="w-100" onClick={onClose}>
        {t("Global.Labels.Back")}
      </Button>
    </Modal>
  );
};

export default ViewAidDetails;
