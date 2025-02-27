import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center space-y-6 p-8 "
      >
        <div className="font-roboto-slab flex items-center gap-2 uppercase font-bold text-[0.7rem] leading-none font-heading">
          <img
            src="/south.logo.jpg"
            className="w-12 h-12 inline-block"
            alt="Southwestern University Medical Center"
          />
          <div className="inline-block">
            <p>Southwestern University</p>
            <p>Medical Center</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-primary font-heading"
        >
          Loading...
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
