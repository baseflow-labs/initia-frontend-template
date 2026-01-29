import Button from "@initia/shared/ui/components/core/button";
import Form from "@initia/shared/ui/components/form";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { submitTicketInputs } from "./consts";

const SupportTicketsSubmissionView = () => {
  const { t } = useTranslation();

  const links = [
    {
      label: t("Auth.SupportCenter.FAQ.CheckFaq"),
      route: "/support-center/faq",
    },
    {
      label: t("Auth.SupportCenter.UserManual.ReviewUserManual"),
      route: "/support-center/user-manual",
    },
  ];

  return (
    <Fragment>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="mb-5">
            <strong>{t("Auth.SupportCenter.Tickets.BeforeSubmitting")}</strong>

            <ul className="list-group mb-0 mt-2">
              {links.map((link, index) => (
                <li className="list-group-item" key={index}>
                  <Link to={link.route}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <Form inputs={() => submitTicketInputs(t)} onFormSubmit={() => ""} submitColor="danger" />
        </div>
      </div>

      <div className="card bg-light shadow-sm mt-4">
        <div className="card-body">
          <h5 className="card-title">Need Immediate Help?</h5>

          <p className="text-muted mb-3">For urgent issues, you can also reach us through:</p>

          <div className="d-flex gap-2 flex-wrap">
            <Link to="/support-center/contact-us">
              <Button outline color="danger" size="sm">
                Live Chat
              </Button>
            </Link>

            <a href="tel:+15551234567">
              <Button outline color="danger" size="sm">
                Call Support
              </Button>
            </a>

            <Link to="/support-center/contact-us">
              <Button outline color="danger" size="sm">
                Email Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SupportTicketsSubmissionView;
