import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaMobileAlt } from 'react-icons/fa';

const DashboardFooter = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`fixed w-full bottom-0 2xl:pl-72 text-primary p-4 ${isAtBottom ? '' : 'bg-accent'}`}>
      <div className='flex flex-col pl-4 md:flex-row justify-between items-center gap-2'>
        <div className='text-center md:text-left flex items-center gap-2'>
          <FaMapMarkerAlt />
          Cebu City, Philippines
        </div>
        <div className='hidden md:flex text-center md:text-right flex-col md:flex-row items-center gap-2'>
          <div className='flex items-center gap-2'>
            <FaPhoneAlt />
            (039) 420 6930
          </div>
          <div className='flex items-center gap-2'>
            <FaMobileAlt />
            0998 561 2707
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
