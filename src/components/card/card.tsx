const CardComp = ({ children = <></>, className = "", ...rest }) => {
  return (
    <div className={`card rounded-2 mx-auto ${className}`} {...rest}>
      <div className="card-body p-4">{children}</div>
    </div>
  );
};

export default CardComp;
