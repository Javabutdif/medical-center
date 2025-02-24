import React, { useState, useEffect } from "react";
import Input from "../common/Input"; // Reusable Input component
import { fetchOtp, changePassword } from "../../api/register";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ onResetInitiated }) => {
  const [step, setStep] = useState("email"); // "email" -> "otp" -> "password"
  const [emailForReset, setEmailForReset] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (step === "email") document.getElementById("emailForReset")?.focus();
    if (step === "otp") document.getElementById("otpInput")?.focus();
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

  const handleOtpVerification = () => {
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }
    if (Number.parseInt(otp) !== Number.parseInt(serverOtp)) {
      setError("Invalid OTP. Please try again.");
      return;
    }
    setError("");
    setStep("password");
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
    <div className="bg-accent p-8 rounded-lg shadow-xl w-96">
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
            <Link to="/login">
              <button className="px-6 py-2 rounded-md border border-muted text-primary hover:bg-muted transition">
                Back
              </button>
            </Link>
            <button
              onClick={handlePasswordReset}
              disabled={!emailForReset.trim()}
              className={`px-6 py-2 rounded-md transition ${
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
            A 6-digit OTP has been sent to your email. Please enter it below.
          </p>
          <Input
            type="text"
            id="otpInput"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <p className="text-destructive text-xs mt-2">{error}</p>}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep("email")}
              className="px-6 py-2 rounded-md border border-muted text-primary hover:bg-muted transition"
            >
              Back
            </button>
            <button
              onClick={handleOtpVerification}
              disabled={!otp.trim()}
              className={`px-6 py-2 rounded-md transition ${
                otp.trim()
                  ? "bg-primary text-accent hover:bg-dark"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Verify OTP
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
          <Input
            type="password"
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-destructive text-xs mt-2">{error}</p>}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep("otp")}
              className="px-6 py-2 rounded-md border border-muted text-primary hover:bg-muted transition"
            >
              Back
            </button>
            <button
              onClick={handleChangePassword}
              disabled={!newPassword.trim() || !confirmPassword.trim()}
              className={`px-6 py-2 rounded-md transition ${
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
  );
};

export default ForgotPassword;
