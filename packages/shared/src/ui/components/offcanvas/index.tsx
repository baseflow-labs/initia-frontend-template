import tempLogo from "../../../assets/images/brand/logo.png";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../core/button";

interface Props {
  id: string;
  position?: "start" | "end" | "top" | "bottom";
  content: (x: () => void) => React.ReactNode;
  logoFull?: string;
}

const OffcanvasComp = ({ id, position = "start", content, logoFull }: Props) => {
  const handleDismiss = () => {
    const offcanvasElement = document.getElementById(id);
    if (offcanvasElement) {
      const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasElement);
      bsOffcanvas?.hide();
    }
  };

  return (
    <div
      className={`offcanvas offcanvas-${position} border-0`}
      id={id}
      aria-labelledby={`${id}Label`}
      style={{
        maxWidth: ["start", "end"].includes(position) ? "70vw" : "100vw",
        maxHeight: "100vh",
        overflowY: "hidden",
      }}
    >
      <div className="offcanvas-header d-flex justify-content-around align-items-center mb-0 pb-0">
        <div>
          <img src={logoFull || tempLogo} style={{ height: "40px" }} alt="Logo" />
        </div>

        <Button
          color="ghost"
          className="p-0 text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faX} />
        </Button>
      </div>

      <div className="offcanvas-body px-0 mt-0 d-flex flex-column" style={{ minHeight: 0 }}>
        {content(handleDismiss)}
      </div>
    </div>
  );
};

export default OffcanvasComp;
