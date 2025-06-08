import { useEffect, useRef } from "react";
import { Fragment } from "react/jsx-runtime";

interface Props {
  name?: string;
  title?: string;
  withTrigger?: boolean;
  triggerLabel?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;

  isOpen?: boolean;
  onClose: () => void;
}

const Modal = ({
  name = "modal",
  withTrigger,
  triggerLabel = "Open",
  title,
  children,
  actions,
  isOpen,
  onClose,
  ...rest
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    const modalElement = modalRef.current;

    if (isOpen) {
      const modal = new (window as any).bootstrap.Modal(modalRef.current);
      modal.show();

      // Close handler to sync Bootstrap close with your onClose
      modalElement.addEventListener("hidden.bs.modal", onClose, { once: true });
    } else {
      const instance = window.bootstrap.Modal.getInstance(modalElement);
      if (instance) instance.hide();
    }
  }, [isOpen, onClose]);

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
        ref={modalRef}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        {...rest}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-10">
                  <h4 className="modal-title my-5">{title}</h4>
                </div>

                <div className="col-2">
                  <button
                    type="button"
                    className="btn-close float-end"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
              </div>
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
