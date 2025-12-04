import { faArrowRight, faBook, faComments, faEnvelope, faLifeRing, faQuestionCircle, faSearch, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SupportCenterView = () => {
  const { t } = useTranslation();

  const quickLinks = [
    {
      icon: faQuestionCircle,
      title: t("Auth.SupportCenter.Faq.Title"),
      description: t("Auth.SupportCenter.Faq.Description"),
      link: "/support-center/faq",
      color: "primary",
    },
    {
      icon: faBook,
      title: t("Auth.SupportCenter.UserManual.Title"),
      description: t("Auth.SupportCenter.UserManual.Description"),
      link: "/support-center/user-manual",
      color: "success",
    },
    {
      icon: faEnvelope,
      title: t("Auth.SupportCenter.ContactUs.Title"),
      description: t("Auth.SupportCenter.ContactUs.Description"),
      link: "/support-center/contact-us",
      color: "info",
    },
    {
      icon: faTicket,
      title: t("Auth.SupportCenter.Tickets.Title"),
      description: t("Auth.SupportCenter.Tickets.Description"),
      link: "/support-center/tickets",
      color: "warning",
    },
  ];

  const popularArticles = [
    {
      title: "Getting Started",
      description: "Whether you're new or you're a power user, this article will help you...",
      category: "Basics",
    },
    {
      title: "First Steps",
      description: "Are you a new customer wondering how to get started?",
      category: "Onboarding",
    },
    {
      title: "Account Management",
      description: "Learn how to manage your account settings and preferences...",
      category: "Account",
    },
  ];

  const knowledgeBaseCategories = [
    {
      title: t("Auth.SupportCenter.KnowledgeBase.AccountPassword.Title"),
      articles: [
        "How do I change my password?",
        "Forgotten Username or Password",
        "Locked Out of Account",
        "What is Sign In Verification?",
      ],
      articleCount: 16,
    },
    {
      title: t("Auth.SupportCenter.KnowledgeBase.AccountSettings.Title"),
      articles: [
        "How do I change my email address?",
        "How do I close my account?",
        "How do I change my username?",
        "Privacy settings explained",
      ],
      articleCount: 12,
    },
    {
      title: t("Auth.SupportCenter.KnowledgeBase.GettingStarted.Title"),
      articles: [
        "What are the system requirements?",
        "How to create your first project?",
        "Understanding the dashboard",
        "Quick start guide",
      ],
      articleCount: 10,
    },
  ];

  return (
    <Fragment>
      <div className="bg-primary text-white py-5 mb-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="mb-3">{t("Auth.SupportCenter.Title")}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row mb-5">
          <div className="col-12 mb-4">
            <h2 className="mb-4">{t("Auth.SupportCenter.QuickAccess.Title")}</h2>
          </div>

          {quickLinks.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <Link to={item.link} className="text-decoration-none">
                <div className={`card h-100 border-${item.color} shadow-sm hover-shadow transition`}>
                  <div className="card-body text-center">
                    <div className={`bg-${item.color} rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '80px', height: '80px' }}>
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={`text-white fa-2x`}
                      />
                    </div>

                    <h5 className="card-title text-dark">{item.title}</h5>
                    <p className="card-text text-muted">{item.description}</p>

                    <span className={`text-${item.color} fw-bold`}>
                      {t("Global.Labels.More")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Knowledge Base */}
        <div className="row mb-5">
          <div className="col-12 mb-4">
            <h2 className="mb-4">{t("Auth.SupportCenter.KnowledgeBase.Title")}</h2>
          </div>

          {knowledgeBaseCategories.map((category, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-light">
                  <h5 className="mb-0">{category.title}</h5>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled mb-3">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex} className="mb-2">
                        <a href="#" className="text-decoration-none text-muted">
                          <FontAwesomeIcon icon={faArrowRight} size="sm" className="me-2 text-primary" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="text-primary text-decoration-none fw-bold">
                    See all {category.articleCount} articles
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <div className="row">
          <div className="col-12">
            <div className="card bg-light shadow-sm">
              <div className="card-body text-center py-5">
                <h3 className="mb-3">{t("Auth.SupportCenter.StillNeedHelp.Title")}</h3>

                <p className="text-muted mb-4">
                  {t("Auth.SupportCenter.StillNeedHelp.Description")}
                </p>

                <div className="d-flex justify-content-center gap-3">
                  <Link to="/support-center/contact-us" className="btn btn-primary btn-lg">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    {t("Auth.SupportCenter.ContactUs.Title")}
                  </Link>

                  <Link to="/support-center/tickets" className="btn btn-outline-primary btn-lg">
                    <FontAwesomeIcon icon={faTicket} className="me-2" />
                    {t("Auth.SupportCenter.SubmitTicket.Title")}
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

export default SupportCenterView;
