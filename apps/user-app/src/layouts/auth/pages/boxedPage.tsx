import { Fragment } from "react/jsx-runtime";
import CardComp from "@initia/shared/ui/components/card/card";
import PageTemplate from "./pageTemplate";

const BoxedPage = ({ title = "", className = "", children = <></> }) => {
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
