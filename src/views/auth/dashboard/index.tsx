import { Fragment } from "react";

import AdminDashboardView from "./admin";
// import UserDashboardView from "./user";

const DashboardView = () => {
  return (
    <Fragment>
      <AdminDashboardView />

      {/* <UserDashboardView /> */}
    </Fragment>
  );
};

export default DashboardView;
