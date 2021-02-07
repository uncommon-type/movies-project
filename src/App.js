import React, { Fragment, useState } from "react";
import SearchBar from "./containers/SearchBar";
import Header from "./components/Header";
import SearchResults from "./containers/SearchResults";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [playList, setPlayList] = useState([]);

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
            />
          </div>
        </article>
      </main>
    </Fragment>
  );
};

export default App;
