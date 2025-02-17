import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaFileMedical,
  FaCog,
  FaLifeRing,
  FaSignOutAlt,
  FaHome,
  FaBullhorn,
  FaVials,
  FaFlask,
  FaXRay,
  FaChevronDown,
  FaClipboard
} from "react-icons/fa";
import logo from "../../../public/south.logo.jpg";
import { showToast } from "../helper/alert_helper";
import { removeAuthentication } from "../../route/authentication";
import { useSnackbar } from 'notistack'; // Import useSnackbar
import { getInformationData } from "../../route/authentication";

const DashboardAside = ({ isOpen, toggle, isAdmin }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // Get the current location
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar
  const user = getInformationData();
  const [widthSize, setWidthSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidthSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    showToast(enqueueSnackbar, "success", "Logout successfully"); // Use enqueueSnackbar
    removeAuthentication();
  };

  const isActive = (path) => location.pathname === path; // Check if the path is active

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <aside
      className={` 
        flex flex-col
        z-50 fixed top-0 left-0 w-72 min-h-screen bg-secondary shadow-lg
        transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        2xl:translate-x-0
      `}
    >
      <Link
        to="/"
        className="text-white p-4 md:p-6 lg:p-8 xl:p-10 flex gap-2 text-[0.6rem] 2xl:text-xs items-center font-bold font-heading uppercase tracking-wide"
      >
        <img
          src={logo}
          className="w-16 h-14 self-start inline-block rounded-full"
          alt="Logo"
        />
        <div className="w-40 inline-block text-[0.7rem] leading-3 tracking-wider">
          Southwesternuniversity Medical Center Mount Grace Partner
        </div>
      </Link>

      <nav className="p-4 md:p-6 lg:p-8 xl:p-10">
        <ul className="flex flex-col gap-4">
          {isAdmin ? (
            <>
              <li>
                <Link
                  to="/"
                  className={`text-accent flex items-center gap-3 p-3 rounded-md hover:text-primary hover:bg-accent ${
                    isActive("/") ? "text-primary bg-accent" : ""
                  }`}
                >
                  <FaHome />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <div
                  className="text-accent flex items-center gap-3 p-3 rounded-md hover:text-primary hover:bg-accent cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <FaVials />
                  <span>Healthcare Record</span>
                  <FaChevronDown
                    className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {isDropdownOpen && (
                  <ul className="ml-6 mt-2 flex flex-col gap-2">
                    <li>
                      <Link
                        to="/admin/healthcare-record/laboratory"
                        className={`text-accent flex items-center gap-3 p-3 rounded-md hover:text-primary hover:bg-accent ${
                          isActive("/admin/healthcare-record/laboratory") ? "text-primary bg-accent" : ""
                        }`}
                      >
                        <FaFlask />
                        <span>Laboratory</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/healthcare-record/special-imaging"
                        className={`text-accent flex items-center gap-3 p-3 rounded-md hover:text-primary hover:bg-accent ${
                          isActive("/admin/healthcare-record/special-imaging") ? "text-primary bg-accent" : ""
                        }`}
                      >
                        <FaXRay />
                        <span>Special Imaging</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/admin/patient-profile"
                  className={`text-accent flex items-center gap-3 p-3 rounded-md hover:text-primary hover:bg-accent ${
                    isActive("/admin/patient-profile") ? "text-primary bg-accent" : ""
                  }`}
                >
                  <FaClipboard />
                  <span>Patient Profile</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className={`text-accent flex items-center gap-3 p-3 rounded-md hover:text-primary hover:bg-accent ${
                    isActive("/") ? "text-primary bg-accent" : ""
                  }`}
                >
                  <FaTachometerAlt />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/patient/profile"
                  className={`text-accent flex items-center gap-3 p-3 rounded-md hover:text-primary hover:bg-accent ${
                    isActive("/profile") ? "text-primary bg-accent" : ""
                  }`}
                >
                  <FaUser />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/patient/medical-report"
                  className={`text-accent flex items-center gap-3 p-3 rounded-md hover:text-primary hover:bg-accent ${
                    isActive("/medical-report") ? "text-primary bg-accent" : ""
                  }`}
                >
                  <FaFileMedical />
                  <span>Medical Report</span>
                </Link>
              </li>
              <li className="mt-auto">
                <Link
                  to="/patient/settings"
                  className={`text-accent flex items-center gap-3 p-3 rounded-md hover:text-primary hover:bg-accent ${
                    isActive("/settings") ? "text-primary bg-accent" : ""
                  }`}
                >
                  <FaCog />
                  <span>Settings</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className={`mt-auto bg-accent text-primary p-4 md:p-6 lg:p-8 xl:p-10 ${isOpen ? "block" : "hidden"} 2xl:block`}>
        <div className="flex flex-col items-start">
          <span className="font-bold">{user.name}</span>
          <span className="text-sm">{user.email}</span>
        </div>
        <Link onClick={handleLogout} to="/login">
          <button className="w-full text-center mt-4 bg-secondary text-accent py-2 px-4 rounded flex items-center gap-2 hover:bg-primary">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default DashboardAside;
