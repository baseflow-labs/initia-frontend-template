import { useNavigate } from "react-router";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  color?: string;
  rounded?: number;
  p?: number;
  route?: string;
  size?: string;
}

const Button = ({
  children,
  className,
  color = "info",
  rounded = 0,
  p = 2,
  route,
  size = "",
  ...rest
}: Props) => {
  const navigate = useNavigate();

  const textColor = () => {
    switch (color) {
      case "primary":
      case "info":
        return "white";
      case "ghost":
        return "info";

      default:
        return "dark";
    }
  };

  return (
    <button
      className={`btn btn-${color} text-${textColor()} btn-${size} ${className} rounded-${rounded} py-${p} px-${
        p + 1
      }`}
      onClick={route ? () => navigate(route) : rest.onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
