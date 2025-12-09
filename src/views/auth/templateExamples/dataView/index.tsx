import { useTranslation } from "react-i18next";
import CollapseGroup from "../../../../components/collapse";
import PageTemplate from "../../../../layouts/auth/pages/pageTemplate";
import TabsComp from "../../../../components/tab";

const TemplateDataViewExamplesView = () => {
  const { t } = useTranslation();

  const exampleData = [
    {
      title: t("Auth.Examples.DataView.Test1.Title"),
      body: t("Auth.Examples.DataView.Test1.Body"),
    },
    {
      title: t("Auth.Examples.DataView.Test2.Title"),
      body: t("Auth.Examples.DataView.Test2.Body"),
    },
  ];

  const dataViewExamples = [
    {
      title: t("Auth.Examples.DataView.CollapseGroup"),
      body: (
        <CollapseGroup
          items={exampleData.map(({ title, body }) => ({
            title,
            content: <p>{body}</p>,
          }))}
        />
      ),
    },
    {
      title: t("Auth.Examples.DataView.TabsGroup"),
      body: (
        <TabsComp
          items={exampleData.map(({ title, body }, i) => ({
            id: String(i),
            title,
            content: (
              <div className="card mt-4">
                <div className="card-body">
                  <p>{body}</p>
                </div>
              </div>
            ),
          }))}
        />
      ),
    },
  ];

  return (
    <PageTemplate title={t("Auth.Examples.DataView.Title")}>
      <div className="row">
        {dataViewExamples.map((example, idx) => (
          <div className="col-12 col-md-6 mb-4" key={idx}>
            <h4 className="mb-3">{example.title}</h4>

            {example.body}
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default TemplateDataViewExamplesView;
