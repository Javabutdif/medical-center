import React from 'react'
import ToggleBar from '../common/ToggleBar'

const DashboardHeader = ({ isOpen, toggle, title }) => {
  return (
    <div className='fixed z-20 w-full p-4 px-8 2xl:p-8 2xl:ml-72 flex align-center justify-between'>
      <ToggleBar isOpen={isOpen} toggle={toggle} />
      <h2 className='text-2xl font-bold'>{title}</h2>
    </div>
  )
}

export default DashboardHeader
