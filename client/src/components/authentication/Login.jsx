import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import Input from "../common/Input"; // Import the reusable Input component
import bgImage from "../../assets/Slider-1-1-Photoroom (1).png";
import { login } from "../../api/login";
import { showToast } from "../helper/alert_helper";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      if (await login(username, password)) {
        showToast("success", "Login Successful");
        navigate("/dashboard");
      }
    } else {
      setErrors(errors);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} // Update transition to fade-in effect
      className="min-h-screen overflow-hidden relative flex flex-col justify-center bg-background text-foreground font-body"
    >
      <div className="w-full min-h-screen max-w-[900px] flex mx-auto justify-center items-center relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }} // Update transition to fade-in effect
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
                <p>Southwesternuniversity</p>
                <p>Medical Center</p>
                <p>Mount Grace Partner</p>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="keepSignedIn"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label
                  htmlFor="keepSignedIn"
                  className="ml-2 block text-sm text-secondary"
                >
                  Keep me signed in
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary">
                Forgot password?
              </Link>
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
              onClick={handleRegisterRedirect}
              className="text-primary cursor-pointer"
            >
              Register
            </span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
