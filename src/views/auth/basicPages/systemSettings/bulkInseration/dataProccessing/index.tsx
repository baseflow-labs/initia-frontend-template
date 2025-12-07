import { useTranslation } from "react-i18next";
import Form from "../../../../../../components/form";
import { o } from "react-router/dist/development/index-react-server-client-CCjKYJTH";
import Button from "../../../../../../components/core/button";

const SystemDataProcessingView = () => {
  const { t } = useTranslation();

  const fileInput = () => [
    {
      name: "dataFile",
      label: t("Auth.Settings.Admin.BulkDataInsertion.DataFileUpload"),
      type: "file",
    },
  ];

  const selectInput = () => [
    {
      name: "column",
      label: t("Auth.Settings.Admin.BulkDataInsertion.DataFileUpload"),
      type: "select",
      options: []
    },
  ];

  const steps = [
    {
      title: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step1.Title"),
      description: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step1.Description"),
      body: (
        <Form
          inputs={fileInput}
          onFormSubmit={() => ''}
        />
      )
    },
    {
      title: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step2.Title"),
      description: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step2.Description"),
      body: (
        <Form
          inputs={selectInput}
          onFormSubmit={() => ''}
        />
      )
    },
    {
      title: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step3.Title"),
      description: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step3.Description"),
      body: (
        <Form
          inputs={fileInput}
          onFormSubmit={() => ''}
        />
      )
    },
    {
      title: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step4.Title"),
      description: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step4.Description"),
      body: (
        <Form
          inputs={selectInput}
          onFormSubmit={() => ''}
        />
      )
    },
    {
      title: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step5.Title"),
      description: t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step5.Description"),
      body: (
        <Button>{t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Step5.Title")}</Button>
      )
    },
  ]

  return (
    <div className="row">
      <div className="col-md-12 my-4">
        <h1>{t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Title")}</h1>

        <h5>{t("Auth.Settings.Admin.BulkDataInsertion.DataProcessing.Description")}</h5>
      </div>
      
      {steps.map((step, i) => (
        <div className="col-md-6 my-3" key={i}>
          <h3>{step.title}</h3>
          <h6 className="my-3">{step.description}</h6>

          {step.body}
        </div>
      ))}
    </div>
  );
};

export default SystemDataProcessingView;
