interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  color?: string;
  rounded?: number;
  p?: number;
}

const Button = ({
  children,
  className,
  color = "info",
  rounded = 0,
  p = 2,
  ...rest
}: Props) => {
  const textColor = () => {
    switch (color) {
      case "primary":
      case "info":
        return "white";

      default:
        return "dark";
    }
  };

  return (
    <button
      className={`btn btn-${color} text-${textColor()} ${className} rounded-${rounded} py-${p} px-${
        p + 1
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
