import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardAside from "../NavigationBar/DashboardAside";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardFooter from "../dashboard/DashboardFooter";
import { getRoute } from "../../route/authentication";
import DashboardMain from "../dashboard/DashboardMain";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggle = () => setIsOpen(!isOpen);

  const getTitle = (path) => {
    switch (path) {
      case "/admin/announcements":
        return "Announcements";
      case "/admin/healthcare-record/laboratory":
        return "Laboratory";
      case "/admin/healthcare-record/special-imaging":
        return "Special Imaging";
      case "/admin/patient-profile":
        return "Patient Profile";
      case "/patient/profile":
        return "Profile Information";
      case "/patient/medical-report":
        return "Medical Report";
      case "/patient/settings":
        return "Settings";
      case "/patient/support":
        return "Support";
      default:
        return "Dashboard";
    }
  };

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
      <DashboardHeader isOpen={isOpen} toggle={toggle} title={getTitle(location.pathname)} />
      <DashboardAside
        isOpen={isOpen}
        toggle={toggle}
        isAdmin={getRoute() === "Admin" ? true : false}
      />
      <DashboardMain />
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
