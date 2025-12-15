import { Fragment } from "react/jsx-runtime";
import CardComp from "@/components/card/card";
import PageTemplate from "./pageTemplate";

const BoxedPage = ({
  title = "",
  className = "",
  children = <></>,
  hideHeader = false,
}) => {
  return (
    <PageTemplate>
      <CardComp className={className} style={{ maxWidth: "750px" }}>
        <Fragment>
          <h3>{title}</h3>

          {children}
        </Fragment>
      </CardComp>
    </PageTemplate>
  );
};

export default BoxedPage;
