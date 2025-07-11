import {
  faBoxOpen,
  faCheck,
  faCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as DataReviewApi from "../../../api/profile/dataReview";
import Button from "../../../components/core/button";
import TabsHeader from "../../../components/tab";
import DynamicTable, { dataRender } from "../../../components/table";
import { addNotification } from "../../../store/actions/notifications";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import {
  beneficiaryMapping,
  beneficiaryTabs,
  inputsData,
} from "../../../utils/inputsData";
import RequestDataUpdate from "./requestDataUpdate";
import ViewDataArchive from "./viewDataArchive";

export interface ReviewProps {
  property?: string;
  table?: string;
  row?: string;
  note?: string;
  label?: string;
  needUpdate?: boolean;
  confirm?: boolean;
  dataUpdate?: { createdAt: string; data: string };
  new?: boolean;
}

const BeneficiaryFormReview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [archiveModalData, setArchiveModalData] = useState<ReviewProps[]>([]);
  const [updateModalData, setUpdateModalData] = useState<ReviewProps>({});

  const [beneficiary, setBeneficiary] = useState<any>();
  const [tab, setTab] = useState<string>("beneficiary");
  const [dependent, setDependent] = useState<string>("");
  const [dataReview, setDataReview] = useState<ReviewProps[]>([]);
  const [dataArchive, setDataArchive] = useState<ReviewProps[]>([]);

  const fieldsToShow = inputsData(t);

  useLayoutEffect(() => {
    BeneficiaryApi.getById(searchParams.get("id") || "")
      .then((res: any) => {
        setBeneficiary(res.payload);

        const emptyReview: ReviewProps[] = [];

        Object.keys(fieldsToShow).forEach((table) => {
          fieldsToShow[table].forEach(({ name, label }) => {
            emptyReview.push({
              table,
              property: name,
              label,
            });
          });
        });

        DataReviewApi.getBeneficiaryDataReview(res.payload.id)
          .then((res: any) => {
            setDataArchive(
              res.payload.filter(({ dataUpdate = null }) => dataUpdate)
            );

            const resp = res.payload
              .filter(({ dataUpdate = null }) => !dataUpdate)
              .map(({ needUpdate = false, ...rest }) => ({
                ...rest,
                needUpdate,
                confirm: !needUpdate,
              }));

            setDataReview(() =>
              [...resp, ...emptyReview].reduce(
                (final: ReviewProps[], current) =>
                  final.find(
                    (f) =>
                      f.property === current.property &&
                      f.table === current.table
                  )
                    ? final
                    : [...final, current],
                []
              )
            );
          })
          .catch(apiCatchGlobalHandler);
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const statuses = [
    {
      value: "Need Update",
      label: t("Auth.Beneficiaries.Profile.Statuses.NeedUpdate"),
    },
    {
      value: "Confirmed",
      label: t("Auth.Beneficiaries.Profile.Statuses.Confirmed"),
    },
    {
      value: "In Preview",
      label: t("Auth.MembershipRegistration.Statuses.InPreview"),
    },
  ];

  const columns = [
    {
      name: "field",
      label: t("Auth.Beneficiaries.Profile.field"),
    },
    {
      name: "info",
      label: t("Auth.Beneficiaries.Profile.info"),
    },
    {
      name: "note",
      label: t("Auth.Beneficiaries.Profile.notes"),
    },
    {
      type: "custom",
      render: (row: any) => (
        <Fragment>
          <FontAwesomeIcon
            icon={faCircle}
            className={`text-${statusColorRender(row.status || "Pending")}`}
          />{" "}
          {renderDataFromOptions(row.status || "Pending", statuses)}
        </Fragment>
      ),
      name: "status",
      label: t("Auth.Beneficiaries.Profile.editStatus"),
    },
  ];

  const dependentTabs = beneficiary?.dependents?.map(
    ({ id, fullName }: { id: string; fullName: string }) => ({
      id: id,
      name: fullName,
      title: fullName,
    })
  );

  const data = fieldsToShow[tab]
    ?.filter(({ type = "" }) => type !== "title")
    .map(({ name, label, type, options }) => {
      let beneficiaryData = beneficiaryMapping[tab]
        ? beneficiary?.[beneficiaryMapping[tab]]
        : beneficiary;

      if (tab === "dependents") {
        if (!dependent) {
          setDependent(beneficiaryData[0].id);
        }
        beneficiaryData = beneficiaryData?.find(
          ({ id }: { id: string }) => dependent === id
        );
      }

      const dataReviewRow = dataReview.find(
        (r) => r.property === name && r.table === tab
      );

      const status = dataReviewRow?.needUpdate
        ? "Need Update"
        : dataReviewRow?.confirm
        ? "Confirmed"
        : "In Preview";

      return {
        id: name,
        field: t(label || ""),
        note: dataReviewRow?.note,
        status,
        info: dataRender({
          data: beneficiaryData?.[name],
          type,
          options,
        }),
      };
    });

  const onSubmit = () => {
    DataReviewApi.submitReview(
      beneficiary.id,
      dataReview.filter((row) => row.new)
    )
      .then(() => {
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Beneficiaries.Profile.ProfileReview"),
              data: beneficiary.fullName,
            }),
          })
        );

        navigate("/beneficiary");
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <Fragment>
      <div className="row justify-content-between">
        <div className="col-6 col-lg-9">
          <h2 className="text-dark fs-5 fw-semibold m-0 px-3 py-2">
            {beneficiary?.fullName}
          </h2>
        </div>

        <div className="col-6 col-lg-3">
          <Button className="float-end" onClick={() => onSubmit()}>
            {t("Global.Form.Labels.SaveData")}
          </Button>
        </div>
      </div>

      <TabsHeader
        tabs={beneficiaryTabs(t)}
        activeTab={tab}
        setActiveTab={setTab}
      />

      {tab === "dependents" && (
        <TabsHeader
          tabs={dependentTabs}
          activeTab={dependent}
          setActiveTab={setDependent}
        />
      )}

      <DynamicTable
        noPagination
        columns={columns}
        data={data}
        onPageChange={() => console.log(1)}
        actions={(id?: string) => {
          const fixed = [
            {
              icon: faCheck,
              spread: true,
              label: t("Auth.Beneficiaries.Profile.ConfirmData"),
              onClick: (property: string) => {
                setDataReview((current) =>
                  current.map((row) =>
                    row.property === property && row.table === tab
                      ? {
                          ...row,
                          note: "",
                          table: tab,
                          property,
                          needUpdate: false,
                          confirm: true,
                          new: true,
                        }
                      : row
                  )
                );
              },
            },
            {
              icon: faEdit,
              spread: true,
              label: t("Auth.Beneficiaries.Profile.editRequest"),
              onClick: (data: string) =>
                setUpdateModalData(
                  dataReview.find(
                    (r) => r.property === data && r.table === tab
                  ) || {}
                ),
            },
          ];

          const conditional = [
            {
              icon: faBoxOpen,
              spread: true,
              label: t("Auth.Beneficiaries.Profile.archive"),
              onClick: (id: string) => {
                const archive = dataArchive.filter(
                  (r) => r.property === id && r.table === tab
                );
                if (archive) {
                  setArchiveModalData(archive);
                }
              },
            },
          ];

          return dataArchive.filter((r) => r.property === id && r.table === tab)
            ?.length
            ? [...fixed, ...conditional]
            : fixed;
        }}
      />

      <RequestDataUpdate
        openModal={updateModalData}
        setOpenModal={setUpdateModalData}
        dataReview={dataReview}
        setDataReview={setDataReview}
      />

      <ViewDataArchive
        openModal={archiveModalData}
        setOpenModal={setArchiveModalData}
      />
    </Fragment>
  );
};

export default BeneficiaryFormReview;
