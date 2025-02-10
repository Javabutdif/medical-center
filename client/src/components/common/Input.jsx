import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

const Input = ({ type, name, placeholder, value, onChange, disabled, error }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Add fade-in effect
      className="flex flex-col"
    >
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </motion.div>
  );
};

export default Input;
