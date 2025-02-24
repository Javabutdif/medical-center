import React, { useState, useEffect } from 'react';
import ToggleBar from '../common/ToggleBar';

const DashboardHeader = ({ isOpen, toggle, title }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed z-20 w-full p-6 md:px-8 2xl:p-8 2xl:ml-72 flex align-center justify-between ${isScrolled ? 'bg-accent' : ''}`}>
      <ToggleBar isOpen={isOpen} toggle={toggle} />
      <h2 className='text-2xl font-bold'>{title}</h2>
    </div>
  );
};

export default DashboardHeader;
