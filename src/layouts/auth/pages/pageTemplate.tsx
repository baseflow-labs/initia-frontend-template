import ActionButtons, { ActionButtonProps } from "@/components/button/actionButtons";

interface Props {
  title?: string;
  actionButtons?: ActionButtonProps[];
  children: React.ReactNode;
}

const PageTemplate = ({ title, actionButtons, children }: Props) => {
  return (
    <div className="card border-0">
      <div className="card-body p-5">
        <div className="row w-100">
          <div className="col-6 col-lg-3 order-2 order-lg-1">
            <h3 className="mt-4 mt-lg-0">{title}</h3>
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
