import React from 'react'

const TableHeader = ({ columns }) => {
  return (
    <thead className="bg-secondary text-accent border-b-2 border-secondary font-heading">
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            className={`p-4 text-left font-semibold ${column.key === 'actions' ? 'flex items-center justify-center w-[1%] text-center' : 'w-auto'}`}
          >
            <div className="flex items-center">
              {column.icon && <span className="mr-2">{column.icon}</span>}
              {column.label}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
