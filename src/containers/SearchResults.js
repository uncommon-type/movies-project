import React, { useState, useEffect, useCallback } from "react";

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

  useEffect(() => {
    const getMovies = async (searchTerm, searchType = "text") => {
      if (!searchTerm || searchTerm.length <= 2) {
        return;
      }

      setStatus("pending");

      try {
        const res = await fetch(
          `/.netlify/functions/search?searchTerm=${searchTerm}&searchType=${searchType}`
        );

        const data = await res.json();
        setSearchState({ searchTerm, results: data });
        if (data.Response === "False") {
          const error = new Error(data.Error);
          setError(error);
          setStatus("rejected");
        } else {
          setStatus("resolved");
        }
      } catch (error) {
        console.error(error);
        setError(error);
        setStatus("rejected");
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

  if (status === "idle") {
    return null;
  }

  if (status === "pending") {
    return (
      <div className="spinner-container wrapper">
        <Spinner />
      </div>
    );
  }

  if (status === "rejected") {
    return <ErrorMessage error={error} />;
  }

  if (status === "resolved" && searchState.results.length === 0) {
    return <ErrorMessage />;
  }

  if (status === "resolved") {
    return (
      <article className="app__main-content">
        <div className="main-content__body gap-top-600">
          <MovieList
            searchTerm={searchState.searchTerm}
            searchResults={searchState.results}
            onAdd={onAdd}
            checkIfAdded={checkIfAdded}
            onRemove={onRemove}
          />
          <PlayList playList={playList} onRemove={onRemove} />
        </div>
      </article>
    );
  }
};
export default SearchResults;
