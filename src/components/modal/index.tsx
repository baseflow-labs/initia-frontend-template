import { Fragment } from "react/jsx-runtime";

interface Props {
  name?: string;
  title?: string;
  withTrigger?: boolean;
  triggerLabel?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal = ({
  name = "modal",
  withTrigger,
  triggerLabel = "Open",
  title,
  children,
  actions,
  ...rest
}: Props) => {
  return (
    <Fragment>
      {withTrigger && (
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#${name}`}
        >
          {triggerLabel}
        </button>
      )}

      <div
        className="modal fade"
        id={name}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        {...rest}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {title && (
              <div className="modal-header">
                <h1 className="modal-title fs-5">{title}</h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
            )}

            <div className="modal-body">
              {!title && (
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              )}
              {children}
            </div>

            {actions && <div className="modal-footer">{actions}</div>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
