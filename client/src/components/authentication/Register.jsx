import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion"; // Import Framer Motion
import { FaArrowLeft, FaQuestionCircle } from "react-icons/fa"; // Import the icons
import Input from "../common/Input"; // Import the reusable Input component
import logo from "../../../public/south.logo.jpg";
import bgImage from "../../assets/Slider-1-1-Photoroom (1).png";
import { register, fetchOtp } from "../../api/register";
import OTPModal from "../modal/OTPModal";
import UserGuideModal from "../modal/UserGuideModal"; // Import UserGuideModal
import Joyride, { STATUS } from 'react-joyride';  // Add STATUS to import

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpModal, setOtpModal] = useState(false);
  const [otpServer, setOtpServer] = useState("");
  const [showUserGuideModal, setShowUserGuideModal] = useState(false); // State for modal visibility
  const [hasSeenRegisterTour, setHasSeenRegisterTour] = useState(false);

  const steps = [
    {
      target: '.register-header',
      content: 'Welcome to our Registration Page! Here you can create your new account.',
      disableBeacon: true,
    },
    {
      target: '.personal-info',
      content: 'Fill in your personal information such as name, gender, and birthday.',
      placement: 'bottom',
    },
    {
      target: '.proceed-btn',
      content: 'After filling your personal information, click here to proceed to the next step.',
    },
    {
      target: '.login-link',
      content: 'Already have an account? You can login here instead.',
    },
  ];

  const handleOtpModal = () => {
    setOtpModal(true);
  };
  const handleCloseOtpModal = () => {
    setOtpModal(false);
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!birthday) newErrors.birthday = "Birthday is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (validateStep2()) {
      if (
        await register(
          username,
          firstName,
          middleName,
          lastName,
          suffix,
          gender,
          birthday,
          email,
          mobileNumber,
          password
        )
      ) {
        navigate("/login"); // Navigate to login page after successful registration
      }
    }
  };

  const fetchOtpFromServer = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchOtp(email, firstName, lastName, "register");
      console.log(response);
      if (response !== false) {
        setOtpServer(response);
        handleOtpModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserGuideRedirect = () => {
    setHasSeenRegisterTour(true);
  };

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setHasSeenRegisterTour(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} // Update transition to fade-in effect
      className="overflow-hidden min-h-screen flex justify-center items-center font-body"
    >
      <Joyride
        steps={steps}
        run={hasSeenRegisterTour}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        styles={{
          options: {
            primaryColor: '#4F46E5',
            zIndex: 1000,
          },
          tooltipContainer: {
            textAlign: 'left',
          },
        }}
        callback={handleJoyrideCallback}
      />

      <div className="container mx-auto flex justify-center relative">
        {step === 2 && (
          <button
            type="button"
            onClick={handlePreviousStep}
            className="absolute top-4 left-4 text-muted"
          >
            <FaArrowLeft size={20} />
          </button>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }} // Update transition to fade-in effect
          className="w-full max-w-md p-6 space-y-4"
        >
          <header className="register-header flex flex-col items-start space-y-4">
            <div
              to="/"
              className="flex gap-2 text-xs items-center font-bold font-anton uppercase max-w-14 tracking-wide font-heading"
            >
              <img
                src={logo}
                className="w-16 h-14 inline-block self-center rounded-full "
                alt=""
              />
              <div className="w-40 inline-block text-[0.7rem] leading-3 tracking-wider">
                Southwesternuniversity Medical Center Mount Grace Partner
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-primary font-heading">
              Register
            </h2>
          </header>
          <form onSubmit={fetchOtpFromServer} className="space-y-6">
            {step === 1 && (
              <div className="personal-info space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={errors.firstName}
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-xs">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="middleName"
                    id="middleName"
                    placeholder="Middle Name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={errors.lastName}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="suffix"
                    id="suffix"
                    placeholder="Suffix"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-border bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  {errors.gender && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.gender}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    type="date"
                    name="birthday"
                    id="birthday"
                    placeholder="Birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    error={errors.birthday}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="proceed-btn w-full py-2 px-4 bg-primary text-white rounded-md mt-6"
                >
                  Proceed
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="contact-info space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="mobileNumber"
                    id="mobileNumber"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    error={errors.mobileNumber}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                  />
                </div>
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-secondary"
                  >
                    I accept the{" "}
                    <Link to="/terms" className="text-primary">
                      terms and conditions
                    </Link>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-md mt-6"
                  disabled={!termsAccepted}
                >
                  Register
                </button>
              </div>
            )}
          </form>
          <footer className="login-link text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </footer>
        </motion.div>
        {otpModal && (
          <>
            <OTPModal
              closeModal={() => handleCloseOtpModal()}
              onVerifyOTP={() => handleSubmit()}
              otpServer={otpServer}
            />
          </>
        )}
        {showUserGuideModal && (
          <UserGuideModal onClose={() => setShowUserGuideModal(false)} /> // Render modal conditionally
        )}
        <div className="fixed bottom-4 right-4">
          <div className="relative group">
            <button
              type="button"
              onClick={handleUserGuideRedirect}
              className="p-3 bg-secondary text-white rounded-full shadow-lg"
            >
              <FaQuestionCircle size={24} />
            </button>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
              Start Tour
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
