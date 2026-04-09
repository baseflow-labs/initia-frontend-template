import { landingApi } from "@/lib/api";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  const document = await landingApi.getLatestLegalDocument("privacy-policy", locale);

  return (
    <LegalDocumentPage
      document={document}
      fallbackTitle="Privacy Policy"
      fallbackDescription="This page explains how we collect, use, and protect your data."
    />
  );
}
