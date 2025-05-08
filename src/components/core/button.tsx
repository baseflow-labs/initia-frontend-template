interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const Button = ({ children, className, color = "info", ...rest }: Props) => {
  return (
    <button className={`btn btn-${color} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
