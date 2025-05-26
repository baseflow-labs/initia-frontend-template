import React from "react";

interface Props {
  color?: string;
}

const Spinner: React.FC<Props> = ({ color = "text", ...rest }) => {
  return (
    <div
      className={`spinner-border text-${color} m-0 p-0`}
      role="status"
      {...rest}
    />
  );
};

export default Spinner;
