import { useTranslation } from "react-i18next";

import Button from "@/components/core/button";

const TermsConditions = () => {
  const { t } = useTranslation();

  const contents = [
    {
      title: t("Public.PrivacyPolicy.Title"),
      intro: t("Public.PrivacyPolicy.Acknowledgment"),
      points: [
        t("Public.PrivacyPolicy.Point1"),
        t("Public.PrivacyPolicy.Point2"),
        t("Public.PrivacyPolicy.Point3"),
        t("Public.PrivacyPolicy.Point4"),
        t("Public.PrivacyPolicy.Point5"),
        t("Public.PrivacyPolicy.Point6"),
      ],
    },
    {
      title: t("Public.TermsConditions.Title"),
      intro: "",
      points: [
        t("Public.TermsConditions.Point1"),
        t("Public.TermsConditions.Point2"),
        t("Public.TermsConditions.Point3"),
        t("Public.TermsConditions.Point4"),
      ],
    },
  ];

  return (
    <div className="row">
      {contents.map(({ title, intro, points }, i) => (
        <div className="col-lg-6 px-3 d-flex" key={i}>
          <div className="card p-2 mb-3 text-start w-100 h-100">
            <h4 className="mb-5">{title}</h4>
            {intro && <h5 className="mb-3">{intro}</h5>}

            <ol>
              {points.map((point, y) => (
                <li key={y}>
                  <h5 className="lh-lg">{point}</h5>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}

      <div className="col-12 mt-3">
        <Button route="/register" className="w-fit mx-auto">
          {t("Global.Labels.Back")}
        </Button>
      </div>
    </div>
  );
};

export default TermsConditions;
