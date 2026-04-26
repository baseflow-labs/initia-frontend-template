import { faCheck, faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/store/hooks";
import { removeNotification } from "@/store/actions/notifications";

const NotificationsToaster = () => {
  const { notifications } = useAppSelector((_) => _.notifications);
  const dispatch = useDispatch();
  const initializedToastsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handlers: Array<{ id: string; handler: () => void }> = [];

    notifications.forEach(({ id, durationMs }) => {
      const toastId = `toast-${id}`;
      if (initializedToastsRef.current.has(toastId)) return;
      const toastEl = document.getElementById(toastId);
      if (toastEl) {
        import("bootstrap").then(({ Toast }) => {
          const toast = new Toast(toastEl, { delay: durationMs || 5000 });
          toast.show();
          initializedToastsRef.current.add(toastId);

          const handler = () => dispatch(removeNotification(id as number));
          toastEl.addEventListener("hidden.bs.toast", handler);
          handlers.push({ id: toastId, handler });
        });
      }
    });

    return () => {
      handlers.forEach(({ id, handler }) => {
        const toastEl = document.getElementById(id);
        toastEl?.removeEventListener("hidden.bs.toast", handler);
        initializedToastsRef.current.delete(id);
      });
    };
  }, [notifications]);

  return (
    <div
      className="toast-container position-fixed top-0 start-50 translate-middle-x p-2"
      style={{ zIndex: 1155 }}
    >
      {notifications.map(({ msg, type, title, id }, i) => (
        <div
          key={i}
          id={`toast-${id}`}
          className={`toast rounded-2 ${
            type === "err"
              ? "text-white bg-danger"
              : type === "warning"
                ? "text-dark bg-warning"
                : type === "info"
                  ? "text-dark bg-info"
                  : "text-white bg-success"
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body d-flex align-middle">
            <div
              role="button"
              onClick={() => dispatch(removeNotification(id as number))}
              className="me-2 rounded-2 p-1 text-white text-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                fontSize: 10,
                width: 25,
                height: 25,
              }}
            >
              <FontAwesomeIcon
                icon={
                  type === "err"
                    ? faXmark
                    : type === "warning" || type === "info"
                      ? faInfo
                      : faCheck
                }
                className="text-white"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
            <div className="my-auto">
              {title ? <div className="fw-semibold">{title}</div> : null}
              <div>{msg}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsToaster;
