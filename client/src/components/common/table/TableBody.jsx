import React from 'react'
import { FaEye } from 'react-icons/fa'

const TableBody = ({ data, columns, buttonText = 'View' }) => {
  return (
    <tbody className="font-body">
      {data.map((item) => (
        <tr key={item._id} className="border-b hover:bg-gray-50">
          {columns.map((column) => (
            <td key={column.path} className={`p-2 sm:p-4 ${column.path === 'results' ? 'w-16 sm:w-42' : 'w-1/4'}`}>
              {column.path === 'results' ? (
                <button className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded flex items-center space-x-2">
                  <FaEye />
                </button>
              ) : (
                item[column.path]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
