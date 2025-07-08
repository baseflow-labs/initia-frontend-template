const DashboardCard = ({
  children,
  max,
}: {
  children: React.ReactNode;
  max?: string;
}) => {
  return (
    <div
      className="card p-4 my-4 rounded-4"
      style={max ? { maxHeight: "40vh", overflowY: "auto" } : {}}
    >
      {children}
    </div>
  );
};

export default DashboardCard;
