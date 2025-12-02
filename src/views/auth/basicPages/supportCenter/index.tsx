import { faArrowRight, faBook, faComments, faEnvelope, faLifeRing, faQuestionCircle, faSearch, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SupportCenter = () => {
  const { t } = useTranslation();

  const quickLinks = [
    {
      icon: faQuestionCircle,
      title: "FAQ",
      description: "Find answers to frequently asked questions",
      link: "/support-center/faq",
      color: "primary",
    },
    {
      icon: faBook,
      title: "User Manual",
      description: "Comprehensive guides and documentation",
      link: "/support-center/user-manual",
      color: "success",
    },
    {
      icon: faEnvelope,
      title: "Contact Us",
      description: "Get in touch with our support team",
      link: "/support-center/contact-us",
      color: "info",
    },
    {
      icon: faTicket,
      title: "Submit Ticket",
      description: "Create a support ticket for assistance",
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
      title: "Account & Password",
      articles: [
        "How do I change my password?",
        "Forgotten Username or Password",
        "Locked Out of Account",
        "What is Sign In Verification?",
      ],
      articleCount: 16,
    },
    {
      title: "Account Settings",
      articles: [
        "How do I change my email address?",
        "How do I close my account?",
        "How do I change my username?",
        "Privacy settings explained",
      ],
      articleCount: 12,
    },
    {
      title: "Getting Started",
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
      {/* Hero Section */}
      <div className="bg-info text-white py-5 mb-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 mb-3">Hello, how can we help?</h1>
              <p className="lead mb-4">
                Common troubleshooting topics: Account Management, Getting Started, and Support
              </p>
              <div className="input-group input-group-lg shadow-sm">
                <span className="input-group-text bg-white">
                  <FontAwesomeIcon icon={faSearch} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for articles..."
                />
                <button className="btn btn-light" type="button">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        {/* Quick Access Cards */}
        <div className="row mb-5">
          <div className="col-12 mb-4">
            <h2 className="text-center mb-4">Quick Access</h2>
          </div>
          {quickLinks.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <Link to={item.link} className="text-decoration-none">
                <div className={`card h-100 border-${item.color} shadow-sm hover-shadow transition`}>
                  <div className="card-body text-center">
                    <div className={`bg-${item.color} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '80px', height: '80px' }}>
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={`text-${item.color} fa-2x`}
                      />
                    </div>
                    <h5 className="card-title text-dark">{item.title}</h5>
                    <p className="card-text text-muted">{item.description}</p>
                    <span className={`text-${item.color} fw-bold`}>
                      Learn More <FontAwesomeIcon icon={faArrowRight} size="sm" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="row mb-5">
          <div className="col-12 mb-4">
            <h2 className="mb-4">Popular Articles</h2>
          </div>
          {popularArticles.map((article, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <span className="badge bg-info mb-2">{article.category}</span>
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text text-muted">{article.description}</p>
                  <a href="#" className="text-info text-decoration-none fw-bold">
                    Read More <FontAwesomeIcon icon={faArrowRight} size="sm" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Knowledge Base */}
        <div className="row mb-5">
          <div className="col-12 mb-4">
            <h2 className="mb-4">Knowledge Base</h2>
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
                          <FontAwesomeIcon icon={faArrowRight} size="sm" className="me-2 text-info" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="text-info text-decoration-none fw-bold">
                    See all {category.articleCount} articles
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Keep Learning Section */}
        <div className="row mb-5">
          <div className="col-12 mb-4">
            <h2 className="mb-4">Keep Learning</h2>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <FontAwesomeIcon icon={faBook} className="text-success fa-2x" />
                </div>
                <h5 className="card-title">Documentation</h5>
                <p className="card-text text-muted">
                  Expert tips and tools to improve your experience using our comprehensive documentation.
                </p>
                <a href="#" className="text-success text-decoration-none fw-bold">
                  Read More <FontAwesomeIcon icon={faArrowRight} size="sm" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <FontAwesomeIcon icon={faLifeRing} className="text-info fa-2x" />
                </div>
                <h5 className="card-title">Tutorials</h5>
                <p className="card-text text-muted">
                  Step-by-step guides from experts to help you start and grow your projects.
                </p>
                <a href="#" className="text-info text-decoration-none fw-bold">
                  Read More <FontAwesomeIcon icon={faArrowRight} size="sm" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <FontAwesomeIcon icon={faComments} className="text-warning fa-2x" />
                </div>
                <h5 className="card-title">Community</h5>
                <p className="card-text text-muted">
                  Join our community forum to connect with other users and share experiences.
                </p>
                <a href="#" className="text-warning text-decoration-none fw-bold">
                  Join Now <FontAwesomeIcon icon={faArrowRight} size="sm" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Still Need Help Section */}
        <div className="row">
          <div className="col-12">
            <div className="card bg-light shadow-sm">
              <div className="card-body text-center py-5">
                <h3 className="mb-3">Still need help?</h3>
                <p className="text-muted mb-4">
                  Our specialists are always happy to help. Contact us during standard business hours<br />
                  or email us 24/7 and we'll get back to you.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/support-center/contact-us" className="btn btn-info btn-lg">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    Contact Us
                  </Link>
                  <Link to="/support-center/tickets" className="btn btn-outline-info btn-lg">
                    <FontAwesomeIcon icon={faTicket} className="me-2" />
                    Submit a Ticket
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

export default SupportCenter;
