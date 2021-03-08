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
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("playList", JSON.stringify(state.playList));
  }, [state.playList]);

  // const handleRemove = (id) => {
  //   setPlayList((playList) => playList.filter((item) => item.id !== id));
  // };

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
              <SearchResults
                playList={state.playList}
                onRemove={handleRemove}
              />

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
