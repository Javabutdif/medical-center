import React from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa'
import { motion } from 'framer-motion' // Import Framer Motion
import logo from '../../public/south.logo.jpg'

const Landing = () => {
  const words = [
    "Welcome", "to", "the", "Southwestern", "University", "Medical", "Center",
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className='relative min-h-screen container mx-auto px-4 flex flex-col items-start justify-center text-white font-body'>
      <img src={logo} alt="" className='rounded-full absolute -bottom-1/4 -translate-y-1/3 -right-1/4  md:h-full md:-bottom-1/3 md:-right-1/3 opacity-10 z-0'/>
      <div className='relative z-10'>
        <motion.h1
          className='text-4xl md:text-5xl lg:text-6xl font-bold max-w-lg font-heading'
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <span className='text-xl md:text-2xl font-light block mb-3'>
            {words.slice(0, 3).map((word, index) => (
              <motion.span key={index} variants={child}>{word} </motion.span>
            ))}
          </span>
          {words.slice(3, 7).map((word, index) => (
            <motion.span key={index} variants={child}>{word} </motion.span>
          ))}
          <span className='text-2xl md:text-3xl font-light block mb-6'>
            {words.slice(7).map((word, index) => (
              <motion.span key={index} variants={child}>{word} </motion.span>
            ))}
          </span>
        </motion.h1>
        <motion.p className='mb-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          We provide top-notch medical services and care for our community.
        </motion.p>
        <motion.p className='mb-8' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <a href="/login" className="text-muted font-bold underline hover:text-accent">Login</a> or <a href="/register" className="text-muted font-bold underline hover:text-accent">Register</a> to access your account.
        </motion.p>
      </div>
      <motion.div className='mt-8' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        <p className='mb-4'>
          You can also contact us here:
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <p className='flex items-center'>
            <FaMapMarkerAlt className='mr-2' /> Urgello, Cebu City, Philippines, 6000
          </p>
          <p className='flex items-center'>
            <FaPhoneAlt className='mr-2' /> 0998 561 2707
          </p>
          <p className='flex items-center'>
            <FaEnvelope className='mr-2' /> swumedcustomerservice.swu@phinmaed.com
          </p>
          <p className='flex items-center'>
            <FaGlobe className='mr-2' /> <a href="http://swu.edu.ph/" className="text-accent font-bold underline hover:text-secondary">http://swu.edu.ph/</a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Landing
