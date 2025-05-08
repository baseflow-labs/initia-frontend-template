import "./index.css";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <body>{children}</body>
    </div>
  );
};

export default Layout;
