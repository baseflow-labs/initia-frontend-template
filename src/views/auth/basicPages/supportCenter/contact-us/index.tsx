import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faClock, faEnvelope, faMapMarkerAlt, faPaperPlane, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ContactUsView = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email Us",
      details: "support@example.com",
      subDetails: "We'll respond within 24 hours",
      color: "primary",
    },
    {
      icon: faPhone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subDetails: "Mon-Fri, 9AM-6PM EST",
      color: "success",
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      details: "123 Main Street, Suite 100",
      subDetails: "New York, NY 10001",
      color: "info",
    },
    {
      icon: faClock,
      title: "Business Hours",
      details: "Monday - Friday",
      subDetails: "9:00 AM - 6:00 PM EST",
      color: "warning",
    },
  ];

  const categories = [
    "General Inquiry",
    "Technical Support",
    "Billing Question",
    "Feature Request",
    "Bug Report",
    "Partnership",
    "Other",
  ];

  return (
    <Fragment>
      {/* Header */}
      <div className="bg-info text-white py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link
                to="/support-center"
                className="text-white text-decoration-none d-inline-block mb-3"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Support Center
              </Link>
              <h1 className="display-5 mb-3">Contact Us</h1>
              <p className="lead">
                Get in touch with our team - We're here to help you
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        {/* Contact Info Cards */}
        <div className="row mb-5">
          {contactInfo.map((info, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div className="card h-100 shadow-sm text-center">
                <div className="card-body">
                  <div
                    className={`bg-${info.color} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                    style={{ width: "70px", height: "70px" }}
                  >
                    <FontAwesomeIcon
                      icon={info.icon}
                      className={`text-${info.color} fa-2x`}
                    />
                  </div>
                  <h5 className="card-title">{info.title}</h5>
                  <p className="card-text fw-semibold mb-1">{info.details}</p>
                  <p className="card-text text-muted small">{info.subDetails}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h4 className="mb-0">
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Send us a Message
                </h4>
              </div>
              <div className="card-body p-4">
                {submitted && (
                  <div className="alert alert-success alert-dismissible fade show">
                    <strong>Success!</strong> Your message has been sent. We'll get
                    back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="category" className="form-label fw-semibold">
                        Category <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a category...</option>
                        {categories.map((cat, index) => (
                          <option key={index} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="subject" className="form-label fw-semibold">
                        Subject <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your inquiry..."
                      required
                    ></textarea>
                    <div className="form-text">
                      Minimum 20 characters ({formData.message.length}/20)
                    </div>
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agree"
                      required
                    />
                    <label className="form-check-label" htmlFor="agree">
                      I agree to the{" "}
                      <a href="#" className="text-info">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-info">
                        Terms of Service
                      </a>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-info text-white px-4">
                    <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Office Hours */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faClock} className="me-2 text-info" />
                  Office Hours
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold">Monday - Friday</span>
                    <span className="text-muted">9AM - 6PM</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold">Saturday</span>
                    <span className="text-muted">10AM - 4PM</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Sunday</span>
                    <span className="text-muted">Closed</span>
                  </div>
                </div>
                <hr />
                <p className="text-muted small mb-0">
                  <strong>Note:</strong> Email support is available 24/7. We typically
                  respond within 24 hours.
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Connect With Us</h5>
              </div>
              <div className="card-body">
                <p className="text-muted small mb-3">
                  Follow us on social media for updates and news
                </p>
                <div className="d-flex gap-2">
                  <a
                    href="#"
                    className="btn btn-outline-primary btn-sm flex-fill"
                  >
                    <FontAwesomeIcon icon={faFacebook as any} />
                  </a>
                  <a href="#" className="btn btn-outline-info btn-sm flex-fill">
                    <FontAwesomeIcon icon={faTwitter as any} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-outline-primary btn-sm flex-fill"
                  >
                    <FontAwesomeIcon icon={faLinkedin as any} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-outline-danger btn-sm flex-fill"
                  >
                    <FontAwesomeIcon icon={faInstagram as any} />
                  </a>
                </div>
              </div>
            </div>

            {/* Alternative Support */}
            <div className="card shadow-sm bg-light">
              <div className="card-body">
                <h5 className="card-title">Other Ways to Get Help</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <Link
                      to="/support-center/faq"
                      className="text-decoration-none"
                    >
                      📚 Visit our FAQ
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/support-center/user-manual"
                      className="text-decoration-none"
                    >
                      📖 Read the User Manual
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/support-center/tickets"
                      className="text-decoration-none"
                    >
                      🎫 Submit a Support Ticket
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">
                      💬 Join our Community Forum
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-info" />
                  Our Location
                </h5>
              </div>
              <div className="card-body p-0">
                <div
                  className="bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "300px" }}
                >
                  <div className="text-center text-muted">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="fa-3x mb-3"
                    />
                    <p>Map Placeholder - Integration Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactUsView;
