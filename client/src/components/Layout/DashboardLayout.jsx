import React, { useState, useEffect } from "react";
import DashboardAside from "../NavigationBar/DashboardAside";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardFooter from "../dashboard/DashboardFooter";
import { getRoute } from "../../route/authentication";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      <DashboardHeader isOpen={isOpen} toggle={toggle} />
      <DashboardAside
        isOpen={isOpen}
        toggle={toggle}
        isAdmin={getRoute() === "Admin" ? true : false}
      />
      <DashboardFooter />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggle}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
