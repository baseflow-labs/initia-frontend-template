import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";
import IconWrapperComp from "../../assets/icons/wrapper";

interface Props {
  routes: {
    name: string;
    route: string;
    icon: any;
  }[];
  fixedRoutes: {
    name: string;
    route: string;
    icon: any;
  }[];
}

const OffCanvasNav = ({ routes, fixedRoutes }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="offcanvas offcanvas-start"
      id="offcanvasNav"
      aria-labelledby="offcanvasNavLabel"
      style={{ maxWidth: "65vw" }}
    >
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body">
        <div className="nav flex-column px-2">
          {routes.map(({ name, route, icon }, i) => (
            <Fragment key={i}>
              <h5
                className={`sidebar-link text-decoration-none p-3 rounded-3 ${
                  location.pathname.includes(route)
                    ? "bg-info text-white"
                    : "text-dark"
                }`}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                role="button"
                onClick={() => {
                  navigate(route);
                }}
              >
                <IconWrapperComp icon={icon} className="me-2" />
                {<span>{name}</span>}
              </h5>
            </Fragment>
          ))}
        </div>

        <hr />

        <div className="nav flex-column px-2">
          {fixedRoutes.map(({ name, route, icon }, i) => (
            <Fragment key={i}>
              <h5
                className={`sidebar-link text-decoration-none p-3 rounded-3 ${
                  location.pathname.includes(route)
                    ? "bg-info text-white"
                    : "text-dark"
                }`}
                role="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => {
                  navigate(route);
                }}
              >
                <IconWrapperComp icon={icon} className="me-2" />
                {<span>{name}</span>}
              </h5>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffCanvasNav;
