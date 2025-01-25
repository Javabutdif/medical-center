import React from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa'
import logo from '../../public/south.logo.jpg'

const Landing = () => {
  return (
    <div className='relative min-h-screen container mx-auto px-4 flex flex-col items-start justify-center text-white font-body'>
      <img src={logo} alt="" className='rounded-full absolute -bottom-1/4 -translate-y-1/3 -right-1/4  md:h-full md:-bottom-1/3 md:-right-1/3 opacity-10 z-0'/>
      <div className='relative z-10'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold max-w-lg font-heading'>
          <span className='text-xl md:text-2xl font-light block mb-3'>
            Welcome to the
          </span>
          Southwestern University Medical Center
          <span className='text-2xl md:text-3xl font-light block mb-6'>
            Mount Grace Partner
          </span>
        </h1>
        <p className='mb-4'>
          We provide top-notch medical services and care for our community.
        </p>
        <p className='mb-8'>
          <a href="/login" className="text-primary font-bold underline">Login</a> or <a href="/register" className="text-primary font-bold underline">Register</a> to access your account.
        </p>
      </div>
      <div className='mt-8'>
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
            <FaGlobe className='mr-2' /> <a href="http://swu.edu.ph/" className="text-accent font-bold underline">http://swu.edu.ph/</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Landing
