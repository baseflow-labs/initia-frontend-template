import { Fragment } from "react/jsx-runtime";
import CardComp from "../../../components/card/card";

const BoxedPage = ({ title = "", className = "", children = <></> }) => {
  return (
    <CardComp className={`mt-3 ${className}`} style={{ maxWidth: "750px" }}>
      <Fragment>
        <h3>{title}</h3>

        {children}
      </Fragment>
    </CardComp>
  );
};

export default BoxedPage;
