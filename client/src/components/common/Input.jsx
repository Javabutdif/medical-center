import React from 'react';

const Input = ({ type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
