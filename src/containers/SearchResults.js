import React, { useEffect, useCallback, useContext } from "react";

import { useLocation } from "react-router-dom";
import { parse } from "query-string";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

import MovieList from "../components/MovieList";
import PlayList from "../components/PlayList";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const SearchResults = ({ playList }) => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const location = useLocation();
  const { q: searchTerm } = parse(location.search);

  useEffect(() => {
    const getMovies = async (searchTerm, searchType = "text") => {
      if (!searchTerm || searchTerm.length <= 2) {
        return;
      }

      appDispatch({ type: "UPDATE_STATUS", payload: { status: "pending" } });

      try {
        const res = await fetch(
          `/.netlify/functions/search?searchTerm=${searchTerm}&searchType=${searchType}`
        );

        const data = await res.json();
        if (data.length === 0) {
          const error = new Error("Not found");
          appDispatch({ type: "UPDATE_ERROR", payload: { error: error } });
          appDispatch({
            type: "UPDATE_STATUS",
            payload: { status: "rejected" },
          });
        } else {
          appDispatch({
            type: "UPDATE_SEARCH_RESULTS",
            payload: { searchResults: data },
          });
          appDispatch({
            type: "UPDATE_STATUS",
            payload: { status: "resolved" },
          });
        }
      } catch (error) {
        console.error(error);
        appDispatch({ type: "UPDATE_ERROR", payload: { error: error } });
        appDispatch({ type: "UPDATE_STATUS", payload: { status: "rejected" } });
      }
    };
    getMovies(searchTerm);
  }, [searchTerm]);

  const checkIfAdded = useCallback(
    (id) => {
      return !!appState.playList.find((entry) => entry.id === id);
    },
    [appState.playList]
  );

  if (appState.status === "idle") {
    return null;
  }

  if (appState.status === "pending") {
    return (
      <div className="spinner-container wrapper">
        <Spinner />
      </div>
    );
  }

  if (appState.status === "rejected") {
    return <ErrorMessage error={appState.error} />;
  }

  if (status === "resolved") {
    return (
      <article className="app__main-content">
        <div className="main-content__body gap-top-600">
          <MovieList
            searchTerm={searchState.searchTerm}
            searchResults={searchState.results}
            checkIfAdded={checkIfAdded}
          />
          <PlayList playList={playList} />
        </div>
      </article>
    );
  }
};
export default SearchResults;
