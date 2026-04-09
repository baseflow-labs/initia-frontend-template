import { LegalDocument } from "@/types/landing";

interface LegalDocumentPageProps {
  document: LegalDocument | null;
  fallbackTitle: string;
  fallbackDescription: string;
}

export default function LegalDocumentPage({
  document,
  fallbackTitle,
  fallbackDescription,
}: LegalDocumentPageProps) {
  return (
    <section className="legal-shell py-5">
      <div className="container">
        <div className="legal-header mb-4 p-4 p-md-5 rounded-4">
          <span className="legal-chip">Legal</span>
          <h1 className="mt-3 mb-2">{document?.title || fallbackTitle}</h1>
          <p className="mb-0">
            {document?.summary || fallbackDescription}
            {document?.version ? ` (v${document.version})` : ""}
          </p>
        </div>

        <article className="legal-card rounded-4 p-4 p-md-5">
          <div className="legal-content" style={{ whiteSpace: "pre-wrap" }}>
            {document?.content || "No published content is available yet."}
          </div>
        </article>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .legal-shell {
              background:
                radial-gradient(circle at 20% 20%, rgba(30, 76, 157, 0.08), transparent 42%),
                radial-gradient(circle at 80% 10%, rgba(14, 165, 233, 0.08), transparent 34%),
                #f7f8fb;
              min-height: 75vh;
            }

            .legal-header {
              background: linear-gradient(140deg, #0f172a 0%, #1e3a8a 65%, #0ea5e9 100%);
              color: #f8fafc;
              box-shadow: 0 14px 36px rgba(15, 23, 42, 0.22);
            }

            .legal-chip {
              display: inline-flex;
              padding: 0.3rem 0.7rem;
              border-radius: 999px;
              font-size: 0.75rem;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              font-weight: 700;
              color: #082f49;
              background: #bae6fd;
            }

            .legal-card {
              background: #ffffff;
              border: 1px solid rgba(15, 23, 42, 0.08);
              box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
            }

            .legal-content {
              color: #1e293b;
              line-height: 1.85;
              font-size: 1rem;
            }
          `,
        }}
      />
    </section>
  );
}
