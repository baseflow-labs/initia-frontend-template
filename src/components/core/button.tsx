import { useNavigate } from "react-router";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  color?: string;
  text?: string;
  rounded?: number;
  p?: number;
  route?: string;
  size?: string;
  outline?: boolean;
  modal?: string;
}

const Button = ({
  children,
  className,
  color = "info",
  text = "info",
  rounded = 3,
  p = 2,
  route,
  size = "",
  outline,
  modal,
  ...rest
}: Props) => {
  const navigate = useNavigate();

  const textColor = () => {
    switch (color) {
      case "primary":
      case "info":
      case "danger":
        return "white";
      case "ghost":
        return text;

      default:
        return "dark";
    }
  };

  return (
    <button
      className={`btn btn-${outline ? "outline-" : ""}${color} text-${
        outline ? "" : textColor()
      } btn-${size} ${className} rounded-${rounded} py-${p} px-${p + 1}`}
      onClick={route ? () => navigate(route) : rest.onClick}
      data-bs-target={"#" + modal}
      data-bs-toggle={modal && "modal"}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
