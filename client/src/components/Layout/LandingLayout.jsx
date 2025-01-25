import React from "react";
import LandingNavBar from "../NavigationBar/LandingNavBar";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-200% to-white from-60% ">
      <main className="overflow-hidden flex items-start">
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
