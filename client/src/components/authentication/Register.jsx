import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import { FaArrowLeft } from 'react-icons/fa'; // Import the icon
import Input from '../common/Input'; // Import the reusable Input component
import logo from '../../../public/south.logo.jpg';
import bgImage from '../../assets/Slider-1-1-Photoroom (1).png';

const Register = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!birthday) newErrors.birthday = 'Birthday is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      // Submit the form
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
      <div className='container mx-auto flex justify-center relative'>
        {step === 2 && (
          <button type="button" onClick={handlePreviousStep} className="absolute top-4 left-4 text-muted">
            <FaArrowLeft size={20} />
          </button>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }} // Update transition to fade-in effect
          className="w-full max-w-md p-6 space-y-4"
        >
          <header className='flex flex-col items-start space-y-4'>
            <div to="/" className='flex gap-2 text-xs items-center font-bold font-anton uppercase max-w-14 tracking-wide font-heading'>
                       <img
                          src={logo}
                          className="w-16 h-14 inline-block self-center rounded-full "
                          alt=""
                        />
                        <div className='w-40 inline-block text-[0.7rem] leading-3 tracking-wider'>
                          Southwesternuniversity
                          Medical Center
                          Mount Grace Partner
                        </div>
                    </div>
            <h2 className="text-2xl font-bold text-center text-primary font-heading">Register</h2>
          </header>
          <form onSubmit={handleSubmit} className="space-y-3">
            {step === 1 && (
              <>
                <div>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={errors.firstName}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="middleName"
                    id="middleName"
                    placeholder="Middle Name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
                <div>
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
                <div>
                  <Input
                    type="text"
                    name="suffix"
                    id="suffix"
                    placeholder="Suffix"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                  />
                </div>
                <div>
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
                  {errors.gender && <p className="text-destructive text-xs mt-1">{errors.gender}</p>}
                </div>
                <div>
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
                <button type="button" onClick={handleNextStep} className="w-full py-2 px-4 bg-primary text-white rounded-md">
                  Proceed
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                  />
                </div>
                <div>
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
                </div>
                <div>
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
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-secondary">
                    I accept the <Link to="/terms" className="text-primary">terms and conditions</Link>
                  </label>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded-md" disabled={!termsAccepted}>
                  Register
                </button>
              </>
            )}
          </form>
          <footer className="text-center text-sm">
            Already have an account? <Link to="/login" className="text-primary">Login</Link>
          </footer>
        </motion.div>
        {/* <img src={bgImage} className='w-full h-full -bottom-32 left-80' alt="Background" /> */}
      </div>
    </motion.div>
  );
};

export default Register;
