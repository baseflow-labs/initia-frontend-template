import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/images/brand/logo-full.png";
import profilePhotoPlaceholder from "../../assets/images/profile-image-placeholder.png";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={Logo} style={{ height: "50px" }} />
        </a>

        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                الرئيسية
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                مساعدة
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                تواصل معنا
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <button
              className="btn btn-link text-secondary"
              id="notificationsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faBell} className="text-secondary" />
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="notificationsDropdown"
            >
              <li>
                <a className="dropdown-item" href="#">
                  إشعار 1
                </a>
              </li>

              <li>
                <a className="dropdown-item" href="#">
                  إشعار 2
                </a>
              </li>
            </ul>
          </div>

          <button className="btn btn-link position-relative">
            <FontAwesomeIcon icon={faEnvelope} className="text-secondary" />
          </button>

          <div className="dropdown">
            <button
              className="btn btn-link text-secondary"
              id="avatarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={profilePhotoPlaceholder}
                alt="avatar"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="avatarDropdown"
            >
              <li>
                <a className="dropdown-item" href="#">
                  الملف الشخصي
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  الإعدادات
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <span
                  className="dropdown-item"
                  role="button"
                  onClick={() => dispatch(logout())}
                >
                  تسجيل الخروج
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
