import React from "react";
import DashboardNavBar from "../../components/NavigationBar/DashboardAside";
import { getRoute } from "../../route/authentication";

const Dashboard = () => {
  return (
    <div>
      <DashboardNavBar isAdmin={getRoute() === "Admin" ? true : false} />
      asd
    </div>
  );
};

export default Dashboard;
