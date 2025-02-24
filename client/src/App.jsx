import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./pages/Home";

// Layout
import LandingLayout from "./components/Layout/LandingLayout";
import Dashboard from "./pages/patient/Dashboard";
import AdminHome from "./pages/admin/Home";
import DashboardLayout from "./components/Layout/DashboardLayout";

// PrivateRoute
import Private_route_admin from "./route/Private_route_admin";
import Private_route_user from "./route/Private_route_user";
import Profile from "./pages/patient/Profile";
import MedicalReport from "./pages/patient/MedicalReport";

import Laboratory from "./pages/admin/health-record/Laboratory";
import SpecialImaging from "./pages/admin/health-record/SpecialImaging";
import PatientProfile from "./pages/admin/PatientProfile";

function App() {
  return (
		<SnackbarProvider maxSnack={3}>
			<Router>
				<Routes>
					<Route path="/" element={<LandingLayout />}>
						<Route index element={<Home />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="admin"
						element={<Private_route_admin element={DashboardLayout} />}>
						<Route
							index
							element={<Private_route_admin element={AdminHome} />}
						/>
						<Route
							path="healthcare-record/laboratory"
							element={<Private_route_admin element={Laboratory} />}
						/>
						<Route
							path="healthcare-record/special-imaging"
							element={<Private_route_admin element={SpecialImaging} />}
						/>
						<Route
							path="patient-profile"
							element={<Private_route_admin element={PatientProfile} />}
						/>
					</Route>
					<Route
						path="patient"
						element={<Private_route_user element={DashboardLayout} />}>
						<Route index element={<Private_route_user element={Dashboard} />} />
						<Route
							path="profile"
							element={<Private_route_user element={Profile} />}
						/>
						<Route
							path="medical-report"
							element={<Private_route_user element={MedicalReport} />}
						/>
					</Route>
					{/* Add more routes here as needed */}
				</Routes>
			</Router>
		</SnackbarProvider>
	);
}

export default App;
