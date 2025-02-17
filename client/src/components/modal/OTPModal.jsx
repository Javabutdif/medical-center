// OTPModal.js
import React, { useRef, useState } from "react";

const OTPModal = ({ closeModal, onVerifyOTP, otpServer }) => {
  const OTP_LENGTH = 6;
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    // Allow only digits; if multiple digits are pasted, take only the last one
    if (/^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value.slice(-1);
      setOtpValues(newOtpValues);
      // Auto-focus next input if available and a digit was entered
      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // If backspace is pressed on an empty field, focus the previous field
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otp = otpValues.join("");
    if (otp.length !== OTP_LENGTH) {
      alert("Please enter a complete OTP.");
      return;
    }
    console.log(Number(otp) === otpServer);
    if (Number(otp) === Number(otpServer)) {
      onVerifyOTP();

      closeModal();
    }
  };

  return (
    <div className="bg-accent rounded-lg shadow-xl w-96 p-8">
      <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
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
      <div className="flex justify-between mt-8">
        <button
          onClick={closeModal}
          className="px-6 py-2 rounded-md border border-muted text-primary hover:bg-muted transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-md bg-primary text-accent hover:bg-dark transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
