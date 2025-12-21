import { Fragment } from "react/jsx-runtime";

import CardComp from "./card";

const DashboardCard = ({
  children,
  max,
  className,
}: {
  children: React.ReactNode;
  max?: string;
  className?: string;
}) => {
  return (
    <CardComp
      className={`my-3 w-100 ${className}`}
      style={max ? { maxHeight: max, overflowY: "auto" } : {}}
    >
      <Fragment>{children}</Fragment>
    </CardComp>
  );
};

export default DashboardCard;
