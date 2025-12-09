import { useTranslation } from "react-i18next";
import CollapseGroup from "../../../../components/collapse";
import PageTemplate from "../../../../layouts/auth/pages/pageTemplate";

const TemplateDataViewExamplesView = () => {
  const { t } = useTranslation();

  const dataViewExamples = [
    {
      title: t("Auth.Examples.DataView.CollapseGroup"),
      body: (
        <CollapseGroup
          items={[
            {
              title: t("Auth.Examples.DataView.Test1.Title"),
              content: <>{t("Auth.Examples.DataView.Test1.Body")}</>,
            },
            {
              title: t("Auth.Examples.DataView.Test2.Title"),
              content: <>{t("Auth.Examples.DataView.Test2.Body")}</>,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PageTemplate title={t("Auth.Examples.DataView.Title")}>
      <div className="row">
        {dataViewExamples.map((example, idx) => (
          <div className="col-12 col-md-6 mb-4" key={idx}>
            <h3 className="mb-3">{example.title}</h3>

            {example.body}
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default TemplateDataViewExamplesView;
