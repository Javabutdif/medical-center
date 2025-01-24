import React from "react";
import LandingNavBar from "../NavigationBar/LandingNavBar";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <>
      <LandingNavBar />

      <main className="overflow-hidden">
        <Outlet />
      </main>
    </>
  );
};

export default LandingLayout;
