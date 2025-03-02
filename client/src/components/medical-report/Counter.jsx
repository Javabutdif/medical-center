import React from 'react';

const Counter = ({ title, count }) => {
  return (
    <div className="flex-1 bg-secondary p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-xs md:text-sm font-bold uppercase mb-1 md:mb-2 text-accent font-heading">
        {title}
      </h2>
      <p className="text-4xl md:text-5xl font-bold text-accent font-body">
        {count}
      </p>
    </div>
  );
};

export default Counter;
