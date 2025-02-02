import React from 'react'

const TableHeader = ({ header, onSort, sortColumn }) => {
  const raiseSort = (path) => {
    if (sortColumn.path === path) {
      onSort({ path, order: sortColumn.order === 'asc' ? 'desc' : 'asc' })
    } else {
      onSort({ path, order: 'asc' })
    }
  }

  const renderSortIcon = (column) => {
    if (column !== sortColumn.path) return null
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  }

  return (
    <thead className="bg-gray-100 text-left capitalize font-heading">
      <tr>
        {header.map((title, index) => (
          <th 
            key={index} 
            className={`select-none     border-b border-gray-300 ${title === 'results' ? 'px-2 py-1 text-sm w-1/12 sm:px-4 sm:py-2 sm:text-base sm:w-1/6' : 'p-4 text-base w-1/4 sm:p-6 sm:text-lg sm:w-1/3'} font-semibold cursor-pointer`}
            onClick={() => raiseSort(title)}
          >
            {title} {renderSortIcon(title)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
