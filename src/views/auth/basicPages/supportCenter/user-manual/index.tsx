import {
  faBook,
  faChevronRight,
  faDownload,
  faFileAlt,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BackToSupportCenterButton from "../BackButton";

const UserManualView = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("getting-started");

  const manualSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: faBook,
      subsections: [
        { id: "introduction", title: "Introduction", type: "article" },
        { id: "quick-start", title: "Quick Start Guide", type: "video" },
        { id: "system-requirements", title: "System Requirements", type: "article" },
        { id: "installation", title: "Installation Guide", type: "article" },
      ],
    },
    {
      id: "account-management",
      title: "Account Management",
      icon: faFileAlt,
      subsections: [
        { id: "creating-account", title: "Creating an Account", type: "article" },
        { id: "profile-settings", title: "Profile Settings", type: "article" },
        { id: "security-settings", title: "Security & Privacy", type: "video" },
        { id: "notifications", title: "Managing Notifications", type: "article" },
      ],
    },
    {
      id: "core-features",
      title: "Core Features",
      icon: faBook,
      subsections: [
        { id: "dashboard", title: "Dashboard Overview", type: "video" },
        { id: "projects", title: "Managing Projects", type: "article" },
        { id: "collaboration", title: "Team Collaboration", type: "article" },
        { id: "file-management", title: "File Management", type: "article" },
      ],
    },
    {
      id: "advanced-features",
      title: "Advanced Features",
      icon: faBook,
      subsections: [
        { id: "integrations", title: "Third-party Integrations", type: "article" },
        { id: "api-access", title: "API Access", type: "article" },
        { id: "automation", title: "Automation & Workflows", type: "video" },
        { id: "custom-templates", title: "Custom Templates", type: "article" },
      ],
    },
    {
      id: "billing",
      title: "Billing & Subscriptions",
      icon: faFileAlt,
      subsections: [
        { id: "plans", title: "Subscription Plans", type: "article" },
        { id: "payment-methods", title: "Payment Methods", type: "article" },
        { id: "invoices", title: "Invoices & Receipts", type: "article" },
        { id: "billing-faq", title: "Billing FAQ", type: "article" },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: faBook,
      subsections: [
        { id: "common-issues", title: "Common Issues", type: "article" },
        { id: "error-messages", title: "Understanding Error Messages", type: "article" },
        { id: "performance", title: "Performance Optimization", type: "video" },
        { id: "browser-issues", title: "Browser Compatibility", type: "article" },
      ],
    },
  ];

  const sampleContent = {
    title: "Getting Started with Our Platform",
    content: `
      <h4 class="mb-3">Welcome to Our Platform</h4>
      <p class="text-muted">
        This comprehensive guide will help you get started with all the features and functionality 
        of our platform. Whether you're a new user or looking to explore advanced features, this 
        manual has everything you need.
      </p>
      
      <h5 class="mt-4 mb-3">Quick Overview</h5>
      <p class="text-muted">
        Our platform is designed to be intuitive and user-friendly. The main components include:
      </p>
      <ul class="text-muted">
        <li>Dashboard - Your central hub for all activities</li>
        <li>Projects - Organize and manage your work</li>
        <li>Team Collaboration - Work together seamlessly</li>
        <li>File Management - Store and share files securely</li>
        <li>Settings - Customize your experience</li>
      </ul>
      
      <h5 class="mt-4 mb-3">System Requirements</h5>
      <p class="text-muted">
        To ensure the best experience, please make sure your system meets the following requirements:
      </p>
      <ul class="text-muted">
        <li>Modern web browser (Chrome, Firefox, Safari, or Edge - latest version)</li>
        <li>Stable internet connection (minimum 5 Mbps recommended)</li>
        <li>JavaScript enabled</li>
        <li>Cookies enabled for authentication</li>
      </ul>
      
      <h5 class="mt-4 mb-3">Next Steps</h5>
      <p class="text-muted">
        After reviewing this guide, we recommend:
      </p>
      <ol class="text-muted">
        <li>Complete your profile setup</li>
        <li>Explore the dashboard and main features</li>
        <li>Watch our video tutorials</li>
        <li>Join our community forum</li>
      </ol>
    `,
  };

  return (
    <Fragment>
      {/* Header */}
      <div className="bg-success text-white py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <BackToSupportCenterButton />

              <h1 className="mb-3 text-center">{t("Auth.SupportCenter.UserManual.Title")}</h1>
            </div>
          </div>
        </div>
      </div>

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
                {manualSections.map((section) => (
                  <div key={section.id}>
                    <button
                      className={`list-group-item list-group-item-action fw-semibold ${
                        activeSection === section.id ? "bg-success text-white" : ""
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <FontAwesomeIcon icon={section.icon} className="me-2" />
                      {section.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Options */}
            <div className="card shadow-sm mt-3">
              <div className="card-body">
                <button className="btn btn-outline-dark btn-sm w-100 mb-2">
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  {t("Auth.SupportCenter.UserManual.DownloadManual")}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-lg-9">
            {/* Section Header */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon
                    icon={manualSections.find((s) => s.id === activeSection)?.icon || faBook}
                    className="text-dark fa-2x me-3"
                  />

                  <h2 className="mb-0">
                    {manualSections.find((s) => s.id === activeSection)?.title}
                  </h2>
                </div>

                <p className="text-muted mb-0">
                  Explore the topics below to learn more about this section
                </p>
              </div>
            </div>

            {/* Subsections Grid */}
            <div className="row mb-4">
              {manualSections
                .find((s) => s.id === activeSection)
                ?.subsections.map((subsection, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="card h-100 shadow-sm hover-shadow">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title mb-0">{subsection.title}</h5>
                          <span
                            className={`badge ${
                              subsection.type === "video" ? "bg-danger" : "bg-primary"
                            }`}
                          >
                            {subsection.type === "video" ? (
                              <>
                                <FontAwesomeIcon icon={faVideo} className="me-1" />
                                Video
                              </>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faFileAlt} className="me-1" />
                                Article
                              </>
                            )}
                          </span>
                        </div>
                        <p className="card-text text-muted small">
                          {subsection.type === "video"
                            ? "Watch a step-by-step video tutorial"
                            : "Read detailed documentation and guides"}
                        </p>
                        <a href="#" className="text-dark text-decoration-none fw-bold">
                          {subsection.type === "video" ? "Watch Now" : "Read More"}
                          <FontAwesomeIcon icon={faChevronRight} className="ms-2" size="sm" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Sample Content */}
            <div className="card shadow-sm">
              <div className="card-body">
                <div dangerouslySetInnerHTML={{ __html: sampleContent.content }} />
              </div>
            </div>

            {/* Video Tutorials Section */}
            <div className="card shadow-sm mt-4">
              <div className="card-header bg-light">
                <h4 className="mb-0">
                  <FontAwesomeIcon icon={faVideo} className="me-2 text-danger" />
                  Video Tutorials
                </h4>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="ratio ratio-16x9 bg-light rounded">
                      <div className="d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faVideo} className="text-muted fa-3x" />
                      </div>
                    </div>

                    <h6 className="mt-2">Getting Started Tutorial</h6>
                    <p className="text-muted small">Duration: 5:30</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="ratio ratio-16x9 bg-light rounded">
                      <div className="d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faVideo} className="text-muted fa-3x" />
                      </div>
                    </div>

                    <h6 className="mt-2">Advanced Features Overview</h6>
                    <p className="text-muted small">Duration: 8:45</p>
                  </div>
                </div>
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
                  <Link to="/support-center/faq" className="btn btn-dark">
                    View FAQ
                  </Link>

                  <Link to="/support-center/contact-us" className="btn btn-outline-dark">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserManualView;
