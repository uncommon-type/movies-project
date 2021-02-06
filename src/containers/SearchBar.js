import React from "react";

const SearchBar = () => {
  return (
    <div className="app__search wrapper">
      <form className="app__search__controls" action="/search" method="get">
        <input type="text" name="q" id="searchBar" placeholder="Movie Title" />
      </form>
    </div>
  );
};

export default SearchBar;
