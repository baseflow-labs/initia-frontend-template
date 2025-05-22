import { faCheck, faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../store/actions/notifications";
import { useAppSelector } from "../../store/hooks";

const NotificationsToaster = () => {
  const { notifications } = useAppSelector((_) => _.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach(({ id }) => {
      const toastEl = document.getElementById(`toast-${id}`);
      if (toastEl) {
        import("bootstrap").then(({ Toast }) => {
          const toast = new Toast(toastEl, { delay: 5000 });
          toast.show();

          const handler = () => dispatch(removeNotification(id));
          toastEl.addEventListener("hidden.bs.toast", handler);

          return () => {
            toastEl.removeEventListener("hidden.bs.toast", handler);
          };
        });
      }
    });
  }, [notifications]);

  return (
    <div
      className="toast-container position-fixed top-0 start-50 translate-middle-x p-2"
      style={{ zIndex: 1055 }}
    >
      {notifications.map(({ msg, type, id }) => (
        <div
          key={id}
          id={`toast-${id}`}
          className={`toast text-white rounded-4 bg-${
            type === "err"
              ? "danger"
              : type === "warning"
              ? "warning"
              : "success"
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body d-flex align-middle">
            <div
              role="button"
              onClick={() => dispatch(removeNotification(id))}
              className="me-2 rounded-3 p-1 text-white text-center"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                fontSize: 10,
                width: 25,
                height: 25,
              }}
            >
              <FontAwesomeIcon
                icon={
                  type === "err"
                    ? faXmark
                    : type === "warning"
                    ? faInfo
                    : faCheck
                }
                className="text-white"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
            <div className="my-auto">{msg}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsToaster;
