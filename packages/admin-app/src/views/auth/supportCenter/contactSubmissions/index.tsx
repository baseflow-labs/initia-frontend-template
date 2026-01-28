import { useTranslation } from "react-i18next";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";
import { contactSubmissionColumns } from "./inputs";

const ContactSubmissionsView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/contact-submissions"
      inputs={contactSubmissionColumns(t)}
      singleItem={t("Auth.SupportCenter.Admin.ContactSubmissions.Submission", "Submission")}
      includeView
      includeDelete
    />
  );
};

export default ContactSubmissionsView;
