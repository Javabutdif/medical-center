  import React from 'react'

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return item[column.path];
  };

  return (
    <tbody className="text-gray-700">
      {data.length === 0 ? (
        <tr>
          <td colSpan={columns.length} className="text-center p-3">
            No data available
          </td>
        </tr>
      ) : (
        data.map(item => (
          <tr key={item.name} className="border-b hover:bg-gray-100">
            {columns.map(column => (
              <td
                key={column.path || column.key}
                className={`p-3 ${column.key === 'actions' ? 'w-full flex items-center justify-center text-center' : 'w-auto'}`}
              >
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  )
}

export default TableBody
