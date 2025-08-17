const CardComp = ({ children = <></>, className = "", ...rest }) => {
  return (
    <div
      className={`border border-1 rounded-5 mx-auto p-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CardComp;
