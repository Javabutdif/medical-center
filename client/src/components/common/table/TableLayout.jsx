import React, { useState, useEffect } from "react";
import Table from "./Table";
import Search from "../Search";
import Pagination from "./Pagination";

const TableLayout = ({
  loading, // boolean that tells us if data is still being fetched
  columns, // table column definitions
  data,    // patient data array to display in the table
  modals   // Modals for actions like Edit, Upload, etc.
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(2);
  const itemsPerPage = 5;
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Ensure 'data' is an array before filtering to avoid errors
  const filteredData = Array.isArray(data)
    ? data.filter((patient) =>
        columns.some((column) => {
          const value = patient[column.path];
          return (
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      )
    : []; // Return empty array if 'data' is not valid

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1); // Prevent unnecessary resets
    }
  }, [totalPages]); // Only run when totalPages changes

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="px-6 md:px-9">
      <Search placeholder="Search patients..." onSearch={handleSearch} />

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="spinner-border animate-spin" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        // If not loading, show the table with filtered data
        <>
          <Table style={"mt-4"} columns={columns} data={currentItems} />
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Modals for actions like Edit, Upload */}
      {modals}
    </div>
  );
};

export default TableLayout;
