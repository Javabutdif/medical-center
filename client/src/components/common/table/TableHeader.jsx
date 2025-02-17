import React from 'react'

const TableHeader = ({ columns, onSort, sortedColumn, sortOrder }) => {
  const handleSort = (column) => {
    if (onSort) {
      const newSortOrder = sortedColumn === column.path && sortOrder === 'asc' ? 'desc' : 'asc'
      onSort(column, newSortOrder)
    }
  }

  return (
    <thead className="bg-secondary text-accent border-b-2 border-secondary font-heading capitalize">
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            className={`p-2 sm:p-4 text-left font-semibold ${column.key === 'actions' ? 'w-16 text-right' : 'w-auto'}`}
          >
            <div className="flex items-center justify-between sm:block">
              {column.icon && <span className="mr-2">{column.icon}</span>}
              <span className="inline-block text-sm font-medium">{column.label}</span>
              {column.sortable && (
                <span 
                  className="ml-2 cursor-pointer text-xs text-gray-500 hover:text-gray-700"
                  onClick={() => handleSort(column)}
                >
                  {sortedColumn === column.path
                    ? sortOrder === 'asc'
                      ? '🔼'  // Up arrow for ascending
                      : '🔽'  // Down arrow for descending
                    : '⇅'} {/* Default arrow if not sorted */}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
