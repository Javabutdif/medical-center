import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Joyride, { STATUS, ACTIONS } from "react-joyride";
import DashboardAside from "../NavigationBar/DashboardAside";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardFooter from "../dashboard/DashboardFooter";
import { getRoute, getInformationData } from "../../route/authentication";
import DashboardMain from "../dashboard/DashboardMain";
import { updateSeenTour } from "../../api/user";
const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const user = getInformationData();
  const [formData, setFormData] = useState({
    id: user.patient_id === null ? user.name : user.patient_id,
    type: user.patient_id === null ? "admin" : "patient",
  });
  const getMobileSteps = (isAdmin) => [
    {
      target: "body",
      title: `Welcome to the ${isAdmin ? "Admin" : "Patient"} Portal! 👋`,
      content: `Welcome to the Medical Center ${
        isAdmin ? "Admin" : "Patient"
      } Portal. Let's get you started with a quick tour!`,
      placement: "center",
      disableBeacon: true,
      spotlightPadding: 0,
      disableOverlay: false,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: ".menu-toggle",
      title: "Menu Access",
      content:
        "Click here to open the navigation menu. This gives you access to all features.",
      placement: "right",
      disableBeacon: true,
      spotlightPadding: 5,
    },
    {
      target: ".navigation-items",
      title: "Quick Navigation",
      content: isAdmin
        ? "Here you'll find shortcuts to:\n• Home\n• Healthcare Records (Laboratory & Special Imaging)\n• Patient Profiles"
        : "Here you'll find shortcuts to:\n• Dashboard\n• Your Profile\n• Medical Reports",
      placement: "auto",
      disableBeacon: true,
      spotlightPadding: 8,
      styles: {
        options: {
          zIndex: 10000,
        },
        tooltip: {
          width: "260px", // Reduced width
          maxWidth: "90vw",
          whiteSpace: "pre-line",
          padding: "15px",
        },
        tooltipContent: {
          padding: "10px 0",
          fontSize: "14px",
          lineHeight: "1.6",
          textAlign: "left",
        },
      },
      floaterProps: {
        disableAnimation: true,
        placement: "auto",
        options: {
          middleware: [
            {
              name: "shift",
              options: {
                padding: 5,
              },
            },
          ],
        },
      },
    },
    {
      target: ".user-profile-section",
      title: "Profile & Settings",
      content: isAdmin
        ? "Manage your admin account and access system settings from here."
        : "Access your personal account settings and medical profile information here.",
      placement: "top-start",
      disableBeacon: true,
      spotlightPadding: 5,
    },
  ];

  const getDesktopSteps = (isAdmin) => [
    {
      target: "body",
      title: `Welcome to Your ${isAdmin ? "Admin" : "Medical"} Portal`,
      content: `Let's take a quick tour of your ${
        isAdmin ? "admin" : "patient"
      } dashboard and its features.\n\nClick "Skip Tutorial" to skip this guide.`,
      placement: "center",
      disableBeacon: true,
      spotlightPadding: 0,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: ".navigation-items",
      title: "Main Navigation",
      content: isAdmin
        ? "Your admin tools include:\n• Home Dashboard\n• Healthcare Records Management\n• Patient Profile Management\n• System Settings"
        : "Your portal navigation includes:\n• Dashboard - Overview of your medical status\n• Profile - Personal information\n• Medical Reports - View your health records",
      placement: "right",
      disableBeacon: true,
    },
    {
      target: ".user-profile-section",
      title: "Account Management",
      content: isAdmin
        ? "Manage your admin account here:\n• Update admin profile\n• System preferences\n• Secure logout"
        : "Manage your account settings here:\n• Update your profile\n• View medical information\n• Secure logout",
      placement: "top",
      disableBeacon: true,
    },
  ];

  const [steps, setSteps] = useState(
    isMobile
      ? getMobileSteps(getRoute() === "Admin")
      : getDesktopSteps(getRoute() === "Admin")
  );

  useEffect(() => {
    const isAdmin = getRoute() === "Admin";
    setSteps(isMobile ? getMobileSteps(isAdmin) : getDesktopSteps(isAdmin));
  }, [isMobile]);

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

      default:
        return "Dashboard";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user.hasSeenTour === false) {
      setRunTour(true);
      if (isMobile) {
        setIsOpen(true);
      }
    }
  }, [isMobile]);

  useEffect(() => {
    // Add a small delay to ensure DOM is ready
    if (runTour) {
      setTimeout(() => {
        const header = document.querySelector(".dashboard-header");
        if (header) {
          header.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [runTour]);

  const handleJoyrideCallback = async (data) => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      if (await updateSeenTour(formData)) setIsOpen(false);

      return;
    }

    if (isMobile) {
      switch (index) {
        case 0: // Welcome step
          if (type === "step:before") {
            setIsOpen(false);
            document.body.style.overflow = "hidden";
          }
          if (type === "step:after") {
            document.body.style.overflow = "";
          }
          break;

        case 1: // Menu toggle step
          if (type === "step:after") {
            setTimeout(() => setIsOpen(true), 300);
          }
          break;

        case 2: // Navigation items step
          if (type === "step:before") {
            setIsOpen(true);
            setTimeout(() => {
              const navItems = document.querySelector(".navigation-items");
              if (navItems) {
                navItems.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                // Force tooltip to recalculate position
                window.dispatchEvent(new Event("resize"));
              }
            }, 400);
          }
          break;

        default:
          // Keep menu open for remaining steps
          setIsOpen(true);
      }
    }
  };

  return (
    <div className="relative">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        scrollToFirstStep={false} // Changed to false
        hideBackButton={isMobile && steps[0]}
        disableOverlayClose
        disableScrollParentFix
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#2D3648",
            overlayColor: "rgba(0, 0, 0, 0.75)", // Darker overlay
            arrowColor: "#fff",
            backgroundColor: "#fff",
            textColor: "#2D3648",
            width: isMobile ? "290px" : "400px",
          },
          tooltip: {
            fontSize: "14px",
            padding: "20px",
            maxWidth: "290px",
            wordBreak: "break-word",
          },
          tooltipTitle: {
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#2D3648",
          },
          tooltipContent: {
            padding: "10px 0",
            fontSize: "14px",
            lineHeight: "1.5",
          },
          buttonNext: {
            backgroundColor: "#2D3648",
            fontSize: "14px",
            padding: "8px 15px",
          },
          buttonBack: {
            color: "#2D3648",
            fontSize: "14px",
            marginRight: "10px",
          },
          buttonSkip: {
            color: "#666",
            fontSize: "14px",
          },
          spotlight: {
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker overlay
          },
          tooltipContainer: {
            textAlign: "center", // Center align first step
          },
        }}
        locale={{
          last: "Finish Tour",
          skip: "Skip Tutorial",
          next: "Next Step",
          back: "Previous",
        }}
        floaterProps={{
          hideArrow: false,
          disableAnimation: true,
          offset: 10,
        }}
        callback={handleJoyrideCallback}
      />
      <DashboardHeader
        isOpen={isOpen}
        toggle={toggle}
        title={getTitle(location.pathname)}
        className="dashboard-header z-[1000]"
      />
      <DashboardAside
        isOpen={isOpen}
        toggle={toggle}
        isAdmin={getRoute() === "Admin" ? true : false}
        className="dashboard-nav"
        startTour={() => setRunTour(true)}
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
