import React from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'

const TableBody = ({ data, columns, buttonText = 'View' }) => {
  return (
    <tbody className="font-body">
      {data.map((item) => (
        <tr key={item._id} className="border-b hover:bg-gray-50">
          {columns.map((column) => (
            <td key={column.path} className={`p-2 sm:p-4 ${column.path === 'actions' ? 'w-32' : 'w-1/4'}`}>
              {column.path === 'actions' ? (
                <div className="flex space-x-2">
                  <button className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded flex items-center space-x-2">
                    <FaEye />
                    <span>{buttonText}</span>
                  </button>
                  {buttonText === 'View Profile' && (
                    <button className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded flex items-center space-x-2">
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
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
