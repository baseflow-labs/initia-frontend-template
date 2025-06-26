import { FormikProps } from "formik";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as MetadataApi from "../../../api/metadata";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { setFontSize, setMetadata } from "../../../store/actions/settings";
import { useAppSelector } from "../../../store/hooks";
import { apiCatchGlobalHandler } from "../../../utils/function";

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fontSize, ...metadata } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);

  const onMetadataSubmit = (values = {}) => {
    const data = Object.keys(values)
      .filter((key) => (values as any)[key])
      .reduce((final, key) => ({ ...final, [key]: (values as any)[key] }), {});

    MetadataApi.update(data)
      .then(() => {
        dispatch(setMetadata(data as any));

        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Global.Form.Labels.Update"),
              data: t("Auth.Settings.Title"),
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  const beneficiaryInputs = () => [
    {
      type: "range",
      name: "fontSize",
      min: 10,
      max: 25,
      label: t("Auth.Settings.FontSize"),
      defaultValue: 15,
    },
  ];

  const staffInputs = (formik: FormikProps<Record<string, any>>) => {
    const final = [
      {
        type: "range",
        name: "fontSize",
        min: 10,
        max: 25,
        label: t("Auth.Settings.FontSize"),
        defaultValue: 15,
      },
      {
        type: "text",
        name: "name",
        label: t("Auth.Settings.SocietyName"),
      },
      {
        type: "file",
        name: "logo",
        label: t("Auth.Settings.SocietyLogo"),
      },
      {
        type: "selectMany",
        name: "provinces",
        options: [{ value: "All", label: t("Auth.Settings.AllProvinces") }],
        label: t("Auth.Settings.SocietyProvinces"),
      },
    ];

    const allProvinces = formik?.values.provinces?.includes("All");
    const allGovernorate = formik?.values.governorate?.includes("All");
    const allCities = formik?.values.cities?.includes("All");

    if (!allProvinces) {
      final.push({
        type: "selectMany",
        name: "governorate",
        options: [{ value: "All", label: t("Auth.Settings.AllGovernorate") }],
        label: t("Auth.Settings.SocietyGovernorate"),
      });
    }

    if (!allProvinces && !allGovernorate) {
      final.push({
        type: "selectMany",
        name: "cities",
        options: [{ value: "All", label: t("Auth.Settings.AllCities") }],
        label: t("Auth.Settings.SocietyCities"),
      });
    }

    if (!allProvinces && !allGovernorate && !allCities) {
      final.push({
        type: "selectMany",
        name: "districts",
        options: [{ value: "All", label: t("Auth.Settings.AllDistricts") }],
        label: t("Auth.Settings.SocietyDistricts"),
      });
    }

    final.push({
      type: "phoneNumber",
      name: "phoneNumber",
      label: t("Auth.Settings.SocietyPhoneNumber"),
    });

    final.push({
      type: "location",
      name: "location",
      label: t("Auth.Settings.SocietyLocation"),
    });

    final.push({
      type: "text",
      name: "address",
      label: t("Auth.Settings.SocietyAddress"),
    });

    final.push({
      type: "url",
      name: "website",
      label: t("Auth.Settings.SocietyWebsite"),
    });

    return final;
  };

  const deleteBeneficiary = () => {
    BeneficiaryApi.removeByUser(user.id || "").then(() => {
      setOpenModal(false);
      dispatch(
        addNotification({
          msg: t("Global.Form.SuccessMsg", {
            action: t("Auth.Beneficiaries.Profile.DeleteData"),
            data: "كم",
          }),
        })
      );
    });
  };

  return (
    <div className="border border-3 border-dark rounded-5 mx-auto w-50 p-5">
      <h3 className="mb-5">{t("Auth.Settings.Title")}</h3>

      <Form
        inputs={user.role === "beneficiary" ? beneficiaryInputs : staffInputs}
        initialValues={{
          fontSize: fontSize,
          ...metadata,
        }}
        submitText={t("Global.Form.Labels.Save")}
        onFormSubmit={(values) => {
          onMetadataSubmit(values);
          dispatch(setFontSize(values.fontSize));
          dispatch(
            addNotification({
              msg: t("Global.Form.SuccessMsg", {
                action: t("Global.Form.Labels.Update"),
                data: t("Auth.Settings.Title"),
              }),
            })
          );
        }}
      />

      {user.role === "beneficiary" ? (
        <Fragment>
          <Button
            onClick={() => setOpenModal(true)}
            color="danger"
            className="my-3 w-100"
          >
            {t("Auth.Beneficiaries.Profile.DeleteData")}
          </Button>

          <Modal
            title={t("Auth.Beneficiaries.Profile.DeleteData")}
            onClose={() => setOpenModal(false)}
            isOpen={openModal}
          >
            <h3> {t("Auth.Beneficiaries.Profile.SureToDeleteData")}</h3>

            <div className="btn-group w-100" role="group">
              <Button
                onClick={() => deleteBeneficiary()}
                color="danger"
                className="my-3"
              >
                {t("Global.Form.Labels.Yes")}
              </Button>

              <Button
                outline
                onClick={() => setOpenModal(false)}
                color="info"
                className="my-3"
              >
                {t("Global.Form.Labels.No")}
              </Button>
            </div>
          </Modal>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default SettingsPage;
