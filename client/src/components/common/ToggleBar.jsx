import React from 'react'
import { motion } from 'framer-motion'

const ToggleBar = ({ isOpen, toggle }) => {
  return (
    <button type="button" className='md:hidden focus:outline-none relative z-30' onClick={toggle}>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
        transition={{ duration: 0.4 }}
        className='w-6 h-0.5 bg-black mb-1'
      />
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className='w-6 h-0.5 bg-black mb-1'
      />
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
        transition={{ duration: 0.4 }}
        className='w-6 h-0.5 bg-black'
      />
    </button>
  )
}

export default ToggleBar
     