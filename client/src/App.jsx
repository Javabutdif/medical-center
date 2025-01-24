import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route
            path="/"
            element={
              <ProtectedRoute>
              </ProtectedRoute>
            }
          />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
