import React from 'react'
import { Link } from 'react-router-dom'
import { FaTachometerAlt, FaUser, FaFileMedical, FaCog, FaLifeRing, FaSignOutAlt, FaHome, FaBullhorn, FaVials, FaSearch, FaUpload, FaClipboard } from 'react-icons/fa' // Import the icons
import { motion } from 'framer-motion' // Import Framer Motion
import logo from '../../../public/south.logo.jpg'

const DashboardNavBar = ({ isAdmin }) => {
  return (
    <aside className='fixed w-72 flex flex-col justify-between h-full bg-accent text-primary'>
      <div className='p-4'>
        <Link to="/" className='flex gap-2 text-xs items-center font-bold font-heading uppercase tracking-wide'>
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
        <nav className='mt-8'>
          <ul className='flex flex-col gap-4'>
            {isAdmin ? (
              <>
                <li>
                  <Link to="/admin/home" className='text-primary flex items-center gap-2 hover:text-secondary'>
                    <FaHome />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/announcements" className='text-primary flex items-center gap-2 hover:text-secondary'>
                    <FaBullhorn />
                    <span>Announcements</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/healthcare-record" className='text-primary flex items-center gap-2 hover:text-secondary'>
                    <FaVials />
                    <span>Healthcare Record</span>
                  </Link>
                  <ul className='ml-6 mt-2 flex flex-col gap-2'>
                    <li>
                      <Link to="/admin/healthcare-record/laboratory" className='text-primary flex items-center gap-2 hover:text-secondary'>
                        <FaSearch />
                        <span>Laboratory</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/healthcare-record/special-imaging" className='text-primary flex items-center gap-2 hover:text-secondary'>
                        <FaUpload />
                        <span>Special Imaging</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/admin/px-profile" className='text-primary flex items-center gap-2 hover:text-secondary'>
                    <FaClipboard />
                    <span>Patient Profile</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" className='text-primary flex items-center gap-2 hover:text-secondary'>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className='text-primary flex items-center gap-2 hover:text-secondary'>
                    <FaUser />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/medical-report" className='text-primary flex items-center gap-2 hover:text-secondary'>
                    <FaFileMedical />
                    <span>Medical Report</span>
                  </Link>
                </li>
                <li className='mt-auto'>
                  <Link to="/settings" className='text-primary flex items-center gap-2 hover:text-secondary'>
                    <FaCog />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/support" className='text-primary flex items-center gap-2 hover:text-secondary'>
                    <FaLifeRing />
                    <span>Support</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className='mt-8 bg-secondary p-4'>
        <div className='flex flex-col items-start'>
          <span className='font-bold'>John Doe</span>
          <span className='text-sm'>john.doe@example.com</span>
        </div>
        <button className='mt-4 bg-secondary text-accent py-2 px-4 rounded flex items-center gap-2 hover:bg-primary'>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default DashboardNavBar
