import React, { useState } from "react";
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
  FaClipboard // Add this import for the missing icon
} from "react-icons/fa";
import logo from "../../../public/south.logo.jpg";
import { showToast } from "../helper/alert_helper";
import { removeAuthentication } from "../../route/authentication";
import { useSnackbar } from 'notistack'; // Import useSnackbar
import { getInformationData } from "../../route/authentication";

const DashboardAside = ({ isOpen, toggle, isAdmin, informatio }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const location = useLocation(); // Get the current location
	const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar
	const user = getInformationData();

	const handleLogout = () => {
		showToast(enqueueSnackbar, "success", "Logout successfully"); // Use enqueueSnackbar
		removeAuthentication();
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const isActive = (path) => location.pathname === path; // Check if the path is active
	console.log(isActive());

	return (
		<aside
			className={`fixed 2xl:w-72 ${
				isOpen ? "w-72" : "w-0"
			} flex flex-col justify-between h-full bg-accent text-primary transition-width duration-300 z-20 shadow-2xl`}>
			<div className={`p-4 ${isOpen ? "block" : "hidden"} 2xl:block`}>
				<Link
					to="/"
					className="flex gap-2 text-[0.6rem] 2xl:text-xs items-center font-bold font-heading uppercase tracking-wide">
					<img
						src={logo}
						className="w-16 h-14 inline-block self-center rounded-full "
						alt=""
					/>
					<div className="w-40 inline-block text-[0.7rem] leading-3 tracking-wider">
						Southwesternuniversity Medical Center Mount Grace Partner
					</div>
				</Link>
				<nav className="mt-8">
					<ul className="flex flex-col gap-4">
						{isAdmin ? (
							<>
								<li>
									<Link
										to=""
										className={`text-primary flex items-center gap-2 hover:text-secondary ${
											isActive("") ? "text-secondary" : ""
										}`}>
										<FaHome />
										<span>Home</span>
									</Link>
								</li>
								<li>
									<div
										className="text-primary flex items-center gap-2 hover:text-secondary cursor-pointer"
										onClick={toggleDropdown}>
										<FaVials />
										<span>Healthcare Record</span>
										<FaChevronDown
											className={`transition-transform ${
												isDropdownOpen ? "rotate-180" : ""
											}`}
										/>
									</div>
									{isDropdownOpen && (
										<ul className="ml-6 mt-2 flex flex-col gap-2">
											<li>
												<Link
													to="/admin/healthcare-record/laboratory"
													className={`text-primary flex items-center gap-2 hover:text-secondary ${
														isActive("/admin/healthcare-record/laboratory")
															? "text-secondary"
															: ""
													}`}>
													<FaFlask />
													<span>Laboratory</span>
												</Link>
											</li>
											<li>
												<Link
													to="/admin/healthcare-record/special-imaging"
													className={`text-primary flex items-center gap-2 hover:text-secondary ${
														isActive("/admin/healthcare-record/special-imaging")
															? "text-secondary"
															: ""
													}`}>
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
										className={`text-primary flex items-center gap-2 hover:text-secondary ${
											isActive("/admin/patient-profile") ? "text-secondary" : ""
										}`}>
										<FaClipboard />
										<span>Patient Profile</span>
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link
										to=""
										className={`text-primary flex items-center gap-2 hover:text-secondary ${
											isActive("") ? "text-secondary" : ""
										}`}>
										<FaTachometerAlt />
										<span>Dashboard</span>
									</Link>
								</li>
								<li>
									<Link
										to="profile"
										className={`text-primary flex items-center gap-2 hover:text-secondary ${
											isActive("profile") ? "text-secondary" : ""
										}`}>
										<FaUser />
										<span>My Profile</span>
									</Link>
								</li>
								<li>
									<Link
										to="medical-report"
										className={`text-primary flex items-center gap-2 hover:text-secondary ${
											isActive("medical-report") ? "text-secondary" : ""
										}`}>
										<FaFileMedical />
										<span>Medical Report</span>
									</Link>
								</li>
								<li className="mt-auto">
									<Link
										to="settings"
										className={`text-primary flex items-center gap-2 hover:text-secondary ${
											isActive("settings") ? "text-secondary" : ""
										}`}>
										<FaCog />
										<span>Settings</span>
									</Link>
								</li>
								<li>
									<Link
										to="support"
										className={`text-primary flex items-center gap-2 hover:text-secondary ${
											isActive("support") ? "text-secondary" : ""
										}`}>
										<FaLifeRing />
										<span>Support</span>
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
			<div
				className={`mt-8 bg-secondary text-accent p-4 ${
					isOpen ? "block" : "hidden"
				} 2xl:block`}>
				<div className="flex flex-col items-start">
					<span className="font-bold">{user.name}</span>
					<span className="text-sm">{user.email}</span>
				</div>
				<Link onClick={() => handleLogout()} to="/login">
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
