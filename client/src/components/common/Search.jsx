import React, { useState, useEffect } from 'react'
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Search = ({ placeholder, onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <div className="relative">
      <input 
        type="text" 
        placeholder={placeholder} 
        value={query} 
        onChange={handleInputChange} 
        aria-label="Search"
        className='w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary'
      />
      {query && (
        <button 
          onClick={handleClear} 
          aria-label="Clear search"
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400"
          
       >
          <FaTimes />
        </button>
      )}
      {isLoading ? (
        <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
      ) : (
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}
    </div>
  )
}

export default Search
