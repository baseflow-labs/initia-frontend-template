import Form from "@/components/form";
import PageTemplate from "@/layouts/auth/pages/pageTemplate";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faClock,
  faEnvelope,
  faMapMarkerAlt,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { inputs } from "./consts";

const ContactUsView = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: faEnvelope,
      title: t("Auth.SupportCenter.ContactUs.EmailUs.Title"),
      details: "support@example.com",
      subDetails: t("Auth.SupportCenter.ContactUs.EmailUs.Description"),
    },
    {
      icon: faPhone,
      title: t("Auth.SupportCenter.ContactUs.CallUs.Title"),
      details: "+1 (555) 123-4567",
      subDetails: t("Auth.SupportCenter.ContactUs.CallUs.Description"),
    },
    {
      icon: faMapMarkerAlt,
      title: t("Auth.SupportCenter.ContactUs.VisitUs.Title"),
      details: "123 Main Street, Suite 100",
      subDetails: t("Auth.SupportCenter.ContactUs.VisitUs.Description"),
    },
    {
      icon: faClock,
      title: t("Auth.SupportCenter.ContactUs.BusinessHours.Title"),
      details: "Monday - Friday",
      subDetails: t("Auth.SupportCenter.ContactUs.BusinessHours.Description"),
    },
  ];

  return (
    <PageTemplate title={t("Auth.SupportCenter.ContactUs.Title")}>
      <div className="container mb-5">
        {/* Contact Info Cards */}
        <div className="row mb-5">
          {contactInfo.map((info, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div className="card h-100 shadow-sm text-center">
                <div className="card-body">
                  <div
                    className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <FontAwesomeIcon icon={info.icon} className="text-warning fa-2x" />
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
              <div className="card-header">
                <h4 className="mb-0">
                  <FontAwesomeIcon icon={faPaperPlane} className="me-1" />
                  {t("Auth.SupportCenter.ContactUs.SendMessage.Title")}
                </h4>
              </div>

              <div className="card-body p-4">
                <Form inputs={() => inputs(t)} onFormSubmit={() => ""} submitColor="warning" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Office Hours */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faClock} className="me-2 text-warning" />
                  {t("Auth.SupportCenter.ContactUs.OfficeHours.Title")}
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
              </div>
            </div>

            {/* Social Media */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">{t("Auth.SupportCenter.ContactUs.ConnectWithUs.Title")}</h5>
              </div>

              <div className="card-body">
                <p className="text-muted small mb-3">
                  {t("Auth.SupportCenter.ContactUs.ConnectWithUs.Description")}
                </p>

                <div className="d-flex gap-2">
                  <a href="#" className="btn btn-outline-primary btn-sm flex-fill">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>

                  <a href="#" className="btn btn-outline-primary btn-sm flex-fill">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>

                  <a href="#" className="btn btn-outline-primary btn-sm flex-fill">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>

                  <a href="#" className="btn btn-outline-danger btn-sm flex-fill">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
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
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-warning" />
                  {t("Auth.SupportCenter.ContactUs.OurLocation.Title")}
                </h5>
              </div>

              <div className="card-body p-0">
                <div
                  className="bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "300px" }}
                >
                  <div className="text-center text-muted">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-3x mb-3" />
                    <p>Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ContactUsView;
