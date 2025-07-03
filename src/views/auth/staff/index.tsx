import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { faEdit, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import PageTemplate from "../../../layouts/auth/pageTemplate";

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
        "https://executivesupportmagazine.com/wp-content/uploads/2022/09/Mohammed-Humaid-Almutairy.jpg",
      beneficiariesCount: 20,
      visitsCount: 15,
    },
    {
      fullName: "ناصر الدوسري",
      email: "naser@gmail.com",
      phoneNumber: "966505546515",
      image:
        "https://executivesupportmagazine.com/wp-content/uploads/2022/09/Mohammed-Humaid-Almutairy.jpg",
      beneficiariesCount: 20,
      visitsCount: 15,
    },
    {
      fullName: "ناصر الدوسري",
      email: "naser@gmail.com",
      phoneNumber: "966505546515",
      image:
        "https://executivesupportmagazine.com/wp-content/uploads/2022/09/Mohammed-Humaid-Almutairy.jpg",
      beneficiariesCount: 20,
      visitsCount: 15,
    },
    {
      fullName: "ناصر الدوسري",
      email: "naser@gmail.com",
      phoneNumber: "966505546515",
      image:
        "https://executivesupportmagazine.com/wp-content/uploads/2022/09/Mohammed-Humaid-Almutairy.jpg",
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
                  <div
                    className="mx-auto rounded-circle overflow-hidden"
                    style={{ width: "150px", height: "150px" }}
                  >
                    <img
                      src={image}
                      alt="..."
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

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

                    <Button color="info" outline size="xs">
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

        <Modal
          title={t("Auth.Researchers.AddResearcher")}
          onClose={() => setOpenModal(false)}
          isOpen={!!openModal}
        >
          <Form
            inputs={() => [
              {
                label: t("Auth.Researchers.ResearcherName"),
                name: "fullName",
                type: "text",
                required: true,
              },
              {
                label: t("Global.Form.Label.PhoneNumber"),
                name: "phoneNumber",
                type: "phoneNumber",
                required: true,
              },
              {
                label: t("Global.Form.Label.Email"),
                name: "email",
                type: "email",
                required: true,
              },
              {
                label: t("Auth.Researchers.AddProfilePhoto"),
                name: "photo",
                type: "file",
                required: true,
              },
            ]}
            submitText={t("Auth.Researchers.AddResearcher")}
            onFormSubmit={(e) => {
              // BeneficiaryApi.cancel(openModal || "", e)
              //   .then((res) => {
              //     dispatch(
              //       addNotification({
              //         msg: t("Global.Form.SuccessMsg", {
              //           action: t(
              //             "Auth.Beneficiaries.Profile.CancelMembership"
              //           ),
              //           data: beneficiaries.find(
              //             (b) => b.id === openModal
              //           )?.fullName,
              //         }),
              //       })
              //     );
              //     getData({});
              //     setOpenModal(null);
              //   })
              //   .catch(apiCatchGlobalHandler);
              console.log({ e });
            }}
          />
        </Modal>
      </Fragment>
    </PageTemplate>
  );
};

export default ResearcherMgmtPage;
