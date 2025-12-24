const CardComp = ({ children = <></>, className = "", ...rest }) => {
  return (
    <div className={`card rounded-2 mx-auto ${className}`} {...rest}>
      <div className="card-body px-4 pt-4 pb-2">{children}</div>
    </div>
  );
};

export default CardComp;
