import React, { Fragment, useState, useEffect, useCallback } from "react";

import { useLocation } from "react-router-dom";
import { parse } from "query-string";

import MovieList from "../components/MovieList";
import PlayList from "../components/PlayList";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const SearchResults = ({ playList, onAdd, onRemove }) => {
  const [searchState, setSearchState] = useState({
    searchTerm: "",
    results: [],
  });

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const location = useLocation();
  const { q: searchTerm } = parse(location.search);

  const [isSearchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    const getMovies = async (searchTerm, searchType = "text") => {
      if (searchTerm.length <= 2) {
        return;
      }
      try {
        const res = await fetch(
          `/.netlify/functions/search?searchTerm=${searchTerm}&searchType=${searchType}`
        );

        const data = await res.json();
        setSearchState({ searchTerm, results: data });
        setSearchTriggered(true);
      } catch (err) {
        console.error(err);
        setSearchTriggered(true);
      }
    };
    getMovies(searchTerm);
  }, [searchTerm, setSearchState]);

  const checkIfAdded = useCallback(
    (id) => {
      return !!playList.find((entry) => entry.id === id);
    },
    [playList]
  );

  if (!isSearchTriggered) {
    return null;
  }

  return searchState.results.length ? (
    <Fragment>
      <MovieList
        searchTerm={searchState.searchTerm}
        searchResults={searchState.results}
        onAdd={onAdd}
        checkIfAdded={checkIfAdded}
        onRemove={onRemove}
      />
      <PlayList playList={playList} onRemove={onRemove} />
    </Fragment>
  ) : (
    <ErrorMessage />
  );
};
export default SearchResults;
