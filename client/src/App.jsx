import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./pages/Home";

//Layout
import LandingLayout from "./components/Layout/LandingLayout";
import Dashboard from "./pages/patient/Dashboard";
import AdminHome from "./pages/admin/Home";
import DashboardLayout from "./components/Layout/DashboardLayout";

//PrivateRoute
import Private_route_admin from "./route/private_route_admin";
import Private_route_user from "./route/private_route_user";

import { useState } from "react";
import Profile from "./pages/patient/Profile";
import MedicalReport from "./pages/patient/MedicalReport";
import Settings from "./pages/patient/Settings";
import Support from "./pages/patient/Support";

function App() {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="admin/home"
          element={<Private_route_admin element={AdminHome} />}
        />
        <Route
          path="patient"
          element={<Private_route_user element={DashboardLayout} />}
        >
          <Route
            path="dashboard"
            element={<Private_route_user element={Dashboard} />}
          />
          <Route
            path="profile"
            element={<Private_route_user element={Profile} />}
          />
          <Route
            path="medical-report"
            element={<Private_route_user element={MedicalReport} />}
          />
          <Route
            path="settings"
            element={<Private_route_user element={Settings} />}
          />
          <Route
            path="support"
            element={<Private_route_user element={Support} />}
          />
        </Route>
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
