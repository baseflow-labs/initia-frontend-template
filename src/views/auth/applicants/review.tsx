import {
  faBoxOpen,
  faCheck,
  faCircle,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as DataReviewApi from "../../../api/profile/dataReview";
import Button from "../../../components/core/button";
import TabsHeader from "../../../components/tab/header";
import DynamicTable, { dataRender } from "../../../components/table";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import { addNotification } from "../../../store/actions/notifications";
import {
  beneficiaryTabs,
  inputsData,
} from "../../../utils/formInputs/beneficiaryProfileMapping";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
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
  const [housingTab, setHousingTab] = useState<string>("");
  const [dependentTab, setDependentTab] = useState<string>("");
  const [dataReview, setDataReview] = useState<ReviewProps[]>([]);
  const [dataArchive, setDataArchive] = useState<ReviewProps[]>([]);

  useLayoutEffect(() => {
    BeneficiaryApi.getById(searchParams.get("id") || "")
      .then((beneficiaryRes: any) => {
        setBeneficiary(beneficiaryRes.payload);

        const emptyReview: ReviewProps[] = [];

        const fieldsToShow = inputsData(t);

        Object.keys(fieldsToShow).forEach((table) => {
          fieldsToShow[table].forEach(({ name, label }) => {
            if (table === "housing") {
              beneficiaryRes.payload.housing.forEach((h: { id: string }) => {
                emptyReview.push({
                  table,
                  property: name,
                  label,
                  row: h.id,
                });
              });
            } else if (table === "dependents") {
              beneficiaryRes.payload.dependents.forEach((d: { id: string }) => {
                emptyReview.push({
                  table,
                  property: name,
                  label,
                  row: d.id,
                });
              });
            } else {
              emptyReview.push({
                table,
                property: name,
                label,
              });
            }
          });
        });

        DataReviewApi.getBeneficiaryDataReview(
          beneficiaryRes.payload.beneficiary.id
        )
          .then((reviewResp: any) => {
            setDataArchive(
              reviewResp.payload.filter(({ dataUpdate = null }) => dataUpdate)
            );

            const resp = reviewResp.payload
              .filter(({ dataUpdate = null }) => !dataUpdate)
              .map(({ needUpdate = false, table = "", ...rest }) => ({
                ...rest,
                table: table === "dependent" ? "dependents" : table,
                needUpdate,
                confirm: !needUpdate,
              }));

            setDataReview(() =>
              [...resp, ...emptyReview].reduce(
                (final: ReviewProps[], current) =>
                  final.find(
                    (f) =>
                      f.property === current.property &&
                      f.table === current.table &&
                      f.row === current.row
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

  useLayoutEffect(() => {
    if (tab === "housing" && beneficiary?.housing?.length && !housingTab) {
      setHousingTab(beneficiary.housing[0].id);
    }
  }, [tab, housingTab]);

  useLayoutEffect(() => {
    if (
      tab === "dependents" &&
      beneficiary?.dependents?.length &&
      !dependentTab
    ) {
      setDependentTab(beneficiary.dependents[0].id);
    }
  }, [tab, dependentTab]);

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

  const housingTabs = beneficiary?.housing?.map(
    ({
      id,
      nationalAddressNumber,
    }: {
      id: string;
      nationalAddressNumber: string;
    }) => ({
      id,
      name: id,
      title: nationalAddressNumber,
    })
  );

  const dependentTabs = beneficiary?.dependents?.map(
    ({ id, fullName }: { id: string; fullName: string }) => ({
      id,
      name: id,
      title: fullName,
    })
  );

  const data = inputsData(t)
    [tab]?.filter(({ type = "" }) => type !== "title" && type !== "file")
    .map(({ name, label, type, options }) => {
      if (beneficiary?.beneficiary) {
        let beneficiaryData = beneficiary?.[tab];

        if (tab === "housing" && Array.isArray(beneficiaryData)) {
          beneficiaryData = beneficiaryData.find(
            ({ id }: { id: string }) => housingTab === id
          );
        }

        if (tab === "dependents" && Array.isArray(beneficiaryData)) {
          beneficiaryData = beneficiaryData.find(
            ({ id }: { id: string }) => dependentTab === id
          );
        }

        const dataReviewRow = dataReview.find((r) => {
          if (r.property !== name || r.table !== tab) return false;
          if (tab === "housing") {
            return r.row === housingTab;
          }
          if (tab === "dependents") {
            return r.row === dependentTab;
          }
          return true;
        });

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
            name,
          }),
        };
      }

      return {};
    });

  const onSubmit = () => {
    DataReviewApi.submitReview(
      beneficiary.beneficiary?.id,
      dataReview
        .filter((row) => row.new)
        .map((d) =>
          d.table === "dependents" ? { ...d, table: "dependent" } : d
        )
    )
      .then(() => {
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Beneficiaries.Profile.ProfileReview"),
              data: beneficiary.beneficiary?.fileNo,
            }),
          })
        );

        navigate("/applicant");
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <PageTemplate>
      <div className="row justify-content-between">
        <div className="col-6 col-lg-9">
          <h2 className="text-dark fs-5 fw-semibold m-0 px-3 py-2">
            {beneficiary?.beneficiary?.fullName}
          </h2>
        </div>

        <div className="col-6 col-lg-3">
          <Button className="float-end" onClick={() => onSubmit()}>
            <FontAwesomeIcon icon={faSave} /> {t("Global.Form.Labels.SaveData")}
          </Button>
        </div>
      </div>

      <TabsHeader
        tabs={beneficiaryTabs(t)}
        activeTab={tab}
        setActiveTab={setTab}
      />

      {tab === "housing" && (
        <TabsHeader
          tabs={housingTabs}
          activeTab={housingTab}
          setActiveTab={setHousingTab}
        />
      )}

      {tab === "dependents" && (
        <TabsHeader
          tabs={dependentTabs}
          activeTab={dependentTab}
          setActiveTab={setDependentTab}
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
                  current.map((row) => {
                    const isSameRow =
                      row.property === property &&
                      row.table === tab &&
                      (tab === "dependents"
                        ? row.row === dependentTab
                        : tab === "housing"
                        ? row.row === housingTab
                        : true);

                    return isSameRow
                      ? {
                          ...row,
                          note: "",
                          table: tab,
                          property,
                          row:
                            tab === "dependents"
                              ? dependentTab
                              : tab === "housing"
                              ? housingTab
                              : undefined,
                          needUpdate: false,
                          confirm: true,
                          new: true,
                        }
                      : row;
                  })
                );
              },
            },
            {
              icon: faEdit,
              spread: true,
              label: t("Auth.Beneficiaries.Profile.editRequest"),
              onClick: (property: string) => {
                const match = dataReview.find(
                  (r) =>
                    r.property === property &&
                    r.table === tab &&
                    (tab === "dependents"
                      ? r.row === dependentTab
                      : tab === "housing"
                      ? r.row === housingTab
                      : true)
                );
                setUpdateModalData(match || {});
              },
            },
          ];

          const conditional = [
            {
              icon: faBoxOpen,
              spread: true,
              label: t("Auth.Beneficiaries.Profile.archive"),
              onClick: (property: string) => {
                const archive = dataArchive.filter(
                  (r) =>
                    r.property === property &&
                    r.table === tab &&
                    (tab === "dependents"
                      ? r.row === dependentTab
                      : tab === "housing"
                      ? r.row === housingTab
                      : true)
                );
                if (archive.length) {
                  setArchiveModalData(archive);
                }
              },
            },
          ];

          const hasArchive = dataArchive.some(
            (r) =>
              r.property === id &&
              r.table === tab &&
              (tab === "dependents"
                ? r.row === dependentTab
                : tab === "housing"
                ? r.row === housingTab
                : true)
          );

          return hasArchive ? [...fixed, ...conditional] : fixed;
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
    </PageTemplate>
  );
};

export default BeneficiaryFormReview;
