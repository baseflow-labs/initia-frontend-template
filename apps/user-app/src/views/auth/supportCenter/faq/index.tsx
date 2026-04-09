import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { FaqItem, getPublishedFaqs } from "../../../../api/support";

const FaqView = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const response = await getPublishedFaqs();
        setFaqs(response.payload || []);
      } catch {
        setErrorMsg(t("Auth.SupportCenter.FAQ.LoadError", "Unable to load FAQ items."));
      } finally {
        setIsLoading(false);
      }
    };

    loadFaqs();
  }, [t]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return faqs;
    return faqs.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        (item.link || "").toLowerCase().includes(q)
    );
  }, [faqs, searchTerm]);

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

        {isLoading ? (
          <div className="text-center">
            <h5>{t("Auth.SupportCenter.FAQ.Loading", "Loading FAQs...")}</h5>
          </div>
        ) : errorMsg ? (
          <div className="text-center">
            <h5>{errorMsg}</h5>
          </div>
        ) : filteredFAQs.length > 0 ? (
          <div className="mb-5">
            <div className="accordion" id="faq-accordion">
              {filteredFAQs.map((item, index) => (
                <div key={item.id} className="accordion-item border mb-2">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${activeIndex === index ? "" : "collapsed"} fw-semibold`}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="me-2">{item.title}</span>
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
                  >
                    <div className="accordion-body text-muted">
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                      {item.link && (
                        <a
                          className="d-inline-block mt-3"
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("Auth.SupportCenter.FAQ.LearnMore", "Learn more")}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
