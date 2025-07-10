const BoxedPage = ({ title = "", children = <></> }) => {
  return (
    <div
      className="border border-2 border-dark rounded-5 mx-auto p-5"
      style={{ maxWidth: "750px" }}
    >
      <h3>{title}</h3>

      {children}
    </div>
  );
};

export default BoxedPage;
