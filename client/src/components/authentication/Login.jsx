// Login.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../common/Input";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../modal/ForgotPasswordModal";
import OTPModal from "../modal/OTPModal";


const Login = ({ role }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const validate = () => {
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // Your login logic here.
    } else {
      setErrors(errors);
    }
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setIsForgotPasswordOpen(false);
  };

  const handleOTPModalClose = () => {
    setIsOTPModalOpen(false);
  };

  const handleResetInitiated = () => {
    // When the forgot password flow is successful, open the OTP modal.
    setIsOTPModalOpen(true);
  };

  const handleVerifyOTP = (otp) => {
    // Handle OTP verification logic here.
    console.log("OTP entered:", otp);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen overflow-hidden relative flex flex-col justify-center bg-background text-foreground font-body"
    >
      <div className="w-full min-h-screen max-w-[900px] flex mx-auto justify-center items-center relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:max-w-md p-6 space-y-4"
        >
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-2xl font-bold text-center text-primary font-heading">Login</h2>
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
                <p className="text-destructive text-xs mt-1">{errors.username}</p>
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
                <p className="text-destructive text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="keepSignedIn"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label htmlFor="keepSignedIn" className="ml-2 block text-sm text-secondary">
                  Keep me signed in
                </label>
              </div>
              <button type="button" onClick={handleForgotPasswordClick} className="text-sm text-primary">
                Forgot password?
              </button>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded-md">
              Login
            </button>
          </form>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} className="text-primary cursor-pointer">
              Register
            </span>
          </p>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <ForgotPassword closeModal={handleCloseForgotPasswordModal} onResetInitiated={handleResetInitiated} />
        </div>
      )}

      {/* OTP Modal */}
      {isOTPModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <OTPModal closeModal={handleOTPModalClose} onVerifyOTP={handleVerifyOTP} />
        </div>
      )}
    </motion.div>
  );
};

export default Login;
