import React, { useState, useEffect, useRef } from "react";
import Input from "../common/Input"; // Reusable Input component
import { fetchOtp, changePassword } from "../../api/register";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // Import useSnackbar

const ForgotPasswordModal = ({ onResetInitiated }) => {
  const [step, setStep] = useState("email"); // "email" -> "otp" -> "password"
  const [emailForReset, setEmailForReset] = useState("");
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar

  useEffect(() => {
    if (step === "email") document.getElementById("emailForReset")?.focus();
    if (step === "password") document.getElementById("newPassword")?.focus();
  }, [step]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePasswordReset = async () => {
    if (!emailForReset.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!isValidEmail(emailForReset)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    const response = await fetchOtp(emailForReset, "", "");
    setServerOtp(response);
    setStep("otp");
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value.slice(-1);
      setOtpValues(newOtpValues);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpVerification = () => {
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      enqueueSnackbar("Please enter a complete OTP.", { variant: "warning" }); // Show warning toast
      return;
    }
    if (Number(otp) === Number(serverOtp)) {
      setStep("password");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    if (await changePassword(newPassword, emailForReset)) {
      onResetInitiated && onResetInitiated();
      navigate("/login");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-accent p-8 rounded-lg shadow-xl w-96 relative">
        <button
          onClick={() => onResetInitiated()}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {step === "email" && (
          <>
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4 text-center">
              Reset Your Password
            </h2>
            <p className="text-muted text-sm text-center mb-6">
              Enter the email associated with your account to receive password
              reset instructions.
            </p>
            <Input
              type="email"
              id="emailForReset"
              placeholder="Email Address"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
            />
            {error && <p className="text-destructive text-xs mt-2">{error}</p>}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePasswordReset}
                disabled={!emailForReset.trim()}
                className={`w-full px-6 py-2 rounded-md transition ${
                  emailForReset.trim()
                    ? "bg-primary text-accent hover:bg-dark"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Reset Password
              </button>
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4 text-center">
              Enter OTP
            </h2>
            <p className="text-muted text-sm text-center mb-6">
              Please enter the 6-digit OTP sent to your registered email address.
            </p>
            <div className="flex justify-center space-x-3">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              ))}
            </div>
            {error && <p className="text-destructive text-xs mt-2">{error}</p>}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleOtpVerification}
                className="w-full px-6 py-2 rounded-md bg-primary text-accent hover:bg-dark transition"
              >
                Verify
              </button>
            </div>
          </>
        )}

        {step === "password" && (
          <>
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4 text-center">
              Change Password
            </h2>
            <p className="text-muted text-sm text-center mb-6">
              Enter your new password and confirm it.
            </p>
            <div className="mb-4">
              <Input
                type="password"
                id="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-destructive text-xs mt-2">{error}</p>}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleChangePassword}
                disabled={!newPassword.trim() || !confirmPassword.trim()}
                className={`w-full px-6 py-2 rounded-md transition ${
                  newPassword.trim() && confirmPassword.trim()
                    ? "bg-primary text-accent hover:bg-dark"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Change Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
