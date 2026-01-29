import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FaqView = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "To create an account, click on the 'Sign Up' button at the top right corner of the homepage. Fill in your details including email, password, and other required information. You'll receive a verification email to activate your account.",
        },
        {
          question: "What are the system requirements?",
          answer:
            "Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience. Mobile apps are available for both iOS and Android devices.",
        },
        {
          question: "Is there a mobile app available?",
          answer:
            "Yes! We offer mobile applications for both iOS and Android platforms. You can download them from the App Store or Google Play Store. The mobile apps provide full functionality with an optimized interface for smaller screens.",
        },
      ],
    },
    {
      category: "Account & Security",
      questions: [
        {
          question: "How do I reset my password?",
          answer:
            "Click on 'Forgot Password' on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password. Make sure to check your spam folder if you don't receive the email within a few minutes.",
        },
        {
          question: "How can I enable two-factor authentication?",
          answer:
            "Go to Settings > Security > Two-Factor Authentication. Choose your preferred method (SMS or authenticator app), follow the setup instructions, and save your backup codes in a safe place. We highly recommend enabling 2FA for enhanced account security.",
        },
        {
          question: "Can I change my email address?",
          answer:
            "Yes, you can change your email address in the Account Settings section. Go to Settings > Account > Email Address, enter your new email, and verify it through the confirmation link sent to your new email address.",
        },
      ],
    },
    {
      category: "Billing & Payments",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans. All transactions are secured with industry-standard encryption.",
        },
        {
          question: "How do refunds work?",
          answer:
            "We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact our support team within 30 days of purchase for a full refund. Refunds are processed within 5-10 business days.",
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer:
            "Yes, you can change your plan at any time. Upgrades take effect immediately, and you'll be charged a prorated amount. Downgrades will take effect at the start of your next billing cycle.",
        },
      ],
    },
    {
      category: "Features & Usage",
      questions: [
        {
          question: "How do I invite team members?",
          answer:
            "Navigate to Team Settings and click 'Invite Members'. Enter their email addresses and assign roles. They'll receive an invitation email with instructions to join your team workspace.",
        },
        {
          question: "What file formats are supported?",
          answer:
            "We support a wide range of file formats including PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG, GIF, and many more. Maximum file size varies by plan tier.",
        },
        {
          question: "Is there a storage limit?",
          answer:
            "Storage limits depend on your subscription plan. Free accounts get 5GB, Basic plans include 50GB, Pro plans offer 500GB, and Enterprise plans have unlimited storage. You can view your current usage in the Account Dashboard.",
        },
      ],
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          question: "I'm having trouble logging in. What should I do?",
          answer:
            "First, ensure you're using the correct email and password. Try resetting your password if needed. Clear your browser cache and cookies, or try a different browser. If the problem persists, contact our support team.",
        },
        {
          question: "Why is the page loading slowly?",
          answer:
            "Slow loading can be caused by internet connection issues, browser cache, or server load. Try refreshing the page, clearing your cache, or checking your internet connection. If issues continue, report it to our support team.",
        },
        {
          question: "How do I report a bug?",
          answer:
            "Please submit a support ticket with detailed information about the bug, including steps to reproduce it, screenshots if possible, and your browser/device information. Our team will investigate and respond promptly.",
        },
      ],
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  let questionCounter = 0;

  const pageBreadcrumbs = [{ label: t("Auth.SupportCenter.Title"), path: "/support-center" }];

  return (
    <PageTemplate title={t("Auth.SupportCenter.FAQ.Title")} breadcrumbs={pageBreadcrumbs}>
      <div className="container mb-5">
        {/* Search Bar */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="input-group input-group-lg shadow-sm">
              <span className="input-group-text bg-white">
                <FontAwesomeIcon icon={faSearch} className="text-muted" />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder={t("Auth.SupportCenter.FAQ.SearchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category, catIndex) => (
            <div key={catIndex} className="mb-5">
              <h3 className="mb-4 pb-2 border-bottom">{category.category}</h3>
              <div className="accordion" id={`accordion-${catIndex}`}>
                {category.questions.map((item, qIndex) => {
                  const currentIndex = questionCounter++;
                  return (
                    <div key={qIndex} className="accordion-item border mb-2">
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${
                            activeIndex === currentIndex ? "" : "collapsed"
                          } fw-semibold`}
                          type="button"
                          onClick={() => toggleAccordion(currentIndex)}
                        >
                          <span className="me-2">{item.question}</span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          activeIndex === currentIndex ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body text-muted">{item.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h5>{t("Auth.SupportCenter.FAQ.NoFAQsFound")}</h5>
          </div>
        )}

        <div className="text-center mt-4">
          <h2 className="mb-0">
            {t("Auth.SupportCenter.FAQ.DidNotFindWhatYouAreLookingFor")}{" "}
            <Link to="/support-center/contact-us">{t("Auth.SupportCenter.ContactUs.Title")}</Link>
          </h2>
        </div>
      </div>
    </PageTemplate>
  );
};

export default FaqView;
