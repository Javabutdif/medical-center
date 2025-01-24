import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="overflow-hidden min-h-screen flex justify-center items-center md:bg-gradient-to-r from-white to-30% to-secondary from-60% bg-background text-foreground font-open-sans">
      <div className='container mx-auto flex relative'>
        {step === 2 && (
          <button type="button" onClick={handlePreviousStep} className="absolute top-4 left-4 text-muted">
            <FaArrowLeft size={20} />
          </button>
        )}
        <div className="w-full max-w-md p-6 space-y-4">
          <header className='flex flex-col items-start space-y-4'>
            <div className='font-roboto-slab flex items-center gap-2 uppercase font-bold text-[0.7rem] leading-none '>
              <img src={logo} className='w-12 h-12 inline-block' alt="Southwestern University Medical Center Logo" />
              <div className='inline-block'>
                <p>Southwesternuniversity</p>
                <p>Medical Center</p>
                <p>Mount Grace Partner</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-primary">Register</h2>
          </header>
          <form onSubmit={handleSubmit} className="space-y-3">
            {step === 1 && (
              <>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={errors.firstName}
                />
                <Input
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={errors.lastName}
                />
                <Input
                  type="text"
                  name="suffix"
                  placeholder="Suffix"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                />
                <div>
                  <label className="block text-sm font-medium text-secondary">
                    Gender:
                    <select
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-border bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                    {errors.gender && <p className="text-destructive text-xs mt-1">{errors.gender}</p>}
                  </label>
                </div>
                <Input
                  type="date"
                  name="birthday"
                  placeholder="Birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  error={errors.birthday}
                />
                <button type="button" onClick={handleNextStep} className="w-full py-2 px-4 bg-primary text-white rounded-md">
                  Proceed
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
                <Input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  error={errors.mobileNumber}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword}
                />
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
        </div>
        {/* <img src={bgImage} className='w-full h-full -bottom-32 left-80' alt="Background" /> */}
      </div>
    </div>
  );
};

export default Register;
