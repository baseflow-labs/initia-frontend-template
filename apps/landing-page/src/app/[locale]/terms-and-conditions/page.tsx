import { landingApi } from "@/lib/api";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

const TermsAndConditionsPage = async ({ params }: TermsPageProps) => {
  const { locale } = await params;
  const document = await landingApi.getLatestLegalDocument("terms-and-conditions", locale);

  return (
    <LegalDocumentPage
      document={document}
      fallbackTitle="Terms and Conditions"
      fallbackDescription="These terms define the rules for using our platform and services."
    />
  );
};

export default TermsAndConditionsPage;
