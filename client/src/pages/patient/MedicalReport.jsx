import React, { useRef, useState } from 'react';
import Counter from '../../components/medical-report/Counter';
import Search from '../../components/common/Search';
import Table from '../../components/common/table/Table';
import Pagination from '../../components/common/table/Pagination';

const MedicalReport = () => {
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchRef = useRef();

  const handleSearch = () => {
    if (searchRef.current) {
      const searchValue = searchRef.current.getSearchValue();
      setValue(searchValue);
      setCurrentPage(1); // Reset to first page on search
    }
  };

  const columns = [
    { path: 'description', label: 'exam description' },
    { path: 'date', label: 'exam date' },
    { path: 'section', label: 'section' },
    { path: 'results', label: 'results' }
  ];

  const data = [
    { _id: 1, description: 'Blood Test', date: '2023-10-01', section: 'Lab', results: 'Pending' },
    { _id: 2, description: 'X-Ray', date: '2023-09-15', section: 'Radiology', results: 'Completed' }
  ];

  const filteredData = data.filter(item =>
    columns.some(column =>
      item[column.path].toString().toLowerCase().includes(value.toLowerCase())
    )
  );

  return (
    <div className='container mx-auto px-4 md:px-8 space-y-4'>
      <div className='flex flex-col justify-between sm:flex-row gap-4'>
        <div className='flex-1 flex justify-center md:justify-start space-x-4'>
          <Counter title={"pending"} count={3} />
          <Counter title={"completed"} count={4} />
        </div>
        <Search ref={searchRef} style={"sm:self-end"} onSearch={handleSearch} />
      </div>
      <Table columns={columns} data={filteredData} buttonText="View Results" />
    </div>
  );
};

export default MedicalReport;
