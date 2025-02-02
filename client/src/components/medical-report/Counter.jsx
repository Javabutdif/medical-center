import React from 'react'

const Counter = ({ title, count }) => {
  return (
    <div className='flex-1  bg-gray-100 p-6 rounded-lg'>
        <h2 className='text-sm font-bold uppercase mb-2'>{title}</h2>
        <p className='text-7xl text-start font-bold'>{count}</p>
    </div>
  )
}

export default Counter;
