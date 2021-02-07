import React, { useState, useRef, useCallback, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchQuery = localStorage.getItem("searchQuery") || "";
    if (searchQuery) {
      setSearchTerm(searchQuery);
      onSearch(searchQuery);
    }
  }, []);

  const searchTimeout = useRef(null);

  const handleOnChange = useCallback(
    (event) => {
      setSearchTerm(event.target.value);
      localStorage.setItem("searchQuery", event.target.value);
      clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        onSearch(event.target.value);
      }, 1000);
    },
    [onSearch, setSearchTerm, searchTimeout]
  );

  const handleOnSubmit = (event) => {
    event.preventDefault();
    clearTimeout(searchTimeout.current);
    onSearch(event.target.elements.q.value);
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
