import { server_connection } from "../connections/server_connection";
import { setInformationData } from "../route/authentication";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Private_route_user = ({ element: Component, setRole }) => {
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
      console.log("private route" + response.data.hasSeenTour);
      setInformationData(
        response.data.user,
        response.data.role,
        response.data.hasSeenTour
      );

      if (response.data.role === "User") {
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

export default Private_route_user;
