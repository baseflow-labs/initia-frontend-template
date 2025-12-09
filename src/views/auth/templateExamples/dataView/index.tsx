import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import Accordion from "../../../../components/accordion";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const TemplateDataViewExamplesView = () => {
  const { t } = useTranslation();

  const dataViewExamples = [
    {
      title: t("Auth.TemplateExamples.DataView.Example1.Title"),
      body: (
        <Accordion
          id="123"
          data={[
            {
              header: t("Auth.TemplateExamples.DataView.Example1.Item1.Header"),
              body: <>This is test 1</>,
            },
            {
              header: t("Auth.TemplateExamples.DataView.Example1.Item2.Header"),
              body: <>This is test 2</>,
            },
          ]}
          icon={faAdd}
          addText=""
        />
      ),
    },
  ];

  return (
    <div className="row">
      {dataViewExamples.map((example, idx) => (
        <div className="col-12 col-md-6 mb-4" key={idx}>
          <h3 className="mb-3">{example.title}</h3>

          {example.body}
        </div>
      ))}
    </div>
  );
};

export default TemplateDataViewExamplesView;
