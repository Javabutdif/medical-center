import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const Table = ({ columns, data }) => {
  return (
    <div className="w-full e">
      <div className="relative">
        <table className="w-full bg-white shadow-md rounded-lg table-auto">
          <TableHeader columns={columns} />
          <TableBody data={data} columns={columns} />
        </table>
      </div>
    </div>
  )
}

export default Table
