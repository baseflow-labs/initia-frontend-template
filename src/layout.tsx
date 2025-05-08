import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18next";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <main className="layout">{children}</main>;
};

export default Layout;
