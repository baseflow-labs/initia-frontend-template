import Button from "@initia/shared/ui/components/core/button";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { faBook, faChevronRight, faDownload, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  getPublishedUserManual,
  getUserManualContents,
  getUserManualSubsections,
  UserManualContent,
  UserManualSection,
  UserManualSubsection,
} from "../../../../api/support";

type ManualSubsectionWithContent = UserManualSubsection & {
  contents: UserManualContent[];
};

type ManualSectionWithChildren = UserManualSection & {
  subsections: ManualSubsectionWithContent[];
};

const UserManualView = () => {
  const { t } = useTranslation();
  const [sections, setSections] = useState<ManualSectionWithChildren[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const [activeSubsection, setActiveSubsection] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadManual = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const [sectionsRes, subsectionsRes, contentsRes] = await Promise.all([
          getPublishedUserManual(),
          getUserManualSubsections(),
          getUserManualContents(),
        ]);

        const fetchedSections = sectionsRes.payload || [];
        const fetchedSubsections = subsectionsRes.payload || [];
        const fetchedContents = contentsRes.payload || [];

        const mapped: ManualSectionWithChildren[] = fetchedSections.map((section) => {
          const sectionSubsections = fetchedSubsections
            .filter((subsection) => subsection.sectionId === section.id)
            .map((subsection) => ({
              ...subsection,
              contents: fetchedContents.filter((content) => content.subsectionId === subsection.id),
            }));

          return {
            ...section,
            subsections: sectionSubsections,
          };
        });

        setSections(mapped);
        if (mapped.length > 0) {
          setActiveSection(mapped[0].id);
          setActiveSubsection(mapped[0].subsections[0]?.id || "");
        }
      } catch {
        setErrorMsg(
          t("Auth.SupportCenter.UserManual.Errors.LoadFailed", "Unable to load user manual.")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadManual();
  }, [t]);

  const activeSectionData = useMemo(
    () => sections.find((section) => section.id === activeSection),
    [sections, activeSection]
  );

  useEffect(() => {
    if (!activeSectionData) return;
    if (!activeSectionData.subsections.some((subsection) => subsection.id === activeSubsection)) {
      setActiveSubsection(activeSectionData.subsections[0]?.id || "");
    }
  }, [activeSectionData, activeSubsection]);

  const activeSubsectionData = useMemo(
    () => activeSectionData?.subsections.find((subsection) => subsection.id === activeSubsection),
    [activeSectionData, activeSubsection]
  );

  const pageBreadcrumbs = [{ label: t("Auth.SupportCenter.Title"), path: "/support-center" }];

  return (
    <PageTemplate title={t("Auth.SupportCenter.UserManual.Title")} breadcrumbs={pageBreadcrumbs}>
      <div className="container mb-5">
        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faBook} className="me-2" />
                  {t("Auth.SupportCenter.UserManual.Contents")}
                </h5>
              </div>

              <div className="list-group list-group-flush">
                {sections.map((section, index) => (
                  <div key={section.id}>
                    <button
                      className={`list-group-item list-group-item-action fw-semibold ${
                        activeSection === section.id ? "bg-success text-white" : ""
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <FontAwesomeIcon
                        icon={index % 2 === 0 ? faBook : faFileAlt}
                        className="me-2"
                      />
                      {section.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Options */}
            <div className="card shadow-sm mt-3">
              <div className="card-body">
                <Button outline color="dark" size="sm" className="w-100 mb-2">
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  {t("Auth.SupportCenter.UserManual.DownloadManual")}
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-lg-9">
            {/* Section Header */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon icon={faBook} className="text-dark fa-2x me-3" />

                  <h2 className="mb-0">{activeSectionData?.title}</h2>
                </div>

                <p className="text-muted mb-0">
                  {activeSectionData?.description ||
                    t(
                      "Auth.SupportCenter.UserManual.DefaultSectionDescription",
                      "Explore the topics below to learn more about this section"
                    )}
                </p>
              </div>
            </div>

            {/* Subsections Grid */}
            <div className="row mb-4">
              {activeSectionData?.subsections.map((subsection) => (
                <div key={subsection.id} className="col-md-6 mb-3">
                  <div className="card h-100 shadow-sm hover-shadow">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">{subsection.title}</h5>
                        <span className="badge bg-primary">
                          <FontAwesomeIcon icon={faFileAlt} className="me-1" />
                          {subsection.contents.length} Item
                          {subsection.contents.length === 1 ? "" : "s"}
                        </span>
                      </div>
                      <p className="card-text text-muted small">
                        {subsection.description ||
                          t(
                            "Auth.SupportCenter.UserManual.DefaultSubsectionDescription",
                            "Read detailed documentation and guides"
                          )}
                      </p>
                      <button
                        className="btn btn-link text-dark text-decoration-none fw-bold p-0"
                        onClick={() => setActiveSubsection(subsection.id)}
                      >
                        {t("Auth.SupportCenter.UserManual.ReadMore", "Read More")}
                        <FontAwesomeIcon icon={faChevronRight} className="ms-2" size="sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="card shadow-sm">
              <div className="card-body">
                {isLoading && (
                  <p className="text-muted mb-0">
                    {t("Auth.SupportCenter.UserManual.Loading", "Loading manual...")}
                  </p>
                )}

                {!isLoading && errorMsg && <p className="text-danger mb-0">{errorMsg}</p>}

                {!isLoading && !errorMsg && !activeSubsectionData && (
                  <p className="text-muted mb-0">
                    {t(
                      "Auth.SupportCenter.UserManual.Empty",
                      "No manual content available yet for this section."
                    )}
                  </p>
                )}

                {!isLoading && !errorMsg && activeSubsectionData && (
                  <>
                    <h4 className="mb-3">{activeSubsectionData.title}</h4>
                    {activeSubsectionData.contents.length > 0 ? (
                      activeSubsectionData.contents.map((content) => (
                        <div key={content.id} className="mb-4">
                          <h5>{content.title}</h5>
                          <div
                            className="text-muted"
                            dangerouslySetInnerHTML={{ __html: content.description || "" }}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-muted mb-0">
                        {t(
                          "Auth.SupportCenter.UserManual.EmptySubsection",
                          "No content available in this subsection yet."
                        )}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Help Section */}
            <div className="card bg-light shadow-sm mt-4">
              <div className="card-body text-center py-4">
                <h5 className="mb-3">Need More Help?</h5>

                <p className="text-muted mb-4">
                  Can not find what you are looking for? Our support team is ready to assist you.
                </p>

                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link to="/support-center/faq">
                    <Button color="dark">View FAQ</Button>
                  </Link>

                  <Link to="/support-center/contact-us">
                    <Button outline color="dark">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default UserManualView;
