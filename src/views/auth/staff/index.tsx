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
import PageTemplate from "../../../layouts/auth/pageTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { beneficiariesIcon } from "../../../assets/icons/icons";

const ResearcherMgmtPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const staff = [
    {
      fullName: "ناصر الدوسري",
      email: "naser@gmail.com",
      phoneNumber: "966505546515",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
      beneficiariesCount: 20,
      visitsCount: 15,
    },
    {
      fullName: "ناصر الدوسري",
      email: "naser@gmail.com",
      phoneNumber: "966505546515",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
      beneficiariesCount: 20,
      visitsCount: 15,
    },
    {
      fullName: "ناصر الدوسري",
      email: "naser@gmail.com",
      phoneNumber: "966505546515",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
      beneficiariesCount: 20,
      visitsCount: 15,
    },
    {
      fullName: "ناصر الدوسري",
      email: "naser@gmail.com",
      phoneNumber: "966505546515",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
      beneficiariesCount: 20,
      visitsCount: 15,
    },
  ];

  return (
    <PageTemplate
      title={t("Auth.Researchers.Title")}
      actionButtons={[
        {
          label: t("Auth.Researchers.AddResearcher"),
          onClick: () => setOpenModal(true),
        },
      ]}
      onSearch={(values) => console.log(values)}
    >
      <Fragment>
        <div className="row g-5">
          {staff.map(
            (
              {
                fullName,
                email,
                phoneNumber,
                image,
                beneficiariesCount,
                visitsCount,
              },
              i
            ) => (
              <div className="col-12 col-md-4 col-lg-3" key={i}>
                <div className="card py-4">
                  <img
                    src={image}
                    className="card-img-top w-50 rounded-circle mx-auto"
                    alt="..."
                  />

                  <div className="card-body text-center">
                    <h5 className="card-title">{fullName}</h5>

                    <p className="card-text my-4" style={{ direction: "ltr" }}>
                      <a
                        href={"mailto:" + email}
                        target="_blank"
                        className="text-decoration-none text-muted"
                      >
                        <FontAwesomeIcon icon={faEnvelope} /> {email}
                      </a>

                      <br />

                      <a
                        href={"tel:" + phoneNumber}
                        target="_blank"
                        className="text-decoration-none text-muted"
                      >
                        <FontAwesomeIcon icon={faPhone} /> {phoneNumber}
                      </a>
                    </p>

                    <Button
                      color="info"
                      outline
                      size="lg"
                      className="w-50 py-3"
                    >
                      <FontAwesomeIcon icon={faEdit} />{" "}
                      {t("Global.Form.Labels.Edit")}
                    </Button>
                  </div>
                </div>

                <div className="row mt-4 gx-5">
                  <div className="col-6 text-center">
                    <div className="rounded-4 bg-info p-2">
                      <h6>{t("Auth.Researchers.BeneficiariesCount")}</h6>
                      <h2>{Math.floor(beneficiariesCount / (i + 4))}</h2>
                    </div>
                  </div>

                  <div className="col-6 text-center">
                    <div className="rounded-4 bg-success p-2">
                      <h6>{t("Auth.Researchers.VisitsCount")}</h6>
                      <h2>{visitsCount + i}</h2>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </Fragment>
    </PageTemplate>
  );
};

export default ResearcherMgmtPage;
