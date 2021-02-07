import React, { Fragment, useState, useEffect } from "react";
import SearchBar from "./containers/SearchBar";
import Header from "./components/Header";
import SearchResults from "./containers/SearchResults";
import Dialog from "./components/Dialog";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [playList, setPlayList] = useState(
    JSON.parse(localStorage.getItem("playList")) || []
  );
  const [isDialog, setDialog] = useState(true);

  useEffect(() => {
    localStorage.setItem("playList", JSON.stringify(playList));
  }, [playList]);

  const handleSearch = async (searchTerm) => {
    setInputValue(searchTerm);
  };

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
    <Fragment>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <main id="app__main-content">
        <article className="wrapper">
          <div className="main-content__body splitter gap-top-600">
            <SearchResults
              searchTerm={inputValue}
              playList={playList}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          </div>
        </article>
        {playList.length > 2 ? (
          <Dialog closeDialog={handleCloseDialog} />
        ) : null}
      </main>
    </Fragment>
  );
};

export default App;
