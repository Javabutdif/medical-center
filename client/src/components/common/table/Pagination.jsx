import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center mt-6 space-x-3">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        title="Previous Page"
        className={`p-2 rounded-full transition-all
          ${currentPage === 1 
            ? 'bg-muted text-dark opacity-50 cursor-not-allowed'
            : 'bg-secondary text-accent hover:bg-muted'}`}
      >
        <FaChevronLeft className="text-xs sm:text-sm" />
      </button>

      <span className="px-4 py-2 font-semibold bg-secondary rounded-md shadow-sm text-xs sm:text-sm text-accent">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        title="Next Page"
        className={`p-2 rounded-full transition-all
          ${currentPage === totalPages 
            ? 'bg-muted text-dark opacity-50 cursor-not-allowed'
            : 'bg-secondary text-accent hover:bg-muted'}`}
      >
        <FaChevronRight className="text-xs sm:text-sm" />
      </button>
    </div>
  );
};

export default Pagination;
