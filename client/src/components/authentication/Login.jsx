import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import Input from "../common/Input"; // Import the reusable Input component
import { login } from "../../api/login";
import { showToast } from "../helper/alert_helper";
import { useSnackbar } from "notistack"; // Import useSnackbar
import ForgotPasswordModal from "../modal/ForgotPasswordModal"; // Import ForgotPasswordModal
import UserGuideModal from "../modal/UserGuideModal"; // Import UserGuideModal
import { FaQuestionCircle } from "react-icons/fa"; // Import the icon
import LoadingScreen from "../common/LoadingScreen";

const Login = ({ role }) => {
  console.log(role);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showUserGuideModal, setShowUserGuideModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Check sessionStorage on component mount
  useEffect(() => {
    if (sessionStorage.getItem("reloading") === "true") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.removeItem("reloading");
      }, 1500); // Adjust timing to fit UX
    }
  }, []);

  const validate = () => {
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const handleReload = (path) => {
    setLoading(true);
    sessionStorage.setItem("reloading", "true");

    // Reload after a slight delay (ensures UI updates before reload)
    setTimeout(() => {
      navigate(path);
      window.location = path; // Directly reload to avoid unwanted React re-renders
    }, 500);
  };

  useEffect(() => {
    if (sessionStorage.getItem("reloading") === "true") {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        sessionStorage.removeItem("reloading");
      }, 1500); // Keep loading screen visible briefly after reload
    }
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const user = await login(username, password);

      if (user) {
        const key = showToast(enqueueSnackbar, "success", "Login Successful");
        setTimeout(() => closeSnackbar(key), 2000);
        if (user.role === "Admin") {
          handleReload("/admin/");
        } else {
          handleReload("/patient/");
        }
      } else {
        showToast(enqueueSnackbar, "error", "Login Failed");
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen overflow-hidden relative flex flex-col justify-center bg-background text-foreground font-body"
    >
      {loading && <LoadingScreen />}
      
      <div className="w-full min-h-screen max-w-[900px] flex mx-auto justify-center items-center relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:max-w-md p-6 space-y-4"
        >
          <div className="flex flex-col items-start space-y-4">
            <div className="font-roboto-slab flex items-center gap-2 uppercase font-bold text-[0.7rem] leading-none font-heading">
              <img
                src="/south.logo.jpg"
                className="w-12 h-12 inline-block"
                alt=""
              />
              <div className="inline-block">
                <p>Southwestern University</p>
                <p>Medical Center</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center  text-primary font-heading">
              Login
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
              />
              {errors.username && (
                <p className="text-destructive text-xs mt-1">
                  {errors.username}
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
              {errors.password && (
                <p className="text-destructive text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-primary cursor-pointer"
            >
              Register
            </span>
          </p>
        </motion.div>
      </div>
      {showForgotPasswordModal && (
        <ForgotPasswordModal onResetInitiated={() => setShowForgotPasswordModal(false)} />
      )}
      {showUserGuideModal && (
        <UserGuideModal onClose={() => setShowUserGuideModal(false)} />
      )}
      <div className="fixed bottom-4 right-4">
        <div className="relative group">
          <button
            type="button"
            onClick={() => setShowUserGuideModal(true)}
            className="p-3 bg-secondary text-white rounded-full shadow-lg"
          >
            <FaQuestionCircle size={24} />
          </button>
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
            User Guide
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
