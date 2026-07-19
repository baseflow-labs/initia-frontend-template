import { Modal as BootstrapModal } from "bootstrap";
import { useEffect, useRef } from "react";
import { Fragment } from "react/jsx-runtime";

import Button from "../core/button";

interface Props {
  name?: string;
  title?: string;
  withTrigger?: boolean;
  triggerLabel?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
}

type BootstrapModalInstance = InstanceType<typeof BootstrapModal>;

const Modal = ({
  name = "modal",
  withTrigger,
  triggerLabel = "Open",
  title,
  children,
  actions,
  isOpen = false,
  onClose,
  className,
  ...rest
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<BootstrapModalInstance | null>(null);
  const hiddenHandlerRef = useRef<(() => void) | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const ensureInstance = () => {
    if (!modalRef.current) return false;
    if (instanceRef.current) return true;
    if (typeof window === "undefined") {
      return false;
    }

    instanceRef.current = BootstrapModal.getOrCreateInstance(modalRef.current, {
      backdrop: true,
      keyboard: true,
      focus: true,
    });

    const handleHidden = () => {
      onCloseRef.current();
    };
    hiddenHandlerRef.current = handleHidden;
    modalRef.current.addEventListener("hidden.bs.modal", handleHidden);
    return true;
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (ensureInstance()) {
        window.clearInterval(timer);
      }
    }, 120);

    return () => {
      window.clearInterval(timer);
      if (modalRef.current && hiddenHandlerRef.current) {
        modalRef.current.removeEventListener("hidden.bs.modal", hiddenHandlerRef.current);
      }
      instanceRef.current?.hide?.();
      instanceRef.current?.dispose?.();
      instanceRef.current = null;
      hiddenHandlerRef.current = null;

      document.body.classList.remove("modal-open");
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    };
  }, []);

  useEffect(() => {
    if (!ensureInstance()) return;
    const inst = instanceRef.current;
    if (!inst) return;
    if (isOpen) {
      inst.show();
    } else {
      inst.hide();
    }
  }, [isOpen]);

  return (
    <Fragment>
      {withTrigger && (
        <Button
          onClick={() => {
            instanceRef.current?.show();
          }}
        >
          {triggerLabel}
        </Button>
      )}

      <div
        className={`modal fade ${className ?? ""}`}
        id={name}
        ref={modalRef}
        tabIndex={-1}
        aria-labelledby={`${name}-label`}
        aria-hidden={!isOpen}
        {...rest}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-10">
                  <h4 id={`${name}-label`} className="modal-title my-5">
                    {title}
                  </h4>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn-close float-end"
                    // Let Bootstrap close it; hidden.bs.modal will call onClose
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
