import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { GetDataProps } from "../../../api";
import * as ResearcherApi from "../../../api/staff/researcher";
import PageTemplate from "../../../layouts/auth/pages/pageTemplate";
import { apiCatchGlobalHandler } from "../../../utils/function";
import AddStaff from "./addStaff";

const ResearcherMgmtPage = () => {
  const { t } = useTranslation();

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
    ResearcherApi.getAll({ filters })
      .then((res: any) => {
        setResearchers(res.payload);
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({});
  }, []);

  const onSearch = (e: string) => {
    console.log({ e });
  };

  return (
    <PageTemplate
      title={t("Auth.Researchers.Title")}
      actionButtons={[
        {
          label: t("Auth.Researchers.AddResearcher"),
          onClick: () => setOpenModal({}),
        },
      ]}
      onGetData={(values) => console.log(values)}
      onSearch={onSearch}
      searchPlaceholder="بحث بـ اسم الباحث"
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
                        rel="noreferrer"
                        className="text-decoration-none text-muted"
                      >
                        <FontAwesomeIcon icon={faEnvelope} /> {email}
                      </a>

                      <br />

                      <a
                        href={"tel:966" + username}
                        target="_blank"
                        rel="noreferrer"
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

        <AddStaff
          openModal={openModal}
          setOpenModal={setOpenModal}
          getData={getData}
        />
      </Fragment>
    </PageTemplate>
  );
};

export default ResearcherMgmtPage;
