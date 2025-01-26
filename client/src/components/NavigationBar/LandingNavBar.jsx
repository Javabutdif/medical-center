import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/south.logo.jpg'

const LandingNavBar = () => {
  return (
    <nav className='fixed w-full text-white'>
      <div className='container mx-auto p-4 flex justify-between items-center'>
        <Link to="/" className='flex gap-2 text-xs items-center font-bold font-anton uppercase max-w-14 tracking-wide'>
           <img
              src={logo}
              className="w-16 h-14 inline-block self-center rounded-full "
              alt=""
            />
            <div className='w-40 inline-block text-[0.7rem] leading-3 tracking-wider'>
              Southwesternuniversity
              Medical Center
              Mount Grace Partner
            </div>
        </Link>
      </div>
    </nav>
  )
}

export default LandingNavBar
