import React, { useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const history = useHistory();

  const updateURL = useCallback(
    (query) => {
      history.push(`/search/?q=${query}`);
    },
    [history]
  );

  const searchTimeout = useRef(null);

  const handleOnChange = useCallback(
    (event) => {
      setSearchTerm(event.target.value);
      clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        updateURL(event.target.value);
      }, 1000);
    },
    [updateURL, setSearchTerm, searchTimeout]
  );

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();
      clearTimeout(searchTimeout.current);
      updateURL(event.target.elements.q.value);
    },
    [updateURL, searchTimeout]
  );

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
