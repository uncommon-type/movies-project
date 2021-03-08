import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import SearchBar from "./containers/SearchBar";
import Header from "./components/Header";
import SearchResults from "./containers/SearchResults";
import ViewSingleMovie from "./containers/ViewSingleMovie";
import Dialog from "./components/Dialog";

const Root = () => {
  const initialState = {
    playList: JSON.parse(localStorage.getItem("playList")) || [],
    searchResults: [],
    movieDetails: {},
    status: "idle",
    error: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_PLAYLIST":
        return { ...state, playList: action.payload };

      case "ADD_TO_PLAYLIST":
        return {
          ...state,
          playList: [
            ...state.playList,
            {
              id: action.payload.id,
              title: action.payload.title,
              year: action.payload.year,
            },
          ],
        };

      case "REMOVE_FROM_PLAYLIST":
        return {
          ...state,
          playList: state.playList.filter(
            (item) => item.id !== action.payload.id
          ),
        };

      case "UPDATE_SEARCH_RESULTS":
        return { ...state, searchResults: action.payload.searchResults };

      case "UPDATE_MOVIE_RESULTS":
        return { ...state, movieDetails: action.payload.movieDetails };

      case "UPDATE_ERROR":
        return { ...state, error: action.payload.error };

      case "UPDATE_STATUS":
        return { ...state, status: action.payload.status };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("playList", JSON.stringify(state.playList));
  }, [state.playList]);

  const handleCloseDialog = () => {
    dispatch({ type: "UPDATE_PLAYLIST", payload: [] });
  };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <Header />
          <SearchBar />
          <Route path="/search">
            <main>
              <SearchResults playList={state.playList} />
              {state.playList.length > 4 ? (
                <Dialog closeDialog={handleCloseDialog} />
              ) : null}
            </main>
          </Route>
          <Route path="/movie/:id">
            <ViewSingleMovie />
          </Route>
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default Root;
