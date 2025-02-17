import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const Table = ({ style, columns, data }) => {
  return (
    <div className={`${style} w-full overflow-x-auto lg:overscroll-contain`}>
      <div className="relative">
        <table className="min-w-full bg-white shadow-md rounded-lg table-auto">
          <TableHeader columns={columns} />
          <TableBody data={data} columns={columns} />
        </table>
      </div>
    </div>
  )
}

export default Table
