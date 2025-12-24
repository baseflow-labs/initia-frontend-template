import { Fragment } from "react/jsx-runtime";

import CardComp from "./card";

const DashboardCard = ({
  children,
  max,
  className,
  title,
}: {
  children: React.ReactNode;
  max?: string;
  className?: string;
  title?: string;
}) => {
  return (
    <CardComp
      className={`my-3 w-100 ${className}`}
      style={max ? { maxHeight: max, overflowY: "auto" } : {}}
    >
      <Fragment>
        {title && <h4 className="mb-4">{title}</h4>}

        {children}
      </Fragment>
    </CardComp>
  );
};

export default DashboardCard;
