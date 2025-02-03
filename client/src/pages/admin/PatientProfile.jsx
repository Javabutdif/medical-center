import React, { useRef, useState } from 'react'
import Search from '../../components/common/Search'
import Table from '../../components/common/table/Table'
import Pagination from '../../components/common/table/Pagination'

const PatientProfile = () => {
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const searchRef = useRef()

  const handleSearch = () => {
    if (searchRef.current) {
      const searchValue = searchRef.current.getSearchValue()
      setValue(searchValue)
      setCurrentPage(1) // Reset to first page on search
    }
  }

  const columns = [
    { path: 'firstName', label: 'First Name' },
    { path: 'middleName', label: 'Middle Name' },
    { path: 'lastName', label: 'Last Name' },
    { path: 'suffix', label: 'Suffix' },
    { path: 'gender', label: 'Gender' },
    { path: 'dob', label: 'Date of Birth' },
    { path: 'email', label: 'Email' },
    { path: 'mobileNumber', label: 'Mobile Number' },
    { path: 'actions', label: 'Actions' }
  ]

  const data = [
    { _id: 1, firstName: 'John', middleName: 'A.', lastName: 'Doe', suffix: 'Jr.', gender: 'Male', dob: '01/01/1990', email: 'john.doe@example.com', mobileNumber: '123-456-7890' },
    { _id: 2, firstName: 'Jane', middleName: 'B.', lastName: 'Smith', suffix: '', gender: 'Female', dob: '02/02/1995', email: 'jane.smith@example.com', mobileNumber: '098-765-4321' }
  ]

  const filteredData = data.filter(item =>
    columns.some(column =>
      item[column.path]?.toString().toLowerCase().includes(value.toLowerCase())
    )
  )

  return (
    <div className='container mx-auto px-4 md:px-8 space-y-4'>
      <div className='flex flex-col justify-between sm:flex-row gap-4'>
        <Search ref={searchRef} style={"sm:self-end"} onSearch={handleSearch} />
      </div>
      <Table columns={columns} data={filteredData} buttonText="View Profile" />
    </div>
  )
}

export default PatientProfile
  