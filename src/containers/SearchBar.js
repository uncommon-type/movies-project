import React, { useState, useRef } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchTimeout = useRef(null);

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
    clearTimeout(searchTimeout.current);
  };

  return (
    <div className="app__search wrapper">
      <form
        onSubmit={handleOnSubmit}
        className="app__search__controls"
        action="/search"
        method="get"
      >
        <input
          value={searchTerm}
          onChange={handleOnChange}
          type="text"
          name="q"
          id="searchBar"
          placeholder="Movie Title"
        />
      </form>
    </div>
  );
};

export default SearchBar;
