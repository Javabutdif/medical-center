import React from 'react'

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return item[column.path];
  };

  return (
    <tbody className="text-gray-800 font-body">
      {data.length === 0 ? (
        <tr>
          <td colSpan={columns.length} className="text-center py-4 px-6 text-lg font-medium">
            No data available
          </td>
        </tr>
      ) : (
        data.map(item => (
          <tr key={item.name} className="border-b hover:bg-gray-50 transition-colors duration-200">
            {columns.map(column => (
              <td
                key={column.path || column.key}
                className={`py-3 px-4 text-sm font-medium leading-relaxed ${column.key === 'actions' ? 'sm:table-cell text-right' : 'w-auto cursor-default'}`} // Add cursor-default to prevent pointer
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
