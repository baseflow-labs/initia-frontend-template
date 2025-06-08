import {
  faBoxOpen,
  faCheck,
  faCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import TabsHeader from "../../../components/tab";
import DynamicTable, { dataRender } from "../../../components/table";
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

interface ReviewProps {
  property?: string;
  table?: string;
  row?: string;
  note?: string;
  label?: string;
  needUpdate?: boolean;
  confirm?: boolean;
  new?: boolean;
}

const BeneficiaryFormReview = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [beneficiary, setBeneficiary] = useState<any>();
  const [tab, setTab] = useState<string>("beneficiary");
  const [dependent, setDependent] = useState<string>("");
  const [dataReview, setDataReview] = useState<ReviewProps[]>([]);
  const [modalData, setModalData] = useState<ReviewProps>({});

  const fieldsToShow = inputsData(t);

  useEffect(() => {
    BeneficiaryApi.getById(searchParams.get("id") || "")
      .then((res) => {
        setBeneficiary(res as any);

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

        setDataReview((current) =>
          [...emptyReview, ...current].reduce(
            (final: ReviewProps[], current) =>
              final.findIndex(
                (f: any) =>
                  f.property === current.property && f.table === current.table
              ) >= 0
                ? final
                : [...final, current],
            []
          )
        );
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const title = beneficiary?.fullName;

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

      if (tab === "dependentsDataInputs") {
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

  return (
    <Fragment>
      <h2 className="text-dark fs-5 fw-semibold font-family-Cairo m-0 px-3 py-2">
        {title}
      </h2>

      <TabsHeader
        tabs={beneficiaryTabs(t)}
        activeTab={tab}
        setActiveTab={setTab}
      />

      {tab === "dependentsDataInputs" && (
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
        actions={[
          {
            icon: faCheck,
            spread: true,
            label: t("Auth.Beneficiaries.Profile.ConfirmData"),
            onClick: (data: string) =>
              setDataReview((current) =>
                current.map((row) =>
                  row.property === data && row.table === tab
                    ? {
                        ...row,
                        note: "",
                        table: tab,
                        property: data,
                        needUpdate: false,
                        confirm: true,
                        new: true,
                      }
                    : row
                )
              ),
          },
          {
            icon: faEdit,
            spread: true,
            label: t("Auth.Beneficiaries.Profile.editRequest"),
            onClick: (data: string) =>
              setModalData(
                dataReview.find(
                  (r) => r.property === data && r.table === tab
                ) || {}
              ),
          },
          {
            icon: faBoxOpen,
            spread: true,
            label: t("Auth.Beneficiaries.Profile.archive"),
            onClick: (data: string) => console.log(data),
          },
        ]}
      />

      <Modal
        title={t("Auth.Beneficiaries.Profile.RequestDataUpdate", {
          property: modalData.label,
        })}
        onClose={() => setModalData({})}
        isOpen={!!modalData.property}
      >
        <Form
          initialValues={dataReview}
          inputs={() => [
            {
              name: "note",
              type: "textarea",
              label: t("Auth.Beneficiaries.Profile.UpdateNote"),
            },
          ]}
          submitText={t("Global.Form.Labels.SubmitApplication")}
          onFormSubmit={(e) => {
            setDataReview((current) =>
              current.map((row) =>
                row.property === modalData.property &&
                row.table === modalData.table
                  ? {
                      ...row,
                      note: e.note,
                      needUpdate: true,
                      new: true,
                      confirm: false,
                    }
                  : row
              )
            );
            setModalData({});
          }}
        />
      </Modal>
    </Fragment>
  );
};

export default BeneficiaryFormReview;
