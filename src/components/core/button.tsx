import React from "react";
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
}

const Button = ({
  children,
  className = "",
  color = "primary",
  text = "primary",
  rounded = 3,
  p = 2,
  route,
  size = "",
  type = "button",
  outline,
  onClick,
  ...rest
}: Props) => {
  const navigate = useNavigate();

  const textColor = () => {
    switch (color) {
      case "primary":
      case "success":
      case "danger":
        return text === "primary" ? "white" : text;
      case "ghost":
        return text;
      default:
        return "dark";
    }
  };

  const paddingY = size === "sm" ? "py-0" : `py-${p}`;
  const paddingX = size === "sm" ? "px-0" : `px-${p + 1}`;
  const textClass = !outline ? `text-${textColor()}` : "";
  const sizeClass = size ? `btn-${size}` : "";

  const finalClass = `${outline ? "" : "border-0"} btn btn-${
    outline ? "outline-" : ""
  }${color} ${textClass} ${sizeClass} ${paddingY} ${paddingX} rounded-${rounded} ${className}`;

  return (
    <button
      className={finalClass.trim()}
      onClick={(e) => {
        onClick?.(e);
        if (route) {
          if (route === "back") {
            navigate(-1);
          } else {
            navigate(route);
          }
        }
      }}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
