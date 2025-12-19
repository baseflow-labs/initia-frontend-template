import Activity from "@/components/activity";
import ActionButtons, { ActionButtonProps } from "@/components/button/actionButtons";
import { Link } from "react-router";

interface Props {
  title?: string;
  actionButtons?: ActionButtonProps[];
  breadcrumbs?: { label: string; path: string }[];
  children: React.ReactNode;
}

const PageTemplate = ({ title, actionButtons, breadcrumbs, children }: Props) => {
  return (
    <div className="card border-0">
      <div className="card-body p-5">
        <div className="row w-100">
          <div className="col-6 col-lg-3 order-2 order-lg-1">
            <h3 className="mt-4 mt-lg-0">{title}</h3>

            <Activity condition={!!(breadcrumbs && breadcrumbs?.length > 0)}>
              <nav
                className="w-100"
                // style={{ "--bs-breadcrumb-divider": "'>'" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  {breadcrumbs?.map((item, i) => (
                    <li className="breadcrumb-item" key={i}>
                      <Link className="text-decoration-none" to={item.path}>
                        {item.label}
                      </Link>
                    </li>
                  ))}

                  <li className="breadcrumb-item active" aria-current="page">
                    {title}
                  </li>
                </ol>
              </nav>
            </Activity>
          </div>

          <div className="col-6 col-lg-2 order-3 order-lg-3">
            {actionButtons && (
              <div className="float-end mt-3 mt-lg-0">
                <ActionButtons buttons={actionButtons} />
              </div>
            )}
          </div>

          <div className="col-12 order-4 order-lg-4 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
