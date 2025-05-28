import { faGear, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";
import Logo from "../../assets/images/brand/logo-full.png";

const Sidebar = ({ routes = [{ name: "", route: "", icon: faHome }] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="d-flex flex-column p-3 bg-light m-0 vh-100 w-100"
      style={{ overflowY: "hidden" }}
    >
      <span
        className="navbar-brand p-3 mb-5 px-4"
        onClick={() => navigate("/")}
        role="button"
      >
        <img src={Logo} style={{ height: "75px" }} />
      </span>

      <ul className="nav nav-pills flex-column mb-3">
        {routes.map(({ name, route, icon }, i) => (
          <li className="nav-item" key={i}>
            <span
              onClick={() => navigate(route)}
              role="button"
              className={`nav-link ${
                location.pathname === route ? "bg-info text-white" : "text-dark"
              }`}
            >
              <FontAwesomeIcon icon={icon} className="me-2" />
              {name}
            </span>
          </li>
        ))}
      </ul>

      <hr />

      <div className="d-flex align-items-center gap-3 ms-3">
        <div className="dropdown">
          <a
            role="button"
            className="d-flex align-items-center link-dark text-decoration-none"
            data-bs-toggle="dropdown"
          >
            <FontAwesomeIcon icon={faGear} className="me-2" />
            <strong>Settings</strong>
          </a>

          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
