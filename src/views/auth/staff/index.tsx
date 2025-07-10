import { faEdit, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { GetDataProps } from "../../../api";
import * as ResearcherApi from "../../../api/staff/researcher";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import PageTemplate from "../../../layouts/auth/pageTemplate";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

const ResearcherMgmtPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState<Object | undefined>(undefined);
  const [researchers, setResearchers] = useState<
    {
      id?: string;
      fullName: string;
      email: string;
      username: string;
      idNumber: string;
      image: string;
      beneficiariesCount: number;
      visitsCount: number;
    }[]
  >([]);

  const getData = (filters: GetDataProps) => {
    ResearcherApi.getAll(filters)
      .then((res) => {
        setResearchers(res as any);
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({});
  }, []);

  return (
    <PageTemplate
      title={t("Auth.Researchers.Title")}
      actionButtons={[
        {
          label: t("Auth.Researchers.AddResearcher"),
          onClick: () => setOpenModal({}),
        },
      ]}
      onSearch={(values) => console.log(values)}
    >
      <Fragment>
        <div className="row g-5 justify-content-center">
          {researchers.map(
            (
              {
                id,
                fullName,
                email,
                username,
                image,
                beneficiariesCount,
                visitsCount,
              },
              i
            ) => (
              <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={i}>
                <div className="card rounded-4 py-4">
                  <div
                    className="mx-auto rounded-circle overflow-hidden"
                    style={{ width: "150px", height: "150px" }}
                  >
                    <img
                      src={
                        image ||
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                      }
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
                        href={"tel:966" + username}
                        target="_blank"
                        className="text-decoration-none text-muted"
                      >
                        <FontAwesomeIcon icon={faPhone} /> +966{username}
                      </a>
                    </p>

                    {/* <Button
                      color="info"
                      outline
                      size="xs"
                      onClick={() =>
                        setOpenModal({
                          id,
                          name: fullName,
                          email,
                          username,
                          image,
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faEdit} />{" "}
                      {t("Global.Form.Labels.Edit")}
                    </Button> */}
                  </div>
                </div>

                <div className="row mt-4 gx-5">
                  <div className="col-6 text-center">
                    <div className="rounded-4 bg-info p-2">
                      <h6>{t("Auth.Researchers.BeneficiariesCount")}</h6>
                      <h2>{Math.floor(beneficiariesCount)}</h2>
                    </div>
                  </div>

                  <div className="col-6 text-center">
                    <div className="rounded-4 bg-success p-2">
                      <h6>{t("Auth.Researchers.VisitsCount")}</h6>
                      <h2>{visitsCount}</h2>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <Modal
          title={t("Auth.Researchers.AddResearcher")}
          onClose={() => setOpenModal(undefined)}
          isOpen={!!openModal}
        >
          <Form
            inputs={() => [
              {
                label: t("Auth.Researchers.ResearcherName"),
                name: "name",
                type: "text",
                required: true,
              },
              {
                label: t("Global.Form.Label.PhoneNumber"),
                name: "username",
                type: "phoneNumber",
                required: true,
              },
              {
                label: t("Auth.MembershipRegistration.Form.IdNumber"),
                name: "idNumber",
                type: "numberText",
                minLength: 10,
                maxLength: 10,
                required: true,
              },
              {
                label: t("Global.Form.Label.Email"),
                name: "email",
                type: "email",
                required: true,
              },
              // {
              //   label: t("Auth.Researchers.AddProfilePhoto"),
              //   name: "photo",
              //   type: "file",
              //   required: false,
              // },
            ]}
            submitText={t("Auth.Researchers.AddResearcher")}
            onFormSubmit={(e) => {
              ResearcherApi.create({
                ...e,
                role: "researcher",
                password: e.username,
                passwordConfirmation: e.username,
                code: "654321",
              })
                .then((res) => {
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t("Auth.Researchers.AddResearcher"),
                        data: e.name,
                      }),
                    })
                  );
                  getData({});
                  setOpenModal(undefined);
                })
                .catch(apiCatchGlobalHandler);
            }}
            initialValues={openModal}
          />
        </Modal>
      </Fragment>
    </PageTemplate>
  );
};

export default ResearcherMgmtPage;
