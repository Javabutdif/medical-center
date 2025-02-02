import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardMain = () => {
  return (
    <main className='md:ml-72 pt-24 min-h-screen/main'>
      <Outlet />
    </main>
  )
}

export default DashboardMain
