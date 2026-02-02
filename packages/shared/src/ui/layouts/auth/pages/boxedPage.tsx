import { Fragment } from "react/jsx-runtime";

import PageTemplate from "./pageTemplate";

import CardComp from "@/components/card/card";

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
