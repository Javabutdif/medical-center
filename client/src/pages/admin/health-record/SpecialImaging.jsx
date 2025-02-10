import React, { useState } from 'react';
import Search from '../../../components/common/Search';
import Table from '../../../components/common/table/Table'; // Assuming you have a Table component

const SpecialImaging = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const data = [
    {
      examDescription: "CT Scan",
      examDate: "2023-10-05",
      section: "Radiology",
      results: "Pending",
    },
    {
      examDescription: "Ultrasound",
      examDate: "2023-09-22",
      section: "Radiology",
      results: "Completed",
    },
    {
      examDescription: "PET Scan",
      examDate: "2023-08-30",
      section: "Nuclear Medicine",
      results: "Pending",
    },
    {
      examDescription: "Mammogram",
      examDate: "2023-08-15",
      section: "Radiology",
      results: "Completed",
    },
  ];

  const columns = [
    { path: "examDescription", label: "Exam Description" },
    { path: "examDate", label: "Exam Date" },
    { path: "section", label: "Section" },
    { path: "results", label: "Results" },
    { key: "actions", label: "Actions", content: (record) => (
      <button className="text-blue-500 hover:underline">View Details</button>
    ) },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const filteredData = data.filter(record =>
    Object.values(record).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      <Search placeholder={"Search..."} onSearch={handleSearch} />
      <Table columns={columns} data={filteredData} />
    </div>
  );
}

export default SpecialImaging;
