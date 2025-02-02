import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = forwardRef(({ onSearch, style }, ref) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  useImperativeHandle(ref, () => ({
    getSearchValue: () => query,
  }));

  return (
    <div className={`flex items-center space-x-3 ${style}`}>
      <div className="relative flex-grow">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="text-end w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
});

Search.displayName = 'Search';

export default Search;
