import { Toast } from "bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { removeNotification } from "../../store/actions/notifications";
import { useAppSelector } from "../../store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";

const NotificationsToaster = () => {
  const { notifications } = useAppSelector((_) => _.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    const toastElList = document.querySelectorAll(".toast");
    toastElList.forEach((toastEl) => {
      const toast = new Toast(toastEl, { delay: 5000 });
      toast.show();
    });
  }, [notifications]);

  return (
    <div
      className="toast-container position-fixed top-0 start-50 translate-middle-x p-2"
      style={{ zIndex: 1055 }}
    >
      {notifications.map(({ msg, type }, i) => (
        <div
          key={i}
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
          onClick={() => dispatch(removeNotification(i))}
        >
          <div className="toast-body d-flex align-middle">
            <div
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
                role="button"
                className="text-white"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => dispatch(removeNotification(i))}
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
