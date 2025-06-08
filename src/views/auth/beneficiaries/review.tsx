import { faBoxOpen, faCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSearchParams } from "react-router";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
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

const BeneficiaryFormReview = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [beneficiary, setBeneficiary] = useState<any>();
  const [tab, setTab] = useState<string>("basicDataInputs");
  const [dependent, setDependent] = useState<string>("");

  const fieldsToShow = inputsData(t);

  useEffect(() => {
    BeneficiaryApi.getById(searchParams.get("id") || "")
      .then((res) => {
        setBeneficiary(res as any);
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const title = beneficiary?.fullName;

  const statuses = [
    {
      value: "New Member",
      label: t("Auth.MembershipRegistration.Statuses.NewMember"),
    },
    {
      value: "Incomplete",
      label: t("Auth.MembershipRegistration.Statuses.Incomplete"),
    },
    {
      value: "Need Help",
      label: t("Auth.MembershipRegistration.Statuses.NeedHelp"),
    },
    {
      value: "Rejected",
      label: t("Auth.MembershipRegistration.Statuses.Rejected"),
    },
    {
      value: "Accepted",
      label: t("Auth.MembershipRegistration.Statuses.Accepted"),
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
      name: "notes",
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
      name: "editStatus",
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

      return {
        id: name,
        field: t(label || ""),
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
            icon: faEdit,
            spread: true,
            label: t("Auth.Beneficiaries.Profile.editRequest"),
            onClick: (data: string | object) => console.log(data),
          },
          {
            icon: faBoxOpen,
            spread: true,
            label: t("Auth.Beneficiaries.Profile.archive"),
            onClick: (data: string | object) => console.log(data),
          },
        ]}
      />
    </Fragment>
  );
};

export default BeneficiaryFormReview;
