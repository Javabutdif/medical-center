// ForgotPassword.js
import React, { useState } from "react";
import Input from "../common/Input"; // Your reusable Input component

const ForgotPassword = ({ closeModal, onResetInitiated }) => {
  const [emailForReset, setEmailForReset] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = () => {
    if (!emailForReset.trim()) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    // Simulate sending OTP to the provided email.
    // In production, replace this with an API call to send the reset instructions.
    alert(`Password reset instructions (with OTP) sent to ${emailForReset}`);
    if (onResetInitiated) {
      onResetInitiated();
    }
    closeModal();
  };

  return (
    <div className="bg-accent p-8 rounded-lg shadow-xl w-96">
      <h2 className="text-2xl font-heading font-semibold text-primary mb-4 text-center">
        Reset Your Password
      </h2>
      <p className="text-muted text-sm text-center mb-6">
        Enter the email associated with your account to receive password reset instructions.
      </p>
      <Input
        type="email"
        name="emailForReset"
        id="emailForReset"
        placeholder="Email Address"
        value={emailForReset}
        onChange={(e) => setEmailForReset(e.target.value)}
      />
      {error && <p className="text-destructive text-xs mt-2">{error}</p>}
      <div className="flex justify-between mt-6">
        <button
          onClick={closeModal}
          className="px-6 py-2 rounded-md border border-muted text-primary hover:bg-muted transition"
        >
          Cancel
        </button>
        <button
          onClick={handlePasswordReset}
          className="px-6 py-2 rounded-md bg-primary text-accent hover:bg-dark transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
