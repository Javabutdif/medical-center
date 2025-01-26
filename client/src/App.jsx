import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./pages/Home";

//Layout
import LandingLayout from "./components/Layout/LandingLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./components/Layout/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/" element={<DashboardLayout />}>
            
        </Route>

        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
