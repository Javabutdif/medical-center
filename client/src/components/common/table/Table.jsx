import React, { useState } from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Pagination from './Pagination'
import _ from 'lodash'

const Table = ({ columns, data, buttonText }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState({ path: 'description', order: 'asc' })
  const pageSize = 5
  const totalPages = Math.ceil(data.length / pageSize)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn)
  }

  const sortedData = _.orderBy(data, [sortColumn.path], [sortColumn.order])
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const tableHeader = columns.map(column => column.label)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <TableHeader header={tableHeader} onSort={handleSort} sortColumn={sortColumn} />
        <TableBody data={paginatedData} columns={columns} buttonText={buttonText} />
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

export default Table
