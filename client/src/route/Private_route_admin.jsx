import { server_connection } from "../connections/server_connection";
import { setInformationData } from "../route/authentication";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Private_route_admin = ({ element: Component }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const token = sessionStorage.getItem("Token");

	const checkAuthentication = async () => {
		try {
			const response = await axios.get(
				`${server_connection()}/api/protected-route`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setInformationData(response.data.user, response.data.role);
			console.log("Protected route api: " + response.data.role);
			if (response.data.role === "Admin") {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		} catch (error) {
			console.error("Not authorized:");
			setIsAuthenticated(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkAuthentication();
	}, []);

	if (loading) {
		return (
			<div className="relative min-h-screen flex justify-center items-center bg-gray-100 px-4">
				<div className="flex justify-center items-center h-60vh"></div>
			</div>
		);
	}

	return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default Private_route_admin;
