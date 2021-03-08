import React, { useState, useEffect, useReducer } from "react";
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

  const reducer = (state, action) => {};
  const [playList, setPlayList] = useState(
    JSON.parse(localStorage.getItem("playList")) || []
  );

  useEffect(() => {
    localStorage.setItem("playList", JSON.stringify(playList));
  }, [playList]);

  const handleAdd = (id, title, year) => {
    setPlayList((playList) => {
      return [
        ...playList,
        {
          id,
          title,
          year,
        },
      ];
    });
  };

  const handleRemove = (id) => {
    setPlayList((playList) => playList.filter((item) => item.id !== id));
  };

  const handleCloseDialog = () => {
    setDialog(false);
    localStorage.removeItem("playlist");
    setPlayList([]);
  };

  return (
    <Router>
      <Header />
      <SearchBar />
      <Route path="/search">
        <main>
          <SearchResults
            playList={playList}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />

          {playList.length > 4 ? (
            <Dialog closeDialog={handleCloseDialog} />
          ) : null}
        </main>
      </Route>
      <Route path="/movie/:id">
        <ViewSingleMovie />
      </Route>
    </Router>
  );
};

export default Root;
