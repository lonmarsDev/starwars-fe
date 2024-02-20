import React, { useState } from 'react';
import './SearchBox.css';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search character..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};
export default SearchBox;