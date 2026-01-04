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

declare global {
  interface Window {
    bootstrap: {
      Modal: {
        getOrCreateInstance: (
          el: Element,
          options?: { backdrop?: boolean; keyboard?: boolean; focus?: boolean }
        ) => BootstrapModal;
      };
    };
  }
}

interface BootstrapModal {
  show: () => void;
  hide: () => void;
  dispose?: () => void;
}

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
  const instanceRef = useRef<BootstrapModal | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    // Wait for Bootstrap to be available
    if (typeof window.bootstrap === "undefined") {
      console.warn("Bootstrap JS not loaded yet");
      return;
    }

    instanceRef.current = window.bootstrap.Modal.getOrCreateInstance(modalRef.current, {
      backdrop: true,
      keyboard: true,
      focus: true,
    });

    const handleHidden = () => {
      onClose();
    };

    modalRef.current.addEventListener("hidden.bs.modal", handleHidden);

    return () => {
      modalRef.current?.removeEventListener("hidden.bs.modal", handleHidden);
      instanceRef.current?.hide?.();
      instanceRef.current?.dispose?.();
      instanceRef.current = null;

      document.body.classList.remove("modal-open");
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    };
  }, []);

  useEffect(() => {
    const inst = instanceRef.current;
    if (!inst || typeof window.bootstrap === "undefined") return;
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
