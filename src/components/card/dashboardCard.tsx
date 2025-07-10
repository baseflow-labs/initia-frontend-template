import { Fragment } from "react/jsx-runtime";
import CardComp from "./card";

const DashboardCard = ({
  children,
  max,
}: {
  children: React.ReactNode;
  max?: string;
}) => {
  return (
    <CardComp
      className="my-3"
      style={max ? { maxHeight: max, overflowY: "auto" } : {}}
    >
      <Fragment>{children}</Fragment>
    </CardComp>
  );
};

export default DashboardCard;
