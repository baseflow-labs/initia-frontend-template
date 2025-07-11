import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as DataReviewApi from "../../../api/profile/dataReview";
import * as DataUpdateApi from "../../../api/profile/dataUpdate";
import CardComp from "../../../components/card/card";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import {
  getBasicDataInputs,
  getContactBankDataInputs,
  getHousingDataInputs,
  getIncomeQualificationDataInputs,
  getNationalRecordDataInputs,
} from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";

const BeneficiaryOwnProfile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [beneficiary, setBeneficiary] = useState<any>();
  const [dataReviews, setDataReviews] =
    useState<
      { id: string; table: string; property: string; row?: {}; note?: string }[]
    >();

  const callData = () => {
    BeneficiaryApi.getByUserId()
      .then((res: any) => {
        setBeneficiary(res.payload);
      })
      .catch(apiCatchGlobalHandler);

    DataReviewApi.getNonUpdatedDataReview(user.id || "")
      .then((res: any) => setDataReviews(res.payload))
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    callData();
  }, []);

  const basicDataInputs = getBasicDataInputs(t);

  const contactDataInputs = getContactBankDataInputs(t);

  const qualificationDataInputs = getIncomeQualificationDataInputs(t);

  const hostelDataInputs = getHousingDataInputs(t);

  // const dependentsDataInputs = getDependantDataInputs(t);

  const attachmentInputs = getNationalRecordDataInputs(t);

  // const cards = [
  //   {
  //     title: t("Auth.MembershipRegistration.Form.BasicData"),
  //     data: beneficiary?.beneficiary,
  //     map: basicDataInputs,
  //   },
  //   {
  //     title: t("Auth.MembershipRegistration.Form.ContactData"),
  //     data: beneficiary?.contactsBank,
  //     map: contactDataInputs,
  //   },
  //   {
  //     title: t("Auth.MembershipRegistration.Form.QualificationData"),
  //     data: beneficiary?.income,
  //     map: qualificationDataInputs,
  //   },
  //   {
  //     title: t("Auth.MembershipRegistration.Form.HostelData"),
  //     data: beneficiary?.housing,
  //     map: hostelDataInputs,
  //   },
  //   ...(beneficiary?.dependents?.map((dependent: any) => ({
  //     title: t("Auth.MembershipRegistration.Form.DependantData", {
  //       name: dependent.fullName,
  //     }),
  //     data: dependent,
  //     map: dependentsDataInputs,
  //   })) || []),
  //   {
  //     title: t("Auth.MembershipRegistration.Form.Attachments"),
  //     data: beneficiary?.nationalRecord,
  //     map: attachmentInputs,
  //   },
  // ];

  const mapping = [
    {
      table: "beneficiary",
      inputs: basicDataInputs,
      data: beneficiary?.beneficiary,
    },
    {
      table: "income",
      inputs: qualificationDataInputs,
      data: beneficiary?.income,
    },
    {
      table: "contactsBank",
      inputs: contactDataInputs,
      data: beneficiary?.contactsBank,
    },
    {
      table: "housing",
      inputs: hostelDataInputs,
      data: beneficiary?.housing,
    },
    // {
    //   table: "dependant",
    //   inputs: dependentsDataInputs,
    //   data: beneficiary?.dependents
    // },
    {
      table: "nationalRecord",
      inputs: attachmentInputs,
      data: beneficiary?.nationalRecord,
    },
  ];

  const onDataUpdate = (data = {}) => {
    DataUpdateApi.create(data)
      .then(() => {
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Global.Form.Labels.Update"),
              data: t("Auth.Beneficiary.Profile.YourProfile"),
            }),
          })
        );
        callData();
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <PageTemplate>
      <div className="row">
        <div className="col-lg-12 mb-4">
          <h3>{t("Auth.Beneficiary.Profile.Title")}</h3>
        </div>

        <div className="col-lg-12 mb-4 row">
          <h5 className="mb-4">
            {dataReviews?.length
              ? t("Auth.Beneficiary.Profile.PleaseUpdateFollowingData")
              : t("Auth.Beneficiary.Profile.NoDataUpdate")}
          </h5>

          {dataReviews?.map(({ id, table, property, row, note }, i) => {
            const requestTable = mapping.find(
              ({ table: mapTable }) => mapTable === table
            );

            const requestProperty = requestTable?.inputs.find(
              ({ name }) => name === property
            );

            const currentData = requestTable?.data[property];

            return (
              <div className="col-lg-6" key={i}>
                <CardComp>
                  <div className="card-body p-5">
                    {requestProperty && (
                      <Form
                        inputs={() =>
                          [requestProperty].map((prop) => ({
                            ...prop,
                            defaultValue: currentData,
                            required: true,
                          }))
                        }
                        onFormSubmit={(values) =>
                          onDataUpdate({
                            data: values[property],
                            dataReview: id,
                          })
                        }
                      />
                    )}
                  </div>
                </CardComp>
              </div>
            );
          })}
        </div>

        {/* <div className="col-lg-12 mt-5">
          <h5>{t("Auth.Beneficiary.Profile.CurrentData")}</h5>
        </div>

        {cards.map(({ title, data, map }, i) => (
          <div className="col-lg-6 my-5" key={i}>
            <h4 className="my-4">{title}</h4>

            <div className="card h-100 rounded-4">
              <div className="card-body">
                <table className="table table-borderless">
                  <tbody>
                    {data &&
                      map
                        // .reduce(
                        //   (
                        //     final: {
                        //       prop1: InputSingleProps;
                        //       prop2?: InputSingleProps;
                        //     }[],
                        //     current,
                        //     i
                        //   ) => {
                        //     if (i % 2 === 0) {
                        //       final.push({
                        //         prop1: current,
                        //         prop2: map[i + 1] || null,
                        //       });
                        //     }

                        //     return final;
                        //   },
                        //   []
                        // )
                        .map((prop: InputSingleProps, y = 0) => (
                          <tr key={y}>
                            <td className="pb-3">{prop.label}</td>

                            <td className="pb-3">
                              {dataRender({
                                data: (data as any)[prop.name || "id"],
                                type: prop.type,
                                options: prop.options || [],
                              })}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </PageTemplate>
  );
};

export default BeneficiaryOwnProfile;
