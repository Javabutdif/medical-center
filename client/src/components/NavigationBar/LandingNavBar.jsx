import React from "react";
import { useLocation, Link } from "react-router-dom";

function LandingNavBar() {
  return (
    <nav className="bg-white shadow fixed w-full top-0 flex items-center justify-between p-2">
      <div className="flex items-center">
        <Link to="/" className="font-bold text-xl">
          <img
            src="/south.logo.jpg"
            className="w-12 h-12 inline-block"
            alt=""
          />
          <div className="inline-block">
            <p className="text-xl ms-3">
              Southwestern University Medical Center Mount Grace Partner
            </p>
          </div>
        </Link>
      </div>
      <button className="block lg:hidden text-gray-500 focus:outline-none">
        <svg
          className="w-6 h-6"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>
      <div className="hidden lg:flex space-x-8 pr-20 font-bold">
        <ul className="flex space-x-8">
          <li>
            <Link to="/login" className="text-red-700 hover:text-red-500">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LandingNavBar;
